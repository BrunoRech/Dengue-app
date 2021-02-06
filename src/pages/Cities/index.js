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

const Cities = ({ navigation }) => {
  const { get } = UseApi();
  const [cities, setCities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCities = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/municipios');
    setCities(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const renderItem = ({ nome, id }) => (
    <ListItem key={id}>
      <InvisibleButton
        onPress={() =>
          navigation.navigate('Detalhes Município', { cityId: id })
        }
      >
        <Text>{nome}</Text>
      </InvisibleButton>
    </ListItem>
  );

  return (
    <AppContainer>
      <View>
        <PageHeader multi="true">
          <InvisibleButton
            onPress={() => navigation.navigate('Novo Município')}
          >
            <ListTitle>Novo Município</ListTitle>
          </InvisibleButton>
        </PageHeader>
      </View>
      <FlatList
        data={cities}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchCities} />
        }
      />
    </AppContainer>
  );
};

export default Cities;
