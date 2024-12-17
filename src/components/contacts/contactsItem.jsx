import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {fullName} from '../../utils/functions';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {CONTACTDETAIL} from '../../utils/routes';

const ContactsItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(CONTACTDETAIL, {person: item})}
      style={{padding: 10, borderBottomWidth: 0.5, borderColor: Colors.Gray}}>
      <Text style={{fontSize: 20, fontWeight: '500'}}>
        {fullName(item.name, item.surname)}
      </Text>
    </Pressable>
  );
};

export default ContactsItem;
