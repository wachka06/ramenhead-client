import React, { Component } from 'react';
import './css/App.css';
import Nav from './components/Nav.js'
import Homepage from './components/Homepage'
import UserProfile from './components/UserProfile'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {

  state = {
    loggedIn: true,
    ramens: [],
    searchWord: '',
    searchArea: '',
    selectedRamen: {},
    sortByRating: false,
    sortByOpen: false,
    sortByDistance: "Bird's-eye View",
    user: {id: 41, name: "Amirata", email: "amirata@gmail.com"},
    favorites: [],
    reviews: []

  }

  componentDidMount = () => {
    fetch('http://localhost:3000/' + this.state.user.id + '/get_favorites')
    .then(res => res.json())
    .then(faves => {
      faves.map((restaurantObj) => {
        if(!this.state.favorites.includes(restaurantObj)) {
          return this.setState(prevState => {
            return {
              favorites: [...prevState.favorites, restaurantObj]
            }
          })
        } else {
          return this.setState(prevState => {
            const filteredArray = prevState.favorites.filter(ramen => ramen !== restaurantObj)
            return {
              favorites: filteredArray
            }
          })
        }
      })
    })

    fetch('http://localhost:3000/' + this.state.user.id + '/get_user_reviews')
    .then(res => res.json())
    .then(data => {
      const userReviews = data.map((restaurantObj) => {
        return {
          contents: restaurantObj.contents,
          rating: restaurantObj.rating,
          name: restaurantObj.restaurant.name,
          address: restaurantObj.restaurant.display_address
        }
      })
      this.setState({reviews: userReviews})
    })
  }

  handleSave = (ramenObj) => {
    fetch('http://localhost:3000/add_favorite', {
      method: 'POST',
      body: JSON.stringify({restaurant: {...ramenObj}, user_id: 41}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }

  handleRamens = () => {
      let filteredRamenArray = [...this.state.ramens];

      if (this.state.sortByDistance === "Driving") {
         filteredRamenArray = filteredRamenArray.filter(obj => {
          return obj.distance <= 8047
        })
      } else if (this.state.sortByDistance === "Biking") {
         filteredRamenArray = filteredRamenArray.filter(obj => {
          return obj.distance <= 3219
        })
      } else if (this.state.sortByDistance === "Walking") {
         filteredRamenArray = filteredRamenArray.filter(obj => {
          return obj.distance <= 1600
        })
      } else if (this.state.sortByDistance === "Within 4 blocks") {
         filteredRamenArray = filteredRamenArray.filter(obj => {
          return obj.distance <= 322
        })
      }
      if (this.state.sortByRating) {
         filteredRamenArray = filteredRamenArray.sort(function(obj1, obj2) {
           return obj2.rating - obj1.rating
         })
       }
       if (this.state.sortByOpen) {
          filteredRamenArray = filteredRamenArray.filter(obj => {
            return obj.is_closed === false
          })
        }
      return filteredRamenArray
    }

  handleInput = (event) => {
    if (event.target.name === "searchWord"){
        this.setState({searchWord: event.target.value.toLowerCase()})
    } else if (event.target.name === "searchArea"){
      this.setState({searchArea: event.target.value.toLowerCase()})
    }
  }

  handleClick = (ramenObj) => {
    this.setState({selectedRamen: ramenObj})
  }

  handleChange = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/rameniac/`, {
      method: 'POST',
      body: JSON.stringify({term:this.state.searchWord, location:this.state.searchArea}),
      headers:{
        'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then(data => this.setState({ramens: data.businesses}))
  }

  handleRating = (event) => {
    this.setState({sortByRating: event.target.checked})
  }

  handleOpen = (event) => {
    this.setState({sortByOpen: event.target.checked})
  }

  handleDistance = (event) => {
    this.setState({sortByDistance: event.target.value})
  }

  render() {
    return (
      <Router>
       <React.Fragment>
        <div className="App">
          <div className="background">
            <Nav />
            <Route exact path="/rameniac"
              render={
                routerProps =>
                <Homepage
                  handleInput={this.handleInput}
                  searchWord={this.state.searchWord}
                  searchArea={this.state.searchArea}
                  handleChange={this.handleChange}
                  handleRating={this.handleRating}
                  sortByRating={this.state.sortByRating}
                  handleOpen={this.handleOpen}
                  sortByOpen={this.state.sortByOpen}
                  handleDistance={this.handleDistance}
                  sortByDistance={this.state.sortByDistance}
                  ramens={this.handleRamens()}
                  handleClick={this.handleClick}
                  favorites={this.state.favorites}
                  selectedRamen={this.state.selectedRamen}
                  user={this.state.user}
                  handleSave={this.handleSave}
                />
              }
            />

            <Route path="/rameniac/user_details"
              render={
                routerProps => <UserProfile favorites={this.state.favorites} reviews={this.state.reviews}/>
              }
            />

        </div>
      </div>
    </React.Fragment>
    </Router>
    );
  }
}

export default App;
