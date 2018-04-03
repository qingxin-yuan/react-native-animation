import React, { Component } from "react";
import {
  Text,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import SoundPlayer from "react-native-sound-player";

const { width, height } = Dimensions.get("window");

export default class JSParticle extends Component {
  constructor() {
    super();

    this.startPosition = [0, 0];
    this.endPosition = [
      this._randomNumber(-width / 2, width / 2),
      this._randomNumber(-height / 2, height / 2)
    ];
    this.duration = this._randomNumber(1500, 3000);
    this.startDelay = this._randomNumber(0, 2000);
    this.size = this._randomNumber(1, 5);

    this.state = {
      translateX: new Animated.Value(this.startPosition[0]),
      translateY: new Animated.Value(this.startPosition[1]),
      opacity: new Animated.Value(0),
      rotation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    // _ for instance method (vs inherited from parent class)
    setTimeout(() => this._startAnimation(), this.startDelay);

    // play the file tone.mp3
    try {
      SoundPlayer.playSoundFile("warden", "mp3");

      SoundPlayer.onFinishedPlaying((success: boolean) => {
        // success is true when the sound is played
        console.log("finished playing", success);
      });
    } catch (e) {
      throw new Error(`cannot play the sound file: `, e);
    }
  }

  _reset() {
    this.setState({
      translateX: new Animated.Value(this.startPosition[0]),
      translateY: new Animated.Value(this.startPosition[1]),
      opacity: new Animated.Value(0),
      rotation: new Animated.Value(0)
    });
  }

  _randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  _startAnimation() {
    Animated.parallel([
      Animated.timing(this.state.translateX, {
        toValue: this.endPosition[0],
        duration: this.duration,
        easing: Easing.elastic(0.4)
      }),
      Animated.timing(this.state.translateY, {
        toValue: this.endPosition[1],
        duration: this.duration,
        easing: Easing.elastic(0.4)
      }),
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 200,
          easing: Easing.elastic(0.4)
        }),
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: this.duration,
          easing: Easing.elastic(0.4)
        })
      ]),

      Animated.timing(this.state.rotation, {
        toValue: 1,
        duration: this.duration,
        easing: Easing.elastic(0.4)
      })
    ]).start(() => {
      this._reset();
      this._startAnimation();
    });
  }

  render() {
    const spin = this.state.rotation.interpolate({
      inputRange: [0.5, 1],
      outputRange: ["0deg", "-360deg"]
    });

    return (
      <Animated.View
        style={{
          position: "absolute",
          opacity: this.state.opacity,
          transform: [
            { scale: this.size },
            { translateX: this.state.translateX },
            { translateY: this.state.translateY },
            { rotate: spin }
          ]
        }}
      >
        <Text>🍺</Text>
      </Animated.View>
    );
  }
}
