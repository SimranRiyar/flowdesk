import { BrevoClient } from "@getbrevo/brevo";

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY!,
});

export async function sendVerificationEmail(to: string, code: string) {
  await client.transactionalEmails.sendTransacEmail({
    sender: {
      email: process.env.BREVO_SENDER_EMAIL!,
      name: "FlowDesk",
    },
    to: [{ email: to }],
    subject: "Your FlowDesk verification code",
    htmlContent: `
      <div style="font-family:sans-serif;max-width:400px;margin:0 auto">
        <h2 style="color:#4f46e5">FlowDesk</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing:8px;color:#4f46e5">${code}</h1>
        <p style="color:#888">This code expires in 10 minutes.</p>
      </div>
    `,
  });
}