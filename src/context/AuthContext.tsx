import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase/firebase';
import { getAuth, User, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const auth = getAuth(firebaseApp);

interface AuthProviderProps {
    children?: ReactNode
}

interface AuthContextType {
    currentUserSession: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const useAuth = () => useContext(AuthContext)!;

function AuthProvider({ children }: AuthProviderProps) {
    const [currentUserSession, setCurrentUserSession] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userSession: User | null) => {
            // console.log("Session Info", userSession);
            setCurrentUserSession(userSession);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
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


export { AuthProvider, useAuth }