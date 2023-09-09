import React from 'react';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { Text, View, StyleSheet, Button } from 'react-native';
//impliment Expo location to get location of current device
import Location, {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import Constants from 'expo-constants';
import { getCenter, getDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';

//Project of info 4235
//using React native maps and expo location to catch map and location to display
//reference: https://www.npmjs.com/package/react-native-maps
//reference: https://docs.expo.dev/versions/latest/sdk/location/
// map part function should be
// first step: show current location of user's device
// second step: click button to show the GYM places within distance of radus 1km
// Third step: show the route for shortest one
// fourth step: touch pin to show the detail of certain GYM

export default function App() {
  //define current device location by default as a location of KPU surrey campus
  const [myLocation, setLocation] = React.useState({
    latitude: 49.1325,
    longitude: -122.8709,
    latitudeDelta: 0.01522,
    longitudeDelta: 0.0068,
  });
  //for catch nearby gym location
  const [myData, setMyData] = React.useState([]);
  const [nearestGym, setnearestGym] = React.useState([]);
  const [gymList, setGymList] = React.useState([]);
  const [draggedPoint, setDraggedPoint] = React.useState([]);

  const userLocation = async () => {
    try {
      let { status } = await requestForegroundPermissionsAsync();
      //if deny access current device, and then location is set as KPU Campus
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      //if granted access on current device, catch current location
      let currentDeviceLocation = await getCurrentPositionAsync({});
      //set location as current device location
      setLocation({
        latitude: currentDeviceLocation.coords.latitude,
        longitude: currentDeviceLocation.coords.longitude,
        latitudeDelta: 0.000922,
        longitudeDelta: 0.00922,
      });
    } catch (e) {
      console.log(e);
    }
  };
  //load location by user any effect
  React.useEffect(() => {
    console.log('implement location of device');
   userLocation();
  });

  //on click to catch date from google map api
  handleClick = async () => {
    // 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.1325,-122.8709&radius=1000&type=gym&key=AIzaSyDBNoGyZZikIKX0eMDuMatyrZeVBF0zpNg';
    console.log('current device location:');
    console.log(myLocation);
    const gymURL =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
      myLocation.latitude +
      ',' +
      myLocation.longitude +
      '&radius=1000&type=gym&key=AIzaSyDBNoGyZZikIKX0eMDuMatyrZeVBF0zpNg';

    console.log(gymURL);
    // promise at least get one data
    try {
      let response = await fetch(gymURL);
      let curr = await response.json();

      let results = curr.results;
      let tempPlace = [];
      for (let val of results) {
        let coord = val.geometry.location;
        let distance = getDistance(myLocation, coord);
        let name = val.name;
        let title = name;
        let icon = val.icon;
        console.log(val);
        tempPlace.push({
          name: title + ' (Dist:' + distance + 'm)',
          latitude: val.geometry.location.lat,
          longitude: val.geometry.location.lng,
          address: val.vicinity,
          dist: distance,
          image: icon,
        });
      }
      tempPlace.sort((a, b) => (a.dist > b.dist ? 1 : -1));
      console.log('catch data from API');
      setGymList(tempPlace);
      console.log(gymList);
    } catch (e) {
      consolo.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //set show region of map as mylocation area
        region={myLocation}
        showsUserLocation={true}>
        <Marker
          // show red pin mark of current device location
          coordinate={myLocation}
          title="Current Location"
          draggable={true}></Marker>
        {gymList &&
          gymList.map((item, key) => {
            console.log(key);
            console.log(item);
            if (key == 0) {
              let destination = item;
            }
            return (
              <Marker
                coordinate={item}
                title={item.name}
                description={item.address}
                key={item.dist}></Marker>
            );
          })}
        {gymList && (
          <MapViewDirections
            origin={myLocation}
            destination={gymList[0]}
            apikey="AIzaSyDBNoGyZZikIKX0eMDuMatyrZeVBF0zpNg"
            strokeWidth={6}
            strokeColor="green"
            mode={'WALKING'}
          />
        )}

        <Circle center={myLocation} radius={500}></Circle>
      </MapView>
      <View style={styles.searchContainer}>
        <Button
          title="GYM Search"
          style={styles.searchButton}
          onPress={this.handleClick}></Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  searchButton: {
    width: '60%',
  },
});
