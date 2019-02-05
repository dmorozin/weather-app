import React, { Component } from "react";

class Search extends Component {
  state = {
    city: "",
    country: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.city === "" || this.state.country === "") return;
    this.props.searchCity(this.state.city, this.state.country);
  };

  render() {
    return (
      <div className="mt-3 mx-auto">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="country"
                className="form-control"
                placeholder="Country"
                onChange={this.handleChange}
              />
            </div>

            <div className="col">
              <button type="submit" className="btn btn-primary mb-2">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
