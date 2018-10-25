import React, { Component } from 'react';
import { Rating } from 'semantic-ui-react'

class Review extends Component {

  render() {
    console.log("PROPS", this.props)

    return (
      <div>
        <br/><br/>
        <p><strong>{this.props.review.name}</strong></p>
        <p>{this.props.review.address}</p>
        <p><Rating defaultRating={this.props.review.rating} maxRating={5} disabled /></p>
        <p>{this.props.review.contents}</p>
        <br/><br/>
      </div>
    );
  }
}

export default Review;
