import { View, Text, TouchableOpacity } from 'react-native'
import COLORS from '../../constants/colors'
import styles from '../../assets/styles/profile.styles'
import ProfileHeader from '../../components/ProfileHeader'
import LogoutButton from '../../components/LogoutButton'
import React from 'react'

export default function Profile() {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
    </View>
  )
}