import { StyleSheet } from "react-native";

import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const options = { title: "", headerShown: false };
export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Login" component={Login} options={options} />
        <Stack.Screen name="Register" component={Register} options={options}/>
        <Stack.Screen name="Home" component={Home} options={options} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});