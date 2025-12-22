const originalFetch = globalThis.fetch;

function isDebugEnabled(): boolean {
    return String(process.env.HTTP_DEBUG).toLowerCase() === 'true';
}

function truncate(text: string, limit = 2000): string {
    return text.length > limit ? text.slice(0, limit) + '…[truncated]' : text;
}

function toPlainHeaders(
    headers?: Headers | Record<string, string> | [string, string][]
): Record<string, string> {
    const out: Record<string, string> = {};
    if (!headers) return out;

    if (headers instanceof Headers) {
        headers.forEach((v, k) => {
            out[k] = v;
        });
    } else if (Array.isArray(headers)) {
        for (const pair of headers) {
            const [k, v] = pair;
            out[k] = String(v);
        }
    } else {
        Object.assign(out, headers);
    }
    return out;
}

function bodyToPreview(body: unknown, limit = 2000): string | undefined {
    if (body == null) return undefined;

    // string
    if (typeof body === 'string') return truncate(body, limit);

    // URLSearchParams
    if (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams) {
        return truncate(body.toString(), limit);
    }

    // FormData — використовуємо forEach, без entries/keys
    if (typeof FormData !== 'undefined' && body instanceof FormData) {
        const pairs: string[] = [];
        body.forEach((value, key) => {
            pairs.push(`${key}=${typeof value === 'string' ? value : '[Blob/File]'}`);
        });
        return truncate(pairs.join('&'), limit);
    }

    // Buffer (Node)
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(body as any)) {
        const b = body as Buffer;
        return `<Buffer ${b.length} bytes>`;
    }

    // Uint8Array
    if (body instanceof Uint8Array) {
        return `<Uint8Array ${body.length} bytes>`;
    }

    // Request як input — НЕ читаємо стрім, показуємо базову інфу
    if (typeof Request !== 'undefined' && body instanceof Request) {
        const h = toPlainHeaders(body.headers);
        const info = {
            method: body.method,
            headers: h,
            body: '[Request body: stream or already consumed]'
        };
        return truncate(JSON.stringify(info), limit);
    }

    // Plain object (ймовірно JSON)
    if (typeof body === 'object') {
        try {
            return truncate(JSON.stringify(body), limit);
        } catch {
            return '[object]';
        }
    }

    // Інакше — не показуємо
    return undefined;
}

globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url =
        typeof input === 'string'
            ? input
            : input instanceof URL
                ? input.toString()
                : (input as Request).url;

    const method =
        init?.method ??
    (typeof input !== 'string' && !(input instanceof URL)
        ? (input as Request).method
        : 'GET');

    // Заголовки запиту — без entries()
    const reqHeaders = toPlainHeaders(
        init?.headers ??
    (typeof input !== 'string' && !(input instanceof URL) ? (input as Request).headers : undefined)
    );

    // Тіло запиту (string/URLSearchParams/FormData/Buffer/Uint8Array/plain object/Request)
    const reqBodyPreview = bodyToPreview(
        init?.body ??
    (typeof input !== 'string' && !(input instanceof URL) ? input : undefined)
    );

    if (isDebugEnabled()) {

        console.log(
            `[HTTP >] ${method} ${url}\n` +
      `headers: ${JSON.stringify(reqHeaders, null, 2)}\n` +
      `body: ${reqBodyPreview ?? '(none)'}\n`
        );
    }

    const res = await originalFetch(input as any, init);

    // Читаємо клон відповіді, щоб не спожити стрім основної
    let responsePreview = '';
    try {
        const clone = res.clone();
        const ct = clone.headers.get('content-type') ?? '';
        if (ct.includes('application/json')) {
            const json = await clone.json();
            const str = JSON.stringify(json);
            responsePreview = truncate(str, 5000);
        } else {
            const text = await clone.text();
            responsePreview = truncate(text, 5000);
        }
    } catch {
        responsePreview = '(stream/unreadable)';
    }

    // Заголовки відповіді — без entries(), через forEach
    const resHeadersObj: Record<string, string> = {};
    try {
        res.headers.forEach((v, k) => {
            resHeadersObj[k] = v;
        });
    } catch {
    // ignore
    }

    if (isDebugEnabled()) {

        console.log(
            `[HTTP <] ${method} ${url} -> ${res.status}\n` +
      `headers: ${JSON.stringify(resHeadersObj, null, 2)}\n` +
      `body: ${responsePreview}\n`
        );
    }

    return res;
};
