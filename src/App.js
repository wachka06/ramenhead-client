import React, { Component } from 'react';
import './css/App.css';
import './css/index.css'
import Nav from './components/Nav.js'
import Homepage from './components/Homepage'
import UserProfile from './components/UserProfile'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

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
    user: {id: 18, name: "Amirata", email: "amirata@gmail.com"},
    favorites: [],
    reviews: []

  }

  componentDidMount = () => { //lifecycle

    const maniac = new Audio('http://www.oodesk.com/share/getfile.php?_ooshare=CVK8TRJlpdky01m93Z6ny7GBp31B%2BlWcGWRsD3aTLEd%2B0pYoTtzeygcmfZITJDeIfEOvWHdEjDDCp27zDecLjyJy5EbBPSNAFDQgt4D8CpqW3PaZ5wlKARc7gvW6bFu9G7u8va%2BN6%2BEjk0ePXjAfK9qt80GQzPquVVbSz916HMpz%2FB%2Bn%2Buxy7sfSdUSYPbRJw528w2RGZqBvtXu0JERon%2FuYLthf3NVjHLvq0TaUts8%2FXsV3bhkHvmY5isWycn1udLgYxIJUCFGddfTp0UfeUC2gUn8hWTNymjrZgzK%2FCoFqUwvwpUcbu8JYtFYeIsWw3936utNI65BeeNVQ5EM58w%3D%3D&action=open')
    maniac.play()

    // console.log("state", this.state.user.id)
    fetch('https://rameniac-server.herokuapp.com/' + this.state.user.id + '/get_favorites')
    .then(res => res.json())
    .then(faves => {
      faves.map((restaurantObj) => {
        if(!this.state.favorites.includes(restaurantObj)) {
          this.setState(prevState => {
            return {
              favorites: [...prevState.favorites, restaurantObj]
            }
          })
        } else {
          this.setState(prevState => {
            const filteredArray = prevState.favorites.filter(ramen => ramen !== restaurantObj)
            return {
              favorites: filteredArray
            }
          })
        }
      })
    })


    fetch('https://rameniac-server.herokuapp.com/' + this.state.user.id + '/get_user_reviews')
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
    console.log("RAMEN", ramenObj);
    fetch('https://rameniac-server.herokuapp.com/add_favorite', { //send request to backendside server !
      method: 'POST',
      body: JSON.stringify({restaurant: {...ramenObj}, user_id: 18}),
      headers:{
        'Content-Type': 'application/json'
      }
    })

  }



  // componentDidMount(){
  //   fetch(`http://localhost:3000/ramenhead/`, { // if it's 'GET' request, `http://localhost:3000/ramenhead?term=${this.state.searchWord}&location=${this.state.searchArea}&categories=ramen`, and you don't need to put body: JSON.stringify({term:this.state.searchWord, location:this.state.searchArea}), but url will be longer
  //     method: 'POST',
  //     body: JSON.stringify({term:this.state.searchWord, location:this.state.searchArea}),
  //     headers:{
  //       'Content-Type': 'application/json'
  //     }
  //     })
  //     .then(res => res.json())
  //     .then(data =>
  //       this.setState({ramens:data.businesses})
  //     )
  // }


  // handleRamens = () => {
  //   let tempRamens = [...this.state.ramens]
  //
  //   if(this.state.searchWord && this.state.searchArea) {
  //     tempRamens = this.state.ramens.filter((ramen) =>
  //       ramen.name.toLowerCase().includes(this.state.searchWord) || ramen.ticker.toLowerCase().includes(this.state.searchWord)
  //     )
  //   }
  //   return tempRamens
  // }

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
    // console.log(event.target.name)
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

    fetch(`https://rameniac-server.herokuapp.com/rameniac/`, { // if it's 'GET' request, `http://localhost:3000/ramenhead?term=${this.state.searchWord}&location=${this.state.searchArea}&categories=ramen`, and you don't need to put body: JSON.stringify({term:this.state.searchWord, location:this.state.searchArea}), but url will be longer
      method: 'POST',
      body: JSON.stringify({term:this.state.searchWord, location:this.state.searchArea}), //location is required for Yelp API call
      headers:{
        'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then(data => this.setState({ramens: data.businesses}))
        // this.setState(() => {
        //   let filteredRamenArray = data.businesses;
        //   if (this.state.sortByRating === "Highest Rated") {
        //      filteredRamenArray = filteredRamenArray.sort(function(obj1, obj2) {
        //        return obj2.rating - obj1.rating
        //      })
        //    } else if (this.state.sortByOpen === "isOpen") {
        //       filteredRamenArray = filteredRamenArray.filter(obj => {
        //         return obj.is_closed === false
        //       })
        //     }
        //     // else if (this.state.sortByDistance === "Driving") {
        //     //   filteredRamenArray = filteredRamenArray.filter(obj => {
        //     //     return obj.is_closed === false
        //     //   })
        //     // }
        //
        //   return {ramens: filteredRamenArray}
        // }
  }

  // handleChange = (event) => {
  //     event.preventDefault();
  //     fetch(`http://localhost:3000/ramenhead/`, { // if it's 'GET' request, `http://localhost:3000/ramenhead?term=${this.state.searchWord}&location=${this.state.searchArea}&categories=ramen`, and you don't need to put body: JSON.stringify({term:this.state.searchWord, location:this.state.searchArea}), but url will be longer
  //       method: 'POST',
  //       body: JSON.stringify({term:this.state.searchWord, location:this.state.searchArea}), //location is required for Yelp API call
  //       headers:{
  //         'Content-Type': 'application/json'
  //       }
  //       })
  //       .then(res => res.json())
  //       .then(data =>
  //         this.setState({ramens:data.businesses})
  //       )
  // }

  handleRating = (event) => { // if the User can unclick the Rating, use checkbox instead of radiobutton!
    // console.log("checked:", event.target.checked)
    this.setState({sortByRating: event.target.checked}) // event.target.checked gives you boolean.
  }

  handleOpen = (event) => {
    this.setState({sortByOpen: event.target.checked})
  }

  handleDistance = (event) => {
    // console.log("EVENT", event.target.value)
    this.setState({sortByDistance: event.target.value})
  }

  render() {
    // console.log("APP", this.handleFavorite())
    // console.log(this.state.favorites)
    // const favoritesArray = this.handleFavorite()
    // console.log(favoritesArray)
    console.log("reviews", this.state.reviews)
    return (
      <Router>
       <React.Fragment>
        <div className="App">
          <div className="background">
            <Nav/>
            <Route exact path="/rameniac" render={
                  routerProps =>
                  <Homepage handleInput={this.handleInput} searchWord={this.state.searchWord} searchArea={this.state.searchArea} handleChange={this.handleChange} handleRating={this.handleRating} sortByRating={this.state.sortByRating} handleOpen={this.handleOpen} sortByOpen={this.state.sortByOpen} handleDistance={this.handleDistance} sortByDistance={this.state.sortByDistance} ramens={this.handleRamens()} handleClick={this.handleClick} favorites={this.state.favorites} selectedRamen={this.state.selectedRamen} user={this.state.user} handleSave={this.handleSave}/> }/>

           <Route path="/rameniac/user_details" render={
                            routerProps => <UserProfile favorites={this.state.favorites} reviews={this.state.reviews}/> }/>

        </div>
      </div>
    </React.Fragment>
    </Router>
    );
  }
}

export default App;
