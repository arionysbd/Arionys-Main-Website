import { mongooseConnect } from "@/lib/mongoose";
import { User } from '@/components/models/User';

export default async function handler(req, res) {
    await mongooseConnect();

    const { id, action } = req.query;

    if (!id || !action) {
        return res.status(400).send('Invalid request');
    }

    try {
        if (action === 'approve') {
            await User.updateOne({ _id: id }, { status: 'active' });
            res.setHeader('Content-Type', 'text/html');
            return res.send(`
                <html>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding-top: 50px;">
                        <h1 style="color: green;">Account Approved</h1>
                        <p>The user account has been successfully activated.</p>
                        <script>setTimeout(() => window.close(), 3000);</script>
                    </body>
                </html>
            `);
        } else if (action === 'reject') {
            await User.deleteOne({ _id: id });
            res.setHeader('Content-Type', 'text/html');
            return res.send(`
                <html>
                    <body style="font-family: Arial, sans-serif; text-align: center; padding-top: 50px;">
                        <h1 style="color: red;">Account Rejected</h1>
                        <p>The user account request has been rejected and data has been deleted.</p>
                        <script>setTimeout(() => window.close(), 3000);</script>
                    </body>
                </html>
            `);
        } else {
            return res.status(400).send('Invalid action');
        }
    } catch (error) {
        console.error('Error processing admin action:', error);
        return res.status(500).send('Internal Server Error');
    }
}
