/**
 * @format
 */
// import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import axios from 'axios'
import { name as appName } from './app.json';

axios.defaults.baseURL = 'https://bb2211c359ac.ngrok.io/sports-management-system-v2/us-central1/app'

AppRegistry.registerComponent(appName, () => App);
