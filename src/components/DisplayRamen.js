import React from "react"
import {Component, Fragment} from "react" // Fragment is like <div>, but doesn't break like.
import '../css/DisplayRamen.css';
import { Rating } from 'semantic-ui-react'
import { Button, Header, Modal, Form, Grid, Icon } from 'semantic-ui-react'


class DisplayRamen extends Component {


  state = {
    open: false,
    rating: '5',
    contents: '',
    isFavorite: false,
    showForm: false,
    showReviews: false,
    reviews: []
  }

  componentDidUpdate = (prevProps) => {
    console.log("RAMEN", prevProps);
    if(this.props.selectedRamen.id !== prevProps.selectedRamen.id) {
      fetch('http://localhost:3000/' + this.props.selectedRamen.id + '/get_reviews')
      .then(res => res.json())
      .then(
        data => this.setState({reviews: data})
      )
    }

  }

  handleChange = (e) => {
    console.log(e.target.name)
    // this.setState({rating: })
    if (e.target.name === "type") {
      this.setState({rating: e.target.value})
      // console.log("dsadas", e.target.value)
    } else if (e.target.name === "message") {
      this.setState({contents: e.target.value})
    }
  }

  handleSubmit = (e) => {

    const body = {
      restaurant: {
        api_id: this.props.selectedRamen.id,
        name: this.props.selectedRamen.name,
        image_url: this.props.selectedRamen.image_url,
        rating: this.props.selectedRamen.rating,
        price: this.props.selectedRamen.price,
        display_phone: this.props.selectedRamen.display_phone,
        display_address: this.props.selectedRamen.location.display_address.join(''),
        longitude: this.props.selectedRamen.coordinates.longitude,
        latitude: this.props.selectedRamen.coordinates.latitude,
      },
      review: {
        rating: this.state.rating,
        contents: this.state.contents,
        user_id: 15,
        api_id: this.props.selectedRamen.id
      }
    }
    e.preventDefault();
    // console.log("HI", e.target.message.value)
    fetch('http://localhost:3000/reviews', { //send request to backendside server !
      method: 'POST',
      body: JSON.stringify(body),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    this.setState(this.state)
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

  handleAllReviewButton = () => {
    this.setState({showReviews: !this.state.showReviews})
  }

  handleReviews = () => {
    const review = this.state.reviews.map((review) => {
      return (<div className="review"><span>{review.user.name}&nbsp;&nbsp;&nbsp;<Rating defaultRating={review.rating} maxRating={5} disabled /></span>
      <p>{review.contents}</p></div>)
    })

      return (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.handleClose}>&times;</span>
            <h2>Reviews</h2>
            {review}
          </div>
        </div>
      )

  }

  handleClose = () => {
    this.setState({
      showForm: false,
      showReviews: false
    })
  }

  renderRamen = () => {
    const bryan = {
      width:'500px',
      height:'200px'
    };

    const options = [
      { key: '5', text: '5', value: '5' },
      { key: '4', text: '4', value: '4' },
      { key: '3', text: '3', value: '3' },
      { key: '2', text: '2', value: '2' },
      { key: '1', text: '1', value: '1' },
    ]
      // console.log("condition", !!this.props.selectedRamen.name)
      // {}.name
      // if (this.props.selectedRamen) => {} => true
      if (this.props.selectedRamen.name) {
        return (
          <ul className="display-ramen">
            <Button className="heart-button" onClick={this.handleFavorite}>{this.state.isFavorite ? <Icon name='heart'/> : <Icon name='heart outline'/>}</Button>

          {/* {!this.props.handleFavorite.includes(this.props.selectedRamen.id) ?
            <button onClick={this.props.handleFavorite} onClick={() => this.props.handleSave(this.props.selectedRamen)}>Favorite</button>
            : <button onClick={this.props.handleFavorite} onClick={() => this.props.handleSave(this.props.selectedRamen)}>Unfavorite</button>} */}
          <p>{this.props.selectedRamen.image_url && <img src={this.props.selectedRamen.image_url} width="180" height="180" className="img" />}</p>
          <h1>{this.props.selectedRamen.name}</h1>
          <p><Rating defaultRating={this.props.selectedRamen.rating} maxRating={5} disabled /></p>
          <p>{this.props.selectedRamen.price}</p>
          <p>{this.props.selectedRamen.display_phone}</p>
          <p>{this.props.selectedRamen.location && this.props.selectedRamen.location.display_address.join('')}</p>
          {/* When the component is loaded, location is not loaded yet(undefined), so it is same as  undefined.display_address, and give you error message */}
          <p>{this.props.selectedRamen.coordinates && <img src={`https://maps.googleapis.com/maps/api/staticmap?markers=${this.props.selectedRamen.coordinates.latitude},${this.props.selectedRamen.coordinates.longitude}&size=400x300&key="AIzaSyAlWrQ2qEXCygx2hpEqzYNMapDFwyZ5S8c"`} />}</p>

          <Button onClick={this.handleAllReviewButton}>Read All Reviews</Button>
            {this.state.showReviews ? this.handleReviews() : null}

           <Button onClick={this.handleReviewButton}>Write a Review</Button>
              { this.state.showForm ?
                // console.log("hello")
                  <div className="modal">
                    <div className="modal-content">
                      <span className="close" onClick={this.handleClose}>&times;</span>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Select label='Rating' options={options} name="type" onChange={this.handleChange} id="rating-label"/>

                        <Form.TextArea name="message" style={bryan} placeholder="Please leave your review of this ramen place here." onChange={this.handleChange}/>
                        <Form.Button type="submit">Submit</Form.Button>
                      </Form>
                    </div>
                  </div>
                  : null // the form will be hidden
              }


         </ul>
       )
      }

  }

  render() {
    // console.log("DisplayRamen", this.props.selectedRamen.coordinates)
    // console.log("props", this.props.selectedRamen)
     // console.log("state", this.props.selectedRamen.id)
     // console.log("state", this.props.selectedRamen)
     console.log("REVIEW", this.state.reviews)


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
    )
  }

}

export default DisplayRamen
