import { mongooseConnect } from "@/lib/mongoose";
import { DynamicQr } from "@/components/models/DynamicQr";

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'POST') {
        const { name, targetUrl, owner, design } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'QR name is required' });
        }
        if (!targetUrl) {
            return res.status(400).json({ error: 'Target URL is required' });
        }
        if (!owner) {
            return res.status(401).json({ error: 'Unauthorized: owner is required' });
        }

        try {
            const newQr = await DynamicQr.create({
                name,
                targetUrl,
                owner,
                design: design || {}
            });

            return res.status(201).json({
                success: true,
                data: newQr,
                redirectUrl: `${process.env.SITE_URL || 'https://arionys.com'}/qr/${newQr.shortId}`
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create Dynamic QR' });
        }
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
}
