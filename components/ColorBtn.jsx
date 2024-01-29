import { TouchableOpacity, View, Text } from "react-native";
import React, { useState } from "react";

const ColorBtn = (props) => {
  const addColor = () => {
    props.setColor(props.color)
  }

  return(
    <TouchableOpacity
        style={{ padding:20,borderRadius: 20, margin: 5, backgroundColor: props.color}}
        onPress={() => addColor()}
    />
  )
}
export default ColorBtn
