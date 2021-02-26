import React, { useState, useContext, useEffect } from "react";
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { Input, Text, Button, Card, ListItem } from "react-native-elements";
import AuthContext from "../auth/context";

export default function Lend({navigation}) {
    const authContext = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await fetch(
                "https://bitshare-portal.herokuapp.com/api/items/getItems/" +
                    authContext.user.id,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            const status = await response.status;
            const json = await response.json();
            //console.log(status, json);
            setItems(json);
            setLoading(false);
        })();
    }, []);
    const deleteItem = async (id) => {
        setLoading(true);
        const response = await fetch(
            "https://bitshare-portal.herokuapp.com/api/items/deleteItem/" +
                authContext.user.id,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            }
        );
        const status = await response.status;
        const json = await response.json();
        if (status === 200) {
            let newItems = items;
            newItems = newItems.filter((item) => {
                return item._id != id;
            });
            setItems(newItems);
        }
        setLoading(false);

        //console.log(id);
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: "center",
                    paddingBottom: 40,
                }}
            >
                <Button
                    title="Add New Item"
                    onPress={() => navigation.navigate("AddItem")}
                    containerStyle={{ color: "#3f72af", paddingVertical: 25 }}
                    buttonStyle={{ width: 200, color: "#3f72af" }}
                    titleStyle={{ fontSize: 20 }}
                />
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        borderRadius: 0,
                        borderWidth: 1,
                        borderColor: "#3f72af",
                        borderStyle: "dotted",
                    }}
                />
                <Text h2 h2Style={{ color: "#3f72af", paddingTop: 10 }}>
                    Added Items
                </Text>
                {items.map((item, i) => (
                    <Card
                        key={i}
                        containerStyle={{
                            width: 300,
                            paddingBottom: 0,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Card.Title style={{ fontSize: 25 }}>
                            {item.name}
                        </Card.Title>
                        <Card.Divider />
                        <Image
                            style={{
                                width: 300,
                                height: 300,
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}
                            resizeMode="cover"
                            source={{ uri: item.image }}
                        />
                        <Text
                            h4
                            h4Style={{
                                textAlign: "center",
                                paddingTop: 20,
                                paddingBottom: 10,
                            }}
                        >
                            Price: Rs. {item.price}
                        </Text>
                        <Button
                            title="Delete Item"
                            onPress={() => deleteItem(item._id)}
                        />
                    </Card>
                ))}
            </ScrollView>
            {loading && (
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    color="black"
                    style={styles.loading}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: "whitesmoke",
        justifyContent: "center",
        alignItems: "center",
    },
});
