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
      min: "",
      random: "",
      max: "",
      userInput: "",
      counter: 5,
      try: 0
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
    this.refs.child.startTimer()
    this.setState({ min: event.target.value });
    
  };

  maxChange = event => {
    this.setState({ max: event.target.value });
    
  };
  handleclike = () => {
   
    this.setState({
      random: Math.floor(Math.random()*(this.state.max-this.state.min+1)+this.state.min)
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
    //console.log(this.state.try);

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
    window.location.reload(false);
  };

  render() {
    if (this.state.status === this.state.random) {
      clearInterval(this.refs.child.timer)
      return (
        <div style={{ textAlign: "center", marginTop: "15%" }}>
          <h1 style={{ color: "green" }}>You Won!</h1>
          <p>Random number: {this.state.random}</p>
          <p>Number of tries: {this.state.try}</p>
          <p>Total time taken:{this.refs.child.timecounter}</p>
          <button onClick={this.resetGame}>Play again</button>
        </div>
      );
    }
    if(this.state.counter===this.state.try){
      clearInterval(this.refs.child.timer)
     return( <div  style={{ textAlign: "center", marginTop: "15%" }}>
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
          boxShadow:  "3px 3px 5px 6px #ccc"
        }}
      >
        <div className="ui segment">
          <div className="ui form" style={{ color: "blue" }}>
            <div className="field">
              <div>
                <label style={{ color: "red", padding: "150px" }}>
                  RANDOM NUMBER GUESSING GAME
                </label>               
                 <Timer ref="child" />
              </div>
              <br />

              <div style={{ textAlign: "center", marginTop: "1%" }}>
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
                        width: "32%"
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
                        width: "32%"
                      }}
                    />
                    <br />
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
                  placeholder="1-10"
                  onChange={this.userinput}
                />
                <br />
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
/*<div>
<p>This is the Random Number {this.state.random}</p>
</div>

,mozBoxShadow:   " 3px 3px 5px 6px #ccc",
      webkitBoxShadow: "3px 3px 5px 6px #ccc",BoxShadow:"3px 3px 5px 6px #ccc",backgroundColor: "rgb(68,68,68)"




*/
