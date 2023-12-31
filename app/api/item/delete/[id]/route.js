import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_URL,
  "Access-Control-Allow-Methods": "DELTE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function DELETE(request, context) {
  try {
    await connectDB()
    await ItemModel.deleteOne({_id: context.params.id})
    return NextResponse.json({
      headers: corsHeaders,
      message: "アイテム削除成功",
    })
  } catch(err) {
    return NextResponse.json({
      message: "アイテム削除失敗",
    })
  }
}