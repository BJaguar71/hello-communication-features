import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";

// import expo permission and expo image picker
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  // initial state
  state = {
    image: null,
  };
  // define a function to pick image from library / first check the permission
  pickImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync(Permissions.MEDIA_LIBRARY);
    // check access from the user
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
      }).catch((error) => console.log(error));

      //check if the user cancelled the proccess or not
      if (!result.canceled) {
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
