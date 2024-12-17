import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Colors from '../../theme/colors';
import {
  ArrowRight2,
  MinusCirlce,
  People,
  Profile2User,
} from 'iconsax-react-native';

const AddItemInput = ({changeText, newItem}) => {
  return (
    <View style={styles.container}>
      <View
        style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Profile2User size="24" color={Colors.Blue} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TextInput
          value={newItem}
          style={{fontSize: 16}}
          onChangeText={text => changeText(text)}
        />
      </View>
    </View>
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

export default AddItemInput;
