import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

import SignUp from './SignUp.jsx'
import SignIn from './SignIn.jsx'
import AllBlog from './AllBlog.jsx'
import ViewPost from './ViewPost.jsx'

function App() {

  const [isLogin, setIsLogin] = useState(false)
  const [showPage, setShowPage] = useState('AllBlog')

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])

  const signOutClick = () => {
    setIsLogin(false)
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    changePageClick('AllBlog')
  }

  const changePageClick = (nextPageName) => {
    setShowPage(nextPageName)
  }

  return (
    <div className="container d-flex flex-column vh-100">

      {/* NavBar */}

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={() => changePageClick('AllBlog')}>MyBlog Client Terminal</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">

              {!isLogin &&
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => changePageClick('SignIn')}>Sign in</a>
                </li>
              }

              {isLogin &&
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={signOutClick}>Sign out</a>
                </li>
              }

              {!isLogin &&
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => changePageClick('SignUp')}>Sign up</a>
                </li>
              }

              <li className="nav-item">
                <a className="nav-link" href="https://odin-blog-api-client-admin.netlify.app/" >Admin Portal</a>
              </li>

            </ul>
          </div>
        </div>
      </nav >

      {/* Contents */}

      <main className="p-3 m-3 flex-fill">
        {showPage == 'AllBlog' && <AllBlog isLogin = {isLogin} setShowPage={setShowPage}/>}
        {showPage == 'SignIn' && <SignIn setIsLogin={setIsLogin} setShowPage={setShowPage} />}
        {showPage == 'SignUp' && <SignUp setIsLogin={setIsLogin} setShowPage={setShowPage} />}
        {showPage.split(',')[0] == 'ViewPost' && <ViewPost setShowPage={setShowPage} postId={showPage.split(',')[1]} isLogin={isLogin}/>}
      </main>

      {/* Footer */}

      <footer className='text-center m-3 p-3'>
        Designed and created by YcWong
      </footer>

    </div >
  )
}

export default App
