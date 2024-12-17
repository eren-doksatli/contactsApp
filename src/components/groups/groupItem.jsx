import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Colors from '../../theme/colors';
import {
  ArrowRight2,
  MinusCirlce,
  People,
  Profile2User,
} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {CONTACTLIST} from '../../utils/routes';

const db = SQLite.openDatabase({
  name: 'myDataBase',
});

const GroupItem = ({item, showDelete, deleteItem}) => {
  const [personsCount, setPersonsCount] = useState(0);
  const navigation = useNavigation();

  const getPersons = group_id => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM persons JOIN groups ON persons.group_id=groups.id WHERE groups.id=? ',
        [group_id],
        (sqlTxn, response) => {
          setPersonsCount(response?.rows?.length);
        },
        error => console.log('Hata', error.message),
      );
    });
  };

  useEffect(() => {
    getPersons(item.id);
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate(CONTACTLIST, {item: item})}
      style={styles.container}>
      {showDelete && (
        <View
          style={{
            paddingHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MinusCirlce
            size="24"
            color={Colors.Red}
            variant="Bold"
            onPress={() => deleteItem(item.id)}
          />
        </View>
      )}
      <View
        style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        {item.title == 'All iPhone' ? (
          <People size="24" color={Colors.Blue} />
        ) : (
          <Profile2User size="24" color={Colors.Blue} />
        )}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderBottomWidth: 0.3,
          borderColor: Colors.Gray,
          padding: 10,
        }}>
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>{item.title}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: Colors.Gray}}>{personsCount}</Text>
          <ArrowRight2 size="20" color={Colors.Gray} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    borderRadius: 5,
  },
});

export default GroupItem;
