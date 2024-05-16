import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../user/components/homepage/Home";

import Contact from "../user/components/contact/Contact";
import Dashboard from "../admin/Dashboard";
import Post from "../admin/components/products/Post";

import Profile from "../user/components/account/Profile";
import Terms from "../user/components/account/Terms";
import Privacy from "../user/components/account/Privacy";
import More from "../user/components/account/More";

/* ============================== */
import ProductDetails from "../user/components/products/ProductDetails";
import OrderPage from "../admin/components/orderPage/OrderPage";
import OrderBill from "../admin/components/orderPage/OrderBill";
import Product from "../admin/components/products/Product";
import ForgotPassword from "../user/components/login_register/ForgotPassword";
import AlertLogin from "../user/components/login_register/AlertLogin";
import AlertRegister from "../user/components/login_register/AlertRegister";
import Login from "../user/components/login_register/Login";
import Signup1 from "../user/components/login_register/Signup1";
import Signup2 from "../user/components/login_register/Signup2";
import CVregister from "../user/components/cv/CVregister"
import Listusers from "../company/component/Listusers";
import DetailCV from "../user/components/cv/DetailCV";
import EditResume from "../user/components/cv/EditResume"

// ===============================
import User from "../admin/components/menagerUser/User";
import Users from "../admin/components/menagerUser/Users";
import Admins from "../admin/components/menagerAdmin/Admins";
import AddAdmin from "../admin/components/menagerAdmin/AddAdmin";
import Admin_acount from "../admin/components/accountAdmin/Admin_acount"
import EditAccount from "../admin/components/accountAdmin/EditAccount"
import Store from "../admin/components/stores/Store";
import Bank from "../admin/components/bank_account/Bank";
import Addaccount from "../admin/components/bank_account/Addaccount";
import EditAdmin from "../admin/components/menagerAdmin/EditAdmin";

import AboutUs from "../user/components/contact/AboutUs";

import Search from "../user/components/header/Search";

import Listcompany from "../admin/components/list_company/List_company";
import Listusers_company from "../admin/components/list_company/Listusers_company";


const Links = () => {
  return (
    <Router>
      <Routes>
        {/*====================== */}
        <Route exact path="/" Component={Home} />
        <Route exact path="/contact" Component={Contact} />
        <Route exact path="/about" Component={AboutUs} />

        {/*====================== */}
        <Route exact path="/productdetails/:id" Component={ProductDetails} />
        <Route exact path="/forgotpassword" Component={ForgotPassword} />
        <Route exact path="/alertlogin" Component={AlertLogin} />
        <Route exact path="/alertregister" Component={AlertRegister} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/signup1" Component={Signup1} />
        <Route exact path="/signup2" Component={Signup2} />
        <Route exact path="/add_resume" Component={CVregister} />
        <Route exact path="/list_users" Component={Listusers} />
        <Route exact path="/detail_cv/:id" Component={DetailCV} />
        <Route exact path="/edit_resume" Component={EditResume} />

        <Route exact path="/search" Component={Search} />

        {/* Admin routes */}
        <Route exact path="/dashboard" Component={Dashboard} />
        <Route exact path="/post" Component={Post} />
        <Route exact path="/orderpage" Component={OrderPage} />
        <Route exact path="/orderbill" Component={OrderBill} />
        <Route exact path="/product" Component={Product} />
        <Route exact path="/user" Component={User} />
        <Route exact path="/users" Component={Users} />
        <Route exact path="/admins" Component={Admins} />
        <Route exact path="/edit_admin" Component={EditAdmin} />
        <Route exact path="/addadmin" Component={AddAdmin} />
        <Route exact path="/adminacount" Component={Admin_acount} />
        <Route exact path="/edit_account" Component={EditAccount} />
        <Route exact path="/store" Component={Store} />
        <Route exact path="/bank" Component={Bank} />
        <Route exact path="/addaccount" Component={Addaccount} />
        <Route exact path="/more" Component={More} />
        <Route exact path="/profile" Component={Profile} />
        <Route exact path="/terms" Component={Terms} />
        <Route exact path="/privacy" Component={Privacy} />

        <Route exact path="/listcompany" Component={Listcompany} />
        <Route exact path="/listuserscompany" Component={Listusers_company} />
      </Routes>
    </Router>
  );
};

export default Links;
