import React, { Component } from "react";
import "./css/Store.css";

class Store extends Component {
  state = {
    products: this.props.products,
    itemsInCart: this.props.itemsInCart,
    pageSize: 4,
    currentPage: 1,
  };

  render() {
    const { itemsInCart } = this.props;
    return (
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="row gy-3">
            <div className="col-12">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort by
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => this.handleSort("name")}
                    >
                      Name
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => this.handleSort("price")}
                    >
                      Price
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {this.state.products.map((product) => {
              return (
                <div className="col-xl-3 col-lg-4 col-sm-6" key={product.id}>
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
                      <p className="card-text align-self-end">
                        ${product.price}
                      </p>
                      {/* plus and minus buttons wrapped around item quantity */}

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            onClick={() => this.props.onDecrement(product)}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            -
                          </button>
                          <button
                            onClick={() => this.props.onAddToCart(product)}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            +
                          </button>
                        </div>
                        <small className="text-muted">
                          Quantity:{" "}
                          {itemsInCart.find((item) => item.id === product.id)
                            ?.quantityInCart || 0}
                        </small>
                      </div>

                      <button
                        onClick={() => this.props.onAddToCart(product)}
                        className="btn btn-primary align-self-end"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Store;
