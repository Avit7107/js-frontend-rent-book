import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getBookPopular} from '../publics/actions/books'

import { Carousel } from 'react-bootstrap'

class carouselBooks extends Component {
  constructor(props){
    super(props)
    this.state = {
      popularBooksList: null
    }
    this.getDetails = this.getDetails.bind(this)
  }

  getDetails = (bookid) => {
    this.props.history.push(`/book/${bookid}`)
  }

  componentDidMount = async () => {
    await this.props.dispatch(getBookPopular())
    this.setState ({popularBooksList: this.props.books.popularBooksList})
  }

  render () {
    const {popularBooksList} = this.state
    return (
      <Carousel style={{ marginTop: '90px' }}>
        {popularBooksList !== null ? popularBooksList.map((books, index) => {
          return (
            <Carousel.Item key={index} onClick={()=>this.getDetails(books.bookid)}>
              <h1 className="shadow-lg" style={{textAlign:'center'}}>Popular Book's</h1>
              <figure
                style={{height:'450px'}}
                className='w-50 align-item-center shadow-lg mb-5'
                src={books.image}
              />
            <Carousel.Caption className="box-shadow" style={{backgroundColor:'black'}}>
              <h4>{books.title}</h4>
            </Carousel.Caption>
          </Carousel.Item>
          )
        }):<div></div>}
      </Carousel>
    )
  }
}

const mapStateToProps = state => {
  return{
    books: state.books
  }
}

export default connect(mapStateToProps)(carouselBooks)
