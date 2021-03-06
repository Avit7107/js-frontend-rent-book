import React from 'react'
import {Button, Container, Row, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {getBookById} from '../publics/actions/books';
import {getProfile} from '../publics/actions/users';
import {getLatestBorrowingByBookId} from '../publics/actions/borrows';
import EditBookModal from '../components/modalEditBook';
import AddBorrowingModal from '../components/modalAddBorrow';
import ReturnBookModal from '../components/modalReturnBook';
import DeleteBookPrompt from '../components/deleteBookPrompt';

class BookDetail extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      bookUrl:props.bookUrl,
      bookData: props.book.booksList.find((book)=>{return book.id === Number(props.bookId)}),
      borrowedBy:0,
      showModal:false,
      modalTitle:"",
      modalMessage:"",
    }
  }

  render(){
    const bookData = this.props.book.booksList.find((book)=>{return book.id === Number(this.props.bookId)})
    console.log(bookData)
    if(bookData === undefined){
      return (
        <div className="container">
          <h1>Loading...</h1>
        </div>
      )
    }else if(bookData === null){
      return (
        <Alert variant="danger">Book Not Found</Alert>
      )
    }else if(bookData.deleted){
      return (
        <Redirect to="/" />
      )
    }else{
      let stringDateReleased = new Date(bookData.date_released).toDateString()
      const coverImageUrl = bookData.image.includes('yenpress')? bookData.image.split('w=')[0] + `w=${window.innerWidth}`:bookData.image
      return (
        <div style={{overflow:"hidden"}}>
          <Link 
            to="/home" 
            variant="light" 
            className=" btn btn-light back-button"
          >
            <FontAwesomeIcon  icon={faArrowLeft} />
          </Link>
          <div className="book-detail-image">
            <img 
              className="cover-img"
              src={coverImageUrl} 
              alt="cover"
            />
            <img 
              className="book-img" 
              src={bookData.image} 
              alt="miniCover"
            />
          </div>
          
          {this.props.user.userProfile.level === 'admin' ? 
            <div className="book-detail-control">
              <Row>
                <EditBookModal variant="outline-light" history={this.props.history} bookId={bookData.id} bookData={bookData} />
                <DeleteBookPrompt variant="outline-light" bookData={bookData} history={this.props.history} />
              </Row>
            </div>
            :''
          }

          <div className="book-detail-data">
            <Button 
              variant="warning" 
              className="genre-button"
            >
              {bookData.genre}
            </Button>
            <Button 
              variant="outline-warning" 
              className="availability-button"
            >
              {bookData.availability === 1 ? "Available": "Not Available"}
            </Button>
            <div className="book-title">{bookData.title}</div>
            <div className="book-date-released">
              {stringDateReleased}
            </div>
            <Container className="book-description">{bookData.description}</Container>
          </div>

          {this.props.user.userProfile.level === 'admin' ? 
            bookData.availability === 1 ?
              <AddBorrowingModal bookId={bookData.id} className="borrow-button" variant="warning" />
              :
              <ReturnBookModal  bookId={bookData.id} className="borrow-button" variant="warning" readOnlyBookId={true}/>
          :''}
          
        </div>
      )
    }
  }

  componentDidMount = async () => {
    if(!window.localStorage.getItem("token"))
      this.props.history.push('/')
      
    if(!this.state.bookData){
      this.getBookData()
    }
    if(!this.props.user.userProfile){
      await this.props.dispatch(getProfile())
      this.setState({
        userData: this.props.user.userProfile
      })
    }
  }

  getBookData = async () => {
    this.props.dispatch(getBookById(this.props.bookId))
      .then(()=>{
        const bookData = this.props.book.booksList.find((book)=>{return Number(book.id) === Number(this.props.bookId)})
        if(bookData !== undefined){
          this.setState({bookData},
            async ()=>{
              await this.props.dispatch(getLatestBorrowingByBookId(this.props.bookId))
              const borrowedBy = this.props.borrowing.borrowingData ? this.props.borrowing.borrowingData[0].user_id : 0
              this.setState({borrowedBy})
            }
          )
        }else{
          this.props.history.push('/')
        }
      })
      .catch(err => {
        console.error(err)
        this.props.history.push('/')
      })
  }

}
const mapStateToProps = (state) => {
  return{
    book: state.book,
    user: state.user,
    borrowing: state.borrowing
  }
}

export default connect(mapStateToProps)(BookDetail)