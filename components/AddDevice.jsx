import { Alert, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dimensions } from 'react-native'
import SelectColor from "./SelectColor";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'uuid-random';

const halfWindowsWidth = Dimensions.get('window').width / 2.222
const AddDevice = (props) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [color, setColor] = useState('')
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [command, setCommand] = useState('')
  const openForm = () => {
    setModalVisible(true)
  }

  const addNewDevice = () => {
    if (name === '' || place === '' || command === '' || color === '')
      return
    let data = {
        id: uuid(),
        name: name,
        place: place,
        command: command,
        color: color,
    }
    if (props.idToEdit === '')
      storeData(data).then(r => console.log("storage done"))
    else
      storeEditedData(data).then(r => console.log("storage done with edit"))

  }
  const storeEditedData = async (value) => {
    try {
      // await  AsyncStorage.clear() // for tests
      let db = getData()

      db.then(async (res) => {
        for (let i = 0; i < res.length; i++) {
            if (res[i].id === props.idToEdit){
                res[i].name = value.name
                res[i].place = value.place
                res[i].command = value.command
                res[i].color = value.color
              await AsyncStorage.setItem('key', JSON.stringify(res));
            }
        }
      })
    } catch (e) {
      console.log(e)
    }
    setModalVisible(false)
  };

  useEffect(() => {
      if (props.idToEdit !== '')
        editDevice(props.idToEdit)
  }, [props.idToEdit]);
  const editDevice = (id) => {
      setModalVisible(true)
  }

  const storeData = async (value) => {
    try {
      // await  AsyncStorage.clear() // for tests
      let db = getData()

      db.then(async (res) => {
        if (res != null) {
          res.push(value)
          console.log(res)
          await AsyncStorage.setItem('key', JSON.stringify(res));
        } else {
          console.log("te")
          await AsyncStorage.setItem('key', JSON.stringify([value]));
        }
      })

      console.log("przeszło")
    } catch (e) {
      console.log(e)
    }
    setModalVisible(false)
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e)
    }
  };

  const cancelModal = () => {
    setModalVisible(!modalVisible)
    props.setIdToEdit('')
  }

  return(
    <TouchableOpacity
      style={{
        width: halfWindowsWidth,
        height: halfWindowsWidth,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 1
    }}
      // onPress={props.}
      onPress={openForm}
    >
      <Text style={{fontSize: 50, color: 'black'}}>+</Text>
      <Modal
        presentationStyle={"fullScreen"}
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>
              New device
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Name"}
              onChangeText={setName}
            />
            <TextInput
              style={styles.textInput}
              placeholder={"Place"}
              onChangeText={setPlace}
            />
            <TextInput
              style={styles.textInput}
              placeholder={"Command"}
              onChangeText={setCommand}

            />
            <Text>Wybierz kolor:</Text>
            <SelectColor
              setColor={setColor}
            />
            <View style={styles.btnWrapper}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={cancelModal}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => addNewDevice()}>
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>

        </View>

      </Modal>
    </TouchableOpacity>
  )
}
const styles = {
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    height: '100%'
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    width: '100%',
    margin: 5,
    paddingLeft: 10
  },
  btnWrapper: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20
  }
};
export default AddDevice
