// app/api/orderMail/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { orderDetails, user } = body;
    const {
      shippingDetails,
      cart,
      orderId,
      createdAt,
      orderValue,
      shippingCharges,
      totalAmount,
      paymentMethod,
      paymentStatus,
    } = orderDetails;
    const { fullName, email, contact, address, state, pin } = shippingDetails;

    const orderDate = new Date(createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const productList = cart
      .map(
        (item, idx) => `
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eaeaea; text-align: left;">
              <div style="font-weight: 600; color: #333;">${item.serviceName}</div>
              <div style="font-size: 13px; color: #666; margin-top: 4px;">${item.variantName}</div>
            </td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eaeaea; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eaeaea; text-align: right;">₹${item.price.toLocaleString()}</td>
          </tr>`
      )
      .join("");

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Your Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f7f7f7">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <tr>
                <td bgcolor="#2e7d32" style="padding: 25px 30px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Your Order!</h1>
                  <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 16px;">
                    Order #${orderId} • ${orderDate}
                  </p>
                </td>
              </tr>
              
              <!-- Intro -->
              <tr>
                <td style="padding: 30px 30px 20px;">
                  <p style="font-size: 16px; line-height: 1.6; color: #444;">
                    Hi ${fullName}, your order has been confirmed and is being processed. 
                    You'll receive another email when your items ship.
                  </p>
                </td>
              </tr>
              
              <!-- Order Summary -->
              <tr>
                <td style="padding: 0 30px;">
                  <h2 style="font-size: 18px; color: #333; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid #f0f0f0;">Order Summary</h2>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                    <thead>
                      <tr>
                        <th style="padding: 10px 15px; text-align: left; background: #f9f9f9; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #666;">Product</th>
                        <th style="padding: 10px 15px; text-align: center; background: #f9f9f9; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #666;">Qty</th>
                        <th style="padding: 10px 15px; text-align: right; background: #f9f9f9; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #666;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${productList}
                    </tbody>
                  </table>
                </td>
              </tr>
              
              <!-- Order Totals -->
              <tr>
                <td style="padding: 20px 30px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="70%" style="text-align: right; padding: 5px 0; font-size: 15px; color: #666;">Subtotal:</td>
                      <td width="30%" style="text-align: right; padding: 5px 0; font-weight: 500;">₹${orderValue.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style="text-align: right; padding: 5px 0; font-size: 15px; color: #666;">Shipping:</td>
                      <td style="text-align: right; padding: 5px 0; font-weight: 500;">₹${shippingCharges.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style="text-align: right; padding: 5px 0; font-size: 15px; color: #666; border-top: 1px solid #eee;">Total:</td>
                      <td style="text-align: right; padding: 5px 0; font-weight: 600; font-size: 17px; color: #2e7d32; border-top: 1px solid #eee;">₹${totalAmount.toLocaleString()}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Payment & Shipping -->
              <tr>
                <td style="padding: 0 30px 30px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="50%" valign="top" style="padding-right: 15px;">
                        <div style="background: #f9f9f9; border-radius: 6px; padding: 18px;">
                          <h3 style="font-size: 16px; margin: 0 0 12px; color: #333;">Payment Information</h3>
                          <p style="margin: 6px 0; font-size: 15px; color: #555;">
                            <strong>Method:</strong> ${paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                          </p>
                          <p style="margin: 6px 0; font-size: 15px; color: #555;">
                            <strong>Status:</strong> 
                            <span style="color: ${paymentStatus === "completed" ? "#2e7d32" : "#d32f2f"}; font-weight: 500;">
                              ${paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td width="50%" valign="top" style="padding-left: 15px;">
                        <div style="background: #f9f9f9; border-radius: 6px; padding: 18px;">
                          <h3 style="font-size: 16px; margin: 0 0 12px; color: #333;">Shipping Address</h3>
                          <p style="margin: 6px 0; font-size: 15px; color: #555;">
                            ${fullName}<br>
                            ${address}<br>
                            ${state} - ${pin}
                          </p>
                          <p style="margin: 6px 0; font-size: 15px; color: #555;">
                            <strong>Phone:</strong> ${contact}<br>
                            <strong>Email:</strong> ${email}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td bgcolor="#f5f5f5" style="padding: 22px 30px; text-align: center; border-top: 1px solid #eee;">
                  <p style="margin: 0; font-size: 14px; color: #666;">
                    Need help? Contact us at 
                    <a href="mailto:support@trivenika.com" style="color: #2e7d32; text-decoration: none;">support@trivenika.com</a>
                  </p>
                  <p style="margin: 8px 0 0; font-size: 14px; color: #888;">
                    © ${new Date().getFullYear()} Trivenika. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Trivenika <trivenika@resend.dev>",
      to: email,
      subject: `Your Order #${orderId} is Confirmed!`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, emailResponse });
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
