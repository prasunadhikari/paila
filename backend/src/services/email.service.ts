const agentMailApiKey = process.env.AGENTMAIL_API_KEY;
const agentMailFrom =
  process.env.AGENTMAIL_FROM || "paila.travel.nepal@agentmail.to";

if (!agentMailApiKey) {
  console.warn("AGENTMAIL_API_KEY is not configured.");
}

export async function sendVerificationOtp(
  email: string,
  otp: string
) {
  if (!agentMailApiKey) {
    throw new Error(
      "Email service is not configured. Add AGENTMAIL_API_KEY to environment variables."
    );
  }

  const response = await fetch("https://api.agentmail.to/v0/inboxes/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${agentMailApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: agentMailFrom,
      to: [email],
      subject: "Your Paila verification code",
      text: `Your Paila verification code is ${otp}. This code expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #0ea5e9;">Verify your Paila account</h2>

          <p>Use the verification code below to complete your signup:</p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            padding: 20px;
            background: #f0f9ff;
            border-radius: 12px;
            text-align: center;
            color: #0f172a;
          ">
            ${otp}
          </div>

          <p>This code expires in <strong>10 minutes</strong>.</p>

          <p style="color: #64748b;">
            If you did not create a Paila account, you can ignore this email.
          </p>

          <p>
            <strong>Paila</strong><br />
            Every journey starts with a step.
          </p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `AgentMail email failed: ${response.status} ${errorText}`
    );
  }
}