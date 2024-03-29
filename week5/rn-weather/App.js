import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  CITIES,
  getWeatherBackgroundImage,
  getWeatherIcon
} from "./utils/index";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [location, setLocation] = useState({
    name: "",
    main: { temp: "" },
    wind: { speed: "" },
    weather: [{ main: "", description: "" }]
  });

  getLocationAsync = async () => {
    const status = await Permissions.askAsync(Permissions.LOCATION);
    if (status.status !== "granted") {
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    getWeather(location.coords.latitude, location.coords.longitude);
  };

  getWeather = async (latitude, longitude, imgUrl = "") => {
    setLoading(true);
    const API_KEY = "f60ab7addfd46c0010835c70cc6d4365";
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    try {
      const response = await fetch(api);
      const jsonData = await response.json();
      if (imgUrl === "")
        imgUrl = getWeatherBackgroundImage(jsonData.weather[0].main);
      setLocation({ ...jsonData, imgUrl });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  const Loading = () => (
    <View style={styles.loading}>
      <ActivityIndicator />
    </View>
  );

  const WeatherCard = ({ location, error, loading }) => {
    const temperatureC = (location.main.temp - 273.15).toFixed(2);
    const temperatureF = (((location.main.temp - 273.15) * 9) / 5 + 32).toFixed(
      2
    );
    const description = location.weather[0].description;
    const windSpeed = location.wind.speed;
    const icon = location.weather[0].main;

    const capitalizedDescription =
      description && description.charAt(0).toUpperCase() + description.slice(1);

    if (error) {
      return (
        <View style={styles.container}>
          <Text>Error fetching weather!</Text>
        </View>
      );
    }
    return (
      <View style={styles.weatherContainer}>
        {/* <ImageBackground
          style={{ flex: 1, height: "100%", width: "100%" }}
          source={{ uri: getWeatherBackgroundImage(icon) }}
          resizeMode="stretch"
          imageStyle={{ borderRadius: 25 }}
        > */}
          {loading && <Loading />}
          <View style={styles.row}>
            <MaterialIcons name="location-city" size={25} color="lightgrey" />
            <Text style={styles.locationText}>{location.name}</Text>
          </View>
          <View style={[styles.row, { marginTop: 10 }]}>
            <MaterialCommunityIcons
              size={25}
              color="lightgrey"
              name="speedometer"
            />
            <Text style={styles.text}>{windSpeed}</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              size={25}
              color="lightgrey"
              name={getWeatherIcon(icon)}
            />
            <Text style={styles.text}>{capitalizedDescription}</Text>
          </View>

          <View style={styles.tempRow}>
            <View style={[styles.row, { marginRight: 15 }]}>
              <MaterialCommunityIcons
                size={25}
                color="lightgrey"
                name="temperature-fahrenheit"
              />
              <Text style={styles.text}>{temperatureF}</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons
                size={25}
                color="lightgrey"
                name="temperature-celsius"
              />
              <Text style={styles.text}>{temperatureC}</Text>
            </View>
          </View>
        {/* </ImageBackground> */}
      </View>
    );
  };

  onChooseCity = name => {
    let randImg = "";
    if (name !== "") {
      const city = CITIES.find(city => city.name === name);
      randImg = city.imgUrl[Math.floor(Math.random() * city.imgUrl.length)];
      getWeather(city.latitude, city.longitude, randImg);
    } else {
      getLocationAsync();
    }
  };

  const CitySelectionButtons = props => (
    <View style={styles.cityContainer}>
      <TouchableOpacity
        key="currentLocation"
        style={styles.currentLocation}
        onPress={() => props.onChooseCity("")}
      >
        <Text style={styles.cityName}>Current Location</Text>
      </TouchableOpacity>

      {CITIES.map(city => {
        return (
          <TouchableOpacity
            key={city.name}
            style={styles.cityButton}
            onPress={() => props.onChooseCity(city.name)}
          >
            <Text style={styles.cityName}>{city.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: location.imgUrl }}
      style={styles.bg}
      blurRadius={0.2}
    >
      <WeatherCard error={error} loading={loading} location={location} />
      <CitySelectionButtons onChooseCity={onChooseCity} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  weatherContainer: {
    width: "90%",
    borderWidth: 1,
    maxWidth: "90%",
    minHeight: "30%",
    borderRadius: 25,
    marginBottom: "2%",
    borderColor: "white",
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5
  },
  cityContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cityName: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  cityButton: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "25%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  tempRow: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  locationText: {
    fontSize: 25,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  currentLocation: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "72.5%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,33,61,0.6)"
  }
});
