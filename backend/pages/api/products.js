import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    
       // If authenticated, connect to MongoDB
    await mongooseConnect();
    
    const { method } = req;


    if (method === 'POST') {
        const { title, slug, description, Productcategory, tags, status } = req.body;

        const productDoc = await Product.create({
            title, slug, description, Productcategory, tags, status
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findById(req.query.id));
        } else {
            res.json((await Product.find()).reverse())
        }
    }


    if (method === 'PUT') {
        const { _id, title, slug, description, Productcategory, tags, status } = req.body;
        await Product.updateOne({ _id }, {
            title, slug, description, Productcategory, tags, status
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}