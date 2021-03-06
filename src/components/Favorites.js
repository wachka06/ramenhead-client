import React, { Component } from 'react';
import { Rating } from 'semantic-ui-react'

class Favorites extends Component {
  renderRamen = () => {
      if (this.props.restaurant) {
        return (
          <div className="favorite-ramen">
            {this.props.restaurant.image_url &&
              <img className="favorite-img" src={this.props.restaurant.image_url} width="200" height="200" alt=""/>}
            <div className="favorite-details">
              <h2>{this.props.restaurant.name}</h2>
              <Rating defaultRating={this.props.restaurant.rating} maxRating={5} disabled/>
              <p>{this.props.restaurant.price}</p>
              <p>{this.props.restaurant.display_phone}</p>
              <p>{this.props.restaurant.display_address && this.props.restaurant.display_address}</p>
            </div>
          </div>
       )
      }
  }

  render() {
    return (
      <div>
        {this.renderRamen()}
      </div>
    );
  }
}

export default Favorites;
