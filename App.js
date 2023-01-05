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
