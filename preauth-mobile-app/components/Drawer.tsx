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
import { User, Home, Wallet, LogOut } from 'lucide-react-native'
import * as React from 'react'
import { useDrawer } from '@/app/views/context/Drawer/context'
import { useAuth } from '@/app/views/auth/context'
import SafeContainer from './SafeContainer'
import { refNavigate } from '@/app/utils/navigationRef'

const DrawerCore: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { setIsDrawerOpen } = useDrawer()
  const { user, signOut } = useAuth()
  const email = user?.user_metadata.email
  const name = undefined

  const handleLogout = async () => {
    try {
      await signOut()
      setIsDrawerOpen(false)
      refNavigate('Login')
      
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsDrawerOpen(false)
        }}
        anchor="right"
      >
        <DrawerBackdrop />
        <DrawerContent className="w-[270px] md:w-[300px]">
          <SafeContainer className="h-full">
            <VStack className="flex-1 justify-between">
              {/* Top content */}
              <VStack>
                <DrawerHeader className="pt-6 pb-4 flex-col justify-center items-center gap-2 mt-20">
                  <Avatar size="md">
                    <AvatarFallbackText>User Image</AvatarFallbackText>
                    <AvatarImage
                      source={{
                        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=687&q=80',
                      }}
                    />
                  </Avatar>

                  <VStack className="items-center">
                    <Text size="lg">{name ?? 'user name not found'}</Text>
                    <Text size="sm" className="text-typography-600">
                      {email}
                    </Text>
                  </VStack>
                </DrawerHeader>

                <Divider className="my-4" />

                <DrawerBody contentContainerClassName="gap-2 px-2">
                  {/* <Pressable className="gap-3 flex-row items-center p-2 rounded-md">
                    <Icon as={User} size="lg" className="text-typography-600" />
                    <Text>My Profile</Text>
                  </Pressable>

                  <Pressable className="gap-3 flex-row items-center p-2 rounded-md">
                    <Icon as={Home} size="lg" className="text-typography-600" />
                    <Text>Saved Address</Text>
                  </Pressable> */}

                  <Pressable className="gap-3 flex-row items-center p-2 rounded-md">
                    <Icon as={Wallet} size="lg" className="text-typography-600" />
                    <Text>Update Billing</Text>
                  </Pressable>
                </DrawerBody>
              </VStack>

              {/* Footer pinned to bottom */}
              <DrawerFooter className="px-4 pb-6">
                <Button
                  className="w-full gap-2"
                  variant="outline"
                  action="secondary"
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
    </>
  )
}

export default DrawerCore
