import nodemailer from "nodemailer";
import dns from "node:dns";

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_APP_PASSWORD;

if (!emailUser || !emailPassword) {
  console.warn(
    "EMAIL_USER or EMAIL_APP_PASSWORD is not configured."
  );
}

// Prefer IPv4 so Render does not try Gmail's unreachable IPv6 address.
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
});

export async function sendVerificationOtp(
  email: string,
  otp: string
) {
  if (!emailUser || !emailPassword) {
    throw new Error(
      "Email service is not configured. Add EMAIL_USER and EMAIL_APP_PASSWORD to .env"
    );
  }

  await transporter.sendMail({
    from: `"Paila" <${emailUser}>`,
    to: email,
    subject: "Your Paila verification code",
    text: `Your Paila verification code is ${otp}. This code expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; color: #1e293b;">
        <h2 style="margin-bottom: 8px;">Welcome to Paila</h2>
        <p>Please use the verification code below to complete your signup.</p>

        <div style="
          margin: 25px 0;
          padding: 18px;
          background: #f0f9ff;
          border-radius: 12px;
          text-align: center;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          color: #0284c7;
        ">
          ${otp}
        </div>

        <p>This code will expire in <strong>10 minutes</strong>.</p>

        <p>
          If you did not try to create a Paila account,
          you can safely ignore this email.
        </p>

        <hr style="
          border: none;
          border-top: 1px solid #e2e8f0;
          margin: 25px 0;
        " />

        <p style="font-size: 13px; color: #64748b;">
          Paila — Every journey starts with a step.
        </p>
      </div>
    `,
  });
}