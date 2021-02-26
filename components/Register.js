import React, { useState } from "react";
import {
    ActivityIndicator,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Text, Button, ButtonGroup } from "react-native-elements";

export default function Register({route,navigation}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [hostelName, setHostelName] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState("");
    const [roomNumberError, setRoomNumberError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [hostelNameError, setHostelNameError] = useState("");
    const [index, setIndex] = useState(5);
    const [loading, setLoading] = useState(false);
    const buttons = ["Meera", "Malaviya", "Budh"];
    const onSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "https://bitshare-portal.herokuapp.com/api/users/register",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        name,
                        password,
                        password2,
                        roomNumber,
                        phoneNumber,
                        hostelName,
                    }),
                }
            );
            const status = await response.status;
            const json = await response.json();
            //console.log(status, json);
            if (status === 400 || status === 404) {
                if (json.name) setNameError(json.name);
                else setNameError("");
                if (json.email) setEmailError(json.email);
                else setEmailError("");
                if (json.password) setPasswordError(json.password);
                else setPasswordError("");
                if (json.password2) setPassword2Error(json.password2);
                else setPassword2Error("");
                if (json.roomNumber) setRoomNumberError(json.roomNumber);
                else setRoomNumberError("");
                if (json.phoneNumber) setPhoneNumberError(json.phoneNumber);
                else setPhoneNumberError("");
                if (json.hostelName) setHostelNameError(json.hostelName);
                else setHostelNameError("");
            }
            if (status === 200) {
                navigation.navigate("Login",{msg:"Please Login with registered credentials"});
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: "center",
                    paddingTop: 25,
                    paddingBottom: 50,
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Icon
                        name="share-alt"
                        type="font-awesome"
                        color="#3f72af"
                        size={40}
                    />
                    <Text
                        h1
                        h1Style={{
                            paddingLeft: 10,
                            color: "#3f72af",
                            fontSize: 30,
                        }}
                    >
                        BITShare
                    </Text>
                </View>
                <Text
                    h3
                    h3Style={{ paddingTop: 10, color: "#3f72af", fontSize: 25 }}
                >
                    Register
                </Text>
                <Input
                    containerStyle={{ width: 300, paddingTop: 10 }}
                    inputStyle={{ paddingLeft: 10, fontSize: 15 }}
                    labelStyle={{ fontSize: 15 }}
                    placeholder="John Snow"
                    label="Your Name"
                    value={name}
                    autoCompleteType="name"
                    onChangeText={(e) => setName(e)}
                    errorMessage={nameError}
                    leftIcon={{ type: "font-awesome", name: "user" }}
                />

                <Input
                    containerStyle={{ width: 300 }}
                    labelStyle={{ fontSize: 15 }}
                    inputStyle={{ paddingLeft: 10, fontSize: 15 }}
                    placeholder="email@adress.com"
                    label="Your Email Address"
                    value={email}
                    autoCompleteType="email"
                    onChangeText={(e) => setEmail(e)}
                    errorMessage={emailError}
                    leftIcon={{ type: "font-awesome", name: "envelope" }}
                />
                <Text h4 h4Style={{ fontSize: 15 }}>
                    Select Hostel
                </Text>
                <Text>{hostelNameError}</Text>
                <ButtonGroup
                    onPress={(i) => {
                        setIndex(i);
                        setHostelName(buttons[i]);
                    }}
                    selectedIndex={index}
                    buttons={buttons}
                    textStyle={{ fontSize: 15 }}
                />

                <Input
                    containerStyle={{ width: 300, paddingTop: 10 }}
                    labelStyle={{ fontSize: 15 }}
                    inputStyle={{ paddingLeft: 10, fontSize: 15 }}
                    placeholder="362"
                    label="Room Number"
                    value={roomNumber}
                    errorMessage={roomNumberError}
                    keyboardType="numeric"
                    onChangeText={(e) => setRoomNumber(e)}
                    leftIcon={{ type: "font-awesome", name: "hotel" }}
                />
                <Input
                    containerStyle={{ width: 300 }}
                    labelStyle={{ fontSize: 15 }}
                    inputStyle={{ paddingLeft: 10, fontSize: 15 }}
                    placeholder="8056018282"
                    label="Phone Number"
                    keyboardType="numeric"
                    value={phoneNumber}
                    errorMessage={phoneNumberError}
                    onChangeText={(e) => setPhoneNumber(e)}
                    leftIcon={{ type: "font-awesome", name: "phone" }}
                />
                <Input
                    containerStyle={{ width: 300, paddingBottom: 0 }}
                    labelStyle={{ fontSize: 15 }}
                    inputStyle={{ paddingLeft: 10, fontSize: 15 }}
                    placeholder="Password"
                    label="Password"
                    secureTextEntry={true}
                    value={password}
                    errorMessage={passwordError}
                    onChangeText={(e) => setPassword(e)}
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                />
                <Input
                    containerStyle={{ width: 300, paddingBottom: 0 }}
                    labelStyle={{ fontSize: 15 }}
                    inputStyle={{ paddingLeft: 10, fontSize: 15 }}
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    secureTextEntry={true}
                    value={password2}
                    errorMessage={password2Error}
                    onChangeText={(e) => setPassword2(e)}
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                />
                <Button
                    title="Submit"
                    buttonStyle={{ width: 200, color: "#3f72af" }}
                    onPress={onSubmit}
                />
                <Button
                    buttonStyle={{ width: 200, color: "#3f72af" }}
                    containerStyle={{ paddingTop: 30 }}
                    type="outline"
                    title="Click here to Login"
                    onPress={() => navigation.navigate("Login")}
                />
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
