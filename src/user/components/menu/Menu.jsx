import "./menu.css"
import 'boxicons'
import { Link } from "react-router-dom";
import QrdownloadApp from '../../../img/QrdownloadApp.png'
import {FaCartShopping} from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { BsShop, BsClipboardCheck  } from "react-icons/bs";
const Menu = () => {
    return (
        <section>

            {/*Footer Menu For PC */}

            <footer className="footerBox">
                <div className="footer_Container">
                    <div className="footconentBox">
                        <h3 className="txt_footHead">회사 소개</h3>
                        <p><Link to="/" className="txt_pFoot">Something</Link></p>
                        <p><Link to="/" className="txt_pFoot">Something</Link></p>
                        <p><Link to="/" className="txt_pFoot">Something</Link></p>
                        <p><Link to="/" className="txt_pFoot">Something</Link></p>
                        <p><Link to="/" className="txt_pFoot">Something</Link></p>
                    </div>

                    <div className="footconentBox">
                        <h3 className="txt_footHead">문의하기</h3>
                        <p><Link to="/" className="txt_pFoot">Phone: 020 998878788</Link></p>
                        <p><Link to="/" className="txt_pFoot">Phone: 020 998878788</Link></p>
                        <p><Link to="/" className="txt_pFoot">Email: humascot@gmail.com</Link></p>
                        <p><Link to="/" className="txt_pFoot">Address: Asean mall</Link></p>
                    </div>
                    <div className="footconentBox3">
                        <h3 className="txt_footHead txh3">앱 다운로드</h3>
                        <div className="foot_contentItem">
                            <img src={QrdownloadApp} alt="QrdownloadApp" />
                            <div className="guop_btndownl">
                                <Link to="/" className="footLink">플레이 스토어</Link>
                                <Link to="/" className="footLink">앱 스토어</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="hrfoo"/>
                <p className="lastFooter">
                    저작권 &#169;
                     TACA 2023
                </p>
            </footer>

            {/* Footer Menu For Mobile */}

            <div className="menubar">
                <Link to="/" className="box-menu active">
                    <span className="iconMenuSpan"><HiOutlineHome/></span><span>Home</span>
                </Link>
                <Link to="/text" className="box-menu">
                    <span className="iconMenuSpan"><BsShop /></span><span>Induction</span>
                </Link>
            </div>

        </section>
    )
}

export default Menu;