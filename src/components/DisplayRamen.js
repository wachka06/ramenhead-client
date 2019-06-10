import React from "react"
import {Component, Fragment} from "react" // Fragment is like <div>, but doesn't break like.
import '../css/DisplayRamen.css';
import { Rating } from 'semantic-ui-react'
import { Button, Form, Icon } from 'semantic-ui-react'

const GM_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


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

// componentDidMount = () => {
//   // console.log('KEY', process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
// }

// replace https://rameniac-api.herokuapp.com/
  componentDidUpdate = (prevProps) => {

    if(this.props.selectedRamen.id !== prevProps.selectedRamen.id) {

      const path = 'http://localhost:3000/' + this.props.selectedRamen.id + '/get_reviews'
      // console.log(path)
      fetch(path)
      .then(res => res.json())
      .then(
        data => this.setState({reviews: data})
      )
    }
  }
  handleChange = (e) => {
    if (e.target.name === "type") {
      this.setState({rating: e.target.value})
    } else if (e.target.name === "message") {
      this.setState({contents: e.target.value})
    }
  }
  handleSubmit = (e) => {
    // console.log("E", e.target.querySelector("form div div div").innerText)
    let selectedRating = e.target.querySelector("form div div div").innerText;
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
        rating: selectedRating,
        contents: this.state.contents,
        user_id: 41,
        api_id: this.props.selectedRamen.id
      }
    }
    e.preventDefault();
    fetch('http://localhost:3000/reviews', { //send request to backendside server !
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.setState({
      rating: selectedRating,
      showForm: !this.state.showForm
    })
    // return (
    //   <div className="modal">
    //     <div className="modal-content">
    //       <span className="close-button" onClick={this.handleClose}>&times;</span>
    //       <h2 className="no-reviews">Your review is submitted.</h2>
    //     </div>
    //   </div>
    // )
  }

  handleFavorite = () => {
    this.setState({isFavorite:!this.state.isFavorite})
    this.props.handleSave(this.props.selectedRamen)
  }

  handleReviewButton = () => {
    this.setState({showForm: !this.state.showForm})
  }

  handleAllReviewButton = () => {
    this.setState({showReviews: !this.state.showReviews})
  }

  handleReviews = () => {
    let review = this.state.reviews
    // console.log("REV", review[0])
    // console.log("REV", review[0].rating)
    // console.log("REV", review[0].contents)
    // console.log("REV", review[0].user.name)
    if (review.status === 500) {
      return (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={this.handleClose}>&times;</span>
            <h2 className="no-reviews">No Reviews</h2>
          </div>
        </div>
      )
    } else {
      // this.state.reviews.map((review) => {
        // console.log("R", review)
        return (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={this.handleClose}>&times;</span>
                {this.state.reviews.map((review) => {
                  return (
                    <div className="review" key={review.id}>
                      <strong className="review-username">{review.user.name}&nbsp;&nbsp;&nbsp;</strong><Rating defaultRating={review.rating} maxRating={5} disabled />
                      <p>{review.contents}</p>
                    </div>
                  )
                })}
            </div>
        </div>
        )
      // })
      // console.log("ARR", arr)
    }
  }

  handleClose = () => {
    this.setState({
      showForm: false,
      showReviews: false
    })
  }

  renderRamen = () => {
    const textArea = {
      // width:'500px',
      // height:'200px'
    };
    const options = [
      { key: '5', text: '5', value: '5' },
      { key: '4', text: '4', value: '4' },
      { key: '3', text: '3', value: '3' },
      { key: '2', text: '2', value: '2' },
      { key: '1', text: '1', value: '1' },
    ]

      if (this.props.selectedRamen.name) {
        return (
          <ul className="display-ramen-container">
            <Button className="heart-button"
              onClick={this.handleFavorite}>{this.state.isFavorite ? <Icon name='heart'/> : <Icon name='heart outline'/>}
            </Button>
            <div className="wrap-display-ramen">
              {this.props.selectedRamen.image_url && <img src={this.props.selectedRamen.image_url} width="180" height="180" className="img" alt=""/>}
              <div className="wrap-display-ramen-details">
                <h1>{this.props.selectedRamen.name}</h1>
                <Rating defaultRating={this.props.selectedRamen.rating} maxRating={5} disabled />
                <p>{this.props.selectedRamen.price}</p>
                <p>{this.props.selectedRamen.display_phone}</p>
                <p>{this.props.selectedRamen.location && this.props.selectedRamen.location.display_address.join(', ')}</p>
              </div>
            </div>
            {/* When the component is loaded, location is not loaded yet(undefined), so it is same as  undefined.display_address, and give you error message */}
            {this.props.selectedRamen.coordinates && <img className="map-img" src={`https://maps.googleapis.com/maps/api/staticmap?markers=${this.props.selectedRamen.coordinates.latitude},${this.props.selectedRamen.coordinates.longitude}&size=400x300&key=${GM_API_KEY}`} alt=""/>}
            <div className="button-wrap">
              <Button onClick={this.handleAllReviewButton}>Read All Reviews</Button>
                {this.state.showReviews ? this.handleReviews() : null}

              <Button onClick={this.handleReviewButton}>Write a Review</Button>
            </div>
                { this.state.showForm ?
                  // console.log("hello")
                    <div className="modal">
                      <div className="modal-content">
                        <span className="close-button" onClick={this.handleClose}>&times;</span>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Select options={options} name="type" onChange={this.handleChange}/>
                          <Form.TextArea name="message" style={textArea}
                            placeholder="Please leave your review of this ramen place here." onChange={this.handleChange}/>
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
    return (
      <Fragment>{this.renderRamen()}</Fragment>
    )
  }
}

export default DisplayRamen
