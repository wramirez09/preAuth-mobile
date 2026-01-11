import SelectDropdown from 'react-native-select-dropdown'
import { Icon, AddIcon } from '@/components/ui/icon';
import { View } from "react-native";
import {

    Text
} from '@gluestack-ui/themed';

type SelectOptions = {
    label: string,
    value: any
}

const SelectCore: React.FC<{ placeholder: string, options: SelectOptions[] }> = ({ placeholder, options }) => {
    const data = options.map((option) => {
        return {
            title: option.label,
            icon: ""
        }

    })
    return (
        <SelectDropdown

            data={data}
            search
            searchPlaceHolder={placeholder}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem.value, index);
            }}
            dropdownStyle={{ backgroundColor: "#FFF" }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View className='flex-row items-center justify-between border border-slate-300 p-3 rounded-md bg-slate-100'>

                        <Text>
                            {selectedItem ? selectedItem.title : placeholder}
                        </Text>
                        {isOpened ? <Icon as={AddIcon} size="md" /> : <Icon as={AddIcon} size="md" />}
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View className='p-3 my-2 divide-y divide-slate-300'>
                        <Text>{item.title}</Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
        />
    );
}


export default SelectCore