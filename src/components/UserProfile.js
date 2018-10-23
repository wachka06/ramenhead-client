import React, { Component } from 'react';
import '../css/UserProfile.css';
import Favorites from './Favorites';

class UserProfile extends Component {
  handleUser = () => {
    if(this.props.favorites[0]) {
      return (
        this.props.favorites[0] && this.props.favorites[0].user.name
      )
    }
  }

  render() {
    console.log("UserProfile!!!!", this.props)
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
        UserProfile Component...
        <span><strong>Username:</strong>&nbsp;&nbsp;&nbsp;{this.handleUser()}</span>
        {restaurants.map((obj) => {
          return <Favorites restaurant={obj}/>
        })}

        {/* My reviews:  */}
      </div>
    );
  }

}

export default UserProfile;
