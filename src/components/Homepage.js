import React, { Component } from 'react';
import RamenForm from '../components/RamenForm'
import RamenList from '../containers/RamenList'
import DisplayRamen from '../components/DisplayRamen'

class Homepage extends Component {
  // componentDidMount = () => {
  //   const maniac = new Audio('http://www.oodesk.com/share/getfile.php?_ooshare=CVK8TRJlpdky01m93Z6ny7GBp31B%2BlWcGWRsD3aTLEd%2B0pYoTtzeygcmfZITJDeIfEOvWHdEjDDCp27zDecLjyJy5EbBPSNAFDQgt4D8CpqW3PaZ5wlKARc7gvW6bFu9G7u8va%2BN6%2BEjk0ePXjAfK9qt80GQzPquVVbSz916HMpz%2FB%2Bn%2Buxy7sfSdUSYPbRJw528w2RGZqBvtXu0JERon%2FuYLthf3NVjHLvq0TaUts8%2FXsV3bhkHvmY5isWycn1udLgYxIJUCFGddfTp0UfeUC2gUn8hWTNymjrZgzK%2FCoFqUwvwpUcbu8JYtFYeIsWw3936utNI65BeeNVQ5EM58w%3D%3D&action=open')
  //   maniac.play()
  // }
  render() {
    // console.log("PROPS", this.props)
    return (
      <div id="ramen-form">
        <div className="wrap-main">
          <RamenForm
            handleInput={this.props.handleInput} searchWord={this.props.searchWord} searchArea={this.props.searchArea}
            handleChange={this.props.handleChange} handleRating={this.props.handleRating}
            sortByRating={this.props.sortByRating} handleOpen={this.props.handleOpen} sortByOpen={this.props.sortByOpen}
            handleDistance={this.props.handleDistance} sortByDistance={this.props.sortByDistance} />
          <RamenList ramens={this.props.ramens} handleClick={this.props.handleClick} />
          <DisplayRamen favorites={this.props.favorites} selectedRamen={this.props.selectedRamen}
            user={this.props.user} handleSave={this.props.handleSave} />
        </div>
      </div>
    );
  }
}

export default Homepage;
