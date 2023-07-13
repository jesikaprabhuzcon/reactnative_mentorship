import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity
      style={props.styles}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    width: '60%',
    alignSelf: 'center',
    marginTop: '8%',
    //backgroundColor: colors.primary,
    borderRadius: 40,
    shadowColor: '#4082ed',
    shadowOffset: {width: 6, height: 6},
    shadowOpacity: 0.9,
    shadowRadius: 5,
    //shadowColor: colors.shadowPrimary,
    },
  text: {
    alignSelf: 'center',
    fontSize: 26,
    //fontWeight: '600',
    color: 'white',
    padding: '2%',
    paddingRight: '7%',
    paddingLeft: '7%',
    //margin: '2%',
    },
});

export default Button;