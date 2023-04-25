import {Collapse, CollapseBody, CollapseHeader} from 'accordion-collapse-react-native';
import {Box, Heading, Stack} from "native-base";
import {Dimensions, FlatList} from "react-native";
import {memo} from "react";
import ListItems from "../ListItems";

function ListCatalogs({row={},navigation, catalog, locale, idx}) {
    if (row.catalog===undefined){
        return (
            <></>
        )
    }
    return (
        <Collapse isExpanded={idx===0}>
            <CollapseHeader>
                <Box w={Dimensions.get('window').width*0.90}>
                    <Box w="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
                                    {row.data.catalogName}
                                </Heading>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </CollapseHeader>
            <CollapseBody>
                <FlatList
                    horizontal={true}
                    data={row.products}
                    initialNumToRender={4}
                    maxToRenderPerBatch={4}
                    snapToStart
                    contentContainerStyle={{paddingTop:10}}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=><ListItems row={item} navigation={navigation} locale={locale} catalog={catalog}/> }
                    showsHorizontalScrollIndicator={false}
                    collapsable={true}

                />
            </CollapseBody>
        </Collapse>
    )
}

export default memo(ListCatalogs)