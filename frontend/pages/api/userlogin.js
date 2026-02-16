import { mongooseConnect } from "@/lib/mongoose";
import { User } from '@/components/models/User';
import bcrypt from "bcryptjs";
var jwt = require('jsonwebtoken');

export default async function userlogin(req, res) {

    // If authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;


    if (method === 'POST') {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return new Response(JSON.stringify({
                success: false,
                status: 400,
                message: 'email and password are required',
                data: email,
            }));
        }

        // Find the user in the database
        const user = await User.findOne({ email });

        // If user is not found, return an error
        if (!user) {
            return new Response(JSON.stringify({
                success: false,
                status: 400,
                message: 'Invalid credentials'
            }));
        }

        // Check if account is pending approval
        if (user.status === 'pending') {
            return res.status(403).json({ 
                success: false, 
                status: 403, 
                message: 'Account is pending approval. Please wait for admin confirmation.' 
            });
        }

        // console.log(user.password)

        const isPasswordValid = await bcrypt.compare(password, user.password);
        // console.log(isPasswordValid)
        if (isPasswordValid) {
            // console.log("loggedin")
            var token = jwt.sign({ data: user }, process.env.JWT_SECRET);
            // console.log(process.env.JWT_SECRET)
            return res.status(200).json({success: true, status: 200, token});
        } else {
            // console.log("failed")
            return res.status(400).json({ success: false, status: 400, data: "Wrong Password" });
        }
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await User.findById(req.query.id));
        } else {
            res.json((await User.find()).reverse())
        }
    }



}