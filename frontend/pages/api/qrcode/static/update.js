import { mongooseConnect } from "@/lib/mongoose";
import { StaticQr } from "@/components/models/StaticQr";

export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const { id, name, design, content, type, metadata } = req.body || {};
  if (!id) return res.status(400).json({ error: "ID is required" });
  if (!name) return res.status(400).json({ error: "Name is required" });

  const updateData = { name };
  if (design) updateData.design = design;
  if (content) updateData.content = content;
  if (type) updateData.type = type;
  if (metadata) updateData.metadata = metadata;

  try {
    await StaticQr.updateOne({ _id: id }, { $set: updateData });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update Static QR" });
  }
}
