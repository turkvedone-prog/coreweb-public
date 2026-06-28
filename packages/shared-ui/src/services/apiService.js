const BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL || 'http://localhost:5001/coreweb-panel/us-central1';

/**
 * Submits a contact form lead payload to the submitLead REST endpoint.
 * Trims input fields on the client-side.
 * 
 * @param {object} payload - Lead details
 */
export async function submitLead(payload) {
  const sanitized = {
    tenantSlug: payload.tenantSlug ? payload.tenantSlug.trim() : '',
    type: payload.type || 'contact',
    name: payload.name ? payload.name.trim() : '',
    email: payload.email ? payload.email.trim() : '',
    phone: payload.phone ? payload.phone.trim() : '',
    message: payload.message ? payload.message.trim() : '',
    consentAccepted: !!payload.consentAccepted,
    recaptchaToken: payload.recaptchaToken || '',
    website_dummy: payload.website_dummy || '',
    sourcePage: window.location.href,
    extraData: payload.extraData || null
  };

  try {
    const response = await fetch(`${BASE_URL}/submitLead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sanitized)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'İletişim talebiniz iletilemedi.');
    }
    return data;
  } catch (error) {
    // Silent catch to prevent console.error output as per specification
    throw new Error(error.message || 'Sunucuyla bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.', { cause: error });
  }
}

/**
 * Submits a newsletter subscription payload to the submitSubscriber REST endpoint.
 * 
 * @param {object} payload - Subscriber details
 */
export async function submitSubscriber(payload) {
  const sanitized = {
    tenantSlug: payload.tenantSlug ? payload.tenantSlug.trim() : '',
    email: payload.email ? payload.email.trim() : '',
    consentAccepted: !!payload.consentAccepted,
    recaptchaToken: payload.recaptchaToken || '',
    website_dummy: payload.website_dummy || '',
    sourcePage: window.location.href
  };

  try {
    const response = await fetch(`${BASE_URL}/submitSubscriber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sanitized)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Bülten kaydı gerçekleştirilemedi.');
    }
    return data;
  } catch (error) {
    // Silent catch to prevent console.error output as per specification
    throw new Error(error.message || 'Sunucuyla bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.', { cause: error });
  }
}
