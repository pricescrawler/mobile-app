import {createStackNavigator} from "@react-navigation/stack";
import BottomNavigation from "../BottomNavigation";
import ProductDetails from "../../Screens/ProductDetails";
import {useTranslation} from "react-i18next";

export default function StackNavigation(){
    const Stack = createStackNavigator();
    const {t} = useTranslation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="tabs"
                component={BottomNavigation}
                options={{
                    headerTitle: t('title.base'),
                    headerShadowVisible: false,
                    headerMode:'float',
                }}
            />
            <Stack.Screen
                name="productDetails"
                component={ProductDetails}
                options={{
                    headerBackTitle: 'Voltar',
                }}
                screenOptions={{
                    headerTruncatedBackTitle: 'Voltar',
                    headerBackTitleVisible: false,
                }}

            />
        </Stack.Navigator>
    )
}