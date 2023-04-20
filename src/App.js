import React from 'react'
import './App.css';
import Circle from './Circle';
import { Component } from 'react';



class App extends Component {
  state = {
    score: 0,
    counter: 0,
    circles: [1, 2, 3, 4]
  }
  clickHandler = () => {
    const updatedScore = this.state.score;
    console.log(updatedScore);
    this.setState({


    })

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
          {this.state.circles.map(() => (<Circle click={this.clickHandler} />))}
        </div>
        <div className='btn'>
          <button>start</button>
          <button>end</button>
        </div>
      </div>
    );
  }
}

export default App;
