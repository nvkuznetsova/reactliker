import 'babel-polyfill';
import React, { Component as Comp } from 'react';
import { render as r } from 'react-dom';

class Stars extends Comp {
  constructor(props) {
    super();
  }
  render() {
    return <span> { "⭐".repeat(this.props.length) } </span>;
  }
};

class Counter extends Comp {
  constructor(props) {
    super();
    this.state = {
      id: props.id,
      title: props.title,
      votes: props.votes
    };
  }
  add() {
    const votes = +this.state.votes + 1;
    this.setState({ votes });
  }
  sub() {
    const votes = this.state.votes > 0 ? +this.state.votes - 1 : 0;
    this.setState({ votes });
  }
  render() {
    return (
      <div>
        <span> {this.state.title} </span>
        <button onClick = {() => this.add()}> + </button>
        &nbsp;
        <button onClick = {() => this.sub()}> - </button>
        <Stars length={this.state.votes} />
        <hr />
      </div>
    );
  }
}

class Frameworks extends Comp {
  constructor(props) {
    super();
    const { stars } = props;
    this.state = { data: [] };
  }
  render() {
    return (
      <div> {
        this.state.data.map(x => {
          return <Counter id = {x.id} title = { x.title } votes={ x.votes } />
          })
        }
      </div>
    );
  }
  componentDidMount() {
    fetch('https://kodaktor.ru/j/react5b_6cbf2')
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }
}

r(
  <Frameworks />,
  document.querySelector('.cont'),
);
