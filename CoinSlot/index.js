import React from 'react';
import { PanResponder, View, Image, Animated, Vibration } from 'react-native';
import { loadSound } from './utils';
import styles from './styles';

import COIN_IMAGE from './assets/coin.png';
import COIN_HOVER_IMAGE from './assets/coinHover.png';
import ARROW_IMAGE from './assets/arrow.png';
import HOLE_IMAGE from './assets/hole.png';
const COIN_SOUND = loadSound('drop.mp3');

export default class CoinSlot extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    onCoinDrop: PropTypes.func.
  };

  static defaultProps = {
    disabled: false,
    onCoinDrop: () => null,
  };

  dragCoinPosition = new Animated.ValueXY();
  dragCoinOpacity = new Animated.Value(0.1);
  dragCoinRotation = new Animated.Value(0);
  staticCoinOpacity = new Animated.Value(1);
  arrowOpacity = new Animated.Value(1);
  layoutWidth = null;
  panResponder = null;

  trimCoinPosition(dx) {
    return dx < 0 ? 0 : dx;
  }

  isAboveSlot(coinPosition) {
    return ((coinPosition+60) / layoutWidth >= .9);
  }

  insertCoinInSlot() {
    Vibration.vibrate();
    if (COIN_SOUND) COIN_SOUND.play();
    setTimeout(() => onCoinDrop(), 500);
  }

  resetCoinToStart() {
    Animated.spring(this.dragCoinPosition, { toValue: { x: 0, y: 0 } }).start();
    Animated.spring(this.arrowOpacity, { toValue: 1 }).start();
    Animated.spring(this.staticCoinOpacity, { toValue: 1 }).start();
    Animated.spring(this.dragCoinOpacity, { toValue: 0.1 }).start();
    Animated.spring(this.dragCoinRotation, { toValue: 0 }).start();
  }

  moveCoinToNewPosition(newPosition, isAboveSlot) {
    Animated.spring(this.dragCoinPosition, { toValue: { x: newPosition, y: 0 } }).start();
    Animated.spring(this.dragCoinRotation, { toValue: newPosition }).start();
    Animated.spring(this.dragCoinOpacity, { toValue: (isAboveSlot ? 0 : 1) }).start();
    Vibration.vibrate([0, 3]);
  }

  startCoinDrag() {
    Animated.spring(this.arrowOpacity, { toValue: .5 }).start();
    Animated.spring(this.staticCoinOpacity, { toValue: .25 }).start();
    Animated.spring(this.dragCoinOpacity, { toValue: 1 }).start();
  }

  viewLayoutHandler = (event) => {
    this.layoutWidth = event.nativeEvent.layout.width;
  }

  enabledCheckHandler = (event) => {
    return !this.props.disabled;
  }

  dragStartHandler = (event, gestureState) => {
    this.startCoinDrag();
  }

  dragMoveHandler = (event, gestureState) => {
    const newCoinPosition = this.trimCoinPosition(gestureState.dx);
    const isAboveSlot = this.isAboveSlot(newCoinPosition);
    this.moveCoin(newCoinPosition, isAboveSlot);
  }

  dragReleaseOrTerminateHandler = (event, gestureState) => {
    this.resetCoinToStart();
    const newCoinPosition = this.trimCoinPosition(gestureState.dx);
    const isAboveSlot = this.isAboveSlot(newCoinPosition);
    if (isAboveSlot) this.insertCoin();
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: enabledCheckHandler,
      onStartShouldSetPanResponderCapture: enabledCheckHandler,
      onMoveShouldSetPanResponder: enabledCheckHandler,
      onMoveShouldSetPanResponderCapture: enabledCheckHandler,
      onPanResponderGrant: dragStartHandler,
      onPanResponderMove: dragMoveHandler,
      onPanResponderRelease: dragReleaseOrTerminateHandler,
      onPanResponderTerminate: dragReleaseOrTerminateHandler,
    });
  }

  render() {
    return (
      <View style={[ styles.container, { opacity: disable ? .5 : 1 } ]} onLayout={ this.handleViewLayout }>
        <Animated.Image
          source={ COIN_IMAGE }
          style={[ styles.coinImage, { opacity: this.staticCoinOpacity } ]}
        />
        <Animated.Image
          source={ ARROW_IMAGE }
          style={[ styles.arrowImage, { opacity: this.arrowOpacity } ]}
        />
        <Image
          source={ HOLE_IMAGE }
          style={ styles.holeImage }
        />
        <Animated.Image
          source={ COIN_HOVER_IMAGE }
          style={[
            styles.coinImageFloat,
            { opacity: this.dragCoinOpacity },
            this.dragCoinPosition.getLayout(),
            { transform: [{
              rotate: this.dragCoinRotation.interpolate({
                inputRange: [0, 120],
                outputRange: ['0deg', '360deg']
              })
            }] }
          ]}
          { ...this.panResponder.panHandlers }
        />
      </View>
    );
  }

}
