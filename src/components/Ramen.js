import React from "react"

const Ramen = (props) => {
  // console.log("Ramen", props.ramen)

  return(
    <tr className="ramens">
      <td><h4 onClick={() => props.handleClick(props.ramen)}>{props.ramen.name}</h4></td>
      <td>{props.ramen.rating}</td>
      <td>{props.ramen.price}</td>
      <td >{props.ramen.location.display_address.join('')}</td>
    </tr>
  )
}

export default Ramen
