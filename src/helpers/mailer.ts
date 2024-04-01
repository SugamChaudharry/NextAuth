import User from '@/models/userModel';
import { verify } from 'crypto';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

interface SendEmailProps {
    email: string;
    emailType: string;
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }:SendEmailProps) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
          await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifiTokenExpire: Date.now() + 3600000});
        } else if (emailType === "RESET"){
          await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordExpire: Date.now() + 3600000});
        }

        let transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "f2006321dbd946",
            pass: "25432d5e2b4e9b"
          }
        });
        
        const mailOptions = {
            from: 'sugam@sugam.ai',
            to: email,
            subject: emailType === "VERIFY" ? "VERIFY your email" : "Reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: `<p> Click 
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
                    to ${emailType === "VERIFY" ? "VERIFY your email" : "Reset your password"}
                    or copy and paste the link below in your browser
                    <br/> 
                    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                  </p>`
          }
        const mailResponse = await transport.sendMail(mailOptions);
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}
