import { ReactNode, createContext, useState, useEffect } from 'react';
import firebaseApp from '../firebase/firebase';
import { getAuth, User, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

interface AuthProviderProps {
    children?: ReactNode
}

interface AuthContextType {
    currentUserSession: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const auth = getAuth(firebaseApp);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
    const [currentUserSession, setCurrentUserSession] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userSession: User | null) => {
            console.log("Session Info", userSession);
            setCurrentUserSession(userSession);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error)
        }
    };

    const logout = async () => {
        await auth.signOut();
    }

    const value: AuthContextType ={
        currentUserSession,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            { loading ? <p>Loading</p> : children }
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }