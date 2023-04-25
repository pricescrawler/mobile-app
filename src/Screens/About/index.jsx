import {Box, Divider, Heading, Stack, Text, View} from "native-base";
import {useTranslation} from "react-i18next";
import {memo} from "react";

function About(){
    const {t} = useTranslation();

    return (
        <View>
            <Box alignItems="center">
                <Box w="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
                                {t('menu.about')}
                            </Heading>
                        </Stack>
                        <Text fontWeight="400">
                            {t('pages.about.text1')}
                        </Text>
                        <Text fontWeight="400">
                            {t('pages.about.text2')}
                        </Text>
                        <Text fontWeight="400">
                            {t('pages.about.text3')}
                        </Text>
                    </Stack>
                    <Divider />
                    <Stack p="4" space={3}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1">
                                {t('menu.privacy-terms')}
                            </Heading>
                        </Stack>
                        <Text fontWeight="400">
                            {t('pages.privacy-terms.text1')}
                        </Text>
                        <Text fontWeight="400">
                            {t('pages.privacy-terms.text2')}
                        </Text>
                    </Stack>
                </Box>
            </Box>
        </View>
    )
}

export default memo(About)