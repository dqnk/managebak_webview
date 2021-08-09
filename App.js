import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const STORAGE_KEY = "@save_email";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            buttonClick: 0,
        };
    }
    render() {
        // read data
        const readData = async () => {
            try {
                const email = await AsyncStorage.getItem(STORAGE_KEY);

                if (email !== null) {
                    this.setState({ email: email });
                }
            } catch (e) {
                alert("Failed to fetch the data from storage");
            }
        };

        // save data

        const saveData = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, this.state.email);
                alert("Data successfully saved");
            } catch (e) {
                alert("Failed to save the data to the storage");
            }
        };

        const clearStorage = async () => {
            try {
                await AsyncStorage.clear();
                alert("Storage successfully cleared!");
            } catch (e) {
                alert("Failed to clear the async storage.");
            }
        };

        const onChangeText = (email) => this.setState({ email: email });
        //        handleClick = () => {
        //            webView();
        //        };
        const onSubmitEditing = () => {
            if (!this.state.email) return;
            saveData(this.state.email);
        };
        const handleClick = () => {
            this.setState({ buttonClick: 1 });
        };

        if (this.state.buttonClick < 1) {
            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.container}
                            value={this.state.email}
                            placeholder={"enter your email"}
                            onChangeText={onChangeText}
                            onSubmitEditing={onSubmitEditing}
                        />
                        <TouchableOpacity
                            //onPress={handleClick()}
                            style={styles.button}
                        >
                            <Text style={styles.text}>
                                {this.state.email
                                    ? this.state.email
                                    : "no email given"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <WebView
                    style={styles.container}
                    source={{ uri: "https://www.managebac.com/login" }}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
    },
    text: {
        fontSize: 24,
        padding: 10,
        backgroundColor: "#dcdcdc",
        color: "black",
    },
    button: {
        margin: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
//export default login;
const webView = (url) => {
    return (
        <WebView
            style={styles.container}
            source={{ uri: "https://www.managebac.com/login" }}
        />
    );
};

//const styles = StyleSheet.create({
//    container: {
//        flex: 1,
//        marginTop: Constants.statusBarHeight,
//    },
//});
//
