
import { MapMarker } from 'assets/icons';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppDispatch } from 'hooks/use-store';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { GeoPosition } from 'react-native-geolocation-service';
import MapView, { LatLng, MapPressEvent, MapViewProps, Marker } from 'react-native-maps';

import { LocationData } from 'types/entities-types';
import { UTILS } from 'utils';


interface CustomMapProps extends MapViewProps {
  isCurrentLocation: boolean,
  enabledMarkLocation: boolean,
  children?: ReactNode;
  latLng?: LatLng;
  updateCurrentLocation: boolean;
  onPress: (e: LocationData) => void;
  getCurrentLocation: (e: LocationData) => void;
}

const CustomMap: React.FC<CustomMapProps> = ({ children,
  isCurrentLocation = false,
  enabledMarkLocation = false,
  updateCurrentLocation = false,
  latLng,
  initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  style = styles.map,
  onPress = (address) => { },
  getCurrentLocation = (address) => { },
  ...mapProps }) => {

  const mapRef = React.useRef<MapView>(null);
  const dispatch = useAppDispatch();
  const [currentLocation, setCurrentLocation] = React.useState<LatLng | undefined>(undefined);
  const handleRegionChange = (region: LatLng) => {
    mapRef?.current?.animateToRegion({
      ...region, latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);
  };

  const handleCurrentLocationPress = () => {
    UTILS.get_current_location((position: GeoPosition) => {
      setCurrentLocation({ ...position.coords });
      handleRegionChange(position.coords);

      UTILS._returnAddress(position.coords?.latitude, position.coords?.longitude).then((res) => {
        if (updateCurrentLocation) {
          dispatch(setLocation(res))
        }
      });
    }, (error) => {
      console.log('error=>>', error);

    });
  };
  React.useEffect(() => {
    if (isCurrentLocation) {
      setTimeout(() => {
        handleCurrentLocationPress();
      }, 1000);
    } else if (latLng) {
      setTimeout(() => {
        handleRegionChange(latLng);
        setCurrentLocation(latLng);
      }, 1000);
    }
  }, [latLng])
  const onPressMap = (e: MapPressEvent) => {

    e.persist();
    if (!enabledMarkLocation) return;
    setCurrentLocation(e.nativeEvent?.coordinate);
    UTILS._returnAddress(e.nativeEvent?.coordinate?.latitude, e.nativeEvent?.coordinate?.longitude).then((res) => {
      onPress(res);
    });
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        {...mapProps}
        onPress={onPressMap}
        style={style} initialRegion={initialRegion}  >
        {children}
        {currentLocation && <Marker coordinate={currentLocation} >
          <MapMarker />
        </Marker>}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: mvs(250),
    right: 16,
    backgroundColor: colors.white,
    height: mvs(50),
    width: mvs(50),
    borderRadius: mvs(25),
    padding: mvs(8),
    ...colors.shadow

  },
});

export default CustomMap;
