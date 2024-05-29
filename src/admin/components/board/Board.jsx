import "./board.css";
import { IoDocumentText } from "react-icons/io5";
import { Link } from "react-router-dom";

const Board = () => {
  return (
    <>
      <section>
        <div className="boxspentainer"></div>
        <div className="board">
          <div className="manage-target">
            <div className="manage">
              <div className="containerBox_db">
                <h3>Dashboard</h3>
                <div className="contentBox_db">
                  <div className="menu-box one">
                    <div>
                      <IoDocumentText className="iconGad gone1" />
                      <p>Company</p>
                    </div>
                    <h2></h2>
                    <Link to="/listcompany" className="txtcol">
                      View
                    </Link>
                  </div>
                  <div className="menu-box two">
                    <div>
                      <IoDocumentText className="iconGad gone2" />
                      <p>Favoriest</p>
                    </div>
                    <h2></h2>
                    <Link to="/listuserscompany" className="txtcol">
                      <p>View</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Board;
