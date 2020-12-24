import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'
import './App.css';

class App extends Component {
 
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }

 searchUsers = async (text) => {
    this.setState({loading:true})
    const response= await axios.get(`https://api.github.com/search/users?q=${text}`)
    this.setState({loading:false, users: response.data.items})
  }

  //Function to get a single user
  getUser = async(username) => {
    this.setState({loading:true})
    const response= await axios.get(`https://api.github.com/users/${username}`)
    this.setState({loading:false, user: response.data})
  }

  getUserRepos = async(username) => {
    this.setState({loading:true})
    const response= await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
    this.setState({loading:false, repos: response.data})
  }
  clearUsers = () => {
    this.setState({users: [], loading: false})
  } 

  showAlert = (message, type) => {
    this.setState({alert:{message, type}})
    setTimeout(() => {
      this.setState({alert:null})
    }, 2000);

  }

   render () {
    const {loading, users} = this.state
    
    return (
      <Router>
        <div className="App">
        <Navbar /> 
          <div className="container">
            <Alert alert={this.state.alert}/>
            <Switch>
              <Route exact path ='/' render={props => (
                <Fragment>
                  <Search showAlert={this.showAlert} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false }  searchUsers = {this.searchUsers}/>
                  <Users loading={loading} users={users}/>
                </Fragment>
              )}>
              </Route>
              <Route exact path = "/about" component={About}></Route>
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={this.state.repos} user={this.state.user}/>
              )}>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );

  }
 
}

export default App;
