/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import JSParticle from './src/JSParticle';


export default class App extends Component {

  numParticles = 50;
  particles = [];

  constructor(){
    super();
    for(let i=0; i < this.numParticles; i ++){
      this.particles.push( <JSParticle key={i}/>);
    }
  }

  render() {
    return (
      <View style={styles.container} >
      {this.particles.map((particle)=>particle)}
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  }
  
});
