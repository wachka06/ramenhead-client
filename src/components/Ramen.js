import React from "react"

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
      <span className="ramen-title"><h4>{props.ramen.name}</h4></span>
      <span className="ramens">&nbsp;&nbsp;&nbsp;{props.ramen.rating}</span>
      <span className="ramens">&nbsp;&nbsp;&nbsp;{props.ramen.price}</span>
      <span className="ramens">&nbsp;&nbsp;&nbsp;{props.ramen.location.display_address.join('')}</span>
    </div>
  )
}

export default Ramen
