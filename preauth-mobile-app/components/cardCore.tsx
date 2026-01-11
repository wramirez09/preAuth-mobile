import { Card, Heading, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';


type CardCoreProps = {
    title: string,
    subTitle: string
    pathName: string
}

const CardCore: React.FC<React.PropsWithChildren<CardCoreProps>> = ({ title, subTitle, pathName, children }) => {
    const navigator = useNavigation<NativeStackNavigationProp<any>>()
    return (
        <Pressable onPress={() => navigator.navigate(pathName)}>
            <Card size="md" variant="elevated" className="flex-row gap-4 p-6 border-gray-200 pb-10 w-full mb-6">
                <View className='bg-blue-600 rounded-xl justify-center items-center w-12 h-12 p-3'>
                    {children}
                </View>
                <View className="flex-1">
                    <Heading size="md" className="mb-1 text-gray-900">
                        {title}
                    </Heading>
                    <Text size="sm" wordWrap="">{subTitle}</Text>
                </View>

            </Card>
        </Pressable>
    );
}

export default CardCore