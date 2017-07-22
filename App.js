import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        sun: { am: false, pm: false },
        mon: { am: false, pm: false },
        tue: { am: false, pm: false },
        wed: { am: false, pm: false },
        thu: { am: false, pm: false },
        fri: { am: false, pm: false },
        sat: { am: false, pm: false }
      }
    };
  }

  updateSwitch(value, dayOfWeek, meridian) {
    let newState = Object.assign({}, this.state);
    newState.values[dayOfWeek][meridian] = value;
    console.log(newState);
    this.setState(newState);
  }

  renderDayRow(dayOfWeek) {
    var meridians = ['am', 'pm'];

    return (
      <View key={ dayOfWeek } style={ styles.row }>
        <Text style={ styles.dayOfWeek }>{ dayOfWeek.toUpperCase() }</Text>
        {meridians.map((meridian) => { return this.renderSwitch(dayOfWeek, meridian) })}
      </View>
    );
  }

  renderSwitch(dayOfWeek, meridian) {
    return (
      <View style={styles.switchContainer}>
        <Switch style={ styles.switch } onValueChange={ (value) => this.updateSwitch(value, dayOfWeek, meridian) } value={ this.state.values[dayOfWeek][meridian] } />
      </View>
    )
  }

  render() {
    var daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    return (
      <View style={styles.container}>
        <Text style={styles.header}>DID YOU FEED THE DOG?</Text>

        <View style={styles.rowContainer}>
          {daysOfWeek.map((day) => { return this.renderDayRow(day) })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    marginBottom: 60
  },
  dayOfWeek: {
    fontSize: 28,
    flex: 1,
    textAlign: 'center'
  },
  switchContainer: {
    flex: 1,
    alignItems: 'center'
  },
  rowContainer: {
    width: '60%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  }
});
