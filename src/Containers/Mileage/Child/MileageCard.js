import dayjs from "dayjs";
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { getMileageByUserId,
  deleteMileageVoucher,
  handleStatusMileageModal,
  handleMileageVoucherIdDrwer
 } from "../MileageAction";
import styled from 'styled-components'
import AssistantIcon from '@mui/icons-material/Assistant';
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined, } from "@ant-design/icons";
import MileageVoucherIdDrawer from "./MileageVoucherIdDrawer";
import StatusMileageDrawer from "./StatusMileageDrawer";
import { BundleLoader } from "../../../Components/Placeholder";


class MileageCard extends React.Component {
  state = {
    expand: false,
    voucherId: "",
  };
  handleExpand = (vid) => {
    console.log("function called");
    this.setState({
      expand: !this.state.expand,
      voucherId: vid,
    });
  };
  componentDidMount() {
    this.props.getMileageByUserId(this.props.userId);
  }
  render() {
    console.log("voucherId",this.state.voucherId)
    const {
      MileageDat,
      fetchingMileageByUserId,
      handleStatusMileageModal,
     
      fetchingMileageByUserIdError,
    } = this.props;
    if (fetchingMileageByUserId) return <BundleLoader/>;
    return (
      <>
       <div class=" h-h86 overflow-auto overflow-x-auto">
        <CardWrapper>      
              {MileageDat.map((item) => {
                 return (
                    <CardElement>
        
                                
                   <div >
                          
                         </div>
                      {/* <CardDescription> */}
                      <div class="flex items-center justify-between ">
                      <h4 class="text-sm">Voucher ID</h4>
                        <Header>
<div class="text-[0.82rem] font-semibold " onClick={() => { this.handleExpand(item.voucherId) 
                this.props.handleMileageVoucherIdDrwer(true)}}>
         {item.voucherId}
         </div>
                        </Header> 
                       
               
            
                          
            
          </div>                  
                 
                     
           
                        <div class="flex  justify-between">
                            <h3 class="text-sm">Voucher Date</h3>
                            <h4 class="text-[0.82rem]">{dayjs(item.voucherDate).format("MMM Do YY")}</h4>
                        </div>
                        <div class="flex justify-between">
                    <h4 class="text-sm">Amount</h4> 
                    <h5 class="text-[0.82rem]">{item.amount}</h5>
                    </div>

                    <div class="flex  justify-between" >
                    {item.status === "Approved" && (
                 <div
                 style={{
                   border: "2px solid green",
                   padding: "0px 0.62em",
                   textAlign: "center",
                   margin: "2px",
                   borderRadius: "0.62em",
                 }}
               >
                 <div className="text-[green]">{item.status}</div>
               </div>
              )}
            
              {item.status === "Rejected" && (
                <div
                style={{
                  border: "2px solid red",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "2px",
                  borderRadius: "0.62em",
                }}
              >
                <div className="text-[red]">{item.status}</div>
                </div>
              )}
              {item.status === "Pending" && (
                  <div
                  style={{
                    border: "2px solid #e1d16c",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    width: "max-content",
                    borderRadius: "0.62em",
                  }}
                >
                  
                  <div className="text-[#e1d16c]" > Waiting for approval</div>
                  </div>
              )}


<div style={{ cursor: "pointer",padding:"2px"}}

onClick={() => {
this.props.handleStatusMileageModal(true);
this.handleExpand(item.voucherId)


}}
>
                 <Tooltip  title={"Status"}>
                 <AssistantIcon
style={{ color: "grey",fontSize:"1.2rem",padding:"2px" }}/>
   </Tooltip> 

   </div>
        
                        
                           {item.status === "Pending" && (
            <Tooltip title="Delete">
              <DeleteOutlined
                type="delete"
                style={{ cursor: "pointer" }}
                onClick={() => {
                this.props.deleteMileageVoucher(item.voucherId);
                  
                }}
              />
            </Tooltip>
            )}
             {item.status==="Rejected" && (
            <Button type="primary"
            onClick={()=>{
              // this.props.reapply();
            }}>
            Reapply
            </Button>
          )}
              </div>           
                      
         
                        
                    </CardElement>
                 )  
            })}
              </CardWrapper>

              </div> 


        <MileageVoucherIdDrawer 
        voucherId={this.state.voucherId}
        mileageVoucherIdDrawer={this.props.mileageVoucherIdDrawer}
        handleMileageVoucherIdDrwer={this.props.handleMileageVoucherIdDrwer}
        />

        
<StatusMileageDrawer 
handleExpand={this.handleExpand}
         voucherId={this.state.voucherId}
        updateStatusMileageModal={this.props.updateStatusMileageModal}
        handleStatusMileageModal={this.props.handleStatusMileageModal}
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, mileage }) => ({
  userId: auth.userDetails.userId,
  MileageDat: mileage.MileageDat,
  updateStatusMileageModal:mileage.updateStatusMileageModal,
  fetchingMileageByUserId: mileage.fetchingMileageByUserId,
  fetchingMileageByUserIdError: mileage.fetchingMileageByUserIdError,
  mileageVoucherIdDrawer:mileage.mileageVoucherIdDrawer,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
      deleteMileageVoucher,
      handleMileageVoucherIdDrwer,
      handleStatusMileageModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageCard);
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`
const CardElement = styled.div`
 
border-radius: 0.35rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 7rem;
    color: rgb(68,68,68);
    margin: 1em;
    padding: 0.2rem;
    width: 19vw;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: -webkit-fill-available;
    
  }
`
const CardDescription = styled.div`
  
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`
const CardImage = styled.div`
  
  width:200;
  display:flex;
  height:200
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`
const WithOutImage = styled.div`
  
  width:200px;
  height:200px;
  display:flex;
    align-items: center;
    flex-direction:column
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1em;
padding:4px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`
const Desc = styled.p`
  height: 0px;
`
const Price = styled.div`
  height: 1.5em;
  font-weight: 700;
  font-family: Poppins;
  font-size: 1em;
  white-space: nowrap;
`

const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const AppIcon1 = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "145%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;