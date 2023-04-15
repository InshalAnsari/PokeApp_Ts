import {NavigationProp} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
} from 'react-native';
import {RootStackParamList} from '../../App';

interface IProps {
  navigation?: NavigationProp<RootStackParamList, 'PokeInput'>;
}

interface IState {
  inputVal: string;
  isEmpty: boolean;
}

class PokeInput extends Component<IProps, IState> {
 
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputVal: '',
      isEmpty: false,
    };
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.inputVal}
          testID="input"
          onChangeText={val => this.setState({inputVal: val, isEmpty: false})}
          placeholder="Enter Pokemon Name"
          placeholderTextColor={'#a9a9a9'}
          style={styles.inputContainer}
        />
        {this.state.isEmpty && (
          <Text style={styles.errTxt}>Please Enter Pokemon Name</Text>
        )}
        <TouchableOpacity
        testID='button'
          onPress={() => {
            this.state.inputVal === ''
              ? this.setState({isEmpty: true})
              : navigation?.navigate('PokeData', {
                  val: this.state.inputVal,
                });
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
    color: '#000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  errTxt: {
    color: 'red',
    fontSize: 10,
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
  btn: {
    width: '100%',
    backgroundColor: 'blue',
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  btnTxt: {
    color: '#fff',
    fontWeight: '800',
  },
});
export default PokeInput;
