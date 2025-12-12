import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_PASS = process.env.GMAIL_PASS;
    const TO_EMAIL = process.env.TO_EMAIL || "embracethebackyard@gmail.com";

    // Debug presence (masked): helps confirm envs are loaded without leaking secrets
    console.log("/api/contact env status", {
      GMAIL_USER: !!GMAIL_USER,
      GMAIL_PASS: !!(GMAIL_PASS && GMAIL_PASS.length > 0),
      TO_EMAIL: !!TO_EMAIL,
    });

    const missing: string[] = [];
    if (!GMAIL_USER) missing.push("GMAIL_USER");
    if (!GMAIL_PASS) missing.push("GMAIL_PASS");
    if (missing.length) {
      return new Response(
        JSON.stringify({ error: `Email service not configured. Missing: ${missing.join(", ")}. Set in .env.local` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS, // Use a Gmail App Password if 2FA is enabled
      },
    });

    const subject = `New contact from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    await transporter.sendMail({
      from: `Embrace the Backyard <${GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("/api/contact error", err);
    const details = {
      message: err?.message,
      code: err?.code,
      responseCode: err?.responseCode,
    };
    return new Response(JSON.stringify({ error: "Failed to send message", details }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
