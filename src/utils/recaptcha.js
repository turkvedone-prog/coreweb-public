/**
 * Dynamically loads the Google reCAPTCHA v3 script in the document body.
 * 
 * @param {string} siteKey - Google reCAPTCHA site key
 */
export function loadRecaptchaScript(siteKey) {
  if (typeof window === 'undefined') return;
  if (document.getElementById('recaptcha-script')) return;
  
  const script = document.createElement('script');
  script.id = 'recaptcha-script';
  script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`;
  script.async = true;
  document.body.appendChild(script);
}

/**
 * Executes reCAPTCHA for a specific action and returns the token.
 * 
 * @param {string} siteKey - Google reCAPTCHA site key
 * @param {string} action - Action name (e.g. 'submit_lead')
 * @returns {Promise<string>} reCAPTCHA token
 */
export async function executeRecaptcha(siteKey, action) {
  if (typeof window === 'undefined') {
    return '';
  }
  
  return new Promise((resolve, reject) => {
    // Poll for window.grecaptcha to load if not instantly available
    const checkInterval = setInterval(() => {
      const grecaptcha = window.grecaptcha?.enterprise || window.grecaptcha;
      if (grecaptcha) {
        clearInterval(checkInterval);
        const readyFn = grecaptcha.ready || window.grecaptcha?.ready;
        if (readyFn) {
          readyFn(() => {
            grecaptcha.execute(siteKey, { action })
              .then(resolve)
              .catch(reject);
          });
        } else {
          // If ready is not present, attempt executing directly
          grecaptcha.execute(siteKey, { action })
            .then(resolve)
            .catch(reject);
        }
      }
    }, 100);

    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      reject(new Error('reCAPTCHA load timeout'));
    }, 10000);
  });
}
