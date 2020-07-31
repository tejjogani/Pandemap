import { Navigation } from "react-native-navigation";
import { YellowBox } from "react-native";
import Explore from './src/components/explore/Explore';
import SearchMenu from './src/components/search/SearchMenu';
import Settings from './src/components/settings/Settings';
import Saved from './src/components/saved/Saved';

YellowBox.ignoreWarnings(['Mapbox warning [event]'])

Navigation.registerComponent('HomeScreen', () => Explore);
Navigation.registerComponent('SearchMenu', () => SearchMenu);
Navigation.registerComponent('Saved', () => Saved);
Navigation.registerComponent('Settings', () => Settings);



Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: false,
            drawBehind: true,
          },
          bottomTab: {
              fontSize: 11,
              textColor: '#666',
              selectedIconColor: '#2962FF',
              selectedTextColor: '#2962FF',
              iconColor: '#666'
            }
      });


      Navigation.setRoot({
        root: {
          bottomTabs: {
            children: [
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'HomeScreen',
                        options: {
                            bottomTab: {
                                text: 'Explore',
                                icon: require('./src/assets/explore.png'),
                                iconInsets: { top: 5, bottom: 3}
                            }
                        }
                      }
                    },
                  ]
                }
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'Saved',
                        options: {
                            bottomTab: {
                                text: 'Saved',
                                icon: require('./src/assets/saved.png'),
                                iconInsets: { top: 7, bottom: 3}
                            }
                        }
                      }
                    }
                  ]
                }
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'Settings',
                        options: {
                            bottomTab: {
                                text: 'Settings',
                                icon: require('./src/assets/settings.png'),
                                iconInsets: { top: 5, bottom: 3}
                            }
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      });
});