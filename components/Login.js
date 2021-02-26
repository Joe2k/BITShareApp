import React, { useState, useContext } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Text, Button } from "react-native-elements";
import AuthContext from "../auth/context";
import storage from "../auth/storage";
import jwtDecode from "jwt-decode";

export default function Login({ route, navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const onSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://bitshare-portal.herokuapp.com/api/users/login",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: email, password: password }),
                }
            );
            const status = await response.status;
            const json = await response.json();
            //console.log(status, json);
            if (status === 400 || status === 404) {
                if (json.email) setEmailError(json.email);
                else if (json.emailnotfound) setEmailError(json.emailnotfound);
                else setEmailError("");
                if (json.password) setPasswordError(json.password);
                else if (json.passwordincorrect)
                    setPasswordError(json.passwordincorrect);
                else setPasswordError("");
            }
            if (status === 200) {
                //console.log(json);
                const token = json.token.split(" ")[1];
                //console.log(token);
                authContext.setUser(jwtDecode(token));
                storage.storeToken(token);
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Icon
                    name="share-alt"
                    type="font-awesome"
                    color="#3f72af"
                    size={50}
                />
                <Text h1 h1Style={{ paddingLeft: 10, color: "#3f72af" }}>
                    BITShare
                </Text>
            </View>
            <Text h3 h3Style={{ paddingTop: 10, color: "#3f72af" }}>
                Login
            </Text>

            <Input
                containerStyle={{ width: 300, paddingTop: 40 }}
                inputStyle={{ paddingLeft: 10 }}
                placeholder="email@adress.com"
                label="Your Email Address"
                leftIcon={{ type: "font-awesome", name: "envelope" }}
                onChangeText={(email) => setEmail(email)}
                value={email}
                errorMessage={emailError}
            />
            <Input
                containerStyle={{ width: 300 }}
                inputStyle={{ paddingLeft: 10 }}
                placeholder="Password"
                label="Password"
                secureTextEntry={true}
                leftIcon={{ type: "font-awesome", name: "lock" }}
                onChangeText={(password) => setPassword(password)}
                value={password}
                errorMessage={passwordError}
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
                title="Click here to Register"
                onPress={() => navigation.navigate("Register")}
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
