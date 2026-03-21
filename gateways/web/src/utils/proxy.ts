import type { Context } from 'hono';

export async function proxy(targetUrl: string, c: Context): Promise<Response> {
  const target = new URL(targetUrl);

  const original = new URL(c.req.url);
  for (const [key, value] of original.searchParams) {
    target.searchParams.set(key, value);
  }

  const headers = new Headers();
  for (const [key, value] of Object.entries(c.req.header())) {
    if (key.toLowerCase() === 'host') continue;
    headers.set(key, value);
  }

  const method = c.req.method;
  const hasBody = method !== 'GET' && method !== 'HEAD';

  const upstream = await fetch(target.toString(), {
    method,
    headers,
    body: hasBody ? await c.req.arrayBuffer() : undefined,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: upstream.headers,
  });
}
