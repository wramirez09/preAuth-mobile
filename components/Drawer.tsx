import * as React from 'react'
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer'
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { Pressable } from '@/components/ui/pressable'
import { Divider } from '@/components/ui/divider'
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/icon'
import { Wallet, LogOut, Compass, FileText, MessageCircle } from 'lucide-react-native'

import { useDrawer } from '@/app/views/context/Drawer/context'
import { useAuth } from '@/app/views/auth/context'
import SafeContainer from './SafeContainer'
import { refNavigate } from '@/app/utils/navigationRef'
import { useGuide } from '@/app/views/context/Guide/context'
import { GuideStepId } from '@/app/views/context/Guide/guideProvider'

type Props = {
  isOpen: boolean
}

const DrawerCore: React.FC<Props> = ({ isOpen }) => {
  const { setIsDrawerOpen } = useDrawer()
  const { user, signOut } = useAuth()
  const { setCurrentStepIndex, currentStepIndex } = useGuide()
  const email = user?.email
  const name = user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? 'User'

  const handleLogout = async () => {
    await signOut()
    setIsDrawerOpen(false)
    refNavigate('Login')
  }

  const closeDrawer = (path: any) => {
    setIsDrawerOpen(false)
  }

  const closeThenNavigate = (path: string) => {
    if (currentStepIndex > 1) setCurrentStepIndex(1)
    setIsDrawerOpen(false)
    refNavigate(path as keyof typeof refNavigate)
  }

  return (
    <Drawer isOpen={isOpen} onClose={closeDrawer} anchor="right">
      <DrawerBackdrop />
      <DrawerContent className="w-[280px]">
        <SafeContainer className="h-full">
          <VStack className="flex-1 justify-between">
            {/* ───────── Header ───────── */}
            <VStack>
              <DrawerHeader className="pt-10 pb-6 items-center">
                <VStack className="items-center gap-3">
                  <Avatar size="lg">
                    <AvatarFallbackText>{name}</AvatarFallbackText>
                    <AvatarImage
                      source={{
                        uri:
                          user?.user_metadata?.avatar_url ??
                          'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                      }}
                    />
                  </Avatar>

                  <VStack className="items-center gap-0.5">
                    <Text size="lg" className="font-semibold">
                      {name}
                    </Text>
                    <Text size="sm" className="text-typography-600">
                      {email}
                    </Text>
                  </VStack>
                </VStack>
              </DrawerHeader>

              <Divider />

              {/* ───────── Actions ───────── */}
              <DrawerBody contentContainerClassName="px-4 py-4 gap-3">
                <DrawerItem
                  icon={Compass}
                  label="Guide Me"
                  onPress={() => {
                    closeThenNavigate('Guide')
                  }}
                />
                <DrawerItem
                  icon={FileText}
                  label="Full Form"
                  onPress={() => closeThenNavigate('PreAuthForm')}
                />
                <DrawerItem
                  icon={MessageCircle}
                  label="Go to Chat"
                  onPress={() => closeThenNavigate('Chat')}
                />

                <Divider className="my-2" />

                <DrawerItem icon={Wallet} label="Update Billing" onPress={() => {}} />
              </DrawerBody>
            </VStack>

            {/* ───────── Footer ───────── */}
            <DrawerFooter className="px-4 pb-6">
              <Button
                variant="outline"
                action="secondary"
                className="w-full gap-2"
                onPress={handleLogout}
              >
                <ButtonText>Logout</ButtonText>
                <ButtonIcon as={LogOut} />
              </Button>
            </DrawerFooter>
          </VStack>
        </SafeContainer>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerCore

/* ───────── Reusable Item ───────── */

type ItemProps = {
  icon: any
  label: string
  onPress: () => void
}

const DrawerItem = ({ icon, label, onPress }: ItemProps) => (
  <Pressable onPress={onPress} className="flex-row items-center gap-3 p-3 rounded-md">
    <Icon as={icon} size="lg" className="text-typography-600" />
    <Text>{label}</Text>
  </Pressable>
)
