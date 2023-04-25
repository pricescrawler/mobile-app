import {AspectRatio, Box, Button, Center, Heading, HStack, Image, Stack, Text} from "native-base";
import {Dimensions, Linking} from "react-native";
import {memo} from "react";
import {useTranslation} from "react-i18next";

function ListItems({row,navigation, locale, catalog}) {
    let width = Dimensions.get('window').width;
    const { t } = useTranslation();
    return (
        <Box alignItems={"center"} w={width*0.70}>
            <Box w="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                <Box>
                    <AspectRatio w="100%" ratio={4 / 3}>
                        <Image source={{
                            uri: row.imageUrl
                        }} alt="image" />
                    </AspectRatio>
                    <Center bg={row.campaignPrice==null?"primary.500":"green.500"}  _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                        {row.campaignPrice??row.regularPrice}
                    </Center>
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {row.name}
                        </Heading>
                    </Stack>
                    <Text fontWeight="400">
                        {t('data.product-fields.brand')}: <Text bold>{row.brand}</Text>
                    </Text>
                    <Text fontWeight="400">
                        {t('data.product-fields.price-per-quantity')}: <Text bold>{row.regularPrice}</Text>
                    </Text>
                    <Text fontWeight="400">
                        {t('data.product-fields.description')}: <Text bold>{row.description??'-'}</Text>
                    </Text>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                        <HStack alignItems="center" space={"xs"}>
                            <Button onPress={()=>Linking.openURL(row.productUrl)}>{t('data.product-fields.store-page')}</Button>
                            <Button onPress={()=>navigation.navigate('productDetails', {product:row, locale,catalog})}>{t('data.product-fields.details')}</Button>
                        </HStack>
                    </HStack>
                </Stack>
            </Box>
        </Box>
    )
}

export default memo(ListItems);