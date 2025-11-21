// Cache Entry
type CacheEntry = {
  data: any;
  expiry: number;
};

//Expiry set to one hour
const cache = new Map<string, CacheEntry>();
const DEFAULT_TTL = 60 * 60 * 1000;  

export const setCache = (key: string, data: any, ttl: number = DEFAULT_TTL): void => {
  const expiry = Date.now() + ttl;
  cache.set(key, { data, expiry });
  console.log(`Caching key "${key}" for ${ttl / 1000} seconds`);
};

export const getCache = (key: string): any | null => {
  const entry = cache.get(key);
  if (!entry) return null;

  // Remove expired entries
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }

  return entry.data;
};

//Clear expire caches
export const clearCache = (key?: string): void => {
  if (key) cache.delete(key);
  else cache.clear();
};
