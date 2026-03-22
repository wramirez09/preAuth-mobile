# TestFlight Crash Debug Report

## Root Cause Identified
The app was crashing on launch in TestFlight because **environment variables were not configured in the EAS build**.

### Missing Environment Variables
The following critical environment variables were missing from `eas.json`:

1. **EXPO_PUBLIC_API_URL** - Required by `env.ts` which throws an error if missing
2. **NEXT_PUBLIC_SUPABASE_URL** - Required by Supabase client initialization
3. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Required by Supabase client initialization

### What Was Happening
1. App launches in TestFlight (production build)
2. `env.ts` tries to load `EXPO_PUBLIC_API_URL` from `process.env.EXPO_PUBLIC_API_URL`
3. Variable is undefined because it's not in the build environment
4. `requireEnv()` function throws error: "❌ Missing required env var: EXPO_PUBLIC_API_URL"
5. App crashes immediately on launch

## Fix Applied
Updated `eas.json` to include all required environment variables in both `preview` and `production` build profiles:

```json
{
  "build": {
    "preview": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://preauthproduction.vercel.app",
        "NEXT_PUBLIC_SUPABASE_URL": "https://ewehlzmdgrdiejtifamp.supabase.co",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": "sb_publishable_cTk8SEnGh0FddNBIh99_0g_dXEUZjjr"
      }
    },
    "production": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://preauthproduction.vercel.app",
        "NEXT_PUBLIC_SUPABASE_URL": "https://ewehlzmdgrdiejtifamp.supabase.co",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": "sb_publishable_cTk8SEnGh0FddNBIh99_0g_dXEUZjjr"
      }
    }
  }
}
```

## Next Steps

### 1. Test Locally with Release Build
Before uploading to TestFlight again, test the release build locally:

```bash
npx expo run:ios --configuration Release
```

This simulates the production environment and should help catch any remaining issues.

### 2. Rebuild and Upload
Once local testing passes:

```bash
eas build --platform ios --profile production
```

### 3. Monitor TestFlight
After the new build is uploaded:
- Install from TestFlight
- Check if app launches successfully
- Test core functionality (login, chat, etc.)

### 4. Access Crash Logs (if still crashing)
If the app still crashes:
1. Go to App Store Connect
2. Navigate to TestFlight → Builds → [Your Build Number]
3. Click on "Crash logs" tab
4. Review the stack trace to identify the exact error

## Additional Recommendations

### Add Crash Reporting
Consider adding Sentry or similar crash reporting:

```bash
npx expo install sentry-expo
```

This will provide detailed crash reports and stack traces for production issues.

### Environment Variable Checklist
Before each build, verify these are set in `eas.json`:
- ✅ EXPO_PUBLIC_API_URL
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY

### React Native New Architecture
Note: Your app has `newArchEnabled: true` in app.json. If issues persist, consider temporarily disabling this to test compatibility:

```json
"newArchEnabled": false
```

## Files Modified
- `/Users/williamramirez/repos/preAuth-mobile/eas.json` - Added environment variables
