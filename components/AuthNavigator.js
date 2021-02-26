import React from "react"
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Login from "./Login";
import Register from "./Register";
import { View, Text } from "react-native";

export default function AuthNavigator() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerTitleAlign: "center",
                        title: (
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name="share-alt"
                                    type="font-awesome"
                                    color="white"
                                    size={25}
                                />
                                <Text
                                    style={{
                                        paddingLeft: 10,
                                        color: "white",
                                        fontSize: 20,
                                    }}
                                >
                                    BITShare
                                </Text>
                            </View>
                        ),
                        headerStyle: { backgroundColor: "#3f72af" },
                        headerTitleStyle: { color: "white" },
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerTitleAlign: "center",
                        title: (
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name="share-alt"
                                    type="font-awesome"
                                    color="white"
                                    size={25}
                                />
                                <Text
                                    style={{
                                        paddingLeft: 10,
                                        color: "white",
                                        fontSize: 20,
                                    }}
                                >
                                    BITShare
                                </Text>
                            </View>
                        ),
                        headerStyle: { backgroundColor: "#3f72af" },
                        headerTitleStyle: { color: "white" },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}