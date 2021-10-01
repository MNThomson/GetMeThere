import React, { useState } from 'react';
import { StyleSheet, FlatList, View, StatusBar, Platform, Alert, ImageBackground, Dimensions, Keyboard, LogBox } from 'react-native';
import { GCP_API_KEY } from 'react-native-dotenv'

//Component imports
import Header from '@components/Header';
import Search from '@components/Search';

//Display imports
import Walking from '@components/Display/Walking';
import Transit from '@components/Display/Transit';

//Hide error messages
LogBox.ignoreAllLogs();

const apiKey = GCP_API_KEY
const mode = "transit"

export default function App() {
  StatusBar.setBarStyle('dark-content', true);

  const [isLoading, setLoading] = useState(true);

  const [from_location, onChangeFrom_Location] = React.useState(null);
  const [to_location, onChangeTo_Location] = React.useState(null);

  const [data, setData] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [legs, setLegs] = useState([]);
  const [steps, setSteps] = useState([]);

  const getEndpoint = async () => {
    apiEndpoint = "https://maps.googleapis.com/maps/api/directions/json?origin=" + from_location + "&destination=" + to_location + "&mode=" + mode + "&region=ca&units=metric&key=" + apiKey
    try {
      const response = await fetch(apiEndpoint);
      const json = await response.json();
      if (json.status != "OK") {
        Alert.alert(
          "Unknown Location",
          "Please try again",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        setLoading(true);
        return
      }
      setData(json);
      setRoutes(json.routes)
      setLegs(json.routes[0].legs)
      setSteps(json.routes[0].legs[0].steps)
      Keyboard.dismiss();
      console.log("Endpoint Hit")
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.main}>
      <StatusBar translucent backgroundColor="#F5AA1C" />
      <Header />
      <Search
        onChangeTo_Location={onChangeTo_Location}
        to_location={to_location}
        onChangeFrom_Location={onChangeFrom_Location}
        from_location={from_location}
        getEndpoint={getEndpoint}
      />
      {isLoading ?
        <ImageBackground source={require('./assets/splash.png')} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, position: 'absolute', top: 250 }} />
        : (
          <FlatList
            data={steps}
            keyExtractor={({ html_instructions }, index) => html_instructions}
            renderItem={({ item }) => (
              <View>
                {item.travel_mode === 'TRANSIT' ? <Transit item={item} /> : null}
                {item.travel_mode === 'WALKING' ? <Walking item={item} /> : null}
              </View>
            )}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flexDirection: "column",
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    color: 'black'
  },
  alignRow: {
    flexDirection: "row",
  },
  alignColumn: {
    flexDirection: "column",
  },
  steps: {
    padding: 5,
    borderRadius: 5,
    borderColor: '#fff',
    flexDirection: "column",
    marginRight: 25,

  },
  substeps: {
    left: 20,
    flexDirection: "column",
  },
});
