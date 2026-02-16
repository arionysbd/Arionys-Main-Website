import crypto from "crypto";

function getKey() {
  const raw = process.env.DIARY_ENC_KEY || process.env.JWT_SECRET || "default-key";
  return crypto.createHash("sha256").update(String(raw)).digest();
}

export function encrypt(text) {
  if (text === undefined || text === null) return "";
  const s = String(text);
  if (s.trim().length === 0) return "";
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const enc = Buffer.concat([cipher.update(s, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}.$${enc.toString("base64")}.$${tag.toString("base64")}`;
}

export function decrypt(payload) {
  try {
    if (!payload) return "";
    const parts = String(payload).split(".$");
    if (parts.length !== 3) return String(payload);
    const iv = Buffer.from(parts[0], "base64");
    const data = Buffer.from(parts[1], "base64");
    const tag = Buffer.from(parts[2], "base64");
    const decipher = crypto.createDecipheriv("aes-256-gcm", getKey(), iv);
    decipher.setAuthTag(tag);
    const dec = Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
    return dec;
  } catch {
    return String(payload || "");
  }
}

export function isEncrypted(payload) {
  if (!payload || typeof payload !== "string") return false;
  const parts = payload.split(".$");
  return parts.length === 3 && parts.every(p => p.length > 0);
}