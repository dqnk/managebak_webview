# Setting up the environment
To set up the environment you will need a text editor, Android studio and yarn/npm. The instructions are only for Android, because this app is targeted primarily at Android where Managebac app runs terribly slow. If you know how to develop for IOS, you are free to submit a PR detailing the setup steps.

## 1. Node modules

### Install yarn on your operating system.
You could also use npm (https://reactnative.dev/docs/environment-setup), but I have found yarn easier to use for this project.

### Run the commands to install required dependencies
```shell
yarn global add expo-cli
yarn
```
### Run the application
```
yarn start
```
## 2. Android studio
Install Android studio and Gradle. Then open managebak_webview/android folder as an Android project there. Set up the virtual device for debugging (I used Pixel 4 API 29) and build.
