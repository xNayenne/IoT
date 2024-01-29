import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Connection extends Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = {
      devices: [],
    };
  }

  componentDidMount() {
    this.checkBluetoothState();
  }

  checkBluetoothState() {
    const subscription = this.manager.onStateChange(
      (state) => {
        if (state === 'PoweredOn') {
          this.scanAndConnect();
          subscription.remove();
        }
      },
      true
    );
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log('Error:', error);
        return;
      }

      // Check if the device is not already in the list
      if (!this.state.devices.some((dev) => dev.id === device.id)) {
        this.setState((prevState) => ({
          devices: [...prevState.devices, device],
        }));
      }

      console.log('Device:', device);
    });
  }

  connectToDevice(device) {
    // Find MLT-BT05 device
    if (device.name === 'Galaxy S23') {
      // Stop scanning
      this.manager.stopDeviceScan();

      // Connect to the device
      device
        .connect()
        .then((connectedDevice) => {
          // Discover services and characteristics
          return connectedDevice.discoverAllServicesAndCharacteristics();
        })
        .then((characteristic) => {
          // Save device information to AsyncStorage
          const deviceInfo = {
            id: device.id,
            serviceUUID: 'FFE0',
            characteristicUUID: 'FFE1',
          };

          AsyncStorage.setItem('device', JSON.stringify(deviceInfo)).then(() => {
            // Navigate to the Devices tab
            this.props.navigation.navigate('Devices');
          });
        })
        .catch((error) => {
          // Handle errors
          console.log('Error:', error);
        });
    }
  }

  changeDevice(command) {
    AsyncStorage.getItem('device').then((device) => {
      device = JSON.parse(device);
      if (device) {
        this.manager
          .writeCharacteristicWithResponseForDevice(
            device.id,
            device.serviceUUID,
            device.characteristicUUID,
            btoa(command)
          )
          .then((response) => {
            // Get response from device
            console.log('Response:', response);
          })
          .catch((error) => {
            // Handle errors
            console.log('Error:', error);
          });
      }
    });
  }

  render() {
    return (
      <View>
        <Text>Available Devices:</Text>
        <FlatList
          data={this.state.devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>Name: {item.name}</Text>
              <Text>Address: {item.id}</Text>
              <Button
                title="Connect"
                onPress={() => this.connectToDevice(item)}
              />
              <Button
                title="Send Command"
                onPress={() => this.changeDevice('red')} // Change command as needed
              />
            </View>
          )}
        />
      </View>
    );
  }
}

export default Connection;
