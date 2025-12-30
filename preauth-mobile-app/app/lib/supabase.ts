import { AppState, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, processLock } from '@supabase/supabase-js'
const supabaseUrl = "https://ewehlzmdgrdiejtifamp.supabase.co"
const supabaseAnonKey = "=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZWhsem1kZ3JkaWVqdGlmYW1wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzUzNzk4MiwiZXhwIjoyMDYzMTEzOTgyfQ.foXdsGP_5wRE1evIGHElL1b2e372377vmfYhzUO54Qw"

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        lock: processLock,
    },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
// if (Platform.OS !== "web") {
//     AppState.addEventListener('change', (state) => {
//         if (state === 'active') {
//             supabase.auth.startAutoRefresh()
//         } else {
//             supabase.auth.stopAutoRefresh()
//         }
//     })
// }

export default supabase