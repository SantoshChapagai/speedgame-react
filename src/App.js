import React from 'react'
import './App.css';
import Circle from './Circle';
import { Component } from 'react';
import GameOver from './GameOver';


// const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class App extends Component {
  state = {
    circles: [1, 2, 3, 4],
    score: 0,
    current: 0,
    speed: 2000,
    showGameOver: false,
    gameStart: false,
    rounds: 0,
    color: 'pink'


  };
  timer;
  randomNumber = () => {
    let nextActive;
    do {
      nextActive = Math.floor(Math.random() * 4) + 1;
    } while (nextActive === this.state.current);
    const colors = ['blue', 'red', 'green', 'yellow'];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    this.setState({ current: nextActive, color: newColor });
    console.log("active is", nextActive, newColor);
  }


  clickHandler = (circle) => {
    if (circle === this.state.current) {
      this.setState({
        score: this.state.score + 10,
        rounds: this.state.rounds + 1
      });
      if (this.state.rounds >= 5) {
        this.endHandler();
      }
    } else {
      this.setState({
        rounds: 0
      });
      this.endHandler();
    }
  }
  startHandler = () => {
    this.setState({
      gameStart: true,
    });
    this.timer = setInterval(this.randomNumber, this.state.speed);

  }

  endHandler = () => {
    clearInterval(this.timer);
    this.setState({
      timer: this.timer,
      showGameOver: true,
      rounds: 0
    });
  }
  closeHandler = () => {
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Speed Game</h1>
        </div>
        <div>
          <p>score: <span>{this.state.score}</span></p>
        </div>
        <div className='circles'>
          {this.state.circles.map((circle) => (<Circle
            key={circle}
            circle={circle}
            color={this.state.current === circle ? this.state.color : 'purple'}
            active={this.state.current === circle}
            click={this.clickHandler} />))}
        </div>
        <div>
          {this.state.showGameOver && <GameOver
            score={this.state.score}
            message={
              this.state.score <= 100 ? `Your score was ${this.state.score}, Try hard to score more.` : this.state.score <= 200 ? `Your score was ${this.state.score}, You're improving yourself.` : `Your score was ${this.state.score}, You set the bar high.`
            }
            close={this.closeHandler}
          />
          }
        </div>
        <div className='btn'>
          <button onClick={this.startHandler}
            disabled={this.timer}>start</button>
          <button onClick={this.endHandler} disabled={!this.timer}>end</button>
        </div>
      </div>
    );
  }
}

export default App;
