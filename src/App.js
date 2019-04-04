import React, { Component } from 'react';
import { createBoard } from './lib';
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
  return <td id={props.index} className={className} />;
};

class Row extends Component {
  constructor(props) {
    super(props);
    this.indexes = props.indexes;
    this.liveCells = props.liveCells;
    this.createCells = this.createCells.bind(this);
  }

  createCells() {
    const row = this.indexes.map((cell, index) => {
      const isCellAlive = this.liveCells.includes(cell);
      return <Cell key={index} index={cell} isAlive={isCellAlive} />;
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
    this.createWorldGrid = this.createWorldGrid.bind(this);
  }

  createWorldGrid() {
    const world = createBoard(this.bound);
    const rows = world.map((row, index) => {
      return <Row key={index} indexes={row} liveCells={this.liveCells} />;
    });
    return rows;
  }

  render() {
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
  }

  render() {
    return (
      <main>
        <p className="header">The Game Of Life</p>
        <div className="world">
          <World bound={this.bound} liveCells={this.state.liveCells} />
        </div>
        <div className="footer">
          <Button clickListener={this.startGame} value="START" />
        </div>
      </main>
    );
  }
}

export default App;
