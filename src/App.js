import React from 'react'
import './App.css';
import Circle from './Circle';
import { Component } from 'react';
import Modal from './Modal';


const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class App extends Component {
  state = {
    score: 0,
    current: 0,
    circles: [1, 2, 3, 4],
    speed: 2000,
    rounds: 0,
    showGameOver: false,
    gameStarted: false,
    lives: 5,
    start: false

  };
  timer;
  nextCircle = () => {
    if (this.state.lives <= 0) {
      this.endGame();
    }
    let activeCircle;
    do {
      activeCircle = randomNumber(0, this.state.circles.length - 1);
    } while (activeCircle === this.state.current);
    this.setState({
      current: activeCircle
    })
  }

  clickHandler = () => {
    this.setState({
      score: this.state.score + 10
    });

  }
  startGame = () => {
    if (this.state.lives === 0) {
      this.endGame();
    } else {
      this.setState({
        gameStarted: true,
        start: !this.state.start
      });
      this.timer = setInterval(this.nextActive, this.state.speed);
    }

  }

  endGame = () => {
    clearInterval(this.timer);
    this.setState({
      showGameOver: true,
      rounds: this.state.rounds + 1
    });
    if (this.state.rounds === 5) {
      this.closeHandler();
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
            key={circle.id}
            id={circle.id}
            active={circle.active}
            disabled={this.state.current === 0}
            click={this.clickHandler} />))}
        </div>
        <div>
          {this.state.showGameOver && <Modal
            score={this.state.score}
            message={
              this.state.score <= 100 ? `Your score was ${this.state.score}, Try hard to score more.` : this.state.score <= 200 ? `Your score was ${this.state.score}, You're improving yourself.` : `Your score was ${this.state.score}, You set the bar high.`
            }
            close={this.closeHandler}
          />
          }
        </div>
        <div className='btn'>
          <button onClick={this.startGame}>start</button>
          <button onClick={this.endGame}>end</button>
        </div>
      </div>
    );
  }
}



export default App;
