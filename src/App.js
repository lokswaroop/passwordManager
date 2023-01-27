import './App.css'
import {Component} from 'react'

import {v4} from 'uuid'

class App extends Component {
  state = {
    isTrue: false,
    list: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  addContent = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const newValues = {
      id: v4(),
      initial,
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      list: [...prevState.list, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      search: '',
    }))
  }

  website = event => {
    this.setState({website: event.target.value})
  }

  userName = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  search = event => {
    this.setState({search: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onClickDelete = id => {
    const {list} = this.state
    const newList = list.filter(each => each.id !== id)

    this.setState({list: newList})
  }

  render() {
    const {list, website, username, password, isShow, search} = this.state
    let {isTrue} = this.state

    const newList = list.filter(each =>
      each.website.toLowerCase().includes(search.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="bg">
        <div>
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="container1">
          <div className="card">
            <form onClick={this.addContent}>
              <h1 className="heading">Add New Password</h1>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="smallImage"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.website}
                  value={website}
                />
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="smallImage"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.userName}
                  value={username}
                />
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="smallImage"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.password}
                  value={password}
                />
              </div>
              <button type="submit" className="addButton">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt=" password manager"
            className="passwordImage"
          />
        </div>
        <div className="container2">
          <div className="flex">
            <div className="flex">
              <h1 className="heading">Your Passwords</h1>
              <p className="para">{newList.length}</p>
            </div>
            <div>
              <img
                className="smallImage"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="search"
                onChange={this.search}
                value={search}
              />
            </div>
          </div>

          <hr className="hr" />
          <div className="end">
            <input type="checkbox" id="check" onChange={this.showPassword} />
            <label htmlFor="check">Show Passwords</label>
          </div>

          {!isTrue && (
            <div className="center">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                alt="no passwords"
                className="noPasswordImage"
              />
              <p>No Passwords</p>
            </div>
          )}

          {isTrue && (
            <ul>
              {newList.map(each => (
                <li id={each.id} key={each.id}>
                  <p>{each.initialValue}</p>
                  <div>
                    <p>{each.website}</p>
                    <p>{each.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="star"
                      />
                    )}
                    {isShow && <p>{each.password}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => this.onClickDelete(each.id)}
                    data-testid="delete"
                    className="deleteButton"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delImage"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
