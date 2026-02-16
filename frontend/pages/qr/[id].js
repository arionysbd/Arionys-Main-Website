import { mongooseConnect } from "@/lib/mongoose";
import { DynamicQr } from "@/components/models/DynamicQr";
import React from "react";

export default function Page() {
  return <div />;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params?.id || null;
  await mongooseConnect();

  try {
    const qrEntry = id ? await DynamicQr.findOne({ shortId: id }) : null;
    if (qrEntry) {
      DynamicQr.updateOne({ _id: qrEntry._id }, { $inc: { clicks: 1 } }).exec();
      return {
        redirect: {
          destination: qrEntry.targetUrl,
          permanent: false,
        },
      };
    }
    return { notFound: true };
  } catch {
    return { notFound: true };
  }
}
