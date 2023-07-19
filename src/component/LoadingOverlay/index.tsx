import {ActivityIndicator, Platform} from 'react-native';
import {Overlay} from '@rneui/themed';
import style from './style';

type LoadingOverlayProps = {
  visible: boolean;
};

export default function LoadingOverlay({visible = true}: LoadingOverlayProps) {
  return (
    <Overlay isVisible={visible} overlayStyle={style.overlayStyle}>
      <ActivityIndicator
        size={Platform.OS === 'android' ? 100 : 'large'}
        color={'rgba(0,90,169,1)'}
      />
    </Overlay>
  );
}
