import React from 'react'
import './App.css';
import Circle from './Circle';
import { Component } from 'react';
import GameOver from './GameOver';
import './Circle.css'


import bark from './sounds/dogbark.mp3';
import click from './sounds/click.mp3';
import start from './sounds/start.mp3';
import end from './sounds/end.mp3';

const dogBark = new Audio(bark);
const clicked = new Audio(click);
const started = new Audio(start);
const ended = new Audio(end);


const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class App extends Component {
  state = {
    circles: [1, 2, 3, 4],
    score: 0,
    current: 0,
    speed: 2000,
    showGameOver: false,
    gameStart: false,
    rounds: 0,
  };

  timer;

  randomCircle = () => {
    let nextActive;

    do {
      nextActive = randomNumber(1, 4);
    } while (nextActive === this.state.current);
    if (nextActive !== this.state.current) {
      this.setState({
        rounds: this.state.rounds + 1
      });
      if (this.state.rounds >= 5) {
        this.endHandler();
      } else {
        started.pause();
        dogBark.play();
        this.setState({ current: nextActive });
      }
    }
  }

  clickHandler = (index) => {
    clicked.play();
    if (index !== this.state.current) {
      this.endHandler();
    } else {
      this.setState({
        score: this.state.score + 10,
        rounds: 0

      });
    }
  }

  startHandler = () => {
    started.play();
    this.setState({
      gameStart: true,
      speed: this.state.speed - 10,
    });
    this.timer = setInterval(this.randomCircle, this.state.speed);
  }

  playAgain = () => {
    this.setState({
      showGameOver: false
    });
    this.startHandler();
  }

  endHandler = () => {
    started.pause();
    ended.play();
    clearInterval(this.timer);
    this.setState({
      showGameOver: true,
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
            index={circle}
            click={() => this.clickHandler(circle)}
            class={this.state.current === circle ? "circle active" : "circle"}
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
