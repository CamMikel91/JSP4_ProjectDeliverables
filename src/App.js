import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { getProducts } from "./data/ItemsData";
import NavBar from "./components/common/NavBar";
import Store from "./components/Store";
import Cart from "./components/Cart";
import Checkout from "./components/OrderCheckout";
import "bootstrap/dist/css/bootstrap.css";
import "./css/App.css";

// return <Store products={this.state.products} />;

class App extends Component {
  state = {
    products: getProducts(),
    itemsInCart: [],
    order: [],
  };

  handleAddToCart = (product) => {
    const productInCart = this.state.itemsInCart.find(
      (item) => item.id === product.id
    );
    if (productInCart) {
      const currentCart = [...this.state.itemsInCart];
      const index = currentCart.indexOf(productInCart);
      currentCart[index] = { ...currentCart[index] };
      currentCart[index].quantityInCart++;
      this.setState({ itemsInCart: currentCart });
    } else {
      const currentCart = [...this.state.itemsInCart];
      currentCart.push({ ...product, quantityInCart: 1 });
      this.setState({ itemsInCart: currentCart });
    }
  };

  handleDecrement = (product) => {
    const productInCart = this.state.itemsInCart.find(
      (item) => item.id === product.id
    );
    const currentCart = [...this.state.itemsInCart];
    const index = currentCart.indexOf(productInCart);
    currentCart[index] = { ...currentCart[index] };
    currentCart[index].quantityInCart--;
    if (currentCart[index].quantityInCart === 0) {
      currentCart.splice(index, 1);
    }
    this.setState({ itemsInCart: currentCart });
  };

  handleRemoveFromCart = (product) => {
    const productInCart = this.state.itemsInCart.find(
      (item) => item.id === product.id
    );
    const currentCart = [...this.state.itemsInCart];
    const index = currentCart.indexOf(productInCart);
    currentCart.splice(index, 1);
    this.setState({ itemsInCart: currentCart });
  };

  handleCheckout = (order) => {
    this.setState({ order });
  };

  render() {
    return (
      <>
        <NavBar itemsInCart={this.state.itemsInCart} />
        <main className="container">
          <Switch>
            <Route
              path="/store"
              render={() => (
                <Store
                  products={this.state.products}
                  itemsInCart={this.state.itemsInCart}
                  onAddToCart={this.handleAddToCart}
                  onDecrement={this.handleDecrement}
                  onRemoveFromCart={this.handleRemoveFromCart}
                />
              )}
            />
            <Route
              path="/cart"
              render={() => (
                <Cart
                  itemsInCart={this.state.itemsInCart}
                  onAddToCart={this.handleAddToCart}
                  onDecrement={this.handleDecrement}
                  onRemoveFromCart={this.handleRemoveFromCart}
                  onCheckout={this.handleCheckout}
                />
              )}
            />
            <Route
              path="/checkout"
              render={() => <Checkout order={this.state.order} />}
            />
            <Redirect from="/" exact to="/store" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
