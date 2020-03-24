import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import POI_list from '../screens/POI_list';

const screens = {
    Home: {
        screen: Home
    },
    POI_list: {
        screen: POI_list
    }
}

const Homestack = createStackNavigator(screens);

export default createAppContainer(Homestack);