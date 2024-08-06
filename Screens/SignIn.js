import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {FormValidationSignIn} from '../components/FormValidation';
import Indicator from '../components/Indecator';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [signIn, setSignIn] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [isDarkMode,setIsDarkMode]=useState(true)

  

  useEffect(()=>{
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('my-key');
        if (value !== null) {
          navigation.navigate("Main")
        }
      }catch{
        
      } 
    }
    getData()
  },[])

  const handleSign = async () => {
    try {
      setSignIn(true)
      const errorMessage = FormValidationSignIn(email, password);

      if (errorMessage) {
        setErrMessage(errorMessage);
        console.log('error ', errorMessage);
        return;
      }
      const res = await axios.post(
        'https://sypto-trading-backend.vercel.app/login',
        {
          email: email,
          password: password,
        },
      );
      const userData = {
        email: email,
        password: password
      };
      setEmail("")
      setPassword("")
      navigation.navigate('OtpVerificationLogin', {"userData": userData,"message":res?.data?.message});
    } catch (error) {
      setErrMessage('Invalid credentials');
    } finally {
      setTimeout(() => {
        setErrMessage('');
      }, 2000);
      setSignIn(false);
    }
  };

  if(signIn){
    return (
      <Indicator/>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.Container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.Container]}>
          <View style={{paddingTop: 60, paddingBottom: 50}}>
            <Text
              style={{
                borderColor: '#aa0000',
                borderWidth: 2,
                fontSize: 25,
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 5,
                color:'#aa0000'
              }}>
              Netflix GPT
            </Text>
          </View>

          <View style={styles.FormContainer}>
            <Text style={{paddingTop: 20, paddingLeft: 15, fontSize: 30}}>
              Sign In
            </Text>
            <View>
              <Text style={styles.EmailText}>Email</Text>
              <TextInput
                type="text"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="gray"
                placeholder="you@mail.com"
                style={styles.InputEmail}></TextInput>
            </View>
            <View>
              <View>
                <Text style={styles.EmailText}>Password</Text>
                <TextInput
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="gray"
                  placeholder="password"
                  style={styles.InputEmail}></TextInput>
              </View>
            </View>

            <Pressable onPress={handleSign} style={styles.PressableButton}>
              <Text style={styles.ButtonText}>Sign in</Text>
            </Pressable>
            {errMessage && (
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 15,
                  paddingTop: 15,
                  color: 'red',
                }}>
                {errMessage}
              </Text>
            )}
            <View style={styles.SignupLinkContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'gray',
                }}>
                By signing up, you agree to the{' '}
                <Text
                  style={{
                    color: 'gray',
                  }}>
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text
                  style={{
                    color: 'gray',
                  }}>
                  Privacy Policy
                </Text>{' '}
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('SignUp')}
              style={{flex: 1, flexDirection: 'row', paddingTop: 10}}>
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 15,
                  textDecorationLine: 'underline',
                  fontWeight: 600,
                }}>
                Create your account?
              </Text>
              <Text style={{fontSize: 18}}> Sign up now</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#1E1E1E',
    height: '100%',
    alignItems: 'center',
  },

  FormContainer: {
    backgroundColor: '#3B3B3B',
    flex: 1,
    width: '100%',
    marginTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  SignInText: {
    paddingLeft: 15,
    fontSize: 20,
    marginTop: 20,
    lineHeight: 27,
  },
  InputEmail: {
    borderColor: '#eae3e3',
    borderWidth: 2,
    padding: 5,
    paddingBottom: 15,
    paddingLeft: 20,
    fontSize: 20,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  EmailText: {
    fontSize: 16,
    padding: 10,
    paddingLeft: 15,
    marginTop: 15,
    color: 'white',
  },
  PressableButton: {
    backgroundColor: '#aa0000',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 25,
  },
  ButtonText: {
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
    color: 'white',
  },
  SignupLinkContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingHorizontal: 15,
    gap: 10,
  },
  Error: {
    color: 'red',
    fontSize: 16,
    paddingLeft: 15,
    marginTop: 10,
  },
});
