import React, {useState, useEffect} from "react";
import { WebView } from "react-native-webview";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const STORAGE_KEY_MAIL = "@save_email";
const STORAGE_KEY_DOMAIN = "@save_domain";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			buttonClick: 0,
			domain: "",
		};
	}
	render() {
		// read data
		const readData = async () => {
			try {
				const email = await AsyncStorage.getItem(STORAGE_KEY_MAIL);
				const domain = await AsyncStorage.getItem(STORAGE_KEY_DOMAIN);

				if (email !== null) {
					this.setState({ email: email });
				}
				if (domain !== null) {
					this.setState({ domain: domain });
				}
			} catch (e) {
				alert("Failed to fetch the data from storage");
			}
		};

		// save data

		const saveData = async () => {
			try {
				await AsyncStorage.setItem(STORAGE_KEY_MAIL, this.state.email);
				var domain = this.state.email.substring(
					this.state.email.lastIndexOf("@") + 1
				);
				var end = domain.substring(0, domain.lastIndexOf("."));
				this.setState({ domain: end });
				await AsyncStorage.setItem(
					STORAGE_KEY_DOMAIN,
					this.state.domain
				);
			} catch (e) {
				alert(e);
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
				onFocus = {() => readData()} style = {styles.container} value =
				{this.state.email} placeholder = {"enter your email"} onChangeText =
				{onChangeText} onSubmitEditing =
				{
					onSubmitEditing
				} />
				<TouchableOpacity
				onPress={() => handleClick()}
				style={styles.button}
				>
				<Text style={styles.text}>
				{this.state.email
					? this.state.email
					: "no email given"}
				</Text >
				</TouchableOpacity>
				</View><
				/View>
			);
		} else {
			return (
				<WebView
				style={styles.container}
				source={{
					uri: `https:/ /
		${this.state.domain}.managebac.com`,
				}}
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
		flex: 1,
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});
