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
        <span>&nbsp;&nbsp;&nbsp;<strong>Username:</strong>&nbsp;&nbsp;&nbsp;{this.handleUser()}</span>
        <br/>
        <h4>My Favorites</h4>
        {restaurants.map((obj) => {
          return <Favorites restaurant={obj}/>
        })}
        <h4>My Reviews</h4>
        {this.props.reviews.map((obj) => {
          return <Review review={obj}/>
        })}
      </div>
    );
  }

}

export default UserProfile;
