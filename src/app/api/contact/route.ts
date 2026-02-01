import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const company = String(body.company ?? "").trim();

    // Honeypot triggered => pretend success
    if (company) {
      return Response.json({ ok: true });
    }

    if (!email || !message) {
      return Response.json(
        { ok: false, error: "Email and message are required." },
        { status: 400 }
      );
    }

    // length guards
    if (name.length > 200 || email.length > 320 || message.length > 5000) {
      return Response.json(
        { ok: false, error: "Message is too long." },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!to || !from) {
      return Response.json(
        { ok: false, error: "Server email env vars not set." },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name || "Anonymous");
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");

    await resend.emails.send({
      from,
      to,
      subject: `Portfolio contact from ${name ? name : email}`,
      replyTo: email, // so "Reply" in Gmail replies to sender and not Resend
      html: `
        <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5;">
          <p style="margin:0 0 4px;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin:0 0 4px;"><strong>Email:</strong> ${safeEmail}</p>
          <p style="margin:0 0 4px;"><strong>Message:</strong></p>
          <div>
            ${safeMessage}
          </div>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
