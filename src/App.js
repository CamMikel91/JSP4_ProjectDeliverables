import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Store from "./components/Store";
import { getProducts } from "./data/ItemsData";
import "./css/App.css";

class App extends Component {
  state = {
    products: getProducts(),
  };
  render() {
    return <Store products={this.state.products} />;
  }
}

export default App;
