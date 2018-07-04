import React, { Component } from 'react';
import { Button } from 'reactstrap';
import cn from 'classnames';
import step from '../life';
import * as fieldset from '../statField';

class Field extends Component {
  state = { autoSteps: false, fild: [] };

  componentDidMount = () => {
    this.setState((previousState, currentProps) =>
      ({ ...previousState, fild: fieldset.addGlider(fieldset.glider(currentProps.size)) }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.autoSteps && this.state.autoSteps) {
      this.stepTimer = setInterval(() => this.nextState(), 250);
    }
    if (prevState.autoSteps && !this.state.autoSteps) {
      clearInterval(this.stepTimer);
    }
  }

  renderCells = () =>
    this.state.fild.map((row, y) =>
      row.map((cell, x) =>
        <div
          key={`${x}${y}`}
          className={cn({ 'bg-secondary': (cell === 1), border: true })}
          onClick={this.clickHandler(x, y)}
          />))

  clickHandler = (x, y) => () => {
    const { fild } = this.state;
    this.setState({ fild: fieldset.addCell(fild, x, y) });
  }

  nextState = () => {
    this.setState({ fild: step(this.state.fild) });
  }

  startAutoRun = () => {
    if (!this.state.autoSteps) {
      this.setState({ autoSteps: true });
    }
  }

  stopAutoRun = () => {
    if (this.state.autoSteps) {
      this.setState({ autoSteps: false });
    }
  }

  oneStep = () => {
    this.setState({ autoSteps: false });
    this.nextState();
  }

  resetField = () => {
    this.setState({ fild: fieldset.empty(this.props.size), autoSteps: false });
  }

  resetFieldGlider = () => {
    const { fild } = this.state;
    this.setState({ fild: fieldset.addGlider(fild) });
  }


  render() {
    const style = {
      display: 'grid',
      width: '500px',
      height: '500px',
      gridTemplateRows: `repeat(${this.props.size}, 1fr)`,
      gridTemplateColumns: `repeat(${this.props.size}, 1fr)`,
    };
    const activeClass = cn({
      border: true,
      'border-warning': !this.state.autoSteps,
      'border-info': this.state.autoSteps,
    });
    const autoplayStop = cn({
      'm-2': true,
      disabled: !this.state.autoSteps,
    });
    const autoplayRun = cn({
      'm-2': true,
      disabled: this.state.autoSteps,
    });
    return (
      <div>
        <div className="d-flex justify-content-center m-5">
          <div style={style} className={activeClass}>
            {this.renderCells()}
          </div>
        </div>
        <div className="d-flex justify-content-center m-5">
          <Button className={autoplayRun} color="info" onClick={this.startAutoRun}>start</Button>
          <Button className={autoplayStop} color="warning" onClick={this.stopAutoRun}>stop</Button>
          <Button className="m-2" color="success" onClick={this.oneStep}>step</Button>
          <Button className="m-2" color="danger" onClick={this.resetField}>reset</Button>
          <Button className="m-2" color="secondary" onClick={this.resetFieldGlider}>create glider</Button>
        </div>
      </div>
    );
  }
}

export default Field;
