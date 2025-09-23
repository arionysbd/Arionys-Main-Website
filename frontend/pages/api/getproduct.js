import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/components/models/Product";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            // Fetch a single blog by id
            const blog = await Product.findById(req.query.id);
            res.json(blog);
        } else if (req.query?.Productcategory) {
            // Fetch blogs by Productcategory
            const blogs = await Product.find({ Productcategory: req.query.Productcategory });
            res.json(blogs.reverse());
        } else if (req.query?.tags) {
            // Fetch blogs by Productcategory
            const blogs = await Product.find({ tags: req.query.tags });
            res.json(blogs.reverse());
        } else if (req.query?.slug) {
            // Fetch blogs by bcategory
            const blogs = await Product.find({ slug: req.query.slug });
            res.json(blogs.reverse());
        } else {
            // Fetch all blogs
            const blogs = await Product.find();
            res.json(blogs.reverse());
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
