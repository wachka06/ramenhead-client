import React from "react"
import {Component, Fragment} from "react" // Fragment is like <div>, but doesn't break like.
import '../css/DisplayRamen.css';

class DisplayRamen extends Component {
  state = {
    rating: '',
    contents: '',
    isFavorite: false,
    showForm: false
  }

  handleChange = (e) => {
    console.log(e.target.name)
    // this.setState({rating: })
    if (e.target.name === "type") {
      this.setState({rating: e.target.value})
      console.log("dsadas", e.target.value)
    } else if (e.target.name === "message") {
      this.setState({contents: e.target.value})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log("HI", e.target.message.value)

  }

  handleFavorite = () => {
    this.setState({isFavorite:!this.state.isFavorite})

    this.props.handleSave(this.props.selectedRamen)

    // this.natsukiEatsRamen()
    //
    // this.ishoBoii()
  }

  // natsukiEatsRamen = () => {
  //   console.log("NOM NOM YUMMY RAMEN!!!!!!")
  //   // fdjsaklfjdsaf
  //   // fdjsaklfjdsafdsa
  //   // fsd
  //   // fdjsaklfjdsafdsaf
  //   // dsa
  //   this.ishoBoii()
  // }
  //
  // ishoBoii = () => {
  //   console.log("ISHO BOIII")
  //
  //   this.ishoGirl()
  // }
  //
  // ishoGirl = () => {
  //   console.log("ISHO GIRLLLL")
  // }


  handleReviewButton = () => {
    this.setState({showForm: !this.state.showForm})

    const bryan = {
      width:'500px',
      height:'200px'
    };
    // console.log("hello")
    // return (
    //   <div>
    //      <span>Rating:</span><select name="type" id="type" onChange={this.handleChange}>
    //        <option value="5">5</option>
    //        <option value="4">4</option>
    //        <option value="3">3</option>
    //        <option value="2">2</option>
    //        <option value="1">1</option>
    //      </select>
    //       <form>
    //         <textarea name="message" style={bryan} placeholder="Please leave your review of this ramen place here." />
    //         <button type="submit" onSubmit={this.handleSubmit}>Submit</button>
    //       </form>
    //   </div>
    // )
  }

  renderRamen = () => {
    const bryan = {
      width:'500px',
      height:'200px'
    };
      // console.log("condition", !!this.props.selectedRamen.name)
      // {}.name
      // if (this.props.selectedRamen) => {} => true
      if (this.props.selectedRamen.name) {
        return (
          <ul className="display-ramen">
            <button onClick={this.handleFavorite}>{this.state.isFavorite ? 'Unfavorite' : 'Favorite'}</button>

          {/* {!this.props.handleFavorite.includes(this.props.selectedRamen.id) ?
            <button onClick={this.props.handleFavorite} onClick={() => this.props.handleSave(this.props.selectedRamen)}>Favorite</button>
            : <button onClick={this.props.handleFavorite} onClick={() => this.props.handleSave(this.props.selectedRamen)}>Unfavorite</button>} */}
          <p>{this.props.selectedRamen.image_url && <img src={this.props.selectedRamen.image_url} width="200" height="200" className="img" />}</p>
          <h3>{this.props.selectedRamen.name}</h3>
          <p>{this.props.selectedRamen.rating}</p>
          <p>{this.props.selectedRamen.price}</p>
          <p>{this.props.selectedRamen.display_phone}</p>
          <p>{this.props.selectedRamen.location && this.props.selectedRamen.location.display_address.join('')}</p>
          {/* When the component is loaded, location is not loaded yet(undefined), so it is same as  undefined.display_address, and give you error message */}
          <p>{this.props.selectedRamen.coordinates && <img src={`https://maps.googleapis.com/maps/api/staticmap?markers=${this.props.selectedRamen.coordinates.latitude},${this.props.selectedRamen.coordinates.longitude}&size=400x300&key=AIzaSyAlWrQ2qEXCygx2hpEqzYNMapDFwyZ5S8c`} />}</p>


           <button onClick={this.handleReviewButton}>Write a Review</button>
              { this.state.showForm ?
                // console.log("hello")
                  <div>
                      <form onSubmit={this.handleSubmit}>
                        <span>Rating:</span><select name="type" onChange={this.handleChange}>
                          <option value="5">5</option>
                          <option value="4">4</option>
                          <option value="3">3</option>
                          <option value="2">2</option>
                          <option value="1">1</option>
                        </select>
                        <textarea name="message" style={bryan} placeholder="Please leave your review of this ramen place here." onChange={this.handleChange}/>
                        <button type="submit">Submit</button>
                      </form>
                  </div>
                  : null
              }
         </ul>
       )
      }

  }

  render() {
    // console.log("DisplayRamen", this.props.selectedRamen.coordinates)
    // console.log("props", this.props.selectedRamen)
     console.log("state", this.state)

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
