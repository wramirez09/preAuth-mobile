type Env = {
  API_URL: string
  ENV: 'development' | 'production'
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
}

function requireEnv(name: string, value?: string): string {
  if (!value) {
    throw new Error(`❌ Missing required env var: ${name}`)
  }
  return value
}

const ENV = (__DEV__ ? 'development' : 'production') as Env['ENV']

export const env: Env = {
  ENV,
  API_URL: requireEnv('EXPO_PUBLIC_API_URL', process.env.EXPO_PUBLIC_API_URL),
  NEXT_PUBLIC_SUPABASE_URL: requireEnv(
    'NEXT_PUBLIC_SUPABASE_URL',
    process.env.NEXT_PUBLIC_SUPABASE_URL
  ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: requireEnv(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ),
}

// Optional: log once at startup
console.log('🌍 App Env:', env)
