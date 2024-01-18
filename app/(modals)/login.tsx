import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { TextInput } from 'react-native-gesture-handler';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth, useOAuth } from '@clerk/clerk-expo';

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}


const Page = () => {
  useWarmUpBrowser();
const router = useRouter();

const { startOAuthFlow : googleAuth } = useOAuth({strategy : 'oauth_google'});
const { startOAuthFlow : appleAuth } = useOAuth({strategy : 'oauth_apple'});
const { startOAuthFlow : facebookAuth } = useOAuth({strategy : 'oauth_facebook'});

const onSelectedAuth = async ( strategy : Strategy) =>{
  const selectedAuth = {
    [Strategy.Google] : googleAuth,
    [Strategy.Apple] : appleAuth,
    [Strategy.Facebook] : facebookAuth,

  }[strategy];

  try{
    const { createdSessionId , setActive} = await selectedAuth();
    console.log("bla bla ", createdSessionId);
    
    if (createdSessionId) {
      setActive !({session : createdSessionId});
      router.back();
    }
   
  } 
  catch (err){
      console.error('OAuth error :' ,err);
      
    }
};

  return (
    <View>
        <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, {marginBottom : 30}]}
        />
        <TouchableOpacity style={defaultStyles.btn}>
          <Text style={defaultStyles.btnText}>Continue</Text>
        </TouchableOpacity>

        <View style ={styles.seperatorView}>
          <View style={{ 
            flex :1,
            borderBottomColor : '#000',
            borderBottomWidth : StyleSheet.hairlineWidth,
          }}
          />
            
          <Text style={styles.seperator}>Or</Text>
          <View style={{
            flex :1 ,
            borderBottomColor : '#000',
            borderBottomWidth : StyleSheet.hairlineWidth,
          }}
          />

        </View>

        <View style={{gap:20}}>
        <TouchableOpacity style ={styles.btnOutline}>
              <Ionicons name="call-outline" size={24} style ={defaultStyles.btnIcon} />
              <Text style ={styles.btnOutlineText}>
                Continue with phone
              </Text>
           </TouchableOpacity>

           <TouchableOpacity style ={styles.btnOutline} onPress={()=> onSelectedAuth(Strategy.Google)}>
              <Ionicons name="md-logo-google" size={24} style ={defaultStyles.btnIcon} />
              <Text style ={styles.btnOutlineText}>
                Continue with Google
              </Text>
           </TouchableOpacity>

           <TouchableOpacity style ={styles.btnOutline} onPress={()=> onSelectedAuth(Strategy.Facebook)}>
              <Ionicons name="md-logo-facebook" size={24} style ={defaultStyles.btnIcon} />
              <Text style ={styles.btnOutlineText}>
                Continue with Facebook
              </Text>
           </TouchableOpacity>


           <TouchableOpacity style ={styles.btnOutline} onPress={()=> onSelectedAuth(Strategy.Apple)}>
              <Ionicons name="md-logo-apple" size={24} style ={defaultStyles.btnIcon} />
              <Text style ={styles.btnOutlineText}>
                Apple
              </Text>
           </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#fff',
    padding : 26,
  },
  seperatorView : {
    flexDirection : 'row',
    gap : 10,
    alignItems : 'center',
    marginVertical : 30,
  },
  seperator:{
    fontFamily: 'mon-sb',
    color : Colors.grey,
  },
  btnOutline : {
    backgroundColor :'#fff',
    borderWidth : 1,
    borderColor : Colors.grey,
    height : 50,
    borderRadius : 8,
    alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText : {
    color : '#000',
    fontSize : 16,
    fontFamily : 'mon-sb',
  },
});

export default Page ;