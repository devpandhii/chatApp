import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import React from "react";

export default function home() {
  const [text, onChangeText] = React.useState("");
  const handlePress = () => {
    // Handle button press here
    console.log("Button pressed");
  };
  return (
    <View style={styles.container}>
      {/* <View>
      <Image source={require('../assets/main.jpg')}/>
      </View> */}
      <View style={styles.centerText}>
        <Text style={{
                color:"#4876BC",
                fontWeight:"bold",
                fontSize:40,
        }}>ChatApp</Text>

        <Text style={{
            color:"#4876BC",
            fontSize:12,
            fontWeight:"bold",
            marginTop:"2%"
        }}>
        Connect, Chat, and Share Moments - Your Personal Chat Hub!
        </Text>
      </View>  
      <View style={styles.buttons}>
       <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Login</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Sign Up</Text>
       </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //marginTop: 50,
    height: "100%",
  },
  buttons:{
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    marginBottom:60
  },
  button:{
    backgroundColor:"#9DB2FD",
    padding:10,

    width:"60%",
    margin:12,
    borderRadius:50
  },
  text:{
    color:"#4876BC",
    textAlign:"center"
  },
  centerText:{
    flex:1,
    marginTop:"75%",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  }
});
