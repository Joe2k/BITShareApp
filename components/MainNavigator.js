import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Lend from "./Lend";
import Home from "./Home";
import AddItem from "./AddItem";
import { View, Text } from "react-native";

export default function MainNavigator() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
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
                    name="Lend"
                    component={Lend}
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
                    name="AddItem"
                    component={AddItem}
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