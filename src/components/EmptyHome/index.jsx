import {AspectRatio, Image, View} from "native-base";
export default function EmptyHome(){
    return (
        <View alignItems={'center'} justifyContent={'center'} alignContent={'center'} >
            <Image source={require('./empty.png')}
                   h={300}
                     w={'90%'}
                   alt="empty" />
        </View>
    )
}