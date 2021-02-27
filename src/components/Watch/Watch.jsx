import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Watch.css';

const MS_IN_MINUTE = 60 * 1000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;

export default class Watch extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  constructor(...props) {
    super(...props);

    const date = new Date();
    const localTzOffset = date.getTimezoneOffset() * MS_IN_MINUTE;

    const tzOffset = parseFloat(this.props.offset);
    if (Number.isNaN(tzOffset)) {
      throw new Error('Invalid timezone offset');
    }

    this.timeout = 0;
    this.state = {
      name: this.props.name,
      offset: MS_IN_HOUR * tzOffset + localTzOffset,
      time: date.getTime(),
    };
  }

  setTimer() {
    this.clearTimer();
    this.timeout = setTimeout(() => {
      this.setState((prev) => ({
        ...prev,
        time: Date.now(),
      }));
    }, 1000);
  }

  clearTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = 0;
    }
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate() {
    this.setTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  handleRemove = () => {
    this.clearTimer();
    this.props.onRemove(this.props.id);
  }


  render() {
    const time = this.state.time + this.state.offset;
    const date = new Date(time);

    const hours = date.getHours();
    const hDeg = (360 * ((hours % 12) / 12)).toFixed(0);
    const hourArrowStyle = {
      transform: `rotate(${hDeg}deg)`
    };

    const minutes = date.getMinutes();
    const minDeg = (360 * (minutes / 60)).toFixed(0);
    const minArrowStyle = {
      transform: `rotate(${minDeg}deg)`
    };

    const seconds = date.getSeconds();
    const secDeg = (360 * (seconds / 60)).toFixed(0);
    const secArrowStyle = {
      transform: `rotate(${secDeg}deg)`
    };

    const timeFmt = date.toLocaleTimeString();

    return (
      <div className="watch">
        <div className="watch__title">{this.state.name}</div>
        <div className="watch__time" title={timeFmt}>
          <span className="watch__arrow watch__hour-arrow" style={hourArrowStyle} />
          <span className="watch__arrow watch__minute-arrow" style={minArrowStyle} />
          <span className="watch__arrow watch__second-arrow" style={secArrowStyle} />
        </div>
        <button className="watch__close-btn" onClick={this.handleRemove}>&times;</button>
      </div>
    )
  }
}
