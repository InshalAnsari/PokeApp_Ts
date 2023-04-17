import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {RootStackParamList} from '../../App';
import {fetchPokemon} from '../api/fetchPokemon';

export interface Response {
  base_experience?: string;
  name: string;
  weight?: number;
  sprites?: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
}

type IState = {
  loading: boolean;
  data: Response | undefined;
  errorMsg: string;
};

type IProps = NativeStackScreenProps<RootStackParamList, 'PokeData'>;

class PokeData extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      errorMsg: '',
      data: undefined,
    };
  }

  fetchData = async () => {
    try {
      const searchVal = this.props.route.params.val.toLowerCase();
      const data: Response = await fetchPokemon(searchVal);
      data &&
        this.setState({
          data: data,
          loading: false,
        });
    } catch (error) {
      this.setState({
        errorMsg: 'Something Went Wrong',
        loading: false,
      });
    }
  };

  componentDidMount(): void {
    this.fetchData();
  }
  render() {
    const {loading, errorMsg, data} = this.state;
    return (
      <View style={{flex: 1}}>
        {loading && <ActivityIndicator testID="isLoading" color={'blue'} />}
        {errorMsg && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#000'}}>{this.state.errorMsg}</Text>
          </View>
        )}
        <ScrollView
          style={{flexGrow: 1, paddingHorizontal: 10}}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          <Image
            source={{uri: data?.sprites?.other.home.front_default}}
            style={{height: 200, width: '100%'}}
            resizeMode="contain"
          />
          <Text testID='pokename' style={styles.headerTxt}>
            {`${data?.name?.charAt(0).toUpperCase()}${data?.name.slice(1)}`}
          </Text>
          <Text testID='pokeWeight' style={styles.data}>Weight : {data?.weight}</Text>
          <Text testID='pokeExp' style={styles.data}>Experience : {data?.base_experience}</Text>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  data: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  headerTxt: {
    color: '#000',
    paddingVertical: 30,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 10,
  },
});
export default PokeData;
