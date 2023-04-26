import React from 'react'
import './App.css';
import Circle from './Circle';
import { Component } from 'react';
import GameOver from './GameOver';
import './Circle.css'

// importing sounds
import meow from './sounds/meow.mp3';
import click from './sounds/click.mp3';
import start from './sounds/start.mp3';
import end from './sounds/end.mp3';

// Adding sounds to handler
const meowed = new Audio(meow);
const clicked = new Audio(click);
const started = new Audio(start);
const ended = new Audio(end);

class App extends Component {
  state = {
    circles: [],
    score: 0,
    current: 0,
    speed: 2000,
    showGameOver: false,
    gameStart: false,
    rounds: 0,
    timer: null,
    level: null,
    selectedLevel: false
  };

  randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  setLevel = (level) => {
    let circles = [];
    if (level === 'easy') {
      circles = [1, 2, 3, 4];
    } else if (level === 'medium') {
      circles = [1, 2, 3, 4, 5];
    } else if (level === 'hard') {
      circles = [1, 2, 3, 4, 5, 6];
    }
    this.setState({
      circles,
      level,
      selectedLevel: true
    })
  }

  randomCircle = () => {
    let nextActive;
    do {
      nextActive = this.randomNumber(1, this.state.circles.length);
    } while (nextActive === this.state.current);
    if (nextActive !== this.state.current) {
      this.setState({
        rounds: this.state.rounds + 1
      });
      if (this.state.rounds >= 3) {
        this.endHandler();
      } else {
        meowed.play();
        this.setState({ current: nextActive, speed: this.state.speed - 10 });
      }
    }
  }

  // handler to the click circle
  clickHandler = (index) => {
    clicked.play();
    if (index !== this.state.current) {
      return this.endHandler();
    } else {
      this.setState({
        score: this.state.score + 10,
        rounds: 0

      });
    }
  }

  //handler to operates game after pressing start button
  startHandler = () => {
    started.play();
    this.setState({
      gameStart: true,
      timer: setInterval(this.randomCircle, this.state.speed)
    });

  }

  // handler to start the game directly from modal
  playAgain = () => {
    clearInterval(this.state.timer);
    this.setState({
      showGameOver: false,
      score: 0
    });
    this.startHandler();
  }

  // handler to end the game
  endHandler = () => {
    started.pause();
    ended.play();
    clearInterval(this.state.timer);
    this.setState({
      showGameOver: true,
    });
  }
  closeHandler = () => {
    this.setState({
      circles: [],
      score: 0,
      current: 0,
      speed: 2000,
      showGameOver: false,
      gameStart: false,
      rounds: 0,
      timer: null,
      level: null,
      selectedLevel: false
    });
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1>Speed Game!</h1>
        </div>
        <div hidden={!this.state.gameStart}>
          <h4>Currently you are playing: {this.state.level} level </h4>
          <p>score: <span>{this.state.score}</span></p>
        </div>
        <div>
          <div className='level'>
            <h3 hidden={this.state.gameStart}>Select the difficulty level</h3>
          </div>
          <div className='level_button'>
            <button onClick={() => this.setLevel('easy')} hidden={this.state.gameStart}>Easy</button>
            <button onClick={() => this.setLevel('medium')} hidden={this.state.gameStart}>Medium</button>
            <button onClick={() => this.setLevel('hard')} hidden={this.state.gameStart}>Hard</button>
          </div>
        </div>
        <div className='circles'>
          {this.state.circles.map((circle) => (<Circle
            key={circle}
            index={circle}
            click={() => this.clickHandler(circle)}
            pointerToggle={this.state.gameStart}
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
        {this.state.selectedLevel && <div className='btn'>
          <button onClick={this.startHandler}
            hidden={this.state.gameStart}>start</button>
          <button onClick={this.endHandler} hidden={!this.state.gameStart}>end</button>
        </div>
        }
      </div>
    );
  }
}

export default App;
