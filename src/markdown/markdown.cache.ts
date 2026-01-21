const cache = new Map<string, string>();

export const getCached = (id: string) => cache.get(id);
export const setCached = (id: string, html: string) => cache.set(id, html);
