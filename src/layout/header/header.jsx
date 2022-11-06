import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { TOKEN_NAME } from '../../services/service'

const Header = () => {


  const nav = useNavigate();

  const onLogOut = () => {
    // מחיקת טוקן
    if (window.confirm("Are you sure you want to logout ?")) {
      localStorage.removeItem(TOKEN_NAME)
      // להעביר לעמוד לוג אין
      nav("/");
    }
  }



  return (
    <div>

      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>Client</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/about'}>About</Link>
              </li>
              {localStorage[TOKEN_NAME] ?

                <li>
                  <button className='btn btn-danger' onClick={onLogOut}>Log out</button>
                </li>
                :
                <li className="nav-item">
                  <Link className="nav-link" to={'/loginsign'}>Login / sign up</Link>
                </li>
              }






            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header