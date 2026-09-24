// Provider errors (LateApiError, UnipileApiError, HeygenError) all carry the
// HTTP status. When erasing data, "not found" means it is already gone, which
// is the outcome we wanted — so those statuses resolve to null instead.
export async function ignoreStatus<T>(
  call: Promise<T>, statuses: number[] = [404],
): Promise<T | null> {
  try {
    return await call;
  } catch (e) {
    if (statuses.includes((e as { status?: number }).status ?? 0)) return null;
    throw e;
  }
}
