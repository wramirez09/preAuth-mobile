import { Card } from '@/components/ui/card'
import { Text, View } from '@gluestack-ui/themed'
import { LucideIcon } from 'lucide-react-native'
import React from 'react'

export const CardWrapper: React.FC<
  React.PropsWithChildren<{ Icon: LucideIcon; title: string }>
> = ({ Icon, title, children }) => {
  return (
    <Card className="shadow-sm rounded-2xl mb-6">
      <View className="flex-row items-center gap-5 mb-4">
        <View className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Icon size={16} color="#2563EB" />
        </View>
        <Text className="font-bold">{title}</Text>
      </View>
      {children}
    </Card>
  )
}

export const SubCard: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Card className="bg-gray-200 rounded-xl p-5">
      <Text className="text-xs">{children}</Text>
    </Card>
  )
}
