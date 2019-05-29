import React, { Component, Fragment } from "react";
import Section from "./Section";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      date: "",
      number: ""
    };
  }
  handleInputChange = () => {
    let { value } = this.refs.number;
    if (value <= 0) value = "";
    this.setState({
      value
    });
  };
  componentDidUpdate(prevProps, prevState) {
    const urls = [
      {
        url: `http://numbersapi.com/${this.state.value}/year?json`,
        propertyName: "date"
      },
      {
        url: `http://numbersapi.com/${this.state.value}/math?json`,
        propertyName: "number"
      }
    ];
    const fetchFunction = (API, stateProperty) => {
      fetch(API)
        .then(res => {
          if (res.ok) return res.json();
          throw Error();
        })
        .then(res => {
          this.setState({
            [stateProperty]: res.text
          });
        })
        .catch(() => {
          this.setState({
            [stateProperty]: ""
          });
        });
    };
    if (prevState.value !== this.state.value)
      urls.forEach(obj => fetchFunction(obj.url, obj.propertyName));
  }
  render() {
    return (
      <Fragment>
        <div id="inputWrapper">
          <input
            type="number"
            placeholder="Please, write a number"
            value={this.state.value}
            ref="number"
            onChange={this.handleInputChange}
          />
        </div>
        {this.state.date && (
          <Section content={this.state.date} title={"history"} />
        )}
        {this.state.number && (
          <Section
            content={this.state.number}
            title={"mathematics and science"}
          />
        )}
      </Fragment>
    );
  }
}
export default App;
