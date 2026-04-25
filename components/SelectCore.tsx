import { Text, View } from '@gluestack-ui/themed'
import { ChevronDown, Search } from 'lucide-react-native'
import * as React from 'react'
import SelectDropdown from 'react-native-select-dropdown'

const CREATE_SENTINEL = '__CREATE__'

type SelectOptions = {
  label: string
  value: any
}

type Props = {
  placeholder: string
  options: SelectOptions[]
  value?: SelectOptions | null
  onChange?: (value: SelectOptions) => void
  onFocus?: () => void
  creatable?: boolean
  onCreateOption?: (inputValue: string) => void
  formatCreateLabel?: (inputValue: string) => string
}

const SelectCore: React.FC<Props> = ({
  placeholder,
  options,
  value,
  onChange,
  creatable = false,
  onCreateOption,
  formatCreateLabel = v => `Create "${v}"`,
}) => {
  const [searchText, setSearchText] = React.useState('')
  const dropdownRef = React.useRef<SelectDropdown>(null)

  const data = React.useMemo(() => {
    const base = options.map(o => ({ label: o.label, value: o.value }))

    if (!creatable) return base

    const filtered = searchText.trim()
      ? base.filter(o =>
          o.label.toLowerCase().includes(searchText.toLowerCase())
        )
      : base

    const exactMatch = base.some(
      o => o.label.toLowerCase() === searchText.trim().toLowerCase()
    )

    if (searchText.trim() && !exactMatch) {
      return [
        ...filtered,
        { label: formatCreateLabel(searchText.trim()), value: CREATE_SENTINEL },
      ]
    }

    return filtered
  }, [options, creatable, searchText, formatCreateLabel])

  React.useEffect(() => {
    if (!value) return
    const index = data.findIndex(d => d.value === value.value)
    if (index >= 0) dropdownRef.current?.selectIndex(index)
  }, [value?.value]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = React.useCallback(
    (item: SelectOptions) => {
      if (item.value === CREATE_SENTINEL) {
        onCreateOption?.(searchText.trim())
      } else {
        onChange?.(item)
      }
    },
    [onChange, onCreateOption, searchText]
  )

  return (
    <SelectDropdown
      ref={dropdownRef}
      data={data}
      defaultValue={value}
      search
      searchPlaceHolder={`Search ${placeholder}`}
      showsVerticalScrollIndicator
      disableAutoScroll
      onChangeSearchInputText={creatable ? setSearchText : undefined}
      onBlur={() => setSearchText('')}
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

      onSelect={handleSelect}
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
      renderItem={(item, _index, isSelected) => {
        const isCreate = item.value === CREATE_SENTINEL
        return (
          <View
            className={`px-4 py-3 ${!isCreate && isSelected ? 'bg-blue-50' : 'bg-white'}`}
          >
            <Text
              fontSize="$sm"
              fontWeight={isCreate || isSelected ? '$medium' : '$regular'}
              color={isCreate ? '$blue500' : isSelected ? '$blue600' : '$gray900'}
            >
              {item.label}
            </Text>
          </View>
        )
      }}
    />
  )
}

export default SelectCore
