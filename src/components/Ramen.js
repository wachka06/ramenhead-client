import React from "react"
import { Rating } from 'semantic-ui-react'

const Ramen = (props) => {
  // console.log("Ramen", props.ramen)

  return(
    // <tr className="ramens">
    //   <td><h4 className="shop-title" onClick={() => props.handleClick(props.ramen)}>{props.ramen.name}</h4></td>
    //   <td>{props.ramen.rating}</td>
    //   <td>{props.ramen.price}</td>
    //   <td>{props.ramen.location.display_address.join('')}</td>
    // </tr>
    <div className="ramen" onClick={() => props.handleClick(props.ramen)}>
      <br/>
      <span className="ramen-title"><strong>{props.ramen.name}</strong></span>
      <span className="ramens">&nbsp;&nbsp;&nbsp;<Rating defaultRating={props.ramen.rating} maxRating={5} disabled /></span>
      <span className="ramens">&nbsp;&nbsp;&nbsp;{props.ramen.price}</span><br/>
      <span className="ramens">&nbsp;&nbsp;&nbsp;{props.ramen.location.display_address.join('')}</span><br/><br/>
    </div>
  )
}

export default Ramen
