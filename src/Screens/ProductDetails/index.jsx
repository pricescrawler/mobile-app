import {
    AspectRatio,
    Box,
    Button,
    Center,
    Divider,
    Heading,
    HStack,
    Image,
    ScrollView,
    Stack,
    Text,
    Tooltip,
    View,
    VStack
} from "native-base";
import {Dimensions, Linking} from "react-native";
import {useEffect, useState} from "react";
import api from "../../services/api";
import {LineChart} from "react-native-chart-kit";
import moment from "moment";
import * as utils from "../../services/utils";
import {getFormattedPrice, orderListPrices} from "../../services/utils";
import {useTranslation} from "react-i18next";
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";

export default function ProductDetails({route,navigation}) {
    const product = route.params.product;
    const locale = route.params.locale;
    const catalog = route.params.catalog;
    const [history, setHistory] = useState({prices:[]});
    const [priceList, setPriceList] = useState([])
    const [chartData, setChartData] = useState({lables:[], datasets:[{
            data: [1],
        }]})
    const WIDTH = Dimensions.get('window').width;
    const {t} = useTranslation();

    useEffect(()=>{
        api.get(`/products/history/${locale}/${catalog}/${product.reference}`).then(res=> {
            setHistory(res.data)
            let prices = [];
            prices = orderListPrices(res.data.prices)
            setPriceList(prices)
            navigation.setOptions({ title: product.name })
            let labels = [];
            let datasets = [];
            prices.slice(0,5).forEach((price)=>{
                labels.push(moment(price.date).format('MM/YYYY'))
                datasets.push(parseFloat(getFormattedPrice(price)))
            })
            setChartData({labels, datasets:[
                    {
                        data: datasets,
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    }
                ]})

        })
    },[])
    const renderPrice = () => {
        if(product.campaignPrice==null){
            return (
                <Text fontWeight="400">
                    {t('data.product-fields.price-per-quantity')}: <Text bold>{product.regularPrice}</Text>
                </Text>
            )
        }else{
            return (
                <Text fontWeight="400">
                    {t('data.product-fields.price-per-quantity')}:<Text strikeThrough>{product.regularPrice}</Text> <Text bold>{product.campaignPrice}</Text>
                </Text>
            )
        }
    }

    const renderDetailsPrices = () => {
        let avg, max, min, last;
        if (priceList.length > 0){
            avg = parseFloat(utils.getFormattedPrice(priceList[0]));
            max = parseFloat(utils.getFormattedPrice(priceList[0]));
            min = parseFloat(utils.getFormattedPrice(priceList[0]));
            last = parseFloat(utils.getFormattedPrice(priceList[0]));

            priceList.map((price) => {
                const priceFloat = parseFloat(utils.getFormattedPrice(price));
                if (priceFloat > max){
                    max = priceFloat;
                }
                if (priceFloat < min){
                    min = priceFloat;
                }
                avg += priceFloat;

            })

            avg = avg / priceList.length;
            avg = avg.toFixed(2);
            last = parseFloat(utils.getFormattedPrice(priceList[0]));
        }
        return (
            <>
                <HStack justifyContent="space-between">
                    <Text>{t('data.product-titles.price-max')} {max}€ </Text>
                    <Text>{t('data.product-titles.price-min')} {min}€ </Text>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text>{t('data.product-titles.price-avg')} {avg}€ </Text>
                    <Text>{t('data.product-titles.price-last')} {last}€ </Text>
                </HStack>
            </>
        )
    }

    const renderIndicator = () => {
        const currentPrice = product.campaignPrice??product.regularPrice;

        if (priceList.length === 0){
            return (
                <Center bg={"primary.500"}  _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs"
                }} position="absolute" bottom="0" px="3" py="1.5">
                    {currentPrice}
                </Center>
            )
        }
        let total = 0;
        priceList.slice(0,10).map((price) => {
            total += parseFloat(utils.getFormattedPrice(price));
        })
        const averagePrice = parseFloat((total / priceList.slice(0,10).length).toFixed(2));

        const productPrice = parseFloat(utils.convertToFloat(currentPrice));

        if (productPrice === averagePrice){
            return (
                <Center bg={"orange.50"}  _text={{
                    color: "black",
                    fontWeight: "700",
                    fontSize: "xs"
                }} position="absolute" bottom="0" px="3" py="1.5">
                    {currentPrice}
                </Center>
            )
        }

        if (productPrice > averagePrice) {
            return (
                <Center bg={"red.500"}  _text={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "xs"
                }} position="absolute" bottom="0" px="3" py="1.5">
                    {currentPrice}
                </Center>
            )
        }

        if (productPrice < averagePrice) {
            return (
                <Center bg={"#177F00"}  _text={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "xs"
                }} position="absolute" bottom="0" px="3" py="1.5">
                    {currentPrice}
                </Center>
            )
        }

    }

    const renderClassicIndicator = () => {
        const currentPrice = product.campaignPrice??product.regularPrice;

        if (priceList.length === 0){
            return (
                <Text>{currentPrice}</Text>
            )
        }
        let total = 0;
        priceList.slice(0,10).map((price) => {
            total += parseFloat(utils.getFormattedPrice(price));
        })
        const averagePrice = parseFloat((total / priceList.slice(0,10).length).toFixed(2));

        const productPrice = parseFloat(utils.convertToFloat(currentPrice));


        if (productPrice === averagePrice){
            return(
                <Tooltip label={'top'} placement={t('data.product-titles.price-indicator-info')}>
                    <View backgroundColor={"orange.50"} color={"white"} width={'100%'} borderRadius={10} padding={0.5}>
                        <Text color="white" width={'100%'}>{currentPrice}</Text>
                    </View>
                </Tooltip>
            )
        }

        if (productPrice > averagePrice) {
            return (
                <Tooltip label={'top'} placement={t('data.product-titles.price-indicator-info')}>
                    <View backgroundColor={"red.500"} width={'100%'} borderRadius={10} padding={0.5} >
                        <Text color="white" width={'100%'}>{currentPrice}</Text>
                    </View>
                </Tooltip>
            )
        }

        if (productPrice < averagePrice) {
            return (
                <Tooltip label={'top'} placement={t('data.product-titles.price-indicator-info')}>
                    <View backgroundColor={"#177F00"} width={'100%'} borderRadius={10} padding={0.5} >
                        <Text color={"white"} width={'100%'}>{currentPrice}</Text>
                    </View>
                </Tooltip>
            )
        }
    }
    return (
        <ScrollView>
            <Box alignItems="center">
                <Box maxW="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                            <Image source={{
                                uri: product.imageUrl
                            }} alt="image" />
                        </AspectRatio>
                        {renderIndicator()}
                    </Box>
                    <Stack p="4" space={3}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1">
                                {product.name}
                            </Heading>
                        </Stack>
                        <Divider />
                        <Text fontWeight="400">
                            {renderPrice()}
                        </Text>
                        <Text fontWeight="400">
                            {t('data.product-fields.brand')}: <Text bold>{product.brand}</Text>
                        </Text>
                        <Text fontWeight="400" w={'100%'}>
                            {t('data.product-titles.price-indicator')}: {renderClassicIndicator()}
                        </Text>
                        <Divider />
                        {renderDetailsPrices()}
                        <HStack alignItems="center" space={4} justifyContent="space-between">
                            <HStack alignItems="center">
                                <Button onPress={()=>Linking.openURL(product.productUrl)}>{t('data.product-fields.store-page')}</Button>
                            </HStack>
                        </HStack>

                    </Stack>
                </Box>
            </Box>
            <Box alignItems="center">
                <Box marginTop={5} w="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
                            <Heading size="md" ml="-1">
                                {t('general.price-evolution')}
                            </Heading>
                        </Stack>
                        <Divider />
                        <LineChart data={chartData} width={WIDTH*0.82} height={WIDTH*0.80} chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#5893D4",
                            backgroundGradientTo: "#00d4ff",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "1",
                                stroke: "#ffa726"
                            }
                        }} />
                    </Stack>
                </Box>
            </Box>
            <View marginBottom={10}>
                <Collapse>
                    <CollapseHeader>
                        <Box alignItems="center">
                            <Box marginTop={5} w="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
                                        <Heading size="md" ml="-1">
                                            {t('data.product-fields.history-page')}
                                        </Heading>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>
                    </CollapseHeader>
                    <CollapseBody>
                        <Box alignItems="center">
                            <Box marginTop={5} w="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                                borderColor: "coolGray.600",
                                backgroundColor: "gray.700"
                            }} _web={{
                                shadow: 2,
                                borderWidth: 0
                            }} _light={{
                                backgroundColor: "gray.50"
                            }}>
                                <Stack p="4" space={3}>
                                    <VStack space={3} divider={<Divider />} w="90%">
                                        <HStack justifyContent="space-between">
                                            <Text>{t('general.date')}</Text>
                                            <Text>{t('data.product-titles.price-details')}</Text>
                                        </HStack>
                                        {priceList.map((item,index)=>{
                                            return(
                                                <HStack key={index+1} justifyContent="space-between">
                                                    <Text>{item.date}</Text>
                                                    <Text>{utils.getFormattedPrice(item)}€</Text>
                                                </HStack>
                                            )
                                        })}
                                    </VStack>
                                </Stack>
                            </Box>
                        </Box>
                    </CollapseBody>
                </Collapse>
            </View>
        </ScrollView>
    )
}