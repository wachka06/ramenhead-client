import React, { Component } from 'react';
import Ramen from '../components/Ramen'
import {Fragment} from "react"
import '../css/RamenList.css';

class RamenList extends Component {

  render() {
    // console.log("RamenList", this.props)
    const showRamen = (
      <div className="list-ramen-container">
        <div className="list-ramen">
        {
          this.props.ramens.map((ramen) => {
            return <Ramen key={ramen.id} ramen={ramen} handleClick={this.props.handleClick}/>
          })
        }
        </div>
      </div>
    )

    return (
      <Fragment>
        {(this.props.ramens.length !== 0) ? showRamen : null}
      </Fragment>
    );
  }

}

export default RamenList;
