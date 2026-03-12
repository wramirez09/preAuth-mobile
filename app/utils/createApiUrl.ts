import { env } from '@/env'
export function createApiUrl(relativePath: string): string {
  const path = relativePath.startsWith('/') ? relativePath : `${relativePath}`

  //   if (process.env.NODE_ENV === 'development') {
  //     return origin.concat(path);
  //   }

  if (!env.API_URL) {
    throw new Error(
      'EXPO_PUBLIC_API_BASE_URL environment variable is not defined'
    )
  }

  return env.API_URL.concat(path)
}
