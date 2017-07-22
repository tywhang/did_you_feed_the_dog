import React from 'react';
import { StyleSheet, Text, View, Switch, Button } from 'react-native';

const meridians = ['am', 'pm'];
const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const defaultValues = {
  sun: { am: false, pm: false },
  mon: { am: false, pm: false },
  tue: { am: false, pm: false },
  wed: { am: false, pm: false },
  thu: { am: false, pm: false },
  fri: { am: false, pm: false },
  sat: { am: false, pm: false }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: Object.assign({}, defaultValues) }
  }

  updateSwitch(value, dayOfWeek, meridian) {
    let newState = Object.assign({}, this.state);
    newState.values[dayOfWeek][meridian] = value;
    this.setState(newState);
  }

  resetSwitches() {
    let newValues = Object.assign({}, this.state.values);
    Object.keys(newValues).map((key) => { newValues[key] = { am: false, pm: false } });
    this.setState({ values: newValues });
  }

  renderDayRow(dayOfWeek) {
    return (
      <View key={ dayOfWeek } style={ styles.row }>
        <Text style={ styles.dayOfWeek }>{ dayOfWeek.toUpperCase() }</Text>
        {meridians.map((meridian) => { return this.renderSwitch(dayOfWeek, meridian) })}
      </View>
    );
  }

  renderSwitch(dayOfWeek, meridian) {
    return (
      <View key={dayOfWeek + meridian} style={styles.switchContainer}>
        <Switch
          style={ styles.switch }
          onValueChange={ (value) => this.updateSwitch(value, dayOfWeek, meridian) }
          value={ this.state.values[dayOfWeek][meridian] } />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>DID YOU FEED THE DOG?</Text>

        <View style={styles.rowContainer}>
          {daysOfWeek.map((day) => { return this.renderDayRow(day) })}
        </View>
        <Button onPress={this.resetSwitches.bind(this)} style={styles.resetButton} title="Reset" />
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
  resetButton: {
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  rowContainer: {
    width: '60%'
  }
});
