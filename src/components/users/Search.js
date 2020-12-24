import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {

  state= {
    text: ''
  };

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})

  }
  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.text===''){
      this.props.showAlert('Please enter a user' , 'light')
    } else {
      this.props.searchUsers(this.state.text)
      this.setState({text: ''})
    }
    
  }
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear:PropTypes.bool.isRequired,
    showAlert: PropTypes.func.isRequired
  }

  render() {
    const {showClear, clearUsers} = this.props
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input onChange={this.onChange} value={this.state.text} type="text" name="text" placeholder="Search for a user"></input>
          <input type="submit" className=" btn btn-dark btn-block"></input>
        </form>
        {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
        
      </div>
    )
  }
}

export default Search
