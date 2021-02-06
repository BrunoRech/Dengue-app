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

const Streets = ({ navigation }) => {
  const { get } = UseApi();
  const [streets, setStreets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStreets = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/ruas');
    setStreets(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    fetchStreets();
  }, [fetchStreets]);

  const renderItem = ({ nome, id }) => (
    <ListItem key={id}>
      <InvisibleButton
        onPress={() => navigation.navigate('Detalhes Rua', { streetId: id })}
      >
        <Text>{nome}</Text>
      </InvisibleButton>
    </ListItem>
  );

  return (
    <AppContainer>
      <View>
        <PageHeader multi="true">
          <InvisibleButton onPress={() => navigation.navigate('Nova Rua')}>
            <ListTitle>Nova Rua</ListTitle>
          </InvisibleButton>
          <InvisibleButton onPress={() => navigation.navigate('Novo Bairro')}>
            <ListTitle>Novo Bairro</ListTitle>
          </InvisibleButton>
          <InvisibleButton
            onPress={() => navigation.navigate('Novo Município')}
          >
            <ListTitle>Novo Município</ListTitle>
          </InvisibleButton>
        </PageHeader>
      </View>
      <FlatList
        data={streets}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchStreets} />
        }
      />
    </AppContainer>
  );
};

export default Streets;
