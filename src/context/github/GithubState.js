// Initial state and functions which modify state

import React, {useReducer} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'

import {SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types'

const GithubState = (props) => {

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  //Search a user
  const searchUsers = async (text) => {
    setLoading()
    const response= await axios.get(`https://api.github.com/search/users?q=${text}`)
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items
    })
  }

  //Get a user
  const getUser = async (username) => {
    setLoading()
    const response= await axios.get(`https://api.github.com/users/${username}`)
    dispatch({type: GET_USER, payload: response.data})
  }
  //Get Repos
  const getUserRepos = async (username) => {
    setLoading()
    const response= await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
   dispatch({type: GET_REPOS, payload: response.data})

  }

  //Clear Users
  const clearUsers = () => {
    dispatch({type: CLEAR_USERS})
  } 

  //Set Loading
  const setLoading = () => {
    dispatch({type: SET_LOADING})
  }

  return <GithubContext.Provider value={{
    users: state.users,
    user: state.user,
    repos: state.repos,
    loading: state.loading,
    searchUsers,
    clearUsers,
    getUser,
    getUserRepos
  }}>

    {props.children}
  </GithubContext.Provider>
}
export default GithubState