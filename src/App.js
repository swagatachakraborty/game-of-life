import React, { Component } from 'react';
import { createBoard } from './lib';
import nextGeneration from './gameOfLife';

import './App.css';

class Button extends Component {
  render() {
    return (
      <div
        id={this.props.value}
        className="btn"
        onClick={this.props.clickListener}
      >
        {this.props.value}
      </div>
    );
  }
}

const Cell = function(props) {
  const className = props.isAlive ? 'aliveCells' : 'deadCells';
  return (
    <td id={props.index} className={className} onClick={props.clickListener} />
  );
};

class Row extends Component {
  constructor(props) {
    super(props);
    this.indexes = props.indexes;
    this.liveCells = props.liveCells;
    this.clickListener = props.clickListener;
    this.createCells = this.createCells.bind(this);
  }

  createCells() {
    const row = this.indexes.map((cell, index) => {
      const isCellAlive = this.liveCells.includes(cell);
      return (
        <Cell
          key={index}
          index={cell}
          isAlive={isCellAlive}
          clickListener={this.clickListener}
        />
      );
    });
    return row;
  }

  render() {
    this.liveCells = this.props.liveCells;
    return <tr>{this.createCells()}</tr>;
  }
}

class World extends Component {
  constructor(props) {
    super(props);
    this.bound = props.bound;
    this.liveCells = props.liveCells;
    this.clickListener = props.clickListener;
    this.createWorldGrid = this.createWorldGrid.bind(this);
  }

  createWorldGrid() {
    const world = createBoard(this.bound);
    const rows = world.map((row, index) => {
      return (
        <Row
          key={index}
          indexes={row}
          liveCells={this.liveCells}
          clickListener={this.clickListener}
        />
      );
    });
    return rows;
  }

  render() {
    this.liveCells = this.props.liveCells;
    return (
      <table className="worldGrid">
        <tbody>{this.createWorldGrid()}</tbody>
      </table>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.bound = props.bound;
    this.state = {
      liveCells: []
    };

    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.initializeLiveCells = this.initializeLiveCells.bind(this);
  }

  startGame() {
    const intervalId = setInterval(() => {
      this.updateLiveCells();
      if (this.state.liveCells.length === 0) clearInterval(intervalId);
    }, 500);
  }

  endGame() {
    this.setState({
      liveCells: []
    });
  }

  updateLiveCells() {
    const nextGenerationLiveCells = nextGeneration(
      this.state.liveCells,
      this.bound
    );

    this.setState({
      liveCells: nextGenerationLiveCells.map(x => x.toString())
    });
  }

  initializeLiveCells(event) {
    const cell = event.target.id;
    this.setState({
      liveCells: this.state.liveCells.concat(cell)
    });
  }

  render() {
    return (
      <main>
        <p className="header">The Game Of Life</p>
        <div className="world">
          <World
            bound={this.bound}
            liveCells={this.state.liveCells}
            clickListener={this.initializeLiveCells}
          />
        </div>
        <div className="footer">
          <Button clickListener={this.startGame} value="START" />
          <Button clickListener={this.endGame} value="STOP" />
        </div>
      </main>
    );
  }
}

export default App;
