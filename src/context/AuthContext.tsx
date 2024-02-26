/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { ReactNode, createContext, useState, useEffect } from 'react';
import firebaseApp from '../firebase/firebase';
import { getAuth, Auth, User, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

type AuthProviderProps = {
    children?: ReactNode
}

type AuthContextType = {
    currentUser: User | null;
    login: (auth: Auth, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const auth = getAuth(firebaseApp);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            setCurrentUser(user);
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
        currentUser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            { loading ? <p>Loading</p> : children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;