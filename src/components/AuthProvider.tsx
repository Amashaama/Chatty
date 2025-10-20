import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
    userId: string | null;
    isLoading: boolean;
    signUp: (id: string) => Promise<void>;
    signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const USER_ID_KEY = "userId"; // Key for storing user ID in AsyncStorage

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const storedUserId = await AsyncStorage.getItem(USER_ID_KEY);
                setUserId(storedUserId);
            } catch (error) {
                console.warn("Error loading user ID from storage:", error);
            } finally {
               setTimeout(() => {
                 setIsLoading(false);
               }, 4000);
            }
        })();
    }, []);

    const signUp = async (id: string) => {
        await AsyncStorage.setItem(USER_ID_KEY, id);
        setUserId(id);
    };

    const signOut = async () => {
         setIsLoading(true);
         try {
              await AsyncStorage.removeItem(USER_ID_KEY);
        setUserId(null);
         } catch (error) {
            console.log("Error removing user ID:", error);
         }finally{
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
         }
      
    };

    const value = useMemo(() => ({ userId, isLoading, signUp, signOut }), [userId, isLoading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}