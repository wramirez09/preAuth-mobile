import { API_BASE } from "@env";
import Constants from 'expo-constants';
export function createApiUrl(relativePath: string): string {
  const origin = Constants.experienceUrl.replace('exp://', 'http://');

  const path = relativePath.startsWith('/') ? relativePath : `${relativePath}`;

  //   if (process.env.NODE_ENV === 'development') {
  //     return origin.concat(path);
  //   }

  if (!API_BASE) {
    throw new Error(
      'EXPO_PUBLIC_API_BASE_URL environment variable is not defined',
    );
  }

  return API_BASE.concat(path);
}
