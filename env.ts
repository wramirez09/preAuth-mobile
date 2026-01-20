type Env = {
    API_URL: string;
    ENV: 'development' | 'production';
};

function requireEnv(name: string, value?: string): string {
    if (!value) {
        throw new Error(`❌ Missing required env var: ${name}`);
    }
    return value;
}

const ENV = (__DEV__ ? 'development' : 'production') as Env['ENV'];

export const env: Env = {
    ENV,
    API_URL: requireEnv(
        'EXPO_PUBLIC_API_URL',
        process.env.EXPO_PUBLIC_API_URL
    ),
};

// Optional: log once at startup
console.log('🌍 App Env:', env);
