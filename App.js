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
        // updates the initial state only if user choose a pic from camera roll
        this.setState({
          image: result,
        });
      }
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Choose an image from library" onPress={this.pickImage} />
      <Button title="Take a photo" onPress={this.takePhoto} />
      <StatusBar style="auto" />
      {/* render image element if the user chose one */}
      {this.state.image && (
        <Image
          source={{ uri: this.state.image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
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
