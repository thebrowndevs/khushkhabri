import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.phone || !body.message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Professional HTML email template with emerald green theme
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>New Contact Form Submission - Khushkhabri</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        </head>
        <body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0fdf4;">
            <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f0fdf4">
                <tr>
                    <td align="center" style="padding: 40px 0;">
                        <!-- Main Content Card -->
                        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #d1fae5;">
                            <!-- Header -->
                            <tr>
                                <td bgcolor="#064e3b" style="padding: 30px; text-align: center; background: linear-gradient(135deg, #064e3b 0%, #047857 100%);">
                                    <h1 style="margin:0; color: #ffffff; font-size: 28px; font-weight: 600;">
                                        <i class="fas fa-leaf" style="margin-right: 10px; color: #a7f3d0;"></i>
                                        Khushkhabri
                                    </h1>
                                    <p style="color: #d1fae5; margin: 12px 0 0; font-size: 16px; letter-spacing: 0.5px;">
                                        New Contact Form Submission
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Body Content -->
                            <tr>
                                <td style="padding: 40px 30px;">
                                    <h2 style="margin-top: 0; color: #064e3b; font-weight: 600; border-bottom: 2px solid #d1fae5; padding-bottom: 12px; display: flex; align-items: center;">
                                        <i class="fas fa-envelope-open-text" style="margin-right: 12px; color: #059669;"></i>
                                        Message from ${body.name}
                                    </h2>
                                    
                                    <!-- Contact Details -->
                                    <table cellpadding="10" style="width:100%; border-collapse: collapse; margin-top: 20px;">
                                        <tr>
                                            <td width="30%" style="color: #064e3b; font-weight: 600; border-bottom: 1px solid #d1fae5; padding: 12px 0; display: flex; align-items: center;">
                                                <i class="fas fa-envelope" style="margin-right: 10px; color: #059669;"></i>
                                                Email:
                                            </td>
                                            <td style="border-bottom: 1px solid #d1fae5; padding: 12px 0;">
                                                <a href="mailto:${body.email}" style="color: #059669; text-decoration: none; font-weight: 500;">${body.email}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color: #064e3b; font-weight: 600; border-bottom: 1px solid #d1fae5; padding: 12px 0; display: flex; align-items: center;">
                                                <i class="fas fa-phone-alt" style="margin-right: 10px; color: #059669;"></i>
                                                Contact:
                                            </td>
                                            <td style="border-bottom: 1px solid #d1fae5; padding: 12px 0; font-weight: 500;">
                                                ${body.phone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color: #064e3b; font-weight: 600; vertical-align: top; padding: 20px 0 12px; display: flex; align-items: flex-start;">
                                                <i class="fas fa-comment-dots" style="margin-right: 10px; color: #059669; margin-top: 3px;"></i>
                                                Message:
                                            </td>
                                            <td style="padding: 20px 0 12px; font-weight: 500;">
                                                ${body.message}
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Action Button -->
                                    <table width="100%" style="margin: 30px 0 20px;">
                                        <tr>
                                            <td align="center">
                                                <a href="mailto:${body.email}" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; display: inline-block; box-shadow: 0 4px 6px rgba(5, 150, 105, 0.2);">
                                                    <i class="fas fa-reply" style="margin-right: 8px;"></i>
                                                    Reply to ${body.name.split(" ")[0]}
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Footer -->
                                    <table width="100%" style="margin-top: 20px;">
                                        <tr>
                                            <td style="padding-top: 30px; border-top: 1px solid #d1fae5; text-align: center; color: #64748b; font-size: 14px;">
                                                <p style="margin: 0 0 10px; color: #064e3b; font-weight: 500;">
                                                    This message was sent from the Khushkhabri contact form
                                                </p>
                                                <p style="margin: 0; color: #64748b;">
                                                    © ${new Date().getFullYear()} Khushkhabri. All rights reserved
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;

        const { data, error } = await resend.emails.send({
            from: "Khushkhabri Contact <onboarding@resend.dev>",
            to: "thebrowndevs@gmail.com",
            subject: `New Contact Submission from ${body.name}`,
            html: emailHtml,
        });

        if (error) {
            console.error('Resend API Error:', error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Contact API Crash:', error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
