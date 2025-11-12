import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set,get) => ({
    user:null,
    token:null,
    isLoading:false,
    register: async (fullName, email, password) => {
        set({isLoading:true});
        try {
            const response = await fetch('http://10.0.2.2:3000/api/auth/register', {
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
    }
}));