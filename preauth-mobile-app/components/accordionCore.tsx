import { AccordionItemData } from '@/app/views/queryForm';
import {
    ChevronUpIcon,
    ChevronDownIcon,
    View,
} from '@gluestack-ui/themed';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionTitleText,
    AccordionContent,
    AccordionIcon,
} from '@/components/ui/accordion';
import React from 'react';

type AccordionType = 'single' | 'multiple';

type Props = {
    type: AccordionType;
    data: AccordionItemData[];
};

const AccordionCore: React.FC<Props> = ({
    type,
    data,
}) => {
    return (
        <Accordion type={type} variant='filled' className='shadow-none'>
            {data.map((item, index) => (
                <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className='bg-zinc-100 rounded-xs border border-zinc-200'
                >
                    <AccordionHeader className='bg-zinc-100 rounded-xs'>
                        <AccordionTrigger className=''>
                            {({ isExpanded }) => (
                                <>
                                    <AccordionTitleText>
                                        {item.label}
                                    </AccordionTitleText>
                                    <AccordionIcon
                                        as={
                                            isExpanded
                                                ? ChevronUpIcon
                                                : ChevronDownIcon
                                        }
                                        className="ml-3"
                                    />
                                </>
                            )}
                        </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent>

                        {item.component}

                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default AccordionCore;
