import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Pressable, Text, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { FirebaseAuth } from "../firebaseConfig";
import { signInWithEmailAndPassword, Auth } from "@firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function Login({navigation}) {
  const PlaceholderImage = require('../assets/bieber.jpg')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FirebaseAuth;
  // let userID = null;
  const onLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      alert("check your email!");
      let userID = response.user.uid;
      navigation.navigate("Home", { userID: userID });
      console.log(response.user.uid);
      // console.log(Object.keys(response));
    } catch (error) {
      console.log(error);
      alert("Failed!! " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 30, }}>RE-AUDIO APP</Text>
        <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginLeft: 110 }}>log Into your account</Text>
        <TextInput style={{ paddingHorizontal: 10, backgroundColor: '#daa520', width: 396, height: 50, alignSelf: 'center', borderRadius: 12, }} placeholder='email address' />
        <TextInput style={{ paddingHorizontal: 10, backgroundColor: '#808080', width: 396, height: 50, alignSelf: 'center', borderRadius: 12, marginTop: 12 }} placeholder='Password' />
        <AntDesign name="eye" size={24} color="black" style={{ bottom: 41, left: 360 }} />
      </View>
      <StatusBar style="auto" />

      <View style={{ marginBottom: 55, flexDirection: 'column' }}>
        <Pressable
          onPress={onLogin}
          style={{ marginBottom: 30, backgroundColor: '#daa520', width: 270, height: 50, alignSelf: 'center', borderRadius: 12, justifyContent: 'center' }}><Text style={{ alignSelf: 'center' }}>Login</Text></Pressable>
        {/* <Text>If you dont have an account, */}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "tomato" }}>Register</Text>
          </TouchableOpacity>
        {/* </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc',
    alignItems: 'center',

  },
  imageContainer: {
    flex: 1,
    paddingTop: 1,
    height: 40,
  },
  image: {
    width: 400,
    height: 500,
    borderRadius: 18,
  }
});