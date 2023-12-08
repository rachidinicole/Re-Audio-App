import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Pressable, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FirebaseApp,
  FirebaseAuth,
  FirebaseDB,
} from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, Auth } from "@firebase/auth";

export default function Register({ navigation }) {
  const PlaceholderImage = require('../assets/justin.jpg')
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const auth = FirebaseAuth

  const onRegister = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let user = { name, phone, email, password };
      const formRes = await addDoc(userRef, user);
      console.log(response);
      console.log(formRes);
      alert("Success!! ");
      navigation.navigate("Login");
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
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 17, }}>RE-AUDIO APP</Text>
        <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginLeft: 110 }}>Create your account</Text>
        <TextInput style={{ backgroundColor: '#daa520', width: 396, height: 50, alignSelf: 'center', borderRadius: 12, }} value={name} onChangeText={(text) => setName(text)}>
          <Ionicons name="person" size={24} color="black" style={{ bottom: 41, left: 360 }} />
          </TextInput>
        <TextInput style={{ backgroundColor: '#daa520', width: 396, height: 50, alignSelf: 'center', borderRadius: 12, marginTop: 10 }} value={email} onChangeText={(text) => setEmail(text)}> <MaterialIcons name="email" size={24} color="black" style={{ left: 360 }} /></TextInput>
        <TextInput style={{ backgroundColor: '#daa520', width: 396, height: 50, alignSelf: 'center', borderRadius: 12, marginTop: 10 }} value={phone} onChangeText={(text) => setPhone(text)}> <Entypo name="phone" size={24} color="black" style={{ left: 360 }} /></TextInput>
        <TextInput style={{ backgroundColor: '#808080', width: 396, height: 50, alignSelf: 'center', borderRadius: 12, marginTop: 12 }} value={password} placeholder='Create password' onChangeText={(text) => setPassword(text)}></TextInput>
        <AntDesign name="eye" size={24} color="black" style={{ bottom: 41, left: 360 }} /></View>
      <StatusBar style="auto" />

      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity style={{ marginBottom: 10, backgroundColor: '#daa520', width: 270, height: 50, alignSelf: 'center', borderRadius: 12, justifyContent: 'center' }}
          // onPress={navigation.navigate("Login")}
          onPress={onRegister}
          ><Text style={{ alignSelf: 'center' }}>Register</Text></TouchableOpacity>
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
    height: 60,
  },
  image: {
    width: 400,
    height: 480,
    borderRadius: 18,
  }
});