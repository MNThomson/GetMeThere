import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Transit = (props) => {
  item = props.item
  return (
    <View style={styles.box}>
      <View style={{ ...styles.transit, ...{ backgroundColor: item.transit_details.line.color } }}></View>
      <View style={styles.steps}>
        <Text style={{ fontWeight: "bold" }}>{item.html_instructions} ({item.transit_details.num_stops} stops)</Text>
        <View style={styles.alignRow}>
          <Text style={{ borderRightWidth: 0, marginRight: 0, paddingRight: 0 }}>{item.transit_details.departure_time.text}  {"\n"}{item.transit_details.arrival_time.text}  </Text>
          <Text style={{ borderRightWidth: 1, marginRight: 5, paddingRight: 5 }}>-  {item.transit_details.departure_stop.name}{"\n"}-  {item.transit_details.arrival_stop.name}</Text>
          <Text>{item.duration.text}{"\n"}{item.distance.text}</Text>
        </View>
      </View>
      <Image
        style={styles.vehicleImage}
        source={{
          uri: item.transit_details.line.vehicle.icon.toString().replace("//", "http://"),
        }}
      />
      <Text style={styles.busNumber}>{item.transit_details.line.short_name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alignRow: {
    flexDirection: "row",
  },
  alignColumn: {
    flexDirection: "column",
  },
  box: {
    margin: 5,
    padding: 4,
    borderRadius: 5,
    borderColor: '#95A5A6',
    borderWidth: 1,
    flexDirection: "row",
  },
  steps: {
    padding: 5,
    borderRadius: 5,
    borderColor: '#fff',
    flexDirection: "column",
    marginRight: 25,

  },
  transit: {
    padding: 1,
    backgroundColor: '#3333FF',
    borderRadius: 5,
    width: 5,
  },
  vehicleImage: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 0,
    tintColor: '#2F4F4F',
  },
  busNumber: {
    position: 'absolute',
    top: 25,
    right: 4,
  },
});

export default Transit;
