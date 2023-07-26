import {LinearProgress} from '@rneui/themed';
import {Text, View} from 'react-native';
import style from './style';

export default function LoadmoreIndicator() {
  return (
    <View>
      <Text style={style.text}>Loadmore...</Text>
      <LinearProgress
        color="#005AA9"
        animation={{duration: 1000}}
        style={style.progress}
        variant="indeterminate"
      />
    </View>
  );
}
