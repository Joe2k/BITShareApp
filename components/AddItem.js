import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Input, Text, Button } from "react-native-elements";
import AuthContext from "../auth/context";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function AddItem({ navigation }) {
    const authContext = useContext(AuthContext);
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    const pickImageGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const pickImageCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    const unselect = () => {
        setImage(null);
    };
    const additem = async () => {
        setLoading(true);
        if (itemName === "" || price === "" || image === null) {
            return setError("Fill All Fields and Select Image to Proceed");
        }
        let name = image.split("/").pop();
        let match = /\.(\w+)$/.exec(name);
        let type = match ? `image/${match[1]}` : `image`;
        const data = new FormData();
        data.append("image", {
            uri: image,
            name,
            type,
        });
        data.append("name", itemName);
        data.append("price", price);

        try {
            const response = await axios.post(
                `https://bitshare-portal.herokuapp.com/api/items/postItem/${authContext.user.id}`,
                data
            );
            // const status = await response.status;
            // const json = await response.json();
            //console.log(response);
            if (response.status === 200) {
                setLoading(false);
                navigation.navigate("Home");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text h1 h1Style={{ color: "#3f72af", paddingTop: 10 }}>
                Add New Item
            </Text>
            {error && <Text>{error}</Text>}
            <Input
                containerStyle={{ width: 300, paddingTop: 40 }}
                inputStyle={{ paddingLeft: 10 }}
                placeholder="My Brand New Item"
                label="Item Name"
                leftIcon={{ type: "font-awesome", name: "plus" }}
                onChangeText={(e) => setItemName(e)}
                value={itemName}
            />
            <Input
                containerStyle={{ width: 300, paddingTop: 0 }}
                inputStyle={{ paddingLeft: 10 }}
                placeholder="Price In Rupees"
                label="Price"
                leftIcon={{ type: "font-awesome", name: "rupee" }}
                onChangeText={(e) => setPrice(e)}
                keyboardType="numeric"
                value={price}
            />
            {image == null ? (
                <View>
                    <Button
                        type="outline"
                        icon={
                            <Icon
                                name="collections"
                                type="material"
                                size={20}
                                color="#3f72af"
                            />
                        }
                        titleStyle={{ color: "#3f72af" }}
                        containerStyle={{ width: 270, paddingBottom: 20 }}
                        title=" Pick an image from Gallery"
                        onPress={pickImageGallery}
                        buttonStyle={styles.button}
                    />
                    <Button
                        type="outline"
                        icon={
                            <Icon
                                name="camera"
                                type="material"
                                size={20}
                                color="#3f72af"
                            />
                        }
                        titleStyle={{ color: "#3f72af" }}
                        containerStyle={{ width: 270, paddingBottom: 20 }}
                        title=" Capture an image from Camera"
                        onPress={pickImageCamera}
                        buttonStyle={styles.button}
                    />
                </View>
            ) : (
                <View>
                    <Text h4 h4Style={{ color: "#3f72af" }}>
                        Pictures Selected!
                    </Text>
                    <Button
                        titleStyle={{ color: "#3f72af" }}
                        containerStyle={{ width: 270, paddingVertical: 20 }}
                        type="outline"
                        title="Unselect The Pictures"
                        onPress={unselect}
                    ></Button>
                </View>
            )}

            <Button
                title="Add Item"
                onPress={additem}
                buttonStyle={{ width: 200, color: "#3f72af" }}
                containerStyle={{ paddingTop: 30, color: "#3f72af" }}
            />
            {loading && (
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    color="black"
                    style={styles.loading}
                />
            )}
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
