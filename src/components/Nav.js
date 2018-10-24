import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';


class Nav extends Component {

  render(){
    return (
      <div className="Nav">
        <div className='ui vertical menu'>
          <NavLink className="item" to="/rameniac/" exact>Home</NavLink>
          <NavLink className="item" to="/rameniac/user_details/">Your Profile</NavLink>
        </div>
      </div>
    )
  }
}

export default Nav
