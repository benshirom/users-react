import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { TOKEN_NAME, TOKEN_ROLE } from '../../services/service'
const HeaderAdmin = () => {
  const nav = useNavigate();

  const onLogOut = () => {
    // מחיקת טוקן
    if (window.confirm("Are you sure you want to logout ?")) {
      localStorage.removeItem(TOKEN_NAME)
      localStorage.removeItem(TOKEN_ROLE)

      // להעביר לעמוד לוג אין
      nav("/admin");
    }
  }


  return (
    <div>

      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/admin'}>Admin</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/admin'}>homeAdmin</Link>
              </li>
              {localStorage[TOKEN_NAME]  && <li className="nav-item">
                <Link className="nav-link active" to={'/admin/myinfo'}>My Info</Link>
              </li>}

               {localStorage[TOKEN_NAME]  && <li className="nav-item">
                  <Link className="nav-link active" to={'/admin/userslist'}>Users list</Link>
                </li>}
                <li className="nav-item">
                  <Link className="nav-link active" to={'/admin/toysList'}>Toys list</Link>
                </li>
                {localStorage[TOKEN_NAME]  && <li className="nav-item">
                  <Link className="nav-link active" to={'/admin/mytoysList'}>My Toys</Link>
                </li>}

            </ul>
            {localStorage[TOKEN_NAME] ?
              <ul className="navbar-nav">
                <li>
                  <button className='btn btn-danger' onClick={onLogOut}>Log out</button>
                </li>
              </ul>
              :
              <ul className="navbar-nav flex-row">

                <li className="nav-item ">
                  <Link className="nav-link active" to={'/login'}>Login</Link>

                </li>
                <li className="nav-link">/</li>
                <li className="nav-item ">
                  <Link className="nav-link active" to={'/signup'}>sign up</Link>

                </li>
              </ul>
            }


          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderAdmin