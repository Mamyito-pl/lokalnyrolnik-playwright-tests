import { Page } from "@playwright/test";

export async function addGlobalStyles(page: Page): Promise<void> {
  const cssRules = `
    div[data-sentry-element='PromptContainer'] { display: none !important; }
    #onetrust-consent-sdk { display: none !important; }
    #edrone--main--push--container { display: none !important; }
    #edrone--main--popup--container { display: none !important; }
    div[data-sentry-component="ExternalWidget"] { display: none !important; }
    #cookiescript_injected_wrapper { display: none !important; }
    div[class="snrs-modal-wrapper snrs-modal-show"] { display: none !important; }
    #mmy-top-banner { display: none !important; }
  `;

  try {
    await page.waitForSelector('body', { state: 'visible' });
    await page.addStyleTag({ content: cssRules });
  } catch (error) {
    console.error('Error adding global styles:', error);
  }
};

export function isMobile(page: Page): boolean {
  const viewport = page.viewportSize();
  if (!viewport) throw new Error('Viewport is null');
  return viewport.width <= 400;
}
