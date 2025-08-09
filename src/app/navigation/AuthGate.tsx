import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import {auth, USER_TOKEN_KEY} from '../../shared';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './MainNavigation';
import * as SecureStorage from "expo-secure-store"
import {USER_EMAIL_KEY, USER_PASSWORD_KEY} from "../../shared";
import {login} from "../../feature/auth/login/api/login";

export function AuthGate() {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        const checkTokenAndLogin = async () => {
            try {
                const token = await SecureStorage.getItemAsync(USER_TOKEN_KEY);

                if (token) {
                    const email = await SecureStorage.getItemAsync(USER_EMAIL_KEY);
                    const password = await SecureStorage.getItemAsync(USER_PASSWORD_KEY);

                    if (email && password) {
                        await login(email, password);
                    }
                }
            } catch (error) {
                console.error("Auto-login error:", error);
            }

            const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                setUser(firebaseUser);
            });

            return unsubscribe;
        };

        const unsubscribePromise = checkTokenAndLogin();

        // Повертаємо функцію для відписки від auth listener
        return () => {
            unsubscribePromise.then((unsubscribe) => {
                if (typeof unsubscribe === 'function') {
                    unsubscribe();
                }
            });
        };
    }, []);

    if (user === undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <MainNavigator isAuth={!!user} />
        </NavigationContainer>
    );
}
