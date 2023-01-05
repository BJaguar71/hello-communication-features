import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, Image } from "react-native";

// import expo permission and expo image picker
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";

export default function App() {
  // initial state
  const [image, setImage] = useState(null);
  const [sound, setSound] = useState();
  const [recording, setRecording] = useState();

  // define a function to pick image from library / first check the permission
  // pick an image from camera roll
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // logic here inside the try obj - check access from the user
    try {
      if (status === "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // take photo from camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    // logic here inside try obj - check user access for camera
    try {
      if (status === "granted") {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // play voice messages
  const playSound = async () => {
    console.log("Loading sound");
    const { sound } = await Audio.Sound.createAsync(require(""));
    setSound(sound);

    console.log("Playing sound");
    await sound.playAsync();
  };
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // record voice message
  const startRecording = async () => {
    try {
      console.log("Recording permissions...");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (error) {
      console.log("Failed to start recording", error);
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
