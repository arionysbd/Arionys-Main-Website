import { mongooseConnect } from "@/lib/mongoose";
import { StaticQr } from "@/components/models/StaticQr";
import jwt from "jsonwebtoken";

function getOwner(req) {
  const qOwner = req.query.owner;
  if (qOwner) return qOwner;
  try {
    const auth = req.headers["authorization"] || "";
    const parts = auth.split(" ");
    if (parts[0] === "Bearer" && parts[1]) {
      const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
      const uid = decoded?.data?.id || decoded?.data?._id || decoded?.data?._doc?._id || null;
      return uid || null;
    }
  } catch {}
  return null;
}

export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const owner = getOwner(req);
    const filter = owner ? { owner } : {};
    const docs = await StaticQr.find(filter).sort({ createdAt: -1 });
    const list = docs.map(d => ({
      id: d._id,
      name: d.name,
      content: d.content,
      owner: d.owner,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    }));
    return res.json(list);
  } catch (error) {
    return res.status(500).json({ error: "Failed to load Static QRs" });
  }
}
