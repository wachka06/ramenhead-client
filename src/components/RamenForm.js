import React from "react"
import {Fragment} from "react" // Fragment is like <div>, but doesn't break like.
import '../css/RamenForm.css';

const RamenForm = (props) => {
  // console.log("PizzaForm", props)

  return(
    <Fragment>
      <br />
        <strong>...Rameniac...</strong>
      <form className="ramen-form">
        <span>
        <strong>Search for Ramen! </strong>
        <input name="searchWord" type="text" placeholder="Type of soup ex) pork belly, miso..." onChange={props.handleInput} />
        <input name="searchArea" type="text" placeholder="Near nerghborhood, city, state, or zip" onChange={props.handleInput}/>
        <button type="submit" onClick={props.handleChange}>Submit</button>
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
              <input type="radio" value="Highest Rated" checked={props.sortByRating === "Highest Rated"} onChange={props.handleRating}/>
              Highest Rated
            </label>
            <label>
              <input type="radio" value="isOpen" checked={props.sortByOpen === "isOpen"} onChange={props.handleOpen}/>
              Open Now
            </label>
        </div>
      <br />
    </Fragment>
  )
}

export default RamenForm
