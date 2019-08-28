import Axios from 'axios'

module.exports = {
    getGenres: () => {
        return {
            type: 'GET_GENRES',
            payload: Axios.get('http://localhost:1150/genres', {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    addGenre: (data) => {
        return {
            type: 'ADD_GENRE',
            payload: Axios.post('http://localhost:1150/genres', data, {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    deleteGenre: (genreid) => {
        return {
            type: 'DELETE_GENRE',
            payload: Axios.delete(`http://localhost:1150/genres/${genreid}`, {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    },
    editGenre: (genreid, data) => {
        return {
            type: 'EDIT_GENRE',
            payload: Axios.patch(`http://localhost:1150/genres/${genreid}`, data, {
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            })
        }
    }
}