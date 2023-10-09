import React, { useState } from "react"; 

import "./header.css";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, withRouter } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CellTowerIcon from '@mui/icons-material/CellTower';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GroupsIcon from '@mui/icons-material/Groups';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContactsIcon from '@mui/icons-material/Contacts';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
 import { Button, Select, Icon, Tag, Switch, Checkbox } from "antd";

const Menu = (props) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const handleRefresh = () => {
    // This function will refresh the page
    window.location.reload();
  };
  function handleCallBack (data)  {
    props.history.push(`/how1`);
  };
  return (
    <div className="header">
      <div className="logo-nav">
        {/* <div className="logo-container">
        <Link to="/how1">
                  <div style={{ marginTop: "5px" }}>
                    <img
                  className="big-logo"
                  src={FWLogo}
                  style={{ width: 60}}
                  alt="Tekorero logo"

                />
                  </div>
                </Link>
        </div> */}
        <ul className={click ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={closeMobileMenu}>
          <Link to="/dashboard">
                <DashboardIcon 

                   style={{ fontSize: "large" }}
                />
               
                <span class="text-white text-ls ml-1">
                dashboard
                  
                </span>
              </Link>
          </li>
          <li className="option  max-sm:bg-quizb" onClick={closeMobileMenu}>
          <Link to="/planner">
             
              <CalendarMonthIcon
                style={{ fontSize: "large" }}
              />
            
             <span class="text-white text-ls ml-1">
                
                Planner
                
              </span>
            </Link>
          </li>
          <li className="option " onClick={closeMobileMenu}>
          <a href="/how3" onClick={handleRefresh}>
            {/* <Link to="/how3"> */}
                      <Button
                     
                        htmlType="submit"
                        style={{  height: "5em",display:"flex",justifyContent:"center",alignItems:"center" }}
                      >
                         <h3 class="font-medium text-white text-lg">Quiz Library </h3>
                      </Button>
                    {/* </Link> */}
                    </a>
          </li>
          <li className="option  max-sm:bg-quizb" onClick={closeMobileMenu}>
          <Link to="/ongoingQuiz">
                      <Button
                                               htmlType="submit"
                       style={{  height: "5em",display:"flex",justifyContent:"center",alignItems:"center" }}
                       >
                       <h3 class="font-medium text-white text-lg">Ongoing Quizzes</h3>
                     </Button>
                   </Link>
</li>
          <li className="option " onClick={closeMobileMenu}>
            {/* <Link to="/how4"> */}
            <a href="/how4" onClick={handleRefresh}>
                      <Button
                       
                        htmlType="submit"
                        style={{  height: "5em",display:"flex",justifyContent:"center",alignItems:"center" }}
                      >
                        <h3 class="font-medium text-white text-lg">My Profile</h3>
                      </Button>
                    {/* </Link> */}
                    </a>
          </li>
          <li className="option  max-sm:bg-quizb " onClick={closeMobileMenu}>
             <Link to="/changepassword">
                      <Button
                      
                        htmlType="submit"
                        style={{  height: "5em",display:"flex",justifyContent:"center",alignItems:"center" }}
                      >
                         <h3 class="font-medium text-white text-lg"> Change Password </h3>
                      </Button>
                    </Link>
          </li>
          <li className="option " onClick={closeMobileMenu}>
             <Link to="/email">
                      <Button
                      
                        htmlType="submit"
                        style={{  height: "5em",display:"flex",justifyContent:"center",alignItems:"center" }}
                      >
                         <h3 class="font-medium text-white text-lg">Sign Out </h3>
                      </Button>
                    </Link>
          </li>
        </ul>
      </div>
     
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseIcon className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>
    </div>
  );
};

export default withRouter (Menu);

