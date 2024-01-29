import { TouchableOpacity, View } from "react-native";
import ColorBtn from "./ColorBtn";

const SelectColor = (props) => {

  return(
    <View style={{flexDirection: 'row'}}>
      <ColorBtn
        color={"#e8776b"}
        setColor={props.setColor}
      />
      <ColorBtn
        color={"#71d98c"}
        setColor={props.setColor}
      />
      <ColorBtn
        color={"#e8be6b"}
        setColor={props.setColor}
      />
      <ColorBtn
        color={"#6be8ba"}
        setColor={props.setColor}
      />
      <ColorBtn
        color={"#6b86e8"}
        setColor={props.setColor}
      /><ColorBtn
        color={"#c56be8"}
        setColor={props.setColor}
      />
    </View>
  )
}
export default SelectColor
