import React, { Component } from 'react';
import { Rating } from 'semantic-ui-react'

class Review extends Component {

  render() {
    // console.log("PROPS", this.props)
    return (
      <div className="ramen-review">
        <h3 className="ramen-review-name">{this.props.review.name}</h3>
        <p>{this.props.review.address}</p>
        <Rating defaultRating={this.props.review.rating} maxRating={5} disabled/>
        <p>{this.props.review.contents}</p>
      </div>
    );
  }
}

export default Review;
