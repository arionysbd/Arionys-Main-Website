import { mongooseConnect } from "@/lib/mongoose";
import { APIKey } from "@/components/models/APIKey";
import crypto from "crypto";
import jwt from "jsonwebtoken";

function getUserIdFromAuth(req) {
  try {
    const auth = req.headers["authorization"] || "";
    const parts = auth.split(" ");
    if (parts[0] === "Bearer" && parts[1]) {
      const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
      return decoded?.data?.id || decoded?.data?._id || decoded?.data?._doc?._id || null;
    }
    return null;
  } catch {
    return null;
  }
}

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method === "POST") {
    const { label, permissions } = req.body;
    const userId = getUserIdFromAuth(req) || req.body.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const key = crypto.randomBytes(24).toString("hex");
    const doc = await APIKey.create({ key, userId, label, permissions: permissions || [] });
    return res.status(201).json({ id: doc._id, key: doc.key, label: doc.label, permissions: doc.permissions, active: doc.active });
  }

  if (method === "GET") {
    const reqUserId = getUserIdFromAuth(req) || req.query.userId;
    if (!reqUserId) return res.status(401).json({ error: "Unauthorized" });
    const keys = await APIKey.find({ userId: reqUserId }).sort({ createdAt: -1 });
    return res.json(keys.map(k => ({ id: k._id, key: k.key, label: k.label, permissions: k.permissions, active: k.active, createdAt: k.createdAt })));
  }

  if (method === "PUT") {
    const { id, label, permissions, active } = req.body;
    if (!id) return res.status(400).json({ error: "id required" });
    await APIKey.updateOne({ _id: id }, { $set: { label, permissions, active } });
    return res.json(true);
  }

  if (method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "id required" });
    await APIKey.deleteOne({ _id: id });
    return res.json(true);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
