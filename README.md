React Native Coin Slot
===================
##A React Native component that simulates a coin slot

> **How to use:**
> - First you need to install the module by npm <br/>
    `npm install react-native-coin-slot --save`
> - Then import module <br/>
    `import { CoinSlot } from 'react-native-coin-slot';`
> - Now you can use the component like this `<CoinSlot />`


#Example
```
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import { CoinSlot } from 'react-native-coin-slot';

export default class flipCoin extends Component {
  constructor(props){
    super(props);
    this.state = {
      coins : 0
    }
  }
  render() {
    return (
      <View>
        <Text> Coins: { this.state.coins } </Text>
        <CoinSlot 
          disabled={ this.state.coins > 9 }
          onCoinDrop={ ()=> this.setState({ coins :  this.state.coins + 1 })  } />
      </View>
    );
  }
}

AppRegistry.registerComponent('flipCoin', () => flipCoin);

```


<img src="http://i.giphy.com/3oKIPCcZolmC7AfrSo.gif" style="display: flex;margin-left:300px"/>



