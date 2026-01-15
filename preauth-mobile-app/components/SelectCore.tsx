import SelectDropdown from 'react-native-select-dropdown';
import { ChevronDown, Search } from 'lucide-react-native';
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
    const data = options.map(o => ({
        label: o.label,
        value: o.value,
    }));

    return (
      <SelectDropdown
        data={data}
        search
        searchPlaceHolder={`Search ${placeholder}`}
        showsVerticalScrollIndicator
        /* =========================
               DROPDOWN CONTAINER
            ========================= */
        dropdownStyle={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          marginTop: 6,
          paddingVertical: 6,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 6,
        }}
        /* =========================
               SEARCH INPUT
            ========================= */
        searchInputStyle={{
          height: 40,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#E2E8F0',
          backgroundColor: '#F8FAFC',
          paddingHorizontal: 12,
          marginHorizontal: 12,
          marginBottom: 8,
          width: '93%',
        }}
        searchInputTxtStyle={{
          fontSize: 14,
          color: '#0F172A',
        }}
        renderSearchInputLeftIcon={() => <Search size={12} color="#9ca3af" />}
        /* =========================
               ROW STYLES (IMPORTANT)
            ========================= */

        onSelect={(item) => onChange?.(item)}
        /* =========================
               BUTTON (CLOSED STATE)
            ========================= */
        renderButton={(selectedItem, isOpened) => {
          const isPlaceholder = !selectedItem?.label

          return (
            <View className="flex-row items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-slate-50">
              <Text
                fontSize="$sm"
                className={`${isPlaceholder ? 'text-sm text-gray-500' : 'text-md text-gray-900'}`}
              >
                {isPlaceholder ? placeholder : selectedItem.label}
              </Text>

              <ChevronDown
                size={18}
                color="#64748B"
                style={{
                  transform: [{ rotate: isOpened ? '180deg' : '0deg' }],
                }}
              />
            </View>
          )
        }}
        /* =========================
               ROW RENDER (OPTIONAL)
            ========================= */
        renderItem={(item, index, isSelected) => (
          <View className={`px-4 py-3 ${isSelected ? 'bg-blue-50' : 'bg-white'}`}>
            <Text
              fontSize="$sm"
              fontWeight={isSelected ? '$medium' : '$regular'}
              color={isSelected ? '$blue600' : '$gray900'}
            >
              {item.label}
            </Text>
          </View>
        )}
      />
    )
};

export default SelectCore;
