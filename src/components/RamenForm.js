import React from "react"
import {Fragment} from "react" // Fragment is like <div>, but doesn't break like.
import '../css/RamenForm.css';
import { Input, Button } from 'semantic-ui-react'

const RamenForm = (props) => {
  // console.log("PizzaForm", props)

  return(
    <Fragment>
      <br />
        <strong className="logo">...Rameniac...</strong>
      <br />
      <form className="ramen-form">
        <span>
        <strong>Search for Ramen! </strong>
        <br />
        <Input name="searchWord" type="text" size="40" placeholder="Type of soup ex. pork belly, miso..." onChange={props.handleInput} />
        <Input icon='search' name="searchArea" type="text" size="40" placeholder="Near nerghborhood, city, state, or zip" onChange={props.handleInput}/>
        <Button type="submit" onClick={props.handleChange}>Submit</Button>
        </span>
      </form>
      <br />
        <div className="sortby">
          <span className="normalText2"> Distance: </span><select name="type" id="type" className="normalText2" onChange={props.handleDistance}>
              <option value="Bird's-eye View">Bird's-eye View</option>
              <option value="Driving">Driving (5 mi.)</option>
              <option value="Biking">Biking (2 mi.)</option>
              <option value="Walking">Walking (1 mi.)</option>
              <option value="Within 4 blocks">Within 4 blocks</option>
            </select>
            <label>
              <input type="checkbox" value="Highest Rated" checked={props.sortByRating} onChange={props.handleRating}/>
              Highest Rated
            </label>
            <label>
              <input type="checkbox" value="isOpen" checked={props.sortByOpen} onChange={props.handleOpen}/>
              Open Now
            </label>
        </div>
      <br />
    </Fragment>
  )
}

export default RamenForm
