import React, { useContext } from 'react'
import UserItem from "./UserItem"
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'

const Users = () => {

  const githubContext = useContext(GithubContext) 

  if(githubContext.loading){
    return <Spinner/>
  } else {
    return (
      <div style={userStyle}>
        {githubContext.users.map(user => (
          <UserItem key={user.id} user={user}>/</UserItem>
        ))}
      </div>
    )
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gap: "1rem"
}


export default Users
