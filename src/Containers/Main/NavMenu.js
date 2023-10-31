import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'; 
import FactoryIcon from '@mui/icons-material/Factory'; 
import GroupsIcon from '@mui/icons-material/Groups'; 
import InventoryIcon from '@mui/icons-material/Inventory'; 
import { Menu, Icon, Popover, Badge } from "antd";
import { FormattedMessage } from "react-intl";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { translateText, getSupportedLanguages } from '../Translate/TranslateService';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'; 
import HandshakeIcon from '@mui/icons-material/Handshake';
import FilePresentIcon from '@mui/icons-material/FilePresent'
import CellTowerIcon from '@mui/icons-material/CellTower';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';   
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContactsIcon from '@mui/icons-material/Contacts';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from "react-router-dom";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { TeamOutlined } from "@ant-design/icons";
import CategoryIcon from '@mui/icons-material/Category'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PortraitIcon from '@mui/icons-material/Portrait';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ComputerIcon from '@mui/icons-material/Computer';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
const SubMenu = Menu.SubMenu;

function NavMenu (props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  console.log("abv",props.selectedLanguage)
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const translations = await Promise.all([
          translateText('Dashboard', props.selectedLanguage),
          translateText('Planner', props.selectedLanguage),
          translateText('Calls', props.selectedLanguage),
          translateText('Tasks', props.selectedLanguage),
          translateText('Events', props.selectedLanguage),
          translateText('Reports', props.selectedLanguage),
          translateText('Users', props.selectedLanguage),
          translateText('Opportunity', props.selectedLanguage),
          translateText('Contact', props.selectedLanguage),
          translateText('Customer', props.selectedLanguage),
          translateText('Talent', props.selectedLanguage),
          translateText('Requirement', props.selectedLanguage),
          translateText('Demand', props.selectedLanguage),
          translateText('Leads', props.selectedLanguage),
          translateText('Post', props.selectedLanguage),
          translateText('Project', props.selectedLanguage),
          translateText('Hours', props.selectedLanguage),
          translateText('Invoice', props.selectedLanguage),
          translateText('Vendor', props.selectedLanguage),
          translateText('Test', props.selectedLanguage),
          translateText('Courses', props.selectedLanguage),
          translateText('Program', props.selectedLanguage),
        ]);

        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

 
    console.log("Oppo", props.opportunityRecord);
    const { user } = props;
    let path = window.location.href.split("/")[3];
    console.log("path", path);
    console.log(user.leadsAccessInd)
    return (
      <div style={{ marginLeft: "-1.1875em" }}>
         
        <Menu
          defaultSelectedKeys={["/" + path]}
          defaultOpenKeys={[]}
          mode="inline"
          // theme={props.theme}
          theme="dark"
          style={{ background: "#38445E",fontFamily:"Poppins" }}
          inlineCollapsed={props.collapsed}
        >
          {/* dashboard */}
          {user.userType !== "USER" && user.department !== "Vendor" && user.department !== "Customer" && (

            <Menu.Item key="/dashboard" style={{height:"20px",paddingLeft:"1rem"}}>
              <Link to="/dashboard">
                <DashboardIcon 

                   style={{ fontSize: "large" }}
                />
               
                <span class="text-white text-ls ml-1">
                  {/* <FormattedMessage
                    id="app.recruitproboard"
                    defaultMessage="RecruitProBoard"
                  /> */}
                  {translatedMenuItems[0]}
                  {/* RecruitProBoard */}
                </span>
              </Link>
            </Menu.Item>

          )}
          {/* dashboard */}
          {/* <Menu.Item key="/dashboard">
            <Link to="/dashboard">
             
              <i class="fas fa-chart-line"></i>&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white", paddingleft: "0em" }}>
                <FormattedMessage
                  id="app.recruitproboard"
                  defaultMessage="RecruitProBoard"
                />
               
              </span>
            </Link>
          </Menu.Item> */}
          {/* {user.userType !== "USER" && user.department !== "VENDOR" && ( */}
          {/*planner*/}
          {user.imInd === true  && user.basicAccessInd === true && (
          <Menu.Item key="/planner" style={{height:"30px",paddingLeft:"1rem"}}>
            <Link to="/planner">
              {/* <Icon type="calendar" style={{ color: "white" }} /> */}
              <CalendarMonthIcon
                style={{ fontSize: "large" }}
              />
            
             <span class="text-white text-ls ml-1">
                {/* <FormattedMessage id="app.planner" defaultMessage="Planner" /> */}
                {/* Planner */}
                {translatedMenuItems[1]}
              </span>
            </Link>
          </Menu.Item>
           )}
          {/*planner*/}
          {/* )} */}
          {/* <Menu.Item key="/planner">
            <Link to="/planner">
             
              <i class="far fa-calendar-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}>
                <FormattedMessage
                  id="app.planner"
                  defaultMessage="Planner"
                />
             
              </span>
            </Link>
          </Menu.Item> */}

          {/*Activity*/}

          {/* {user.userType !== "USER" &&
            user.department !== "VENDOR" &&
            user.department != "Customer" && (
              <SubMenu
                key="sub1"
                style={{ marginBottom: "-0.75em", background: "#38445E" }}
                title={
                  <span>
                    <Icon type="mail" style={{ color: "white" }} />
                    <FontAwesomeIcon
                      icon={solid("bars-progress")}
                      style={{ fontSize: "small" }}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <span style={{ color: "white" }}>
                      <FormattedMessage
                        id="app.activity"
                        defaultMessage="Activity"
                      />
                    </span>
                  </span>
                }
              > */}
               {user.imInd === true  && user.basicAccessInd === true &&  (
          <Menu.Item key="/call" style={{height:"30px",paddingLeft:"1rem"}}>
            <Link to="/call">
              {/* <Icon style={{ color: "white" }} type="phone" /> */}
              <VolumeUpIcon
                // icon={solid("phone-volume")}
                 style={{ fontSize: "large" }}
              />
            <span class="text-white text-ls ml-1">
                {/* <FormattedMessage id="app.calls" defaultMessage="Calls" /> */}
                {/* Calls */}
                {translatedMenuItems[2]}
              </span>
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.Call}
                overflowCount={999}
              ></Badge>
            </Link>
          </Menu.Item>
               )}
                {user.imInd === true  && user.basicAccessInd === true &&  (
          <Menu.Item key="task" style={{height:"30px",paddingLeft:"1rem"}}>
            <Link to="/Task">
              {/* <Icon type="file-done" /> */}
              <FactCheckIcon
               style={{ fontSize: "large" }}
              />
               <span class="text-white text-ls ml-1">
                {/* <FormattedMessage id="app.tasks" defaultMessage="Tasks" /> */}
                {/* Task */}
                {translatedMenuItems[3]}
              </span>
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.Task}
                overflowCount={999}
              ></Badge>
            </Link>
          </Menu.Item>
                )}
                 {user.imInd === true  && user.basicAccessInd === true &&  (
          <Menu.Item key="event" style={{height:"30px",paddingLeft:"1rem"}}>
            <Link to="/Event">
              {/* <Icon type="schedule" /> */}
              <EventAvailableIcon
                style={{ fontSize: "large" }}
              />
                  <span class="text-white text-ls ml-1">
                {/* <FormattedMessage
                  id="app.events"
                  defaultMessage="Events"
                /> */}
                {/* Event */}
                {translatedMenuItems[4]}
              </span>
              &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.Event}
                overflowCount={999}
              ></Badge>
            </Link>
          </Menu.Item>
                 )}
          {/* <Menu.Item key="/mileage">
              <Link to="/mileage">
                <Icon type="dashboard" style={{ color: "white" }} />
                <span style={{ color: "white" }}>Leaves</span>
              </Link>
            </Menu.Item> */}
          {/* </SubMenu>
            )} */}

          {/*Activity*/}
          {/*Reports*/}
          {user.imInd === true  && user.basicAccessInd === true &&  (
          <Menu.Item key="/reports" style={{height:"30px",paddingLeft:"1rem"}}>
            <Link to="/reports">
              <PictureAsPdfIcon
               style={{ fontSize: "large" }}
              />
             <span class="text-white text-ls ml-1">
                {/* <FormattedMessage id="app.reports" defaultMessage="Reports" /> */}
                {/* Reports */}
                {translatedMenuItems[5]}
              </span>
            </Link>
          </Menu.Item>
          )}
          {/*Reports*/}



<hr />
     {user.leadsAccessInd === true && user.crmInd === true && user.imInd === true  &&(
     <Menu.Item key="/leads" style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/Leads">
                <GroupsIcon
            
                   style={{ fontSize: "large" }}
                />
                 <span class="text-white text-ls ml-1">
               
                  {translatedMenuItems[13]}
                  &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.leads}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
)} 
             {/*Opportunity*/}
             {user.opportunityAccessInd === true && user.imInd === true  && user.crmInd === true && (
            <Menu.Item key="/opportunity" style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/opportunity">
           
                <LightbulbIcon
                  style={{ fontSize: "large" }}
                />
                <span class="text-white text-ls ml-1">
                 
                  {translatedMenuItems[7]}
                  &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.opportunityList}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
          )}

             {/* Contact */}
             {user.contactAccessInd === true && user.imInd === true  && user.crmInd === true && (
            <Menu.Item key="/contact" style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/contact">
             
                <ContactsIcon
                   style={{ fontSize: "large" }}
                />
                   <span class="text-white text-ls ml-1">
                
                  {translatedMenuItems[8]}
                  &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.customerContact}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
          )}

           {/* Customer */}
           {user.customerAccessInd === true && user.imInd === true  && user.crmInd === true &&(
            <Menu.Item key="/customer" style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/customer">
            
                <ApartmentIcon

                   style={{ fontSize: "large" }}
                />
                <span class="text-white text-ls ml-1">
           
                  {translatedMenuItems[9]}
                  &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.CustomerNo}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
          )}
          <hr />
          {user.imInd === true  && (
          <Menu.Item key="/pitch " style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/pitch">
                <FilePresentIcon
                   style={{ fontSize: "large" }}
                />
                 <span class="text-white text-ls ml-1">
               
                  {/* {translatedMenuItems[13]} */}Pitch 
                  &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.investorLeads}
                overflowCount={999}
              ></Badge>
                </span>
              </Link>
            </Menu.Item>
          )}
           {user.imInd === true  && (
            <Menu.Item key="/deal " style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/deal">
              <CurrencyExchangeIcon
                  style={{ fontSize: "large" }}
                />
                 <span class="text-white text-ls ml-1">
               
                  {/* {translatedMenuItems[13]} */}Deals
                  <Badge
                count={props.opportunityRecord.investorOpportunity}
                overflowCount={999}
              ></Badge> 
                </span>
              </Link>
            </Menu.Item>
           )}
            {user.imInd === true  && (
            <Menu.Item key="/contactInvest" style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/contactInvest">
              <PermContactCalendarIcon
                   style={{ fontSize: "large" }}
                />
                 <span class="text-white text-ls ml-1">
               
                  {/* {translatedMenuItems[13]} */}Contact Invest
                  <Badge
                count={props.opportunityRecord.investorcontact}
                overflowCount={999}
              ></Badge> 
                </span>
              </Link>
            </Menu.Item>
            )}
             {user.imInd === true  && (
            <Menu.Item key="/investor" style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/investor">
            
                <LocationCityIcon

                   style={{ fontSize: "large" }}
                />
                <span class="text-white text-ls ml-1">
           
                  {/* {translatedMenuItems[9]} */}Investor
                  &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.investor}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
             )}
          {/* {user.userType !== "USER" && user.department !== "Customer" &&user.department == "VENDOR" && ( */}
         
          <hr />
          {/*Requirement*/}
          {/* {user.userType !== "USER" && user.department !== "VENDOR" && user.department !== "Recruiter" &&user.department !== "Customer"&&
          ( */}

       
          {/*Opportunity*/}

          {/* {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && (  */}
          {/* {user.talentCreateInd ===true && ( */}

          {/* )}  */}
          {/* {user.userType !== "USER" && props.department !== "Recruiter" &&user.department !== "VENDOR" &&user.department === "Customer" &&props.role !== "ADMIN" &&props.role !== "USER" &&(   */}

       
          {/*Contact*/}
          {/* )}  */}
 {/* Talent */}
 {/* {user.talentAccessInd === true && (
            <Menu.Item key="/candidate" style={{height:"30px"}}>
              <Link to="/candidate">
          
                <PortraitIcon
            
                  style={{ fontSize: "large" }}
                />
                <span class="text-white text-ls ml-3">
              
                  {translatedMenuItems[10]}
                  &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.CandidateNo}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
          )} */}
          {/*Talent*/}
          {/*Requirement*/}
          {user.requirementAccessInd === true && user.imInd === true  &&  (
            <Menu.Item key="/requirement" style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/requirement">
             
                <RecentActorsIcon 
                  style={{ fontSize: "large" }}/>
              
               <span class="text-white text-ls ml-1">
          
                  {translatedMenuItems[11]}
                  &nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.RecruitmentList}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
          )}
          {/*Demand*/}
          {user.userType === "USER" && user.imInd === true  &&  user.department === "Customer" && (
            <Menu.Item key="/demand" style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/demand">
                <ContactsIcon 
                
                   style={{ fontSize: "large" }}/>
             
              <span class="text-white text-ls ml-1">
             
                  {translatedMenuItems[12]}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </Link>
            </Menu.Item>
          )}
          {/*Demand*/}

          {/* {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && (  */}
         
          {/*Customer*/}

     
          {/*Publish*/}
          {/* {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && (  */}
          {user.publishAccessInd === true && user.imInd === true  &&  (
            <Menu.Item key="/publish" style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/publish">
            
                <CellTowerIcon

                   style={{ fontSize: "large" }}
                />
               <span class="text-white text-ls ml-1">
               
                  {translatedMenuItems[14]}
                  &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.Publish}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
          )}
          {/* )}   */}

          {/*Publish*/}
          <hr />
          {/* <Menu.Item key="/project" style={{height:"30px"}}>
              <Link to="/project">
                <LightbulbIcon
                  style={{ fontSize: "large" }}
                />
                <span class="text-white text-ls ml-3">
                
                  {translatedMenuItems[15]}
                </span>
              </Link>
            </Menu.Item> */}
            
          {/* {user.department === "Management" && ( */}
          {/* <Menu.Item key="/billing" style={{height:"30px"}}>
            <Link to="/Billing">
              <AccessAlarmIcon

                 style={{ fontSize: "large" }}
              />
             <span class="text-white text-ls ml-3">
            
                {translatedMenuItems[16]}
              </span>
            </Link>
          </Menu.Item> */}
          {/* )} */}

          {/* {user.department === "Management" && (
            <Menu.Item key="/invoice" style={{height:"30px"}}>
              <Link to="/Invoice">
                <TextSnippetIcon

                    style={{ fontSize: "large" }}
                />
               <span class="text-white text-ls ml-3">
                
                  {translatedMenuItems[17]}
                </span>
              </Link>
            </Menu.Item>
          )} */}
            <hr />
          {/* {user.userType !== "USER" && user.department !== "VENDOR" && user.department !== "Customer" && user.department !== "Recruiter" &&( */}
          {/* VENDOR */}
          {/* {user.vendorAccessInd === true && (
            <Menu.Item key="/partner" style={{height:"30px"}}>
              <Link to="/partner">
              
                <HandshakeIcon
             
                 style={{ fontSize: "large" }}
                />
                <span class="text-white text-ls ml-3">
           
                  {translatedMenuItems[18]}
             
                  &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.PartnerNo}
                    overflowCount={999}
                  ></Badge>
                </span>
              </Link>
            </Menu.Item>
          )} */}
          {/*Vendor*/}

     
          {/* {user.userType !== "USER" && user.department !== "VENDOR" && ( */}

          {/* // )} */}

       
          <hr />
          {/* Accessment */}

          {/* {user.department === "Management" && (
            <Menu.Item key="/accessment" style={{height:"30px"}}>
              <Link to="/Accessment">
                <ComputerIcon

                    style={{ fontSize: "large" }}
                />
                 <span class="text-white text-ls ml-3">
            
                  {translatedMenuItems[19]}
                </span>
              </Link>
            </Menu.Item>
          )} */}

          {/* {user.department === "Management" && (
            <Menu.Item key="/course" style={{height:"30px"}}>
              <Link to="/Course">
                <NewspaperIcon

                  style={{ fontSize: "large" }}
                />
               <span class="text-white text-ls ml-3">
               
                  {translatedMenuItems[20]}
                </span>
              </Link>
            </Menu.Item>
          )} */}
   {/* Program */}
          {/* {user.department === "Management" && (
            <Menu.Item key="/program" style={{height:"30px"}}>
              <Link to="/Program">
                <LibraryBooksIcon

                   style={{ fontSize: "large" }}
                />
                <span class="text-white text-ls ml-3">
              
               
                  {translatedMenuItems[21]}
                </span>
              </Link>
            </Menu.Item>
          )} */}

          <hr />




          {/* <Menu.Item key="/message">
            <Link to="/message">
            <FontAwesomeIcon icon={solid("user-group")} style={{fontSize: "small"}}/>&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}>
                <FormattedMessage
                  id="app.chat"
                  defaultMessage="Chat"
                />
              </span>
            </Link>
          </Menu.Item> */}
          {/* Employees */}

          {/* {user.userType !== "USER" && user.department !== "VENDOR" && ( 
          <SubMenu
            key="sub2"
          style={{ marginBottom: "-1.25em" }}
         title={
              <span>
              
                 <i class="fab fa-servicestack"></i>&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ color: "white" }}>

                  <FormattedMessage
                 id="app.selfService"
                    defaultMessage="Self Service"
                  />
                </span>
              </span>
            }
          >
           */}
                     {user.imInd === true  && (
              <Menu.Item key="/report" style={{height:"30px",paddingLeft:"1rem"}}>
          <Link to="/leave">
              <i class="fas fa-luggage-cart"></i>
            <span class="text-white text-ls ml-1"><FormattedMessage
               id="app.leaves"
               defaultMessage="Leaves"
              />
                &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.leave}
                    overflowCount={999}
                  ></Badge>
              </span>
             </Link> 
            </Menu.Item>
                     )}
            {user.userType !== "USER" && user.imInd === true  && user.department !== "VENDOR" && ( 
           <Menu.Item key="/mileage" style={{height:"30px",paddingLeft:"1rem"}}> 
          <Link to="/mileage"> 
              
              <i class="fas fa-tachometer-alt"></i>
               <span class="text-white text-ls ml-[0.3rem]"><FormattedMessage 
              id="app.mileage"
                defaultMessage="Mileage"
              />
                &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.mileage}
                    overflowCount={999}
                  ></Badge>
            </span>
            </Link>
          </Menu.Item>
             )}
    {user.imInd === true  && (
           <Menu.Item key="/expense" style={{height:"30px",paddingLeft:"1rem"}}>
           <Link to="/expense">
            <ReceiptIcon
           style={{ fontSize: "large" }}
             />
             <span class="text-white text-ls ml-1"><FormattedMessage 
               id="app.expense"
              defaultMessage="Expense"
          />
            &nbsp;&nbsp;&nbsp;
                  <Badge
                    count={props.opportunityRecord.expense}
                    overflowCount={999}
                  ></Badge>
              </span>
            </Link> 
           </Menu.Item>
    )}

       
{user.imInd === true  && (
           <Menu.Item key="/holiday" style={{height:"30px",paddingLeft:"1rem"}}> 
            <Link to="/holiday"> 
           
             <i class="fas fa-holly-berry"></i>
             &nbsp;
            <span class="text-white text-ls ml-1"><FormattedMessage 
              id="app.holiday"
                defaultMessage="Holiday"
              />
       
              </span>
             </Link> 
         </Menu.Item>
)}
       
{/* 
           </SubMenu> 
     )}  */}
        <hr/>
                  {/* Employees */}
                  {user.userAccessInd === true && user.imInd === true  && (
                  
            <Menu.Item key="/employees" style={{height:"30px",paddingLeft:"1rem"}}>
              <Link to="/Employees">
                <GroupsIcon

                 style={{ fontSize: "large" }}
                />
                <span class="text-white text-ls ml-1">
                  {/* <FormattedMessage id="app.users" defaultMessage="Users" /> */}
                  {/* Users */}
                  {translatedMenuItems[6]}
                </span>
                &nbsp;&nbsp;&nbsp;
              <Badge
                count={props.opportunityRecord.Employee}
                overflowCount={999}
              ></Badge>
              </Link>
            </Menu.Item>
          )}
           { user.locationAccessInd === true && user.imInd === true  && (
         
          <Menu.Item key="/location" style={{height:"30px",paddingLeft:"1rem"}}>
           <Link to="/location">
            <LocationOnIcon
           style={{ fontSize: "large" }}
             />
             <span class="text-white text-ls ml-1"><FormattedMessage 
               id="app.location"
              defaultMessage="Location"
          />
              </span>
            </Link> 
           </Menu.Item>
           )}
             { user.locationAccessInd === true && user.imInd === true  && (
         
         <Menu.Item key="/supplies" style={{height:"30px",paddingLeft:"1rem"}}>
          <Link to="/supplies">
           <CategoryIcon
          style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage 
              id="app.material"
             defaultMessage="Material"
         />
             </span>
           </Link> 
          </Menu.Item>
          )}
            { user.locationAccessInd === true && user.imInd === true  && (
         
         <Menu.Item key="/shipper" style={{height:"30px",paddingLeft:"1rem"}}>
          <Link to="/shipper">
           <LocalShippingIcon
          style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage 
              id="app.shipper"
             defaultMessage="Shipper"
         />
             </span>
           </Link> 
          </Menu.Item>
          )}
            { user.locationAccessInd === true && user.imInd === true  && (
         
         <Menu.Item key="/plant" style={{height:"30px",paddingLeft:"1rem"}}>
          <Link to="/plant">
           <FactoryIcon
          style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage 
              id="app.plant"
             defaultMessage="Plant"
         />
             </span>
           </Link> 
          </Menu.Item>
          )}
            { user.locationAccessInd === true && user.imInd === true  && (
         
         <Menu.Item key="/teams" style={{height:"30px",paddingLeft:"1rem"}}>
          <Link to="/teams">
           <GroupsIcon
          style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage 
              id="app.teams"
             defaultMessage="Teams"
         />
             </span>
           </Link> 
          </Menu.Item>
          )}
            { user.inventoryAccessInd === true && user.imInd === true  && (
         
         <Menu.Item key="/inventory " style={{height:"30px",paddingLeft:"1rem"}}>
          <Link to="/inventory">
           <InventoryIcon
          style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage 
              id="app.inventory"
             defaultMessage="Inventory"
         />
             </span>
           </Link> 
          </Menu.Item>
          )}
            { user.orderAccessInd === true && user.imInd === true  && (
         
         <Menu.Item key="/order" style={{height:"30px",paddingLeft:"1rem"}}>
          <Link to="/order">
           <DynamicFeedIcon
          style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage 
              id="app.order"
             defaultMessage="Order"
         />
             </span>
           </Link> 
          </Menu.Item>
          )}
            { user.orderAccessInd === true && user.imInd === true  && (
         
         <Menu.Item key="/account" style={{height:"30px",paddingLeft:"1rem"}}>
          <Link to="/account">
           <AcUnitIcon
          style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage 
              id="app.account"
             defaultMessage="Account"
         />
             </span>
           </Link> 
          </Menu.Item>
          )}
              { user.orderAccessInd === true && user.imInd === true  && (
         
         <Menu.Item key="/refurbish" style={{height:"30px",paddingLeft:"1rem"}}>
          <Link to="/refurbish">
           <OnDeviceTrainingIcon
          style={{ fontSize: "large" }}
            />
            <span class="text-white text-ls ml-1"><FormattedMessage 
              id="app.refurbish"
             defaultMessage="Refurbish"
         />
             </span>
           </Link> 
          </Menu.Item>
          )}
        </Menu>
       
      </div>
    );
  }


const mapStateToProps = ({ auth, opportunity, requirement }) => ({
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  opportunityRecord: opportunity.opportunityRecord,
  requirementRecord: requirement.requirementRecord,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getOpportunityRecord
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
