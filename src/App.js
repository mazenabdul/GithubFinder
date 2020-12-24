import React, {Fragment, useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'
import GithubState from './context/github/GithubState'
import './App.css';

const App = () => {
 
  
  const [alert, setAlert] = useState(null)


  const showAlert = (message, type) => {
    setAlert({message, type})
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
    
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar /> 
            <div className="container">
              <Alert alert={alert}/>
              <Switch>
                <Route exact path ='/' render={props => (
                  <Fragment>
                    <Search showAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}>
                </Route>
                <Route exact path = "/about" component={About}></Route>
                <Route exact path='/user/:login' render={props => (
                  <User {...props} />
                )}>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    );

  }
 


export default App;
