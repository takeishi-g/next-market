import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_URL,
  "Access-Control-Allow-Methods": "PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function PUT(request, context) {
  const reqBody = await request.json()
  try {
    await connectDB()
    const singleItem = await ItemModel.findById(context.params.id)
    // console.log(singleItem.email)
    if(singleItem.email === reqBody.email) {
      await ItemModel.updateOne({_id: context.params.id}, reqBody)
      return NextResponse.json({
        headers: corsHeaders,
        message: "アイテム編集成功",
      })
    }else {
      return NextResponse.json({
        message: "他の人が作成したアイテムです"
      })
    }
  } catch(err) {
    return NextResponse.json({
      message: "アイテム編集失敗",
    })
  }
}