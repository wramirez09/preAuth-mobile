import { AccordionItemData } from '@/app/views/queryForm'
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Box,
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  VStack,
} from '@gluestack-ui/themed'
import React from 'react'

type AccordionType = 'single' | 'multiple'

type Props = {
  type: AccordionType
  data: AccordionItemData[]
}

const AccordionCore: React.FC<Props> = ({ type, data }) => {
  return (
    <VStack space="sm">
      {data.map((item, index) => (
        <Accordion
          key={`accordion-${index}`}
          type={type}
          className="rounded-xl mb-3"
        >
          <AccordionItem
            value={`item-${index}`}
            className="rounded-xl border border-zinc-200"
          >
            {/* HEADER */}
            <AccordionHeader>
              <AccordionTrigger className="px-4 py-4 shadow">
                {({ isExpanded }) => (
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    className="w-full pr-5"
                  >
                    {/* LEFT ICON + LABEL */}
                    <HStack space="sm" alignItems="center">
                      <Box>{item.icon}</Box>

                      <AccordionTitleText className="text-slate-900 font-semibold">
                        {item.label}
                      </AccordionTitleText>
                    </HStack>

                    {/* CHEVRON */}
                    <AccordionIcon
                      as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                      className="text-slate-400"
                    />
                  </HStack>
                )}
              </AccordionTrigger>
            </AccordionHeader>

            {/* CONTENT */}
            <AccordionContent className="px-4 pb-4 pt-2 bg-white">
              {item.component()}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </VStack>
  )
}

export default AccordionCore
