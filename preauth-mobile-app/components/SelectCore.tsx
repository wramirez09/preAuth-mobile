import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectItem,
} from '@/components/ui/select';
import { ChevronDownIcon } from '@/components/ui/icon';

type SelectOptions = {
    label: string,
    value: any
}

const SelectCore: React.FC<{ placeholder: string, options: SelectOptions[] }> = ({ placeholder, options }) => {
    return (
        <Select>
            <SelectTrigger variant="outline" size="md" className='justify-between'>
                <SelectInput placeholder={placeholder} />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                    <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {options.map((option, i) => {
                        return <SelectItem label={option.label} value={option.value} key={`${i}-${option}`} />
                    })}
                </SelectContent>
            </SelectPortal>
        </Select>
    );
}


export default SelectCore