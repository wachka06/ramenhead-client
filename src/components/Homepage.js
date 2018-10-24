import React, { Component } from 'react';

import RamenForm from '../components/RamenForm'
import RamenList from '../containers/RamenList'
import DisplayRamen from '../components/DisplayRamen'

class Homepage extends Component {

  render() {
    console.log("PROPS", this.props)

    return (
      <div>
        <RamenForm
          handleInput={this.props.handleInput} searchWord={this.props.searchWord} searchArea={this.props.searchArea} handleChange={this.props.handleChange} handleRating={this.props.handleRating} sortByRating={this.props.sortByRating} handleOpen={this.props.handleOpen} sortByOpen={this.props.sortByOpen} handleDistance={this.props.handleDistance} sortByDistance={this.props.sortByDistance} />
        <RamenList ramens={this.props.ramens} handleClick={this.props.handleClick} />
        <DisplayRamen favorites={this.props.favorites} selectedRamen={this.props.selectedRamen} user={this.props.user} handleSave={this.props.handleSave} />
      </div>
    );
  }
}

export default Homepage;
