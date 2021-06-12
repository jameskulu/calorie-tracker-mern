// import logo from './logo.png';
import './App.css';
import Header from './components/header/Header'
import Login from './components/main/Login/Login'
import Signup from './components/main/Signup/Signup'
import Homepage from './components/main/Homepage/Homepage'
import FoodPage from './components/main/FoodPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';



import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserContext from './context/UserContext'
import { useEffect, useState } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import FoodDetail from './components/main/FoodDetail/FoodDetail';
import CategoryFood from './components/main/Category/CategoryFood';
import CategoryPage from './components/main/Category/CategoryPage';
import Diary from './components/main/Diary/Diary';
import Profile from './components/main/Profile/Profile';
import EditProfile from './components/main/Profile/EditProfile';
import ProtectedRoutes from './components/Protected/ProtectedRoutes'
import ProtectedAdminRoute from './components/Protected/ProtectedAdminRoute'

import Admin from './components/admin/Admin'
import CategoryAdmin from './components/admin/Category/CategoryAdmin';
import FoodAdmin from './components/admin/Food/FoodAdmin';
import UserAdmin from './components/admin/User/UserAdmin';
import AddCategory from './components/admin/Category/AddCategory';
import AddFood from './components/admin/Food/AddFood';
import AddUser from './components/admin/User/AddUser';
import UpdateCategory from './components/admin/Category/UpdateCategory';
import UpdateFood from './components/admin/Food/UpdateFood';
import UpdateUser from './components/admin/User/UpdateUser';

toast.configure()
function App() {

  // const [isAuth, setAuth] = useState(false)

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {

    const checkLoggedIn = async () => {

      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem('auth-token', "")
        token = ""
      }

      const tokenResponse = await axios.post('http://localhost:40/user/tokenIsValid', null,
        { headers: { 'Authorization': 'Bearer ' + token } }
      )

      if (tokenResponse.data) {
        const userResponse = await axios.get("http://localhost:40/user",
          { headers: { 'Authorization': 'Bearer ' + token } })

        setUserData({
          token,
          user: userResponse.data
        })
      }
    }
    checkLoggedIn()

  }, [])


  // const isAuth = () => {
  //   if (localStorage.getItem('auth-token') !== undefined) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // }

  const isAuth = () => {
    if (userData.user !== undefined) {
      return true
    }
    else {
      return false
    }
  }

  const isAdmin = () => {
    if (userData.user) {
      if (userData.user.role === 'Admin') {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  return (
    <div className="App">

      <BrowserRouter>

        <UserContext.Provider value={{ userData, setUserData }} >

          {/* <Route path="/editProject" component={HomePage} /> */}
          {/* Admin */}
          <ProtectedAdminRoute exact path='/admin' component={Admin} isAdmin={isAdmin()} />
          <ProtectedAdminRoute exact path='/admin/food' component={FoodAdmin} isAdmin={isAdmin()} />
          <ProtectedAdminRoute exact path='/admin/category' component={CategoryAdmin} isAdmin={isAdmin()} />
          <ProtectedAdminRoute exact path='/admin/user' component={UserAdmin} isAdmin={isAdmin()} />

          <ProtectedAdminRoute exact path='/admin/category/add' component={AddCategory} isAdmin={isAdmin()} />
          <ProtectedAdminRoute exact path='/admin/user/add' component={AddUser} isAdmin={isAdmin()} />
          <ProtectedAdminRoute exact path='/admin/food/add' component={AddFood} isAdmin={isAdmin()} />

          <ProtectedAdminRoute exact path='/admin/category/update/:categoryId' component={UpdateCategory} isAdmin={isAdmin()} />
          <ProtectedAdminRoute exact path='/admin/food/update/:foodId' component={UpdateFood} isAdmin={isAdmin()} />
          <ProtectedAdminRoute exact path='/admin/user/update/:userId' component={UpdateUser} isAdmin={isAdmin()} />




          {/* Auth */}
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />

          <Route exact path={['/',
            '/foods',
            '/foods/:foodId',
            '/category',
            '/category/:category',
            '/diary',
            '/profile',
            '/edit-profile',

          ]}
            component={Header} />

          <div className="container mt-4 mb-4">

            <Switch>

              <ProtectedRoutes exact path='/' component={Homepage} isAuth={isAuth()} />
              <ProtectedRoutes exact path='/foods' component={FoodPage} isAuth={isAuth()} />
              <ProtectedRoutes path='/foods/:foodId' component={FoodDetail} isAuth={isAuth()} />
              <ProtectedRoutes exact path='/category/' component={CategoryPage} isAuth={isAuth()} />
              <ProtectedRoutes path='/category/:category' component={CategoryFood} isAuth={isAuth()} />
              <ProtectedRoutes path='/diary' component={Diary} isAuth={isAuth()} />
              <ProtectedRoutes exact path='/profile' component={Profile} isAuth={isAuth()} />
              <ProtectedRoutes exact path='/edit-profile' component={EditProfile} isAuth={isAuth()} />

            </Switch>

          </div>

        </UserContext.Provider>

      </BrowserRouter>
    </div>
  );
}

export default App;
