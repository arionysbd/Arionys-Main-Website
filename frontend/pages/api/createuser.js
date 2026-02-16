// import { NextResponse } from 'next/server';
// import bcrypt from 'bcrypt';
// import { User } from '@/models/User';

// export default async function createuser(req, res) {
//     const { method } = req;


//     if (method === 'POST') {
//         const { country, role, password, username, name, phone, email } = req.body;



//         // return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
//         res.status(200).json({ message: email });
//     } else {
//         res.status(405).json({ message: 'Method Not Allowed' });
//     }
// }








import { mongooseConnect } from "@/lib/mongoose";
import { User } from '@/components/models/User';

export default async function createuser(req, res) {

    // If authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;


    if (method === 'POST') {
        const { name, role, username, country, email, phone, password, image, bio, facebook, github, linkedin } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
        
        // Create user with pending status
        const productDoc = await User.create({
            name, role, username, country, email, phone, password, image, bio, facebook, github, linkedin, status: 'pending'
        });

        // Send email to admin for approval
        const adminEmail = 'info.arionys@gmail.com';
        const siteUrl = process.env.SITE_URL || 'https://arionys.com';
        const approveLink = `${siteUrl}/api/admin/approveUser?id=${productDoc._id}&action=approve`;
        const rejectLink = `${siteUrl}/api/admin/approveUser?id=${productDoc._id}&action=reject`;

        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                .container { background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; }
                .header { border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
                .details { margin-bottom: 30px; }
                .btn { padding: 10px 20px; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px; font-weight: bold; }
                .btn-approve { background-color: #28a745; }
                .btn-reject { background-color: #dc3545; }
                .footer { margin-top: 30px; font-size: 12px; color: #888; text-align: center; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>New Account Registration Request</h2>
                </div>
                <div class="details">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Username:</strong> ${username}</p>
                    <p><strong>Role:</strong> ${role}</p>
                    <p><strong>Country:</strong> ${country}</p>
                </div>
                <div>
                    <a href="${approveLink}" class="btn btn-approve">Approve Account</a>
                    <a href="${rejectLink}" class="btn btn-reject">Reject Request</a>
                </div>
                <div class="footer">
                    <p>This is an automated message from Arionys System.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        try {
            await fetch('https://mailapi.arionys.com/api/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.MAIL_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "subject": "New Account Approval Required",
                    "smtpUser": "noreply.arionys@gmail.com",
                    "to": [adminEmail],
                    "replyTo": "noreply.arionys@gmail.com",
                    "from": "noreply.arionys@gmail.com",
                    "fromName": "Arionys Admin System",
                    "html": emailHtml,
                    "bulk": false
                })
            });
        } catch (error) {
            console.error('Failed to send admin approval email:', error);
        }

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await User.findById(req.query.id));
        } else if (req.query?.email) {
            // Fetch blogs by bcategory
            const user = await User.find({ slug: req.query.email });
            res.json(user.reverse());
        } else {
            res.json((await User.find()).reverse())
        }
    }


    if (method === 'PUT') {
        const { _id, name, role, username, country, email, phone, password, image, bio, facebook, github, linkedin } = req.body;

        const existingUser = await User.findOne({ email });

        await User.updateOne({ email }, {
            name, role, username, country, email, phone, password, image, bio, facebook, github, linkedin
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await User.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}