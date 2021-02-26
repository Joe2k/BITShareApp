import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import AuthContext from "../auth/context";
import storage from "../auth/storage";

export default function Home({navigation}) {
    const authContext = useContext(AuthContext);
    console.log(authContext.user);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Text h1>Hi </Text>
                <Text h1 h1Style={{ color: "#3f72af" }}>
                    {authContext.user.name.split(" ")[0]}!
                </Text>
            </View>
            <Button
                type="clear"
                title="Log Out"
                titleStyle={{ fontSize: 20 }}
                onPress={() => {
                    authContext.setUser(null);
                    storage.removeToken();
                }}
            />
            <Button
                buttonStyle={{ width: 200, color: "#3f72af" }}
                containerStyle={{ paddingTop: 30 }}
                title="Lend"
                onPress={() => navigation.navigate("Lend")}
            />
            <Button
                disabled
                buttonStyle={{ width: 200, color: "#3f72af" }}
                containerStyle={{ paddingTop: 30 }}
                title="Borrow"
            />
            <Button
                disabled
                buttonStyle={{ width: 200, color: "#3f72af" }}
                containerStyle={{ paddingTop: 30 }}
                title="Request"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
