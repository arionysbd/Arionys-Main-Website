import { mongooseConnect } from "@/lib/mongoose";
import { APIKey } from "@/components/models/APIKey";
import { Diary } from "@/components/models/Diary";
import { decrypt } from "@/lib/crypto";

async function authorize(req, neededPerm) {
  const key = req.headers["x-api-key"];
  if (!key) return { ok: false, status: 401, msg: "Missing x-api-key" };
  const doc = await APIKey.findOne({ key, active: true });
  if (!doc) return { ok: false, status: 403, msg: "Invalid API key" };
  if (!doc.permissions.includes(neededPerm)) return { ok: false, status: 403, msg: "Permission denied" };
  return { ok: true, userId: doc.userId };
}

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const auth = await authorize(req, "hisab:read");
  if (!auth.ok) return res.status(auth.status).json({ error: auth.msg });

  let { date, days } = req.query;
  if (!date || (typeof date === "string" && date.trim() === "")) {
    const now = new Date();
    date = now.toISOString().slice(0, 10);
  }

  let start, end, periodLabel = "day";
  const numericDays = (() => {
    if (days && /^\d+$/.test(String(days))) return parseInt(days, 10);
    if (date && /^\d+$/.test(String(date))) return parseInt(date, 10);
    if (String(date).toLowerCase() === "seven") return 7;
    return null;
  })();

  if (numericDays && numericDays > 0) {
    const now = new Date();
    const rangeStart = new Date(now);
    rangeStart.setDate(now.getDate() - (numericDays - 1));
    rangeStart.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(now);
    rangeEnd.setHours(23, 59, 59, 999);
    start = rangeStart;
    end = rangeEnd;
    periodLabel = `days:${numericDays}`;
  } else {
    start = new Date(date);
    start.setHours(0, 0, 0, 0);
    end = new Date(date);
    end.setHours(23, 59, 59, 999);
  }

  const itemsRaw = await Diary.find({ userid: auth.userId, createdAt: { $gte: start, $lte: end } }).sort({ createdAt: -1 });
  const items = itemsRaw.map(d => {
    const o = d.toObject();
    o.reason = decrypt(o.reason);
    o.note = decrypt(o.note);
    o.cost = decrypt(o.cost);
    return o;
  });

  let totalSpend = 0;
  let totalEarn = 0;
  let totalBorrowed = 0;
  let totalLent = 0;
  for (const it of items) {
    const amt = parseFloat(it.cost || "0") || 0;
    const t = (it.transactionType || "").toLowerCase();
    if (t === "spend" || t === "debit") totalSpend += amt;
    else if (t === "earn" || t === "credit") totalEarn += amt;
    else if (t === "borrowed") totalBorrowed += amt;
    else if (t === "lent") totalLent += amt;
  }
  const totalProfit = totalEarn - totalSpend;
  const totalCredit = totalEarn;
  const totalDebit = totalSpend;
  const left = totalCredit - totalDebit;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const sym = { earn: "C", credit: "C", spend: "D", debit: "D", borrowed: "B", lent: "L" };
  const history = items.map(it => {
    const d = new Date(it.createdAt || Date.now());
    const amt = parseFloat(it.cost || "0") || 0;
    const t = (it.transactionType || "").toLowerCase();
    const sign = (t === "spend" || t === "debit" || t === "lent") ? -1 : 1;
    const reason = (it.reason || it.note || "").toString();
    return `${d.getDate()} ${months[d.getMonth()]} - ${sym[t] || "?"} - ${reason} ${sign * amt}`;
  }).join("\n");
  return res.json({
    totalCredited: totalCredit,
    totalDebited: totalDebit,
    totalLent,
    totalBorrowed,

    totalSpend,
    totalEarn,
    totalProfit,
    left,

    history,
    period: periodLabel,
    
    start,
    end,
    count: items.length,
    
  });
}