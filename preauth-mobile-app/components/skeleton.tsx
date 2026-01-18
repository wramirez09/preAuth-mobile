import { Box } from './ui/box'
import { HStack } from './ui/hstack'
import { SkeletonText } from './ui/skeleton'

const Skeleton = () => {
  return (
    <Box className="w-full h-full gap-4 p-3 rounded-md bg-background-100">
      <Skeleton />
      <SkeletonText _lines={3} className="h-2" />
      <HStack className="gap-1 align-middle">
        <Skeleton />
        <SkeletonText _lines={2} gap={1} className="h-2 w-2/5" />
      </HStack>
    </Box>
  )
}

export default Skeleton
