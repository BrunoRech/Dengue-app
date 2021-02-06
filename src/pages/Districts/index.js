import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  ListTitle,
  InvisibleButton,
  ListItem,
  PageHeader,
} from '../../styles';

const Districts = ({ navigation }) => {
  const { get } = UseApi();
  const [districts, setDistricts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDistricts = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/bairros');
    setDistricts(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    fetchDistricts();
  }, [fetchDistricts]);

  const renderItem = ({ nome, municipio, id }) => (
    <ListItem key={id}>
      <InvisibleButton
        onPress={() =>
          navigation.navigate('Detalhes Bairro', { districtId: id })
        }
      >
        <Text>{nome}</Text>
        <Text>{municipio.nome}</Text>
      </InvisibleButton>
    </ListItem>
  );

  return (
    <AppContainer>
      <View>
        <PageHeader multi="true">
          <InvisibleButton onPress={() => navigation.navigate('Novo Bairro')}>
            <ListTitle>Novo Bairro</ListTitle>
          </InvisibleButton>
          <InvisibleButton onPress={() => navigation.navigate('Municípios')}>
            <ListTitle>Municípios</ListTitle>
          </InvisibleButton>
        </PageHeader>
      </View>
      <FlatList
        data={districts}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchDistricts} />
        }
      />
    </AppContainer>
  );
};

export default Districts;
