import React, { Component } from "react";
import { Platform, Text, View, StyleSheet, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class App extends Component {
  state = {
    location: null,
    errorLocation: null,
    errorCamera: null,
    markers: []
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      this.setState({
        errorCamera: "Permission to access CAMERA was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      return result.uri;
    }
  };

  render() {
    let text = "Waiting..";
    if (this.state.errorLocation) {
      text = this.state.errorLocation;
    } else if (this.state.location) {
      return (
        <MapView
          style={{ flex: 1 }}
          onLongPress={async e => {
            var coords = e.nativeEvent.coordinate;
            var url = null;
            url = await this._pickImage();
            var marker = { coords: coords, imgUrl: url };
            const newValue = [...this.state.markers, marker];
            this.setState({ markers: newValue });
          }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {this.state.markers.map((marker, i) => (
            <Marker coordinate={marker.coords} key={i}>
              <Callout>
                {marker.imgUrl && (
                  <Image  
                    source={{ uri: 'https://farm3.staticflickr.com/2897/13964001470_6b0121c364_o.jpg' }}
                    style={{ width: 50, height: 50 }}
                    resizeMode="cover"
                  />
                )}
                <Text>marker {i}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});
