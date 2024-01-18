import React, { Component } from "react";
import { Link } from "react-router-dom";

class Cart extends Component {
  state = {
    totalItems: 0,
    totalPrice: 0,
  };

  componentDidMount() {
    this.calculateTotalItemsInCart();
    this.calculateTotalPrice();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemsInCart !== this.props.itemsInCart) {
      this.calculateTotalItemsInCart();
      this.calculateTotalPrice();
    }
  }

  calculateTotalItemsInCart = () => {
    const { itemsInCart } = this.props;
    let totalItems = 0;
    itemsInCart.forEach((item) => {
      totalItems += item.quantityInCart;
    });
    this.setState({ totalItems });
  };

  calculateTotalPrice = () => {
    const { itemsInCart } = this.props;
    let totalPrice = 0;
    itemsInCart.forEach((item) => {
      totalPrice += item.price * item.quantityInCart;
    });
    totalPrice = totalPrice.toFixed(2);
    this.setState({ totalPrice });
  };

  createOrder = () => {
    const { itemsInCart } = this.props;
    const order = {
      items: itemsInCart,
      totalItems: this.state.totalItems,
      totalPrice: this.state.totalPrice,
    };
    return order;
  };

  render() {
    const { itemsInCart, onRemoveFromCart } = this.props;
    const { totalItems, totalPrice } = this.state;
    return (
      <div className="container my-5">
        <h1>Cart</h1>
        <div className="row">
          <div className="col-8 bg-light">
            <div className="row">
              {itemsInCart.map((item) => {
                return (
                  <div className="col-12" key={item.id}>
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item.image}
                            className="img-fluid rounded-start"
                            alt={item.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">
                              <small className="text-muted">
                                Quantity: {item.quantityInCart}
                              </small>
                              <div className="btn-group mx-2">
                                <button
                                  onClick={() => this.props.onDecrement(item)}
                                  className="btn btn-sm btn-outline-secondary"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() => this.props.onAddToCart(item)}
                                  className="btn btn-sm btn-outline-secondary"
                                >
                                  +
                                </button>
                              </div>
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Price: ${item.price}
                              </small>
                            </p>
                            <button
                              onClick={() => {
                                onRemoveFromCart(item);
                              }}
                              className="btn btn-danger"
                            >
                              Remove from cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-12">
                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Cart Summary</h5>
                    <p className="card-text">Total Items: {totalItems}</p>
                    <p className="card-text">Total Price: {totalPrice}</p>
                    <Link to="/checkout">
                      <button
                        onClick={() => {
                          this.props.onCheckout(this.createOrder());
                        }}
                        className="btn btn-primary"
                      >
                        Proceed to checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
