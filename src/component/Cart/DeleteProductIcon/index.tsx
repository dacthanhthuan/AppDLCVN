import {memo} from 'react';
import {Image, TouchableOpacity, GestureResponderEvent} from 'react-native';

type SwipableCartViewProps = {
  onPress: (event: GestureResponderEvent) => void;
};

function DeleteProductIcon({onPress}: SwipableCartViewProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{alignItems: 'center', justifyContent: 'center', padding: 12}}>
      <Image
        style={{width: 22, height: 24}}
        resizeMode="contain"
        source={require('../../../assets/clearCart.png')}
      />
    </TouchableOpacity>
  );
}

export default memo(DeleteProductIcon);
