import React from "react";
import Timer from "./Timer";

const getInitialState = () => ({
  status: 0,
  nextMove: "Guess a number between 1 and 10",
  guess: 0
});

class GuessingGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState(); // You are setting the state here, but overwriting it below...

    // This state declaration overwrites what has been set above.
    this.state = {
      min: 1, // maybe set defaults to 1 and 10?
      random: "",
      max: 10,
      userInput: "",
      counter: 5,
      try: 0
    };
  }

  componentDidMount() {
    // this.handleclike(); 
    // Instead of picking the random number when the page loads, I would do it when the user clicks the 'start game' button!! This way you can generate the value based on the min and max values
  }
  componentDidUpdate(prevProps, prevState) {
    // Status doesn't exist in state, because as said above, it's being overwritten
    if (prevState.status === this.state.random) {
      this.handleclike();
    }
  }

  minChange = event => {
    const min = parseInt(event.target.value);
    this.setState({ min: min });
  };

  maxChange = event => {
    // You don't want to start the timer here, only when the button is clicked!
    const max = parseInt(event.target.value);
    this.setState({ max: max });
  };

  // I would create a function called generateRandom or something similar which you can call so as to not repeat code.
  handleclike = () => {
    // Here you want to clear any previous timers, so you don't keep creating them and are unable to stop them
    clearInterval(this.refs.child.state.timerId);

    const { min, max } = this.state;
    // Do some checking here to make sure the max is bigger than the min!

    if (max > min) {
      this.setState({
        random: Math.floor(Math.random() * (max - min)) + min + 1
      }, () => {
        this.refs.child.startTimer(); // Start the timer here.
      });
    } else {
      alert('The max has to be bigger than the min!');
    }

  };

  // The 'Number' can be omitted here javascript is smart enought to know what you mean when you just say parseInt
  userinput = event => {
    const newValue = parseInt(event.target.value);

    if (!newValue) {
      this.setState({
        error: "Value must be a number!"
      });
    } else {
      this.setState({
        error: null,  // You can combine these setState calls into one
        guess: parseInt(event.target.value) // the input value should be a number
        // You generally don't need to specify the radix value in this case because you want an error if you try to parse something other than a numerical string (ie. 'hello')
      });
    }
  };


  onSubmit = event => {

    event.preventDefault();
    const { random, guess } = this.state;
    if (!guess || !random) { // If the user hasn't entered anything, no need to continue!
      // If there's no random, the game hasn't started!
      return;
    }

    this.setState({
      try: this.state.try + 1
    });

    console.log(guess, random);

    // You want to make this conditional dynamic, and based on the user's inputs
    if (guess > this.state.max || guess < this.state.min) {
      this.setState({
        // You can use string literals here to make the message dynamic
        error: `Value must be between ${this.state.min} and ${this.state.max}!`
      });
      return;
    }
    if (guess === random) {
      this.setState({ status: random });
      return;
    }
    if (guess > random) {
      this.setState({ nextMove: "Too high" });
    } else {
      this.setState({ nextMove: "Too low" });
    }
  };
  resetGame = () => {
    // If you are reloading the page, you don't need to setState above, it will get reset on page load
    window.location.reload(false);
  };

  render() {
    if (this.state.status === this.state.random) {
      clearInterval(this.refs.child.state.timerId)
      return (
        <div style={{ textAlign: "center", marginTop: "15%" }}>
          <h1 style={{ color: "green" }}>You Won!</h1>
          <p>The Random number is: {this.state.random}</p>
          <p>Number of tries: {this.state.try}</p>
          <p>Total time taken:{this.refs.child.timecounter}</p>
          <button onClick={this.resetGame}>Play again</button>
        </div>
      );
    }
    if (this.state.counter === this.state.try) {
      clearInterval(this.refs.child.state.timerId)
      return (<div style={{ textAlign: "center", marginTop: "15%" }}>
        <h1 style={{ color: "green" }}>Oops!! you reach the maximom trial!</h1>
        <button onClick={this.resetGame}>Play again</button>
      </div>
      )

    }

    return (
      <div
        className="ui container"
        style={{
          margin: "30px",
          width: "40%",
          boxShadow: "3px 3px 5px 6px #ccc"
        }}
      >
        <div className="ui segment">
          <div className="ui form" style={{ color: "blue" }}>
            <div className="field">
              <div className="">
                <label style={{ color: "red", padding: "110px" }}>
                  RANDOM NUMBER GUESSING GAME
                </label>

              </div>
              <br />
              <Timer ref="child" />
              <div style={{ textAlign: "center", marginTop: "1%" }}>
                <div>
                  {/* Tell the user they can pick the number range they want! */}
                  <label>Enter your guess range!</label>
                  <br />
                  <div>
                    <label>Min</label>
                    <input
                      type="number"
                      placeholder="1" // Use a placeholder to show the user a 'default'
                      value={this.state.min}
                      // When you are using controlled inputs you need to access the 'event' variable
                      onChange={event => this.minChange(event)}
                      style={{
                        marginRight: "8px",
                        textAlign: "center",
                        height: "32px",
                        width: "32%"
                      }}
                    />
                    <br />
                  </div>
                  <div>
                    <label>Max</label>
                    <input
                      type="number"
                      placeholder="10" // Same with this one. Define a default placeholder
                      value={this.state.max}
                      onChange={event => { this.maxChange(event) }}
                      style={{
                        marginRight: "8px",
                        textAlign: "center",
                        height: "32px",
                        width: "32%"
                      }}
                    />

                  </div>

                  <button
                    style={{ height: "32px", padding: "50" }}
                    type="GameStart"
                    onClick={this.handleclike}
                  >
                    StartGame
                  </button>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "15%" }}>
                <p>{this.state.nextMove}</p>
                {this.state.error && (
                  <p style={{ color: "red" }}>{this.state.error}</p>
                )}

                <input
                  type="text"
                  style={{
                    marginRight: "8px",
                    textAlign: "center",
                    height: "32px",
                    width: "32%"
                  }}
                  placeholder={`${this.state.min}-${this.state.max}`} // you can dynamically change these placeholder values when the user changes the min and max
                  onChange={this.userinput}
                />

                <button onClick={this.onSubmit} style={{ height: "32px" }}>
                  Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GuessingGame;

