import { mongooseConnect } from "@/lib/mongoose";
import { StaticQr } from "@/components/models/StaticQr";

export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const { id } = req.body || req.query;
  if (!id) return res.status(400).json({ error: "ID is required" });

  try {
    await StaticQr.deleteOne({ _id: id });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete Static QR" });
  }
}
