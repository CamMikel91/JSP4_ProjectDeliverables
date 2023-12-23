import React, { Component } from "react";
import "./css/Store.css";

class Store extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row gy-4 mt-4">
          {this.props.products.map((product) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-12" key={product.id}>
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top h-75 object-fit-cover"
                    alt={product.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h4 className="card-title mb-3">{product.name}</h4>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text available">
                      Available: {product.quantity}
                    </p>
                    <p className="card-text align-self-end">${product.price}</p>
                    <a href="#" className="btn btn-primary align-self-end">
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Store;
