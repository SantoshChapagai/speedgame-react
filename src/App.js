import React from 'react'
import './App.css';
import Circle from './Circle';
import { Component } from 'react';
import GameOver from './GameOver';


// import bark from './sounds/dogbark.mp3';
// import click from './sounds/click.mp3';
// import start from './sounds/start.mp3';
// import end from './sounds/end.mp3';

// const dogBark = new Audio(bark);
// const clicks = new Audio(click);
// const started = new Audio(start);
// const ended = new Audio(end);


// const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class App extends Component {
  state = {
    circles: [1, 2, 3, 4],
    score: 0,
    current: 0,
    speed: 2000,
    showGameOver: false,
    gameStart: false,
    rounds: 0
  };

  timer;

  randomNumber = () => {
    let nextActive;

    do {
      nextActive = Math.floor(Math.random() * 4) + 1;
    } while (nextActive === this.state.current);
    this.setState({ current: nextActive });
    console.log("active is", nextActive);
  }

  clickHandler = (index) => {
    if (index !== this.state.current) {
      this.endHandler();



      /*       if (this.state.rounds >= 5) {
              return this.endHandler();
            } */
      // } else {
      //   this.setState({
      //     rounds: 0
      //   });
      // this.endHandler();
    } else {
      this.setState({
        score: this.state.score + 10,
        // rounds: this.state.rounds
      });
    }
  }
  startHandler = () => {
    this.setState({
      gameStart: true,
      speed: this.state.speed - 10,
      current: this.state.color
    });
    this.timer = setInterval(this.randomNumber, this.state.speed);
    if (this.state.rounds >= 5) {
      this.endHandler()
    }

  }
  playAgain = () => {
    this.setState({
      showGameOver: false
    });
    this.startHandler();
  }

  endHandler = () => {
    clearInterval(this.timer);
    this.setState({
      // timer: this.timer,
      showGameOver: true,
      // rounds: 0
    });
    if (this.state.rounds >= 5) {

    }
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
            index={circle - 1}
            click={this.clickHandler}
          />))}
        </div>
        <div>
          {this.state.showGameOver && <GameOver
            score={this.state.score}
            message={
              this.state.score <= 100 ? `Your score was ${this.state.score}, Try hard to score more.` : this.state.score <= 200 ? `Your score was ${this.state.score}, You're improving yourself.` : `Your score was ${this.state.score}, You set the bar high.`
            }
            close={this.closeHandler}
            play={this.playAgain}
          />
          }
        </div>
        <div className='btn'>
          <button onClick={this.startHandler}
            hidden={this.timer}>start</button>
          <button onClick={this.endHandler} hidden={!this.timer}>end</button>
        </div>
      </div>
    );
  }
}

export default App;
