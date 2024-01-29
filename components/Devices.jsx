import { Alert, Modal, Pressable, RefreshControl, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import DeviceCell from "./DeviceCell";
import AddDevice from "./AddDevice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import addDevice from "./AddDevice";

// import AsyncStorage from '@react-native-async-storage/async-storage';

const Devices = () => {
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [idToEdit, setIdToEdit] = useState('')
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key');
      setData(JSON.parse(jsonValue))
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e)
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData().then("getting data")
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getData().then("getting data")
  }, []);




  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {data != null? (
          data.map((device, index) => {
            return (
              <DeviceCell
                id={device.id}
                name={device.name}
                place={device.place}
                command={device.config}
                color={device.color}
                key={index}
                setIdToEdit={setIdToEdit}
              />
            )
          })
        ) : null
        }
        <AddDevice idToEdit={idToEdit} setIdToEdit={setIdToEdit} />

      </View>
    </ScrollView>
    </SafeAreaView>


  );
}
const styles = {
  container: {
    flex: 1,
  }
};

export default Devices
