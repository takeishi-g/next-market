import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const enkodeKey = process.env.NEXT_PUBLIC_ENCODE_KEY
export const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_URL,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function POST(request) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });

    if (savedUserData) {

      // ユーザーデータが存在する場合の処理
      if (reqBody.password === savedUserData.password) {
        const secretKey = new TextEncoder().encode(enkodeKey);
        const payload = {
          email: reqBody.email,
        };

        const token = await new SignJWT(payload)
                                .setProtectedHeader({ alg: "HS256" })
                                .setExpirationTime("1d")
                                .sign(secretKey);
        // console.log(token)

        return NextResponse.json({
          headers: corsHeaders,
          message: "ログイン成功",
          token: token,
        });
      } else {
        return NextResponse.json({
          message: "ログイン失敗：パスワードが間違っています",
        });
      }
    } else {
      // ユーザーデータが存在しない場合の処理
      return NextResponse.json({
        message: "ログイン失敗：ユーザー登録をしてください",
      });
    }
  } catch (err) {
    return NextResponse.json({
      message: "ログイン失敗",
    });
  }
}
