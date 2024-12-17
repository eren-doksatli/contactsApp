//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {Formik} from 'formik';
import {Input} from '@ui-kitten/components';
import SQLite from 'react-native-sqlite-storage';
import {useDispatch} from 'react-redux';
import {setUpdateList} from '../../store/slices/contactsSlice';

const db = SQLite.openDatabase({
  name: 'myDataBase',
});

const AddContact = ({route}) => {
  const group_id = route?.params?.group_id;

  const dispatch = useDispatch();

  const addNewPerson = person => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO persons (name,surname,phone,email,address,company,group_id) VALUES (?,?,?,?,?,?,?)',
        [
          person.name,
          person.surname,
          person.phone,
          person.email,
          person.address,
          person.company,
          group_id,
        ],
        (sqlTxn, res) => dispatch(setUpdateList()),
        console.log('Kisi eklendi'),
        error => console.log('Hata', error.message),
      );
    });
  };
  return (
    <View style={defaultScreenStyle.container}>
      <Formik
        initialValues={{
          name: '',
          surname: '',
          phone: '',
          email: '',
          address: '',
          company: '',
        }}
        onSubmit={values => addNewPerson(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <Input
              size="large"
              style={{marginVertical: 10}}
              label={'Name'}
              placeholder="Add a Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              label={'Surname'}
              placeholder="Add a Surname"
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              label={'Phone'}
              placeholder="Enter Phone Number"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              label={'Email'}
              placeholder="Enter Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              label={'Address'}
              placeholder="Enter Address"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              label={'Company'}
              placeholder="Enter Company"
              onChangeText={handleChange('company')}
              onBlur={handleBlur('company')}
              value={values.company}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddContact;
