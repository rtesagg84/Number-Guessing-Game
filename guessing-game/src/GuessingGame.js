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
    this.state = getInitialState();

    this.state = {
      min: 1,
      random: "",
      max: 10,
      userInput: "",
      counter: 5,
      try: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.status === this.state.random) {
      this.generateRandom();
    }
  }

  minChange = event => {
    event.preventDefault();
    const message=`Min must be smaller than max!`
    const max = parseInt(this.state.max);
    if (event.target.value >= max) {
      this.setState({
      error:message
      });
      return;
    } else {
      this.setState({ min: event.target.value });
    }
    const userMin = parseInt(event.target.value);
    this.setState({ min: userMin });
  };

  maxChange = event => {
    event.preventDefault();
    const userMax = parseInt(event.target.value);
    this.setState({ max: userMax });
  };
  generateRandom = () => {
    const { min, max } = this.state;
    clearInterval(this.refs.child.state.timerId);
   
    if((min >=1 && max <=10) && max > min){
      this.setState(
        {
          random: Math.floor(Math.random() * (max - min)) + min + 1
        },
        () => {
          this.refs.child.startTimer();
        }
      );
    } else{
    
    this.setState({
      error:"min and max must between 1 and 10"
    })
  }
      
    }
  


  userinput = event => {
    const newValue = parseInt(event.target.value, 10);
    (!newValue)? this.setState({
          error: "Value must be a number!"
        })
      : this.setState({
          error: null
        });
    this.setState({
      guess: parseInt(event.target.value, 10)
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { random, guess } = this.state;
    if (!guess || !random) {
      return;
    }
    this.setState({
      try: this.state.try + 1
    });

    if (guess > this.state.max|| guess < this.state.min) {
      const mes=`value must be between ${this.state.min} and ${this.state.max} `
      this.setState({
      error:mes
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
    window.location.reload(false);
  };

  
  render() {
    if (this.state.status === this.state.random) {
      clearInterval(this.refs.child.state.timerId);
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
      clearInterval(this.refs.child.state.timerId);
      return (
        <div style={{ textAlign: "center", marginTop: "15%" }}>
          <h1 style={{ color: "green" }}>
            Oops!! you reach the maximom trial!
          </h1>
          <button onClick={this.resetGame}>Play again</button>
        </div>
      );
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
              <div style={{ color: "red", textAlign:"center" }}>
                <label >
                  RANDOM NUMBER GUESSING GAME
                </label>
              </div>
              <br />
              <Timer ref="child" />
              <div style={{ textAlign: "center", marginTop: "1%" }}>
                <div>
                  <label>Enter a number between 1 and 10</label>
                  <br />
                  <div>
                    <label>Min</label>
                    <input
                      type="number"
                      placeholder="1"
                      value={this.state.usermin}
                      onChange={event => {
                        this.minChange(event);
                      }}
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
                      placeholder="10"
                      value={this.state.usermax}
                      onChange={event => {
                        this.maxChange(event);
                      }}
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
                    onClick={this.generateRandom}

                  >
                    Start Game
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
                  placeholder={`${this.state.min}-${this.state.max}`}
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
//
// 