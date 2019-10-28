import React from "react"
import { Rating } from 'semantic-ui-react'
import '../css/Ramen.css'

const Ramen = (props) => {
  return (
    <div className="ramen-wrap" onClick={() => props.handleClick(props.ramen)}>
      <div>{props.ramen.name}</div>
      <Rating defaultRating={props.ramen.rating} maxRating={5} disabled />
      <div>{props.ramen.price}</div>
      <div>{props.ramen.location.display_address.join(', ')}</div>
    </div>
  )
}

export default Ramen
