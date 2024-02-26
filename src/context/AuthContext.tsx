import { createContext, useEffect } from 'react';
import { firebaseApp, auth } from '../firebase/firebase';

type AuthContextType = {
    currentUser: firebaseApp.User | null;

}

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(setCurrentUser);
        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={value}>

        </AuthContext.Provider>
    )
}