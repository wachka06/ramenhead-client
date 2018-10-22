import React from "react"
import {Component, Fragment} from "react" // Fragment is like <div>, but doesn't break like.
import '../css/DisplayRamen.css';

class DisplayRamen extends Component {



  // handleSubmit = (event) => {
  //   event.preventDefault();
  // }

  renderRamen = () => {
    const bryan = {
      width:'500px',
      height:'200px'
    };

      if (this.props.selectedRamen) {
        return (
          <ul className="display-ramen">
            <button onClick={() => this.props.handleSave(this.props.selectedRamen)}>Save as Favorite</button>
          <p>{this.props.selectedRamen.image_url && <img src={this.props.selectedRamen.image_url} width="200" height="200" className="img" />}</p>
          <h3>{this.props.selectedRamen.name}</h3>
          <p>{this.props.selectedRamen.rating}</p>
          <p>{this.props.selectedRamen.price}</p>
          <p>{this.props.selectedRamen.display_phone}</p>
          <p>{this.props.selectedRamen.location && this.props.selectedRamen.location.display_address.join('')}</p>
          {/* When the component is loaded, location is not loaded yet(undefined), so it is same as  undefined.display_address, and give you error message */}
          <p>{this.props.selectedRamen.coordinates && <img src={`https://maps.googleapis.com/maps/api/staticmap?markers=${this.props.selectedRamen.coordinates.latitude},${this.props.selectedRamen.coordinates.longitude}&size=400x300&key=AIzaSyAlWrQ2qEXCygx2hpEqzYNMapDFwyZ5S8c`} />}</p>
          {/* <div>

          {/* <button>Write a Review</button>
            {/* <span>Rating:</span><select name="type" id="type" onChange={props.handleDistance}>
                <option value=5>5</option>
                <option value=4>4</option>
                <option value=3>3</option>
                <option value=2>2</option>
                <option value=1>1</option>
              </select> */}

            {/* <form>
            <textarea name="message" style={bryan} placeholder="Please leave your review of this ramen place here." />
            <button type="submit" onClick={() => this.handleSubmit()}>Submit</button>
          </form> */}
         </ul>
       )
      }

  }

  render() {
    // console.log("DisplayRamen", this.props.selectedRamen.coordinates)
    console.log("props", this.props)

    return (
      <Fragment>
      {this.renderRamen()}
      {/* <button onClick={() => handleSave(this.props.selectedRamen)}>Save as Favorite</button>
      <form>
      <button >Write a Review</button>
      <form>
      <button type="submit" onClick={props.handleChange}>Submit</button>
      </form> */}
      </Fragment>
    );
  }

}

export default DisplayRamen
