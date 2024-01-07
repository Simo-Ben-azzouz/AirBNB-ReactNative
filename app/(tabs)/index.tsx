 import { View, Text } from 'react-native'
 import {Link} from 'expo-router'
 import React from 'react'
 
 const Page = () => {
   return (
     <View>
       <Link href={'/(modals)/login'} >Login</Link>
       <Link href={'/(modals)/booking'} >Booking</Link>
       <Link href={'/listing/1337'} >Listing details</Link>
     </View>
   )
 }
 
 export default Page