import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../user/components/homepage/Home";
import Contact from "../user/components/contact/Contact";
import Dashboard from "../admin/Dashboard";
import Profile from "../user/components/account/Profile";
import More from "../user/components/account/More";

/* ============================== */
import Details from "../user/components/resume/Details";
import ForgotPassword from "../user/components/login_register/ForgotPassword";
import AlertLogin from "../user/components/login_register/AlertLogin";
import AlertRegister from "../user/components/login_register/AlertRegister";
import Login from "../user/components/login_register/Login";
import Signup1 from "../user/components/login_register/Signup1";
import Signup2 from "../user/components/login_register/Signup2";
import CVregister from "../user/components/cv/CVregister";
import Listusers from "../company/component/Listusers";
import DetailCV from "../user/components/cv/DetailCV";
import EditResume from "../user/components/cv/EditResume";

// ===============================
import Admin_acount from "../admin/components/accountAdmin/Admin_acount";
import EditAccount from "../admin/components/accountAdmin/EditAccount";
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
        <Route exact path="/details/:id" Component={Details} />
        <Route exact path="/forgotpassword" Component={ForgotPassword} />
        <Route exact path="/alertlogin" Component={AlertLogin} />
        <Route exact path="/alertregister" Component={AlertRegister} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/signup1" Component={Signup1} />
        <Route exact path="/signup2" Component={Signup2} />
        <Route exact path="/add_resume" Component={CVregister} />
        <Route exact path="/list_users" Component={Listusers} />
        <Route exact path="/detail_cv/:id" Component={DetailCV} />
        <Route exact path="/edit_resume/:id" Component={EditResume} />
        <Route exact path="/search" Component={Search} />

        {/* Admin routes */}
        <Route exact path="/dashboard" Component={Dashboard} />
        <Route exact path="/adminacount" Component={Admin_acount} />
        <Route exact path="/edit_account" Component={EditAccount} />
        <Route exact path="/more" Component={More} />
        <Route exact path="/profile" Component={Profile} />
        <Route exact path="/listcompany" Component={Listcompany} />
        <Route exact path="/listuserscompany" Component={Listusers_company} />
      </Routes>
    </Router>
  );
};

export default Links;
