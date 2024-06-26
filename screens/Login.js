import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken, setUserInfo } from '../redux/authSlice';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.auth.userToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = userCredential.user.stsTokenManager.accessToken;
      dispatch(setUserToken(token));
      await AsyncStorage.setItem('userToken', token);

      if (userCredential) {
        const docSnap = await getDoc(doc(db, 'users', userCredential?.user.uid));
        if (docSnap.exists()) {
          const userInfo = docSnap.data();
          dispatch(setUserInfo(userInfo));
          await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={require("../assets/login.jpg")}
            style={styles.loginimg}
          />
        </View>
        <View style={styles.centerText}>
          <Text
            style={{
              color: "#4876BC",
              fontWeight: "bold",
              fontSize: 40,
            }}
          >
            ChatApp
          </Text>

          <Text
            style={{
              color: "#4876BC",
              fontSize: 12,
              fontWeight: "bold",
              marginTop: "2%",
            }}
          >
            Connect, Chat, and Share Moments - Your Personal Chat Hub!
          </Text>
        </View>
        <View style={styles.textbox}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#647FDE"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#647FDE"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signup}>
          <Text style={styles.bottomtext}>new here?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.bottombuttontext}> SignUp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loginimg: {
    marginTop: 0,
    height: 400,
    width: 400,
  },
  centerText: {
    marginTop: "3%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textbox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 40,
  },
  input: {
    width: "80%",
    height: 40,
    marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: "#E9EEFF",
    borderRadius: 10,
    color: "blue",
    fontWeight: "bold",
  },
  buttons: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 0,
  },
  button: {
    backgroundColor: "#9DB2FD",
    padding: 10,
    width: "50%",
    margin: 12,
    marginTop: 10,
    borderRadius: 50,
  },
  text: {
    color: "#4876BC",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  signup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bottomtext: {
    color: "#9DB2FD",
    fontWeight: "bold",
  },
  bottombuttontext: {
    color: "#647FDE",
    fontWeight: "bold",
  },
});
