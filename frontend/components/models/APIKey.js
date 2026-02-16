const { Schema, models, model } = require("mongoose");

const APIKeySchema = new Schema(
  {
    key: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    label: { type: String },
    permissions: { type: [String], default: [] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const APIKey = models.APIKey || model("APIKey", APIKeySchema, "APIKey");