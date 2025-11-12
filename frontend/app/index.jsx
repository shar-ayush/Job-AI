import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

export default function Index() {
  const {user, token, checkAuth, logout } = useAuthStore();
  console.log(user, token);

  useEffect(() => {
    checkAuth();
  },[])
  return (
    <View style={styles.container}>
      <Text>Hello {user?.fullName}</Text>
      <Text>Welcome to the Home Screen!</Text>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <Link href="/(auth)/signup">Signup</Link>
      <Link href="/(auth)">Login</Link>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    }
});
