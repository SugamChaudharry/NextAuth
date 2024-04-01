import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'

connectDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token } = reqBody;
        console.log(token);

        const user = await User.findOne({verifiToken: token , verifiTokenExpire: { $gt: Date.now() }});

        if(!user){
            return NextResponse.json({error:"Invalid or expired token"}, { status: 400 });
        }
        user.isVerified = true;
        user.verifiToken = undefined;
        user.verifiTokenExpire = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, { status: 200 })
        
    } catch (error: any) {
        return NextResponse.json({error:error.message}, { status: 500 });
    }
}