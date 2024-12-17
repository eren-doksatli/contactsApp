import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {screenHeight, screenWidth} from '../../utils/constants';
import Colors from '../../theme/colors';
import {fullName, getInitial} from '../../utils/functions';

const ContactDetail = ({route}) => {
  const person = route.params.person;
  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          height: screenHeight * 0.4,
          backgroundColor: Colors.Gray,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: screenWidth * 0.6,
            height: screenWidth * 0.6,
            borderRadius: 1000,
            backgroundColor: Colors.DarkGrey,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 120, color: Colors.White, fontWeight: 'bold'}}>
            {getInitial(person.name, person.surname)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 30,
            color: Colors.White,
            marginTop: 20,
          }}>
          {fullName(person.name, person.surname)}
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: Colors.White,
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>Phone</Text>
        <Text>{person.phone}</Text>
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: Colors.White,
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>Email</Text>
        <Text>{person.email}</Text>
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: Colors.White,
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>Address</Text>
        <Text>{person.address}</Text>
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: Colors.White,
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>Company</Text>
        <Text>{person.company}</Text>
      </View>
    </ScrollView>
  );
};

export default ContactDetail;
