// import React from "react";
// import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
// import Style_Header from "./style";

// const Header = ({ onPress, iconLeft, title, iconRight, style_iconBack }) => {
//     return (
//         <SafeAreaView style={Style_Header.container}>
//             <TouchableOpacity onPress={onPress}>
//                 <Image style={[Style_Header.icon, style_iconBack]} source={iconLeft} />
//             </TouchableOpacity>
//             <Text style={Style_Header.title}>{title}</Text>
//             {/* <TouchableOpacity onPress={onPress}>
//                 <Image style={Style_Header.icon} source={iconRight} />
//             </TouchableOpacity> */}
//         </SafeAreaView>
//     )
// };

// export default Header;
// import React from 'react';
// import { TouchableOpacity, Text, View, Image } from 'react-native';
// import styles from './styles';

// const Header = ({ text, iconLeft, iconRight, onPressLeft, onPressRight }) => {
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={onPressLeft}>
//                 <Image style={styles.iconLeft} source={iconLeft} />
//             </TouchableOpacity>
//             <Text style={styles.text}>{text}</Text>
//             <TouchableOpacity onPress={onPressRight}>
//                 <Image style={styles.iconRight} source={iconRight} />
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default React.memo(Header);

import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';

const Header = ({
  text,
  iconLeft,
  iconRight,
  onPressLeft,
  onPressRight,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPressLeft}>
        <Image style={styles.iconLeft} source={iconLeft} />
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
      {iconRight ? (
        <TouchableOpacity onPress={onPressRight}>
          <Image style={styles.iconRight} source={iconRight} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconRight} />
      )}
    </View>
  );
};

export default React.memo(Header);

import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    color: '#005AA9',
  },
  iconLeft: {
    width: 20,
  },
  iconRight: {
    width: 20,
    height: 20,
  },
});