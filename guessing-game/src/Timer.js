import React from 'react'
const getInitialState = () => ({
  time:{},
  seconds:30
});
class Timer extends React.Component {
    constructor() {
      super();
      this.state = getInitialState();
      this.timer = 0;
      this.timecounter=0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
  
    secondsToTime(secs){
      let divisor_for_minutes = secs % (60 * 60);
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
    }
  
    startTimer() {
      if (this.timer ===0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
    resetGame = () => {
     
        this.setState(getInitialState());
        window.location.reload(false);
    };
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.timecounter+=1
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
        
      });if( this.timecounter===20){
        
        alert("Oops!!! 10 second left")
      }
      
      // Check if we're at zero.
      if (seconds === 0) { 
        clearInterval(this.timer);
          
        return;
     
      }
    }
  
    render() {
      if (this.state.seconds === 0) { 
        clearInterval(this.timer);
     
     return(<div style={{textAlign:"center"}}>
       <h1 style={{ color: "green" }}>Game over!</h1>
     <button onClick={this.resetGame} >New Game</button>
     </div>)
      }
    
      return(
        <div>
          
        Running time: {this.state.time.s}
        
        </div>
      );
    }
  }
  
  export default Timer;
  