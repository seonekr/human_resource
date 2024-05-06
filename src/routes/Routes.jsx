import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Home from "../user/components/homepage/Home";
import Payment from "../user/components/cart/Payment";
import Cart from "../user/components/cart/Cart";
import Contacts from "../user/components/contact/Contact";
import Bill from "../user/components/order/Bill";
import Dashboard from "../admin/Dashboard";
import Post from "../admin/components/products/Post";

import Profile from "../user/components/account/Profile";
import Terms from "../user/components/account/Terms";
import Privacy from "../user/components/account/Privacy"
import More from "../user/components/account/More";

/* ============================== */
import Order from "../user/components/order/Order";
import ProductDetails from "../user/components/products/ProductDetails";
import OrderPage from "../admin/components/orderPage/OrderPage";
import OrderBill from "../admin/components/orderPage/OrderBill";
import Product from "../admin/components/products/Product";
import Text from "../user/components/order/Text";
import ForgotPassword from "../user/components/login_register/ForgotPassword";
import AlertLogin from "../user/components/login_register/AlertLogin"
import AlertRegister from "../user/components/login_register/AlertRegister"
import Login from "../user/components/login_register/Login"
import Register from "../user/components/login_register/Register"



// ===============================
import User from "../admin/components/menagerUser/User";
import Users from "../admin/components/menagerUser/Users"
import Admin from "../admin/components/menagerAdmin/Admin"
import Admins from "../admin/components/menagerAdmin/Admins";
import AddAdmin from "../admin/components/menagerAdmin/AddAdmin";
import Admin_acount from "../admin/components/menagerAdmin/Admin_acount";
import Store from "../admin/components/stores/Store";
import Bank from "../admin/components/bank_account/Bank";
import Addaccount from "../admin/components/bank_account/Addaccount";




const Links = () => {
    return(
        <Router>
            <Routes>
                {/*====================== */}
                <Route exact path="/" Component={Home}/>
                <Route exact path="/cart/payment" Component={Payment}/>
                <Route exact path="/contacts" Component={Contacts}/>
                <Route exact path="/order" Component={Order}/>
                <Route exact path="/order/bill" Component={Bill}/>
                <Route exact path="/text" Component={Text}/>

                {/*====================== */}
                <Route exact path="/productdetails" Component={ProductDetails}/>
                <Route exact path="/cart" Component={Cart}/>
                <Route exact path="/forgotpassword" Component={ForgotPassword}/>
                <Route exact path="/alertlogin" Component={AlertLogin}/>
                <Route exact path="/alertregister" Component={AlertRegister}/>
                <Route exact path="/login" Component={Login}/>
                <Route exact path="/register" Component={Register}/>


                {/* Admin routes */}
                <Route exact path="/dashboard" Component={Dashboard}/>
                <Route exact path="/post" Component={Post}/>
                <Route exact path="/orderpage" Component={OrderPage}/>
                <Route exact path="/orderbill" Component={OrderBill}/>
                <Route exact path="/product" Component={Product}/>
                <Route exact path="/user" Component={User}/>
                <Route exact path="/users" Component={Users}/>
                <Route exact path="/admins" Component={Admins}/>
                <Route exact path="/admins/admin" Component={Admin}/>
                <Route exact path="/addadmin" Component={AddAdmin}/>
                <Route exact path="/adminacount" Component={Admin_acount}/>
                <Route exact path="/store" Component={Store}/>
                <Route exact path="/bank" Component={Bank}/>
                <Route exact path="/addaccount" Component={Addaccount}/>
                <Route exact path="/more" Component={More}/>
                <Route exact path="/profile" Component={Profile}/>
                <Route exact path="/terms" Component={Terms}/>
                <Route exact path="/privacy" Component={Privacy}/>
            </Routes>
        </Router>
    );
};

export default Links;