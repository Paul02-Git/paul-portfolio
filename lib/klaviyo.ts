const KLAVIYO_REVISION = "2024-10-15";

/** Klaviyo only accepts E.164 (+countrycode) for the native phone_number field. */
const E164 = /^\+[1-9]\d{6,14}$/;

/**
 * Subscribe an email to a Klaviyo list with email-marketing consent.
 * Creates the profile if it doesn't exist and honors the list's double opt-in
 * setting. Returns the raw fetch Response so callers decide how to handle errors.
 *
 * Shared by the newsletter route (/api/subscribe) and the contact route
 * (/api/contact) so both behave identically.
 */
export async function subscribeToKlaviyoList(params: {
    apiKey: string;
    listId: string;
    email: string;
    /** Shows up as the signup source on the Klaviyo profile. */
    source?: string;
}): Promise<Response> {
    const { apiKey, listId, email, source = "Website" } = params;

    return fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
        method: "POST",
        headers: {
            Authorization: `Klaviyo-API-Key ${apiKey}`,
            revision: KLAVIYO_REVISION,
            "content-type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({
            data: {
                type: "profile-subscription-bulk-create-job",
                attributes: {
                    custom_source: source,
                    profiles: {
                        data: [
                            {
                                type: "profile",
                                attributes: {
                                    email,
                                    subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                                },
                            },
                        ],
                    },
                },
                relationships: { list: { data: { type: "list", id: listId } } },
            },
        }),
    });
}

/**
 * Create or update (upsert) a Klaviyo profile with name, phone and custom
 * properties. Keyed by email, so it merges with the profile created by
 * subscribeToKlaviyoList(). Uses the bulk-import job (native upsert — no manual
 * 409/PATCH handling). Returns the raw fetch Response.
 *
 * Note: this does NOT change email-marketing consent — pair it with
 * subscribeToKlaviyoList() if you also want the profile subscribed.
 */
export async function upsertKlaviyoProfile(params: {
    apiKey: string;
    email: string;
    firstName?: string;
    lastName?: string;
    /** Raw phone string; only sent as phone_number when it's valid E.164. */
    phone?: string;
    /** Maps to Klaviyo's native `organization` field (e.g. business name). */
    organization?: string;
    properties?: Record<string, unknown>;
}): Promise<Response> {
    const { apiKey, email, firstName, lastName, phone, organization, properties } = params;

    const attributes: Record<string, unknown> = { email };
    if (firstName) attributes.first_name = firstName;
    if (lastName) attributes.last_name = lastName;
    if (phone && E164.test(phone)) attributes.phone_number = phone;
    if (organization) attributes.organization = organization;
    if (properties && Object.keys(properties).length > 0) attributes.properties = properties;

    return fetch("https://a.klaviyo.com/api/profile-bulk-import-jobs/", {
        method: "POST",
        headers: {
            Authorization: `Klaviyo-API-Key ${apiKey}`,
            revision: KLAVIYO_REVISION,
            "content-type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({
            data: {
                type: "profile-bulk-import-job",
                attributes: {
                    profiles: { data: [{ type: "profile", attributes }] },
                },
            },
        }),
    });
}
