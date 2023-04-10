import React, {Component} from "react";
import { 
  StyleSheet,
  Text, 
  View,
  TouchableHighlight,
  ScrollView  
} from "react-native";
import formatTime from "minutes-seconds-milliseconds";
import { StatusBar } from "expo-status-bar";

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: [],
    };
    this.handleStartPress = this.handleStartPress.bind(this);
    this.startStopButton = this.startStopButton.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
  }

  laps() {
    return this.state.laps.map(function(time, index) {
      return <View key={index} style={styles.lap}>
        <Text style={styles.lapText}>
          Lap {index + 1}: {" "}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  }

  startStopButton() {
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight underlayColor="gray"
      onPress={this.handleStartPress} style={[styles.button, style]}>
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
  }

  lapResetButton() {
    return <TouchableHighlight style={styles.button}
      underlayColor="gray" onPress={this.handleLapPress}>
        <Text>
          {this.state.running ? "Lap" : "Reset"}
        </Text>
      </TouchableHighlight>
  }

  handleLapPress() {
    if (!this.state.running) {
      this.setState({
        laps : [],
        timeElapsed: 0
      });
      return
    }
    var lap = this.state.timeElapsed;
    if (!this.state.running)
      return
    this.setState({
      laps: this.state.laps.concat([lap])
    });
  }

  handleStartPress() {
    if (this.state.running) {
     clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    this.setState({startTime: new Date() - this.state.timeElapsed});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 20);
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          {this.lapResetButton()}
          {this.startStopButton()}
        </View>
      </View>
      <ScrollView
        style={styles.footer}
       //showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {this.laps()}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center' 
  },

  header: {
    flex: 1,
    alignItems: 'center'
  },

  footer: {
    flex: 1,
  },

  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 300,
  },

  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10
  },

  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timer: {
    fontSize: 60,
  },

  lapText: {
    fontSize: 30
  },

  startButton: {
    borderColor: 'green'
  },

  stopButton: {
    borderColor: 'red'
  }
});

export default Stopwatch;
