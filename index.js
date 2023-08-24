import 'react-native-gesture-handler';

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {NotificationProvider} from './src/component/NotificationContext/context';
import NormalErrorQueue from './src/component/NoralError/NormalErrorQueue';
import CustomNetworkError from './src/component/NetworkError/NetworkError';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <NotificationProvider>
      <App />
      <CustomNetworkError />
      <NormalErrorQueue />
    </NotificationProvider>
  </Provider>
));
