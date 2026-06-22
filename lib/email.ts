/**
 * Shared transactional-email template (Resend).
 *
 * Renders a branded, email-client-safe HTML message: dark header bar with the
 * brand + a badge, a title, a label/value detail table, an optional message
 * block, an optional CTA button, and a footer note. Layout is table-based with
 * inline styles for broad client support (Gmail, Outlook, Apple Mail).
 *
 * IMPORTANT: every interpolated value must already be HTML-escaped by the caller.
 */

import { SITE_URL } from "./site";

export interface EmailRow {
    label: string;
    /** Pre-escaped HTML-safe value. */
    value: string;
    /** Optional safe URL (e.g. `mailto:…`); turns the value into a link. */
    href?: string;
}

export interface LeadEmailOptions {
    heading: string;
    subheading?: string;
    /** Small uppercase tag shown in the header (e.g. "Discovery Call"). */
    badge?: string;
    rows: EmailRow[];
    /** Long free-text block (e.g. the message / project details). Pre-escaped. */
    message?: { label: string; value: string };
    /** Optional call-to-action button (e.g. a mailto reply). */
    cta?: { label: string; href: string };
}

// Display domain derives from the canonical site URL (no hardcoded brand domain).
const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

const BRAND = {
    name: "Paul Puzon",
    domain: SITE_DOMAIN,
    ink: "#101720",
    bg: "#f4f5f7",
    card: "#ffffff",
    border: "#e6e8eb",
    muted: "#6b7280",
    text: "#1f2937",
    subtle: "#9aa3af",
};

export function renderLeadEmail(o: LeadEmailOptions): string {
    const rowsHtml = o.rows
        .map((r) => {
            const value = r.href
                ? `<a href="${r.href}" style="color:${BRAND.ink};text-decoration:underline;">${r.value}</a>`
                : r.value;
            return `
              <tr>
                <td style="padding:11px 0;border-bottom:1px solid ${BRAND.border};font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:${BRAND.muted};width:38%;vertical-align:top;">${r.label}</td>
                <td style="padding:11px 0;border-bottom:1px solid ${BRAND.border};font-size:15px;color:${BRAND.text};vertical-align:top;">${value}</td>
              </tr>`;
        })
        .join("");

    const messageHtml = o.message
        ? `<div style="margin-top:24px;">
             <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:${BRAND.muted};">${o.message.label}</p>
             <div style="background:${BRAND.bg};border-left:3px solid ${BRAND.ink};border-radius:6px;padding:16px 18px;font-size:15px;line-height:1.6;color:${BRAND.text};white-space:pre-wrap;">${o.message.value}</div>
           </div>`
        : "";

    const ctaHtml = o.cta
        ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px;"><tr>
             <td style="border-radius:6px;background:${BRAND.ink};">
               <a href="${o.cta.href}" style="display:inline-block;padding:13px 24px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:6px;">${o.cta.label}</a>
             </td>
           </tr></table>`
        : "";

    const badgeHtml = o.badge
        ? `<span style="display:inline-block;background:rgba(255,255,255,.14);color:#ffffff;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:5px 11px;border-radius:999px;">${o.badge}</span>`
        : "";

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"></head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${o.subheading ?? o.heading}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr><td style="background:${BRAND.ink};padding:22px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-size:17px;font-weight:800;color:#ffffff;letter-spacing:-.01em;">${BRAND.name}<span style="color:${BRAND.subtle};font-weight:600;"> · ${BRAND.domain}</span></td>
            <td align="right">${badgeHtml}</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:28px 28px 6px;">
          <h1 style="margin:0;font-size:22px;line-height:1.25;color:${BRAND.ink};font-weight:800;">${o.heading}</h1>
          ${o.subheading ? `<p style="margin:6px 0 0;font-size:14px;color:${BRAND.muted};">${o.subheading}</p>` : ""}
        </td></tr>
        <tr><td style="padding:14px 28px 4px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
          ${messageHtml}
          ${ctaHtml}
        </td></tr>
        <tr><td style="padding:26px 28px 28px;">
          <p style="margin:0;font-size:12px;color:${BRAND.muted};line-height:1.5;">Sent from your website at <strong style="color:${BRAND.text};">${BRAND.domain}</strong> · or just reply to this email to respond directly.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
