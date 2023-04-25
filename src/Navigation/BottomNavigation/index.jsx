import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from "../../Screens/HomeScreen";
import {useTranslation} from "react-i18next";
import About from "../../Screens/About";
import {FontAwesome, Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
    const {t} = useTranslation();
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                options={{
                    headerTitle: t('title.base'),
                    headerShadowVisible: false,
                    headerMode:'none',
                    header: () => null,
                    headerBackTitle:'Pesquisa',
                    tabBarLabel: t('menu.home'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
                icon="home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="About"
                options={{
                    headerTitle: t('menu.about'),
                    tabBarLabel: t('menu.about'),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="legal" color={color} size={size} />
                    ),
                }}
                component={About}
            />
        </Tab.Navigator>
    );
}

export default BottomNavigation