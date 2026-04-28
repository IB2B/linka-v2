const BASE_URL = "https://zernio.com/api/v1";

export async function zernioFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const key = process.env.ZERNIO_API_KEY;
  if (!key) throw new Error("ZERNIO_API_KEY is not set");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zernio API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}
