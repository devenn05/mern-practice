import React, { Component } from "react";
import Counter from "./Counter";
import Work from "./Work";

interface AppState{
  count: number;
}

class App extends Component<{}, AppState>{
  constructor(props: any){
    super(props);
    this.state = {count: 10}
  }

  add =() =>{
    this.setState({count: this.state.count + 1})
  }
  subtract= () =>{
    this.setState({count: this.state.count - 1})
  }

  render(){
    return(
      <>
      <h1>Hello</h1>
      <br />
      <button onClick={this.add}>Add</button>
      <button onClick={this.subtract}>Subtract</button>
      <Counter number = {this.state.count}></Counter>
      <Work></Work>

      </>
    )
  }
}

export default App;

