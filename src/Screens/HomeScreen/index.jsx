import {Box, Button, FormControl, Input, Stack, View,} from "native-base";
import {useEffect, useState} from "react";
import {FlatList, useColorScheme} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import api from "../../services/api";
import ListCatalogs from "../../components/ListCatalogs";
import {useTranslation} from "react-i18next";
import EmptyHome from "../../components/EmptyHome";


export default function HomeScreen({navigation}) {
    const { t } = useTranslation();
    const [markets, setMarkets] = useState([])
    const [openFilter, setOpenFilter] = useState(false)
    const [search, setSearch] = useState("")
    //DropDownPicker.setLanguage("PT");
    const scheme = useColorScheme();

    DropDownPicker.setMode("BADGE");
    DropDownPicker.setTheme(scheme === "dark" ? "DARK" : "LIGHT");

    useEffect(()=>{
        api.get('/locales').then((response)=>{
            let options = [];

            response.data[0].categories.forEach((locale)=>{
                if(locale.active) {
                    options.push({
                        label: locale.description,
                        value: locale.id,
                        disabled: true
                    })
                    let parent = locale.id;
                    locale.catalogs.forEach((catalog) => {
                        if (catalog.active)
                        options.push({
                            label: catalog.name,
                            value: catalog.id,
                            parent: parent
                        })
                    })
                }
            })

            setItems(options)
            //setItems(response.data)
        })
    },[])

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [data, setData] = useState([])

    const getItems = () => {
        api.post(`/products/search`, {
            query: search,
            catalogs:markets
        }).then((response) => {
            setData(response.data)
        })
    }

    return (
        <>
            <Box w={"100%"} alignItems="center" marginTop={"3"}>
                <Box maxW="90%" h={!open?"auto":"40%"} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    <Stack p="4" space={3}>
                        <Stack space={2}>
                            <FormControl>
                                <FormControl.Label>{t('general.search-for-some-product')}</FormControl.Label>
                                <Input variant={"filled"} placeholder={t('general.search-for-some-product')} value={search} onChangeText={setSearch} />
                            </FormControl>
                            <DropDownPicker
                                listMode="SCROLLVIEW"
                                scrollViewProps={{
                                    nestedScrollEnabled: true,
                                }}
                                open={open}
                                value={markets}
                                items={items}
                                setOpen={setOpen}
                                setValue={setMarkets}
                                multiple
                                nestedScrollEnabled={true}
                                min={0}
                                max={items.length}
                                placeholder={t('general.search-store')}
                                searchable={false}
                                style={{
                                    zIndex: 1000,
                                }}
                                translation={{
                                    PLACEHOLDER: t('general.search-store'),
                                }}
                                dropDownContainerStyle={{
                                    position: 'relative', // to fix scroll issue ... it is by default 'absolute'
                                    top: 0, //to fix gap between label box and container
                                }}
                                zIndexInverse={1000}
                                zIndex={1000}

                            />
                            <Button onPress={getItems}>{t('general.search')}</Button>
                        </Stack>
                    </Stack>
                </Box>
                    <View style={{ width: "90%", height:'72%',marginTop:5}} >
                        <FlatList
                            initialNumToRender={10}
                            data={data}
                            ListEmptyComponent={EmptyHome}
                            keyExtractor={item => item.catalog}
                            renderItem={({item,index})=>{
                                return (
                                    <ListCatalogs navigation={navigation} row={item} catalog={item.catalog} idx={index} locale={item.locale}/>
                                )
                            }}
                        />
                    </View>
            </Box>
            </>
    );
}