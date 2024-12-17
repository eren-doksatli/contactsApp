import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Button, FlatList} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {CommonActions} from '@react-navigation/native';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {Add, ArrowLeft2, ProfileCircle} from 'iconsax-react-native';
import Colors from '../../theme/colors';
import ContactsItem from '../../components/contacts/contactsItem';
import {ADDCONTACT} from '../../utils/routes';
import {useDispatch, useSelector} from 'react-redux';
import {resetStore, setContacts} from '../../store/slices/contactsSlice';

const db = SQLite.openDatabase({
  name: 'myDataBase',
});

const ContactList = ({route, navigation}) => {
  const {item} = route?.params;

  const dispatch = useDispatch();
  const {contacts, updateList} = useSelector(state => state.contacts);

  const getPersons = group_id => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM persons JOIN groups ON persons.group_id=groups.id WHERE groups.id=? ',
        [group_id],
        (sqlTxn, response) => {
          let result = [];
          if (response?.rows?.length > 0) {
            for (let i = 0; i < response?.rows?.length; i++) {
              let item = response.rows.item(i);
              result.push(item);
            }
          }
          dispatch(setContacts(result));
        },
        error => console.log('Hata', error.message),
      );
    });
  };

  useEffect(() => {
    getPersons(item.id);
    CommonActions.setParams({group_id: item.id});
    return () => {
      dispatch(resetStore());
    };
  }, [updateList]);

  return (
    <SafeAreaView style={defaultScreenStyle.container}>
      <View style={{flex: 1, padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}></View>
        <Text style={{fontSize: 35, fontWeight: 'bold', marginVertical: 10}}>
          {item?.title}
        </Text>
        <FlatList
          ListEmptyComponent={
            <View
              style={{
                height: 600,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ProfileCircle size="80" color={Colors.Gray} variant="Bold" />
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                No Contacts
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.Gray,
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                Contacts you've added will appear here
              </Text>
              <Button
                onPress={() =>
                  navigation.navigate(ADDCONTACT, {group_id: item.id})
                }
                title="Add Contacts"
              />
            </View>
          }
          data={contacts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ContactsItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ContactList;
