import React from "react";
import Timer from "./Timer";

const getInitialState = () => ({
  status: 0,
  nextMove: "Guess a number between 1 and 10",
  guess: 0,
  try: 0,
  error: null,
  target: null
});

class GuessingGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();

    this.state = {
      min: "",
      random: "",
      max: "",
      userInput: "",
      counter: 0
    };
  }

  componentDidMount() {
    this.handleclike();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.status === this.state.random) {
      this.handleclike();
    }
  }

  minChange = event => {
    this.setState({ min: event.target.value });
    this.refs.child.startTimer();
  };

  maxChange = event => {
    this.setState({ max: event.target.value });
  };
  handleclike = () => {
    this.setState({
      random: Math.floor(Math.random() * 10 + this.state.max, this.state.min)
      });
     
  };
  userinput = event => {
    const newValue = Number.parseInt(event.target.value, 10);

    if (!newValue) {
      this.setState({
        error: "Value must be a number!"
      });
    } else {
      this.setState({
        error: null
      });

      this.setState({
        guess: Number.parseInt(event.target.value, 10) // the input value should be a number
      });
    }
  };

  onSubmit = event => {
    event.preventDefault();

    const { random, guess } = this.state;

    this.setState({
      try: this.state.try + 1
    });

    if (guess > 10 || guess < 1) {
      this.setState({
        error: "Value must be between 1 and 10!"
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
    if (this.state.status === this.state.random) {
      this.setState(getInitialState());
    }
  };

  render() {
    if (this.state.status === this.state.random) {
      return (
        <div style={{ textAlign: "center", marginTop: "15%" }}>
          <h1 style={{ color: "green" }}>You Won!</h1>
          <p>Random number: {this.state.random}</p>
          <p>Number of tries: {this.state.try}</p>
          <button onClick={this.resetGame}>Play again</button>
        </div>
      );
    }

    return (
      <div className="ui container" style={{ margin: "30px", width: "60%" }}>
        <div className="ui segment">
          <div className="ui form">
            <div className="field">
              <div>
                <label style={{ color: "red", padding: "100px",textAlignLe: "center" }}>
                                 RANDOM NUMBER GUESSING GAME
                </label>
                <Timer ref="child" />
              </div>
              <br />

              <div style={{ textAlign: "center", marginTop: "0%" }}>
                <div>
                  <label>Enter a number between 1 and 10</label>
                  <br />
                  <div>
                    <label>Min</label>
                    <input
                      type="number"
                      placeholder="1-10"
                      value={this.state.min}
                      onChange={this.minChange}
                      style={{
                        marginRight: "8px",
                        textAlign: "center",
                        height: "32px",
                        width: "150px"
                      }}
                    />
                    <br />
                  </div>
                  <div>
                    <label>Max</label>
                    <input
                      type="number"
                      placeholder="1-10"
                      value={this.state.max}
                      onChange={this.maxChange}
                      style={{
                        marginRight: "8px",
                        textAlign: "center",
                        height: "32px",
                        width: "150px"
                      }}
                    />
                    <br />
                  </div>

                  <button style={{ height: "32px",padding:"50"}}type="GameStart" onClick={this.handleclike}>
                    StartGame
                  </button>
                </div>
                <br />
                <div>
                  <p>This is the Random Number {this.state.random}</p>
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
                    width: "150px"
                  }}
                  placeholder="1-10"
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
