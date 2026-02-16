const { Schema, models, model } = require("mongoose");

const StaticQrSchema = new Schema(
    {
        name: { type: String, required: true },
        content: { type: String, required: true },
        type: { type: String, default: 'text' }, // text, url, wifi, email, vcard, sms, whatsapp, event
        metadata: { type: Object, default: {} }, // Store form fields for easier editing
        design: { type: Object, default: {} },
        owner: { type: String }, // User email or ID
    },
    {
        timestamps: true,
    }
);

export const StaticQr = models.StaticQr || model('StaticQr', StaticQrSchema, 'StaticQr');
