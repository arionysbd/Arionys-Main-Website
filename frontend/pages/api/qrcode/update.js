import { mongooseConnect } from "@/lib/mongoose";
import { DynamicQr } from "@/components/models/DynamicQr";

export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const { shortId, targetUrl, name, design } = req.body || {};
  if (!shortId) return res.status(400).json({ error: "shortId is required" });
  
  // Construct update object
  const updateData = {};
  if (targetUrl) updateData.targetUrl = targetUrl;
  if (name) updateData.name = name;
  if (design) updateData.design = design;

  if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
  }

  try {
    const doc = await DynamicQr.findOne({ shortId });
    if (!doc) return res.status(404).json({ error: "QR not found" });

    await DynamicQr.updateOne({ _id: doc._id }, { $set: updateData });
    const updated = await DynamicQr.findById(doc._id);
    return res.json({
      success: true,
      data: {
        shortId: updated.shortId,
        name: updated.name,
        targetUrl: updated.targetUrl,
        clicks: updated.clicks,
        owner: updated.owner,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update Dynamic QR" });
  }
}
