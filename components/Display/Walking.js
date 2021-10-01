import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';

const Walking = (props) => {
  item = props.item
  const [showWalking, setShowWalking] = useState(false);
  return (
    <TouchableOpacity style={{ activeOpacity: 1 }} onPress={() => setShowWalking(!showWalking)}>
      <View style={styles.box}>
        <View style={styles.highlight}></View>
        <View style={styles.steps}>
          <Text style={{ fontWeight: "bold" }}>{item.html_instructions}</Text>
          <Text>{item.duration.text} - {item.distance.text}</Text>
          {showWalking ?
            <FlatList
              data={item.steps}
              keyExtractor={({ html_instructions }, index) => html_instructions}
              renderItem={({ item }) => (
                <View style={styles.substeps}>
                  {item.html_instructions ?
                    <Text>- {item.html_instructions.toString().replace(/<div[^>]*>/g, "\n- ").replace(/<[^>]*>/g, "")}</Text>
                    : null}
                </View>
              )}
            /> : null}
        </View>
        <Image
          style={styles.vehicleImage}
          source={{
            uri: "http://maps.gstatic.com/mapfiles/transit/iw2/6/walk.png",
          }}
        />
      </View>
    </TouchableOpacity>
  )
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
  highlight: {
    padding: 1,
    backgroundColor: '#FF4019',
    borderRadius: 5,
    width: 5,
  },
  substeps: {
    left: 20,
    flexDirection: "column",
  },
});

export default Walking;
