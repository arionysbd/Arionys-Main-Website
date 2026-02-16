import { mongooseConnect } from "@/lib/mongoose";
import { StaticQr } from "@/components/models/StaticQr";

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'POST') {
        const { name, content, owner, design, type, metadata } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'QR name is required' });
        }
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }
        if (!owner) {
             return res.status(401).json({ error: 'Unauthorized: owner is required' });
        }

        try {
            const newQr = await StaticQr.create({
                name,
                content,
                owner,
                design: design || {},
                type: type || 'text',
                metadata: metadata || {}
            });

            return res.status(201).json({
                success: true,
                data: newQr
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create Static QR' });
        }
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
}
