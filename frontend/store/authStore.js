import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE_URL = "http://10.115.124.97:3000"

export const useAuthStore = create((set,get) => ({
    user:null,
    token:null,
    isLoading:false,
    isCheckingAuth:true,

    register: async (fullName, email, password) => {
        set({isLoading:true});
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password
                }),
            })

            const data = await response.json();
            if(!response.ok) throw new Error(data.message || 'Something went wrong!');

            // after getting response, set user and token
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);

            // Now set the user and token in the store
            set({
                user: data.user,
                token: data.token,
                isLoading: false
            });

            return { success: true };

        } catch (error) {
            set({isLoading:false});
            return { success: false, message: error.message }
        }
    },

    login: async (email, password) => {
        set({isLoading:true});
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();
            if(!response.ok) throw new Error(data.message || 'Something went wrong!');
            
            // after getting response, set user and token
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);
            set({
                user: data.user,
                token: data.token,
                isLoading: false
            });
            return { success: true };

        } catch (error) {
            set({isLoading:false});
            return { success: false, message: error.message }
        }
    },

    checkAuth: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userJson = await AsyncStorage.getItem('user');
            const user = userJson ? JSON.parse(userJson) : null;

            set({user, token });

        } catch (error) {
            console.log("Auth check failed:", error);
        } finally {
            set({isCheckingAuth:false});
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
            set({user:null, token:null});
        } catch (error) {
            console.log("Logout failed:", error);
        }
    },
}));