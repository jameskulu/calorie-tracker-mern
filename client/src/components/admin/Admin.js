import React, { useContext } from 'react'
import { Route, Switch, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import './admin.css'
import UserContext from '../../context/UserContext'
import { toast } from 'react-toastify'



const Admin = (props) => {
    const history = useHistory()
    const { userData, setUserData } = useContext(UserContext) 
    const logout = () => {
      setUserData({
        token: undefined, user: undefined //empty user,token data after logout
      })
      localStorage.setItem('auth-token', '') //empty local storage
      history.push('/login') 
      toast.success("You are logged out successfully.")
    }
    return (
        <div>
            <nav class="navbar navbar-expand navbar-dark bg-dark static-top">

                <Link class="navbar-brand mr-1" to="/">Calorie Tracker</Link>

                <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
                    <i class="fas fa-bars"></i>
                </button>

                {/* <!-- Navbar Search --> */}
                <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="button">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>

                {/* <!-- Navbar --> */}
                <ul class="navbar-nav ml-auto ml-md-0">
                 
                    <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-user-circle fa-fw"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                           
                    
                            <Link class="dropdown-item" onClick={logout} data-toggle="modal" data-target="#logoutModal">Logout</Link>
                        </div>
                    </li>
                </ul>

            </nav>

            <div id="wrapper">

                {/* <!-- Sidebar --> */}
                <ul class="sidebar navbar-nav">
                    <li class="nav-item active">
                        <Link class="nav-link" to="/admin/user">
                            <i class="fas fa-fw fa-tachometer-alt"></i>
                            <span>User</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/admin/category">
                            <i class="fas fa-fw fa-tachometer-alt"></i>
                            <span>Category</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/admin/food">
                            <i class="fas fa-fw fa-tachometer-alt"></i>
                            <span>Food</span>
                        </Link>
                    </li>


                </ul>

                <div id="content-wrapper">

                    <div class="container-fluid">

                        {/* <!-- Breadcrumbs--> */}
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="#">Dashboard</a>
                            </li>
                            <li class="breadcrumb-item active">Overview</li>
                        </ol>

                        {/* <!-- Icon Cards--> */}
                        <div class="row">
                            <div class="col-xl-3 col-sm-6 mb-3">
                                <div class="card text-white bg-primary o-hidden h-100">
                                    <div class="card-body">
                                        <div class="card-body-icon">
                                            <i class="fas fa-fw fa-comments"></i>
                                        </div>
                                        <Link class="nav-link" to="/admin/user">
                                        <div class="mr-5 text-white">User</div> </Link>
                                        
                                    </div>
                                    <a class="card-footer text-white clearfix small z-1" href="#">
                                    <Link class="nav-link" to="/admin/user">
                                        <span class="float-left text-white">View Details</span>
                                        </Link>
                                        <span class="float-right">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xl-3 col-sm-6 mb-3">
                                <div class="card text-white bg-warning o-hidden h-100">
                                    <div class="card-body">
                                        <div class="card-body-icon">
                                            <i class="fas fa-fw fa-list"></i>
                                        </div>
                                        <Link class="nav-link" to="/admin/category">
                                        <div class="mr-4 text-white">Category</div> </Link>
                                        
                                    </div>
                                    <a class="card-footer text-white clearfix small z-1" href="#">
                                    <Link class="nav-link" to="/admin/category">
                                        <span class="float-left text-white">View Details</span>
                                        </Link>
                                        <span class="float-right">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xl-3 col-sm-6 mb-3">
                                <div class="card text-white bg-success o-hidden h-100">
                                    <div class="card-body">
                                        <div class="card-body-icon">
                                            <i class="fas fa-fw fa-shopping-cart"></i>
                                        </div>
                                        <Link class="nav-link" to="/admin/food">
                                        <div class="mr-4 text-white">Food</div> </Link>
                                    </div>
                                    <a class="card-footer text-white clearfix small z-1" href="#">
                                    <Link class="nav-link" to="/admin/category">
                                        <span class="float-left text-white">View Details</span>
                                        </Link>
                                        <span class="float-right">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xl-3 col-sm-6 mb-3">
                                <div class="card text-white bg-danger o-hidden h-100">
                                    <div class="card-body">
                                        <div class="card-body-icon">
                                            <i class="fas fa-fw fa-life-ring"></i>
                                        </div>
                                        <div class="mr-5">3 New Users!</div>
                                    </div>
                                    <a class="card-footer text-white clearfix small z-1" href="#">
                                        <span class="float-left">View Details</span>
                                        <span class="float-right">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                           
                        <div>
                            {props.children}
                        </div>

                    </div>
                    {/* <!-- /.container-fluid --> */}

                    {/* <!-- Sticky Footer --> */}
                    <footer class="sticky-footer">
                        <div class="container my-auto">
                            <div class="copyright text-center my-auto">
                                <span>Copyright © Your Website 2018</span>
                            </div>
                        </div>
                    </footer>

                </div>
                {/* <!-- /.content-wrapper --> */}

            </div>
            {/* <!-- /#wrapper --> */}
        </div>
    )
}

export default Admin
