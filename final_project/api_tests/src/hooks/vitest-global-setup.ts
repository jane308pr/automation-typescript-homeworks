import dotenv from 'dotenv-safe';
import { chromium } from 'playwright';

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const selectors = {
    login: '//button[contains(@class, \'signin-button\')]',
    loginForm: '//form[@class=\'login-modal-form\']',
    email: '//input[@id=\'login-email\']',
    password: '//input[@id=\'login-password\']',
    submit: '//button[@type=\'submit\']'
};

async function getCookieHeaderViaPlaywright(): Promise<string | undefined> {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(process.env.AUTH_URL!);

    await page.click(selectors.login);
    await page.waitForSelector(selectors.loginForm);
    await page.fill(selectors.email, process.env.AUTH_EMAIL!);
    await page.fill(selectors.password, process.env.AUTH_PASSWORD!);

    await Promise.all([
        page.click(selectors.submit),
        page.waitForLoadState('networkidle')
    ]);

    const domain = process.env.API_DOMAIN!;
    const cookies = await context.cookies();
    const relevant = cookies.filter(c => c.domain.includes(domain));

    const cookieHeader =
        relevant.length > 0
            ? relevant.map(c => `${c.name}=${c.value}`).join('; ')
            : undefined;

    await context.close();
    await browser.close();
    return cookieHeader;
}

export default async function setup(): Promise<void> {
    try {
        if (!process.env.API_FOR_HELP_COOKIES) {
            const cookieHeader = await getCookieHeaderViaPlaywright();
            if (cookieHeader) {
                process.env.API_FOR_HELP_COOKIES = cookieHeader;
                console.log('[setup] API_FOR_HELP_COOKIES prepared via Playwright');
            } else {
                console.warn('[setup] No cookies captured via Playwright; API_FOR_HELP_COOKIES is undefined');
            }
        } else {
            console.log('[setup] Using API_FOR_HELP_COOKIES from .env');
        }
    } catch (err) {
        console.error('[setup] Global setup failed:', err);
        throw err;
    }
}

