import React, {useContext} from 'react'
import RepoItem from './RepoItem'
import GithubContext from '../../context/github/githubContext'


const Repos = () => {
  const githubContext = useContext(GithubContext)
  return (
    githubContext.repos.map(repo => (
      <RepoItem key={repo.id} repo={repo}></RepoItem>
    ))
  )
}

export default Repos
