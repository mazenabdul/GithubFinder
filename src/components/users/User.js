import React, { Fragment, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import Repos from '../repos/Repos'
import GithubContext from '../../context/github/githubContext'

const User = ({ match}) => {

  const githubContext = useContext(GithubContext)
  const {name, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable } = githubContext.user

  useEffect (() => {
    githubContext.getUser(match.params.login)
    githubContext.getUserRepos(match.params.login)
  }, [])


    return (
      <Fragment>
        <Link to='/' className="btn btn-dark">Back to search</Link>
        Hireable? {hireable ? <i className="fas fa-check text-success"/> :<i className="fas fa-times-circle text-danger"/> }
        <div className="card grid-2">
          <div className="all-center">
            <img src={avatar_url} className="round-img" style={{width:'150px'}} alt=""></img>
            <h1>{name}</h1>
            <h4>Location: {location}</h4>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio: </h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
            <ul>
              <li>
                {login && (
                  <Fragment><strong>Username:</strong> {login}</Fragment>
                )}
              </li>
              <li>
                {followers && (
                  <Fragment> <strong>Followers:</strong> {followers}</Fragment>
                )}
              </li>
              <li>
                {following && (
                  <Fragment> <strong>Following:</strong> {following}</Fragment>
                )}
              </li>
              <li>
                {public_repos && (
                  <Fragment><strong>Public Repos:</strong> {public_repos}</Fragment>
                )}
              </li>
              <li>
                {public_gists && (
                  <Fragment><strong>Public Gists:</strong> {public_gists}</Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment><strong>Blog:</strong> {blog}</Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <Repos repos={githubContext.repos}></Repos>
      </Fragment>
      
    )
  }


export default User
