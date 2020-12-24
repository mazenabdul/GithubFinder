import React from 'react'
import UserItem from "./UserItem"
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

const Users = (props) => {

  if(props.loading){
    return <Spinner/>
  } else {
    return (
      <div style={userStyle}>
        {props.users.map(user => (
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

Users.propTypes = {

  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}
export default Users
