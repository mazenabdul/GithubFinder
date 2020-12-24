import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'

const Search = ({showAlert}) => {

  const githubContext = useContext(GithubContext)
  const [text, setText] = useState('')

  const onChange = (event) => {
    setText(event.target.value)

  }
  const onSubmit = (event) => {
    event.preventDefault();
    if(text===''){
      showAlert('Please enter a user' , 'light')
    } else {
      githubContext.searchUsers(text)
      setText('')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input onChange={onChange} value={text} type="text" name="text" placeholder="Search for a user"></input>
        <input type="submit" className=" btn btn-dark btn-block"></input>
      </form>
        {githubContext.users.length>0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}  
      </div>
    )
  }


Search.propTypes = {
  showAlert: PropTypes.func.isRequired
}


export default Search
