import React, { Component } from "react";

class Checkout extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { order } = this.props;
    return (
      <div className="container my-5">
        <h1>Checkout</h1>
        {order.items.map((item) => {
          return (
            <div className="row mb-3">
              <div className="col-8 bg-light">
                <div className="row p-2">
                  <div className="col-4">
                    <img
                      src={item.image}
                      className="img-fluid"
                      alt={item.name}
                    />
                  </div>
                  <div className="col-8">
                    <h5>{item.name}</h5>
                    <p>Quantity: {item.quantityInCart}</p>
                    <p>Price: ${item.price}</p>
                    <p>
                      Total: ${(item.price * item.quantityInCart).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Checkout;
