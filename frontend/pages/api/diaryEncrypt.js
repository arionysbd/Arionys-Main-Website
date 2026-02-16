import { mongooseConnect } from "@/lib/mongoose";
import { Diary } from "@/components/models/Diary";
import { APIKey } from "@/components/models/APIKey";
import jwt from "jsonwebtoken";
import { encrypt, isEncrypted } from "@/lib/crypto";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    let userId = null;
    const apiKey = req.headers["x-api-key"];
    if (apiKey) {
      const keyDoc = await APIKey.findOne({ key: apiKey, active: true });
      if (!keyDoc) return res.status(403).json({ error: "Invalid API key" });
      userId = keyDoc.userId;
    } else {
      const auth = req.headers["authorization"] || "";
      const parts = auth.split(" ");
      const token = parts[0] === "Bearer" && parts[1] ? parts[1] : null;
      if (!token) return res.status(401).json({ error: "Unauthorized" });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = decoded?.data;
      if (!user) return res.status(401).json({ error: "Unauthorized" });
      userId = user._id;
    }

    const scope = userId ? { userid: userId } : {};

    const docs = await Diary.find(scope).sort({ createdAt: -1 });
    let updated = 0;
    let skipped = 0;

    for (const d of docs) {
      const update = {};
      const r = d.reason;
      const n = d.note;
      const c = d.cost;

      if (typeof r !== "undefined" && !isEncrypted(String(r))) update.reason = encrypt(r);
      if (typeof n !== "undefined" && !isEncrypted(String(n))) update.note = encrypt(n);
      if (typeof c !== "undefined" && !isEncrypted(String(c))) update.cost = encrypt(c);

      if (Object.keys(update).length > 0) {
        await Diary.updateOne({ _id: d._id }, { $set: update });
        updated++;
      } else {
        skipped++;
      }
    }

    return res.json({ updated, skipped, total: docs.length });
  } catch (err) {
    return res.status(500).json({ error: "Migration failed" });
  }
}