import React, { Component, Fragment } from 'react';
import Ramen from '../components/Ramen'
import '../css/RamenList.css';

class RamenList extends Component {
  render() {
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
