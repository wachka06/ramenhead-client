import React, { Component } from 'react';
import './css/App.css';
import RamenForm from './components/RamenForm'
import RamenList from './containers/RamenList'
import DisplayRamen from './components/DisplayRamen'

class App extends Component {

  state = {
    ramens: [],
    searchWord: '',
    searchArea: '',
    selectedRamen: {},
    sortByRating: '',
    sortByOpen: '',
    sortByDistance: "Bird's-eye View"
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
      if (this.state.sortByRating === "Highest Rated") {
         filteredRamenArray = filteredRamenArray.sort(function(obj1, obj2) {
           return obj2.rating - obj1.rating
         })
       }
       if (this.state.sortByOpen === "isOpen") {
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

    fetch(`http://localhost:3000/ramenhead/`, { // if it's 'GET' request, `http://localhost:3000/ramenhead?term=${this.state.searchWord}&location=${this.state.searchArea}&categories=ramen`, and you don't need to put body: JSON.stringify({term:this.state.searchWord, location:this.state.searchArea}), but url will be longer
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

  handleRating = (event) => {
    this.setState({sortByRating: event.target.value})
  }

  handleOpen = (event) => {
    this.setState({sortByOpen: event.target.value})
  }

  handleDistance = (event) => {
    // console.log("EVENT", event.target.value)
    this.setState({sortByDistance: event.target.value})
  }

  render() {
    console.log("APP", this.state)
    return (
      <div className="App">

        <RamenForm
          handleInput={this.handleInput} searchWord={this.state.searchWord} searchArea={this.state.searchArea} handleChange={this.handleChange} handleRating={this.handleRating} sortByRating={this.state.sortByRating} handleOpen={this.handleOpen} sortByOpen={this.state.sortByOpen} handleDistance={this.handleDistance} sortByDistance={this.state.sortByDistance} />
        <RamenList ramens={this.handleRamens()} handleClick={this.handleClick} />
        <DisplayRamen selectedRamen={this.state.selectedRamen} />

      </div>
    );
  }
}

export default App;
