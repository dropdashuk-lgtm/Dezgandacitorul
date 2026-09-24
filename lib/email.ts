import { Resend } from "resend";

// Trimite un email doar dacă RESEND_API_KEY este configurat.
export async function sendEmail(params: { to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY nu este configurat — email neconfigurat, se omite trimiterea.");
    return { skipped: true };
  }

  const resend = new Resend(apiKey);
  return resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Dezgandacitorul.ro <notificari@dezgandacitorul.ro>",
    to: params.to,
    subject: params.subject,
    html: params.html,
  });
}
