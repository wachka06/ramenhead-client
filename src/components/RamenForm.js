import React from "react"
import {Fragment} from "react" // Fragment is like <div>, but doesn't break like.
import '../css/RamenForm.css';
import { Input, Button, Icon, Checkbox} from 'semantic-ui-react'

const RamenForm = (props) => {
  const buttonStyle = {
    width: '300px'
  }
  return(
    <Fragment>
      <strong className="ramen-logo">Rameniac</strong>
      <form className="ramen-form">
        <span>
          <Input style={buttonStyle} name="searchWord" type="text" size="small"
            placeholder="Type of soup ex. pork belly, miso..." onChange={props.handleInput} />
          <div className="ui action input">
            <Input style={buttonStyle} name="searchArea" type="text" size="small"
              placeholder="Near nerghborhood, city, state, or zip" onChange={props.handleInput}/>
            <Button type="submit" onClick={props.handleChange}><Icon name='search' /></Button>
          </div>
        </span>
      </form>
        <div className="ramen-filter">
          <span className="normalText2"> Distance: </span>
          <select name="type" id="type" className="normalText2" onChange={props.handleDistance}>
            <option value="Bird's-eye View">Bird's-eye View</option>
            <option value="Driving">Driving (5 mi.)</option>
            <option value="Biking">Biking (2 mi.)</option>
            <option value="Walking">Walking (1 mi.)</option>
            <option value="Within 4 blocks">Within 4 blocks</option>
          </select>
          <label>
            <Checkbox className="box" input="true" type="checkbox" value="Highest Rated" checked={props.sortByRating} onChange={props.handleRating}/>
            Highest Rated
          </label>
          <label>
            <Checkbox className="box" input="true" type="checkbox" value="isOpen" checked={props.sortByOpen} onChange={props.handleOpen}/>
            Open Now
          </label>
        </div>
    </Fragment>
  )
}

export default RamenForm
