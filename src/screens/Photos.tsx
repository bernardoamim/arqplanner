import { Category } from '@components/Category'
import { ListEmpty } from '@components/ListEmpty'
import { type ItemStatus, ListItem } from '@components/ListItem'
import { ListScreenHeader } from '@components/ListScreenHeader'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useQuery } from '@tanstack/react-query'
import { projectStatus } from '@utils/constants'
import { format } from 'date-fns'
import { FlatList, Icon, VStack } from 'native-base'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { type Render, getWorks } from 'src/api/queries/getWorks'

export function Photos() {
  const [selectedStatus, setSelectedStatus] = useState('Todos')

  const {
    data: works,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['works'],
    queryFn: getWorks,
  })

  const photos = works?.docs[0].photos

  console.log(photos)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleViewMedia(id: string) {
    navigation.navigate('medias', { id, hasApprovalFlow: false, type: 'photo' })
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <VStack flex={1} bg={'gray.50'}>
        <ListScreenHeader
          title={'Fotos'}
          onClickSettings={() => navigation.navigate('profile')}
        />

        <FlatList
          data={['Todos', 'Quartos', 'Banheiros', 'Sala', 'Cozinha']}
          keyExtractor={item => item}
          horizontal
          renderItem={({ item }) => (
            <Category
              name={item}
              isActive={selectedStatus === item}
              onPress={() => setSelectedStatus(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{ px: 6 }}
          maxH={10}
          minH={10}
          bg={'white'}
          borderBottomWidth={1}
          borderBottomColor={'#00000012'}
          mb={6}
        />

        <FlatList
          data={photos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              title={item.photo.title}
              subTitle={format(
                item.photo.files[0].uploads.updatedAt,
                "dd-MM-yy' | 'H:mm",
              )}
              icon={<Icon as={Feather} name="image" size={6} color="light.700" />}
              onPress={() => handleViewMedia(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
            ...(!photos?.length && { flex: 1, justifyContent: 'center' }),
          }}
          ListEmptyComponent={() => (
            <ListEmpty
              px={12}
              icon="image"
              title="Nenhuma foto encontrada nos arquivos"
              message="Você ainda não possui nenhuma foto cadastrada."
            />
          )}
        />
      </VStack>
    </SafeAreaView>
  )
}
