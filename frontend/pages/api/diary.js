import { mongooseConnect } from "@/lib/mongoose";
import { Diary } from "@/components/models/Diary";
import { encrypt, decrypt } from "@/lib/crypto";

export default async function handle(req, res) {

    // If authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;


    if (method === 'POST') {
        const { userid, username, transactionType, reason, note, cost, createdAt } = req.body;
        const productDoc = await Diary.create({
            userid,
            username,
            transactionType,
            reason: encrypt(reason),
            note: encrypt(note),
            cost: encrypt(cost),
            createdAt: createdAt || new Date(),
        });
        const out = productDoc.toObject();
        out.reason = decrypt(out.reason);
        out.note = decrypt(out.note);
        out.cost = decrypt(out.cost);
        res.json(out);
    }


    if (method === 'GET') {
        const offset = parseInt(req.query.offset || "0", 10);
        const limit = parseInt(req.query.limit || "0", 10);
        if (req.query?.id) {
            const doc = await Diary.findById(req.query.id);
            if (!doc) return res.json(null);
            const out = doc.toObject();
            out.reason = decrypt(out.reason);
            out.note = decrypt(out.note);
            out.cost = decrypt(out.cost);
            return res.json(out);
        } else if (req.query?.userid) {
            const baseQuery = Diary.find({ userid: req.query.userid }).sort({ createdAt: -1 });
            const list = limit > 0 ? await baseQuery.skip(offset).limit(limit) : await baseQuery;
            const out = list.map(d => {
                const o = d.toObject();
                o.reason = decrypt(o.reason);
                o.note = decrypt(o.note);
                o.cost = decrypt(o.cost);
                return o;
            });
            return res.json(out);
        } else {
            const baseQuery = Diary.find().sort({ createdAt: -1 });
            const list = limit > 0 ? await baseQuery.skip(offset).limit(limit) : await baseQuery;
            const out = list.map(d => {
                const o = d.toObject();
                o.reason = decrypt(o.reason);
                o.note = decrypt(o.note);
                o.cost = decrypt(o.cost);
                return o;
            });
            return res.json(out);
        }
    }


    if (method === 'PUT') {
        const { _id, userid, username, transactionType, reason, note, cost, createdAt } = req.body;
        await Diary.updateOne(
            { _id },
            {
                userid,
                username,
                transactionType,
                reason: encrypt(reason),
                note: encrypt(note),
                cost: encrypt(cost),
                createdAt,
            }
        );
        const doc = await Diary.findById(_id);
        const out = doc ? doc.toObject() : null;
        if (out) {
            out.reason = decrypt(out.reason);
            out.note = decrypt(out.note);
            out.cost = decrypt(out.cost);
        }
        res.json(out);
    }


    if (method === 'DELETE') {
        if (req.query?.id) {
            await Diary.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}