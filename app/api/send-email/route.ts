import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
      },
    });

    // Email to you (notification)
    const mailOptionsToYou = {
      from: process.env.GMAIL_USER,
      to: "rupeshvarshney7@gmail.com",
      subject: `New Portfolio Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #f97316;">New Message from Portfolio Contact Form</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #f97316;">Name:</strong> ${name}</p>
            <p><strong style="color: #f97316;">Email:</strong> ${email}</p>
            <p><strong style="color: #f97316;">Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #fff; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <p><strong style="color: #f97316;">Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    };

    // Email to sender (confirmation)
    const mailOptionsToSender = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #f97316;">Thank You for Reaching Out!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for contacting me through my portfolio. I have received your message and will get back to you as soon as possible.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #f97316;">Your message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p>Best regards,<br/>Rupesh Varshney</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;"/>
          <p style="color: #666; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToSender);

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: String(error) },
      { status: 500 }
    );
  }
}
