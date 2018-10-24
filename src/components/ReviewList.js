import React, { Component } from 'react';

import Review from '../components/Review'

class ReviewList extends Component {

  render() {
    // console.log("PROPS", this.props)

    return (
      <div>
        <Review />
      </div>
    );
  }
}

export default ReviewList;
