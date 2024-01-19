import React, { Component } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import _ from "lodash";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
import "./css/Store.css";

class Store extends Component {
  state = {
    products: this.props.products,
    searchTerm: "",
    sortBy: "id",
    sortDirection: "asc",
    pageSize: 4,
    currentPage: 1,
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { itemsInCart } = this.props;
    const {
      pageSize,
      currentPage,
      searchTerm,
      sortBy,
      sortDirection,
      products,
    } = this.state;

    const filtered = products.filter((product) => {
      if (searchTerm === "") return product;
      else if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return product;
      }
      return null;
    });

    const sorted = _.orderBy(filtered, [sortBy], [sortDirection]);

    const paginated = paginate(sorted, currentPage, pageSize);

    return (
      <div className="container-fluid">
        <div className="row my-3">
          <div className="row gy-3">
            {/* Search Start */}
            <div className="col-sm-12 col-md-6">
              <label htmlFor="search" className="mb-2">
                Search
              </label>
              <InputGroup className="mb-3" id="search">
                <FormControl
                  onChange={(e) =>
                    this.setState({ searchTerm: e.target.value })
                  }
                  placeholder="Product Name"
                />
              </InputGroup>
            </div>
            {/* Search End */}
            {/* Sort Start */}
            <div className="col-sm-12 col-md-6 mb-3">
              <label htmlFor="sort" className="form-label">
                Sort by:
              </label>
              <InputGroup className="mb-3">
                <select
                  className="form-select"
                  id="sort"
                  name="sort"
                  onChange={(e) => {
                    this.setState({ sortBy: e.currentTarget.value });
                  }}
                >
                  <option value="default">Default</option>
                  <option value="name">Product Name</option>
                  <option value="price">Price</option>
                </select>
                <Button
                  onClick={() => {
                    this.setState({
                      sortDirection:
                        this.state.sortDirection === "asc" ? "desc" : "asc",
                    });
                  }}
                  variant="outline-secondary"
                  id="sortDirection"
                >
                  {sortDirection === "asc" ? "Ascending" : "Descending"}
                </Button>
              </InputGroup>
            </div>
            {/* Sort End */}
            {paginated.map((product) => {
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
                      {/* plus and minus buttons wrapped around product quantity */}

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
        <div className="row">
          <Pagination
            itemsCount={sorted.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Store;
