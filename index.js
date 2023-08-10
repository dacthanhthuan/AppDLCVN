import 'react-native-gesture-handler';

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ErrorProvider} from './src/component/ErrorContext/context';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <ErrorProvider>
      <App />
    </ErrorProvider>
  </Provider>
));
