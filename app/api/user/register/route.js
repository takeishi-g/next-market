import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_URL,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function POST(request) {
  const reqBody = await request.json()
  try{
    await connectDB()
    await UserModel.create(reqBody)
    return NextResponse.json({
      headers: corsHeaders,
      message: "ユーザー登録成功"
    })
  } catch(err) {
    return NextResponse.json({
      message: "ユーザー登録失敗"
    })
  }
}