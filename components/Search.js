import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

import RNLocation from 'react-native-location';

const Search = ({ onChangeFrom_Location, from_location, onChangeTo_Location, to_location, getEndpoint }) => {

  function getLocation() {
    RNLocation.configure({ distanceFilter: 5.0 });
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
      if (granted) {
        RNLocation.getLatestLocation({ timeout: 60000 })
          .then(latestLocation => {
            console.log(latestLocation)
            onChangeFrom_Location(latestLocation.latitude + "," + latestLocation.longitude)
          })
      }
    })
  }

  function flip() {
    onChangeFrom_Location(to_location);
    onChangeTo_Location(from_location);
  }

  return (
    <View>
      <View style={styles.alignRow}>
        <TextInput
          style={styles.inputbox}
          onChangeText={onChangeFrom_Location}
          value={from_location}
          placeholder="From"
          onSubmitEditing={() => { secondTextInput.focus(); }}
          blurOnSubmit={false}
        />
        <Pressable
          style={styles.locationButton}
          onPress={async () => { getLocation(); }}>
          <Text style={styles.buttonText}>Location</Text>
        </Pressable>
      </View>
      <View style={styles.alignRow}>
        <TextInput
          style={styles.inputbox}
          onChangeText={onChangeTo_Location}
          value={to_location}
          placeholder="To Location"
          ref={(input) => { secondTextInput = input; }}
          onSubmitEditing={() => {
            getEndpoint();
          }}
        />
        <Pressable
          style={styles.locationButton}
          onPress={async () => { flip(); }}>
          <Text style={styles.buttonText}>Flip</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => getEndpoint()}>
        <Text style={styles.text}>Route Search</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  alignRow: {
    flexDirection: "row",
  },
  alignColumn: {
    flexDirection: "column",
  },
  button: {
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#F5AA1C',
  },
  locationButton: {
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#F5AA1C',
    height: 40,
    margin: 2,
    marginTop: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    flex: 0.07,
    fontSize: 2,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonText: {
    fontSize: 5,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  inputbox: {
    height: 40,
    flex: 1,
    margin: 10,
    marginTop: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: '#000',
  },
});

export default Search;
