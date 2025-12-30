
import { AuthContext } from "./context";
import * as React from 'react'
import { Session, User } from "@supabase/supabase-js";
import supabase from "@/app/lib/supabase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = React.useState<Session | null>(null);
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);
    // const [email, setEmail] = React.useState('')
    // const [name, setName] = React.useState('')
    // const [password, setPassword] = React.useState('')
    // const [repeatPassword, setRepeatPassword] = React.useState('')
    // const [error, setError] = React.useState<string | null>(null)
    React.useEffect(() => {
        // Initial session
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setLoading(false);
            throw error;
        }
    };

    const signOut = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setLoading(false);
    };

    // const handleSignUp = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     const supabase = createClient()
    //     setIsLoading(true)
    //     setError(null)

    //     if (password !== repeatPassword) {
    //         setError('Passwords do not match')
    //         setIsLoading(false)
    //         return
    //     }

    //     try {
    //         const { error } = await supabase.auth.signUp({

    //             email,
    //             password,
    //             options: {
    //                 data: {
    //                     name,
    //                 },
    //                 emailRedirectTo: `${window.location.origin}/protected`,
    //             },
    //         })
    //         if (error) throw error
    //         router.push('/auth/sign-up-success')
    //     } catch (error: unknown) {
    //         setError(error instanceof Error ? error.message : 'An error occurred')
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    return (
        <AuthContext.Provider
            value={{ session, user, loading, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}
