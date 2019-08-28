import Axios from 'axios'

module.exports = {
    getBooks: (dataSource, page = 1, sortby, search) => {
        let url = `${dataSource}?page=${page}`
        if(sortby !== null)
            url += `&sortby = ${sortby}`
        if(search !== null)
            url += `&search = ${search}`
    
        return {
            type: 'GET_BOOKS',
            payload: Axios.get(url, {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    addBook: (data) => {
        return {
            type: 'ADD_BOOKS',
            payload: Axios.post('http://localhost:1150/books', data, {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    deleteBook: (bookid) => {
        return {
            type: 'DELETE_BOOKS',
            payload: Axios.delete(`http://localhost:1150/books/${bookid}`,{
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    editBook: (bookid, data) => {
        return{
            type: 'EDIT_BOOKS',
            payload: Axios.patch(`http://localhost:1150/books/${bookid}`, data,{
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    getBookPublish: () =>{
        return{
            type: 'GET_BOOKS_PUBLISH',
            payload: Axios.get('http://localhost:1150/books/publish/',{
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    getBookPopular: () =>{
        return{
            type: 'GET_POPULAR_BOOKS',
            payload: Axios.get('http://localhost:1150/books/popular',{
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    }
}