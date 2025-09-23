const { Schema, models, model } = require("mongoose");

const ProductSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    description: { type: String },
    productcategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Product = models.Product || model('Product', ProductSchema, 'ProductData');
