import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import {
  Button,
  ButtonIcon,
  ButtonText,
  Divider,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import {
  Compass,
  FileText,
  ImportIcon,
  LogOut,
  MessageSquare,
  Share,
  Wallet,
} from 'lucide-react-native'
import * as React from 'react'

import { useAuth } from '@/app/views/auth/context'
import { useDrawer } from '@/app/views/context/Drawer/context'
import { useGuide } from '@/app/views/context/Guide/context'

import { createApiUrl } from '@/app/utils'
import { refNavigate } from '@/app/utils/navigationRef'
import { useApi } from '@/app/views/context/Api/context'
import { Linking } from 'react-native'
import SafeContainer from './SafeContainer'
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from './ui/drawer'

type Props = {
  isOpen: boolean
  disabled?: boolean
}

const DrawerCore: React.FC<Props> = ({ isOpen, disabled }) => {
  const { setIsDrawerOpen, isDrawerOpen } = useDrawer()
  const { user, signOut } = useAuth()
  const { setCurrentStepIndex, currentStepIndex } = useGuide()
  const { messages } = useApi()

  const email = user?.email
  const name =
    user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? 'User'

  // Get the first letter of the name or 'U' if name is not available
  const userInitial =
    name && name !== 'User' ? name.charAt(0).toUpperCase() : 'U'

  const handleLogout = async () => {
    await signOut()
    setIsDrawerOpen(false)
    refNavigate('Login')
  }

  const closeThenNavigate = (path: string) => {
    if (currentStepIndex > 1) setCurrentStepIndex(1)
    setIsDrawerOpen(false)
    refNavigate(path as keyof typeof refNavigate)
  }

  const handleExport = React.useCallback(async () => {
    // Transform mobile message format to web app format
    const transformedMessages = messages.map(msg => ({
      role: msg.user._id === 1 ? 'user' : 'assistant',
      content: msg.text,
      id: msg._id,
      createdAt:
        typeof msg.createdAt === 'number'
          ? new Date(msg.createdAt).toISOString()
          : msg.createdAt?.toISOString() || new Date().toISOString(),
    }))

    const exportUrl = createApiUrl('pdf')
    const queryParams = new URLSearchParams({
      data: JSON.stringify(transformedMessages),
      ismobile: 'true',
    }).toString()
    await Linking.openURL(`${exportUrl}?${queryParams}`)
  }, [messages])

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsDrawerOpen(false)}
      anchor="right"
    >
      {isDrawerOpen && <DrawerBackdrop />}
      <DrawerContent className="w-[280px]">
        <SafeContainer className="h-full">
          <VStack className="flex-1 justify-between">
            {/* ───────── Header ───────── */}
            <VStack>
              <DrawerHeader className="pt-10 pb-6 items-center">
                <VStack className="items-center gap-3">
                  <Box className="w-20 h-20 rounded-full bg-blue-500 items-center justify-center">
                    <Text className="text-white text-2xl font-bold">
                      {userInitial}
                    </Text>
                  </Box>

                  <VStack className="items-center gap-0.5">
                    <Text size="lg" className="font-semibold">
                      {name}
                    </Text>
                    <Text size="sm" className="text-typography-600">
                      {email}
                    </Text>
                  </VStack>
                  <Divider className="my-2" />
                  <DrawerItem
                    iconClassName="text-red-500"
                    icon={Wallet}
                    label="Update Billing"
                    onPress={() => {}}
                  />
                </VStack>
              </DrawerHeader>

              <Divider />

              {/* ───────── Actions ───────── */}
              <DrawerBody contentContainerClassName="px-4 py-4 gap-3">
                <DrawerItem
                  iconClassName="text-blue-600"
                  icon={Compass}
                  label="Main Menu"
                  onPress={() => closeThenNavigate('Pick')}
                />
                <DrawerItem
                  iconClassName="text-emerald-600"
                  icon={FileText}
                  label="Full Form"
                  onPress={() => closeThenNavigate('PreAuthForm')}
                />
                <DrawerItem
                  iconClassName="text-violet-600"
                  icon={MessageSquare}
                  label="Chat"
                  onPress={() => closeThenNavigate('Chat')}
                />

                <Divider className="my-2" />
                <DrawerItem
                  iconClassName="text-indigo-500"
                  icon={Share}
                  label="Export"
                  onPress={() => handleExport()}
                />
                <>
                  <DrawerItem
                    iconClassName="text-emerald-500"
                    icon={ImportIcon}
                    label="Import"
                    onPress={() => {}}
                    disabled
                  />
                  <Text className="text-xs">not supported at this time</Text>
                </>
              </DrawerBody>
            </VStack>

            {/* ───────── Footer ───────── */}
            <DrawerFooter className="px-4 pb-6">
              <Button
                variant="outline"
                action="secondary"
                className="w-full gap-2 border-amber-500"
                onPress={handleLogout}
              >
                <ButtonText className="text-amber-500">Logout</ButtonText>
                <ButtonIcon as={LogOut} color="$amber500" />
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
  iconClassName?: string
  onPress: () => void
  disabled?: boolean
}

const DrawerItem = ({
  icon,
  label,
  iconClassName,
  onPress,
  disabled,
}: ItemProps) => (
  <Pressable
    onPress={disabled ? undefined : onPress}
    className={`flex-row items-center gap-3 p-3 rounded-md ${
      disabled ? 'opacity-50' : 'opacity-100'
    }`}
  >
    <Icon as={icon} size="lg" className={`${iconClassName} w-6 h-6`} />
    <Text className={'text-black'}>{label}</Text>
  </Pressable>
)
