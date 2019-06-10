import React, { Component } from 'react';
import '../css/UserProfile.css';
import Favorites from './Favorites';
import Review from './Review';

class UserProfile extends Component {
  handleUser = () => {
    if(this.props.favorites[0]) {
      return (
        this.props.favorites[0] && this.props.favorites[0].user.name
      )
    }
  }

  render() {
    // console.log("UserProfile!!!!", this.props)
    // console.log("UserProfile!!!!", this.props.favorites)
    const restaurants = this.props.favorites.map(obj => {
      return obj.restaurant
    })
    // console.log('restaurants', restaurants)
    // const nameArray = this.props.favorites.map((obj) => {
    //   return obj.name
    // })
    // const name = nameArray.uniq
    // console.log("name", nameArray)
    return (
      <div>
        <span className="username">&nbsp;&nbsp;&nbsp;<strong>Username:</strong>&nbsp;&nbsp;&nbsp;{this.handleUser()}</span>
        <div id="wrap-user-profile">
          <div className="wrap-review-container">
            <h3>My Reviews</h3>
            <div id="review-container">
              {this.props.reviews.map((review, index) => {
                // console.log("REVIEW", review, index)
                return <Review review={review} key={index}/>
              })}
            </div>
          </div>
          <div className="wrap-favorite-ramen-container">
            <h3>My Favorites</h3>
            <div id="favorite-ramen-container">
              {restaurants.map((restaurant) => {
                return <Favorites key={restaurant.id} restaurant={restaurant}/>
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default UserProfile;
