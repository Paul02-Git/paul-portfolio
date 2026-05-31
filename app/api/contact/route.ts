import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY is not set. Add it to .env.local (local) and your Vercel env vars (production).');
            return NextResponse.json(
                { error: 'Email service is not configured.' },
                { status: 503 }
            );
        }

        const resend = new Resend(apiKey);

        const body = await req.json();
        const { name, email, phone, subject, budget, comment } = body;

        // Basic validation
        if (!name || !email || !comment) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: ['paulpuzon0007@gmail.com'],
            subject: `New Inquiry from ${name}${subject ? `: ${subject}` : ''}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #108a00;">New Inquiry from ${name}</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                    ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
                    ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="white-space: pre-wrap;">${comment}</p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error('Contact API Error:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
