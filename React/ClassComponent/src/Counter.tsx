import React, { Component } from 'react'

interface CounterProps{
    number: number
}

export default class Counter extends Component<CounterProps> {
  render() {
    return (
      <div>
        <h3>{this.props.number}</h3>
      </div>
    )
  }
}


