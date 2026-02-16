const { Schema, models, model } = require("mongoose");
const shortid = require("shortid");

const DynamicQrSchema = new Schema(
    {
        shortId: { type: String, unique: true, default: shortid.generate },
        name: { type: String, required: true },
        targetUrl: { type: String, required: true },
        design: { type: Object, default: {} },
        clicks: { type: Number, default: 0 },
        owner: { type: String }, // User email or ID
    },
    {
        timestamps: true,
    }
);

export const DynamicQr = models.DynamicQr || model('DynamicQr', DynamicQrSchema, 'DynamicQr');
