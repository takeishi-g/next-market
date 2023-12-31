import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_URL,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function POST(request) {
  const reqBody = await request.json()
  try{
    await connectDB()
    await ItemModel.create(reqBody)
    return NextResponse.json({message: "アイテム作成成功", headers: corsHeaders})
  } catch(err) {
    console.log(err)
    return NextResponse.json({message: "アイテム作成失敗"})
  }
}