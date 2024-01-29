import { View, Text, TouchableOpacity, Image } from "react-native";
import { Dimensions } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddDevice from "./AddDevice";

const halfWindowsWidth = Dimensions.get('window').width / 2.222
const DeviceCell = (props) => {

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e)
    }
  };

  const deleteDevice = () => {
    console.log("del")
    try {
      let db = getData()
      db.then(async (res) => {
        if (res != null) {
          for (let i = 0; i < res.length; i++) {
            console.log(res[i])

            if (res[i].id === props.id) {
              res.splice(i, 1)
              await AsyncStorage.setItem('key', JSON.stringify(res));
            }
          }
        }
      })
    }catch (e){

    }

  }

  const editDevice = () => {
    props.setIdToEdit(props.id)
  }

  const turnOnOffDevice = () => {
    console.log("włoncz")
  }

  return(
    <TouchableOpacity
      style={{
        width: halfWindowsWidth,
        height: halfWindowsWidth,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        backgroundColor: props.color
    }}
      onPress={turnOnOffDevice}
    >
      <View style={{position: 'absolute', top: 0, right: 0, flexDirection: 'row'}}>
        <TouchableOpacity onPress={editDevice}>
          <Image source={require('../assets/pencil.png')}  style={{width: 20, height: 20, margin: 10}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteDevice}>
          <Image source={require('../assets/delete.png')}  style={{width: 20, height: 20, margin: 10}}/>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 36, color: 'black',textTransform: 'capitalize', fontFamily: 'asap'}}>{props.name}</Text>
      <Text style={{fontSize: 16, color: 'black', textTransform: 'capitalize'}}>{props.place}</Text>
    </TouchableOpacity>
  )
}
export default DeviceCell
