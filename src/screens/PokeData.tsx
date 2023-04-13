import React, {Component} from 'react';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
class PokeData extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  fetchData = async () => {
    const searchVal = (this.props?.route?.params?.val).toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchVal}`);
    const data = await res.json();
    data &&
      this.setState({
        data: data,
      });
  };

  componentDidMount(): void {
    this.fetchData();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.data.length < 1 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#000'}}>
              No Data Found Please Enter name Correctly
            </Text>
          </View>
        ) : (
          <ScrollView
            style={{flexGrow: 1, paddingHorizontal: 10}}
            contentContainerStyle={{alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Image
              source={{uri: this.state.data.sprites.other.home.front_default}}
              style={{height: 200, width: '100%'}}
              resizeMode="contain"
            />
            <Text style={styles.headerTxt}>
              {this.state.data.name.charAt(0).toUpperCase() +
                this.state.data.name.slice(1)}
            </Text>
            <Text style={styles.data}>Weight : {this.state.data.weight}</Text>
            <Text style={styles.data}>
              Experience : {this.state.data.base_experience}
            </Text>
          </ScrollView>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  data: {color: '#000', fontSize: 15, fontWeight: '600'},
  headerTxt: {
    color: '#000',
    paddingVertical: 30,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 10,
  },
});
export default PokeData;
