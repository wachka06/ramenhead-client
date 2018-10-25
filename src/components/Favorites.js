import React, { Component } from 'react';
import { Rating } from 'semantic-ui-react'

class Favorites extends Component {
  renderRamen = () => {
    const bryan = {
      width:'500px',
      height:'200px'
    };

      if (this.props.restaurant) {
        return (
          <div className="display-ramen favorite-ramen">
          <p className="fav-img">{this.props.restaurant.image_url && <img src={this.props.restaurant.image_url} width="200" height="200" className="img" />}</p>
          <div className="restaurant-details">
            <h2>{this.props.restaurant.name}</h2>
            <span><p><Rating defaultRating={this.props.restaurant.rating} maxRating={5} disabled /></p>
            <p>{this.props.restaurant.price}</p></span>
            <p>{this.props.restaurant.display_phone}</p>
            <p>{this.props.restaurant.display_address && this.props.restaurant.display_address}</p>
          </div>
          {/* When the component is loaded, location is not loaded yet(undefined), so it is same as  undefined.display_address, and give you error message */}
          {/*<p>{this.props.restaurant && <img src={`https://maps.googleapis.com/maps/api/staticmap?markers=${this.props.restaurant.latitude},${this.props.restaurant.longitude}&size=400x300&key=AIzaSyAlWrQ2qEXCygx2hpEqzYNMapDFwyZ5S8c`} />}</p>*/}
        </div>
       )
      }

  }

  render() {
    console.log("favorites", this.props.restaurant)
    return (
      <div>
        {this.renderRamen()}
      </div>
    );
  }
}

export default Favorites;
