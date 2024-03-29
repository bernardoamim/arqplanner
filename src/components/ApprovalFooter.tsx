import { useNavigation } from '@react-navigation/native'
import type { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { BlurView } from 'expo-blur'
import { Box, HStack, type IBoxProps, Text } from 'native-base'
import { Button } from './Button'

type DisclosureFooter = IBoxProps & {
  onOpenDisclose: (disclose: 'approve' | 'reject') => void
}

export function ApprovalFooter({ onOpenDisclose, ...rest }: DisclosureFooter) {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  return (
    <Box w={'full'} borderTopColor={'muted.200'} borderTopWidth={1} {...rest}>
      <BlurView
        intensity={90}
        tint="systemThickMaterialLight"
        style={{
          width: '100%',
          paddingTop: 16,
          paddingHorizontal: 40,
          paddingBottom: 48,
        }}
      >
        <HStack alignItems={'center'}>
          <Text
            fontFamily={'heading'}
            fontSize={'md'}
            color={'light.700'}
            flexGrow={1}
            style={{ opacity: 1 }}
          >
            Aprovar arquivo?
          </Text>
          <Button
            title="Reprovar"
            color={'red.700'}
            bg={'#dd00001A'}
            w={22}
            h={10}
            rounded={'full'}
            variant={'subtle'}
            onPress={() => onOpenDisclose('reject')}
          />

          <Button
            title="Aprovar"
            w={22}
            h={10}
            rounded={'full'}
            ml={2}
            variant={'solid'}
            onPress={() => onOpenDisclose('approve')}
          />
        </HStack>
      </BlurView>
    </Box>
  )
}
