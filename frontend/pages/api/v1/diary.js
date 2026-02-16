import { mongooseConnect } from "@/lib/mongoose";
import { APIKey } from "@/components/models/APIKey";
import { Diary } from "@/components/models/Diary";
import { encrypt, decrypt } from "@/lib/crypto";

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

  if (method === "POST") {
    const auth = await authorize(req, "diary:write");
    if (!auth.ok) return res.status(auth.status).json({ error: auth.msg });
    const { transactionType, reason, note, cost, createdAt } = req.body;
    const doc = await Diary.create({
      userid: auth.userId,
      username: undefined,
      transactionType,
      reason: encrypt(reason),
      note: encrypt(note),
      cost: encrypt(cost),
      createdAt: createdAt ? new Date(createdAt) : new Date(),
    });
    const o = doc.toObject();
    o.reason = decrypt(o.reason);
    o.note = decrypt(o.note);
    o.cost = decrypt(o.cost);
    return res.status(201).json(o);
  }

  if (method === "GET") {
    const auth = await authorize(req, "diary:read");
    if (!auth.ok) return res.status(auth.status).json({ error: auth.msg });
    const { date, start: qStart, end: qEnd, search, type } = req.query;
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "50", 10);
    const filter = { userid: auth.userId };

    if (type) {
      const typeNorm = String(type).toLowerCase();
      const synonyms = {
        debit: ["debit", "spend"],
        credit: ["credit", "earn"],
        borrowed: ["borrowed"],
        lent: ["lent"],
        spend: ["spend", "debit"],
        earn: ["earn", "credit"],
      };
      const candidates = synonyms[typeNorm] || [typeNorm];
      filter.$or = (filter.$or || []).concat(
        candidates.map(v => ({ transactionType: new RegExp(`^${v}$`, "i") }))
      );
    }

    const searchStr = search ? String(search).toLowerCase() : null;

    let start, end;
    if (qStart || qEnd) {
      if (qStart) {
        start = new Date(String(qStart));
        start.setHours(0, 0, 0, 0);
      }
      if (qEnd) {
        end = new Date(String(qEnd));
        end.setHours(23, 59, 59, 999);
      }
    } else if (date) {
      if (/^\d+$/.test(String(date))) {
        const now = new Date();
        start = new Date(now);
        start.setDate(now.getDate() - (parseInt(String(date), 10) - 1));
        start.setHours(0, 0, 0, 0);
        end = new Date(now);
        end.setHours(23, 59, 59, 999);
      } else {
        start = new Date(String(date));
        start.setHours(0, 0, 0, 0);
        end = new Date(String(date));
        end.setHours(23, 59, 59, 999);
      }
    }

    if (start || end) {
      filter.createdAt = {};
      if (start) filter.createdAt.$gte = start;
      if (end) filter.createdAt.$lte = end;
    }

    const total = await Diary.countDocuments(filter);
    const items = await Diary.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const out = items.map(d => {
      const o = d.toObject();
      o.reason = decrypt(o.reason);
      o.note = decrypt(o.note);
      o.cost = decrypt(o.cost);
      return o;
    }).filter(o => {
      if (!searchStr) return true;
      const r = (o.reason || "").toLowerCase();
      const n = (o.note || "").toLowerCase();
      return r.includes(searchStr) || n.includes(searchStr);
    });
    return res.json({ items: out, page, limit, total });
  }

  if (method === "PUT") {
    const auth = await authorize(req, "diary:write");
    if (!auth.ok) return res.status(auth.status).json({ error: auth.msg });
    const { id, transactionType, reason, note, cost, createdAt } = req.body || {};
    if (!id) return res.status(200).json({ status: "No record found" });
    const doc = await Diary.findById(id);
    if (!doc) return res.status(200).json({ status: "No record found" });
    if (String(doc.userid) !== String(auth.userId)) return res.status(403).json({ error: "Permission denied" });
    const update = {};
    if (typeof transactionType !== 'undefined') update.transactionType = transactionType;
    if (typeof reason !== 'undefined') update.reason = encrypt(reason);
    if (typeof note !== 'undefined') update.note = encrypt(note);
    if (typeof cost !== 'undefined') update.cost = encrypt(cost);
    if (typeof createdAt !== 'undefined') update.createdAt = createdAt;
    if (Object.keys(update).length === 0) return res.json(doc);
    await Diary.updateOne({ _id: id }, { $set: update });
    const updated = await Diary.findById(id);
    const o = updated.toObject();
    o.reason = decrypt(o.reason);
    o.note = decrypt(o.note);
    o.cost = decrypt(o.cost);
    return res.json(o);
  }

  if (method === "DELETE") {
    const auth = await authorize(req, "diary:write");
    if (!auth.ok) return res.status(auth.status).json({ error: auth.msg });
    const id = req.query.id || (req.body && req.body.id);
    if (!id) return res.status(200).json({ status: "No record found" });
    const doc = await Diary.findById(id);
    if (!doc) return res.status(200).json({ status: "No record found" });
    if (String(doc.userid) !== String(auth.userId)) return res.status(403).json({ error: "Permission denied" });
    await Diary.deleteOne({ _id: id });
    return res.json(true);
  }

  return res.status(405).json({ error: "Method not allowed" });
}