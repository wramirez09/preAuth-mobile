import SelectDropdown from 'react-native-select-dropdown';
import { ChevronDown } from 'lucide-react-native';
import { View } from 'react-native';
import { Text } from '@gluestack-ui/themed';

type SelectOptions = {
    label: string;
    value: any;
};

type Props = {
    placeholder: string;
    options: SelectOptions[];
    value?: SelectOptions | null;
    onChange?: (value: SelectOptions) => void;
};

const SelectCore: React.FC<Props> = ({
    placeholder,
    options,
    value,
    onChange,
}) => {
    const data = options.map((o) => ({
        label: o.label,
        value: o.value,
    }));

    return (
        <SelectDropdown
            data={data}
            search
            searchPlaceHolder={placeholder}
            dropdownStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                marginTop: 6,
                elevation: 4,
            }}
            onSelect={(item) => onChange?.(item)}
            renderButton={(selectedItem, isOpened) => {
                const isPlaceholder = !selectedItem?.label;

                return (
                    <View
                        className="
              flex-row
              items-center
              justify-between
              px-4
              py-3
              rounded-xl
              border
              border-gray-200
              bg-white
            "
                    >
                        <Text
                            fontSize="$sm"
                            fontWeight={isPlaceholder ? '$regular' : '$medium'}
                            color={isPlaceholder ? '$gray400' : '$gray900'}
                        >
                            {isPlaceholder ? placeholder : selectedItem.label}
                        </Text>

                        <ChevronDown
                            size={18}
                            color="#9CA3AF"
                            style={{
                                transform: [{ rotate: isOpened ? '180deg' : '0deg' }],
                            }}
                        />
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => (
                <View
                    className={`
            px-4
            py-3
            ${isSelected ? 'bg-gray-100' : 'bg-white'}
          `}
                >
                    <Text
                        fontSize="$sm"
                        fontWeight={isSelected ? '$medium' : '$regular'}
                        color="$gray900"
                    >
                        {item.label}
                    </Text>
                </View>
            )}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default SelectCore;
