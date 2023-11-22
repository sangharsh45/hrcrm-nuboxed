import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Input, Tooltip, Badge } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import GridViewIcon from '@mui/icons-material/GridView';
import { inputDataSearch, getRecords,getAccountRecords, getAllRecords,getDistributorCount } from "./AccountAction";
import { DeleteOutlined, TableOutlined, BookOutlined, AppstoreOutlined } from "@ant-design/icons";
import moment from "moment";
const { Search } = Input;

const AccountActionLeft = (props) => {
    const { user } = props;
    useEffect(() => {
        if (props.viewType === "list") {
            props.getAccountRecords();
        } else if (props.viewType === "card") {
            props.getDistributorCount(props.userId);
        }
        else if (props.viewType === "all") {
            props.getAccountRecords();
        }
      }, [props.viewType, props.userId]);


    const { distributorsByUserId } = props;
    var total =
        distributorsByUserId &&
        distributorsByUserId.reduce((a, item) => {
            return (a += item.totalPayableAmount) || 0;
        }, 0);
    var cost = `${Number(total).toFixed(2)}`;

    const { allDistributors } = props;
    var total1 =
        allDistributors &&
        allDistributors.reduce((a, item) => {
            return (a += item.totalPayableAmount) || 0;
        }, 0);
    var cost1 = `${Number(total1).toFixed(2)}`;

    var totalA =
        distributorsByUserId &&
        distributorsByUserId.reduce((a, item) => {
            return (a += item.outstanding) || 0;
        }, 0);
    var costA = `${Number(totalA).toFixed(2)}`;

    var totalB =
        allDistributors &&
        allDistributors.reduce((a, item) => {
            return (a += item.outstanding) || 0;
        }, 0);
    var costB = `${Number(totalB).toFixed(2)}`;

    return (
        <FlexContainer alignItems="center">
            <div class="max-sm:hidden">
            {user.functionName !== "Customer Care" && (
                
                <Tooltip title="List View">
                    <Badge size="small"
                        count={props.accountRecordData.distributor || 0}
                    ><span
                        style={{
                            marginRight: "0.5rem",
                            color: props.viewType === "list" && "#1890ff",
                            // fontSize: "17px",
                            cursor: "pointer",
                        }}
                        onClick={() => props.setDistributorViewType("list")}>
                               <TocIcon  />
                        </span>
                    </Badge>
                </Tooltip>
               
            )}
            </div>
            {/* <Tooltip title="Distributor By Group">
                <AppstoreOutlined
                    style={{
                        marginRight: "0.3rem",
                        color: props.viewType === "group" && "#1890ff",
                    }}

                    onClick={() => props.setDistributorViewType("group")}
                />
            </Tooltip> */}

            {/* {user.designation === "Manager" &&
                (user.functionName === "Management" || user.functionName === "Sales") && ( */}
                 
                {/* )} */}
                <Tooltip title="card Distributor">
                        <Badge size="small"
                            count={props.allDistributorCount.distributor || 0}>
                            <span
                                style={{
                                    marginRight: "0.5rem",
                                    color: props.viewType === "card" && "#1890ff",
                                    fontSize: "17px",
                                    cursor: "pointer",
                                }}
                                onClick={() => props.setDistributorViewType("card")}
                            > <GridViewIcon style={{fontSize:"1.4rem"}}   />
                            </span>
                        </Badge>
                    </Tooltip>
                    {user.accountFullListInd === true && user.erpInd === true &&(
                    <Tooltip title="All Distributor">
                         <Badge size="small"
                        count={props.accountRecordData.distributor || 0}
                    >
                            <span
                                style={{
                                    marginRight: "0.5rem",
                                    color: props.viewType === "all" && "#1890ff",
                                    fontSize: "17px",
                                    cursor: "pointer",
                                }}
                                onClick={() => props.setDistributorViewType("all")}
                            >ALL
                            </span>
                        </Badge>
                    </Tooltip>
)}
            <Tooltip title="Deleted Distributor">
                <DeleteOutlined
                    style={{
                        marginRight: "0.5rem",
                        color: props.viewType === "dashboard" && "red",
                    }}
                    onClick={() => props.setDistributorViewType("dashboard")}
                />
            </Tooltip>


            {/* &nbsp; &nbsp;
            {props.viewType === "table" ?
                (
                    <div style={{ fontSize: "0.9375em", fontWeight: "bold", color: "tomato" }}>
                        # Records -{" "}{props.recordData.distributor || 0}{" "}
                    </div>
                )
                : props.viewType === "all" ?
                    (
                        <div style={{ fontSize: "0.9375em", fontWeight: "bold", color: "tomato" }}>
                            # Records -{" "}{props.recordAllData.distributor || 0}{" "}
                        </div>
                    ) : null} */}

            &nbsp;&nbsp;
            {props.viewType === "table" ?
                (
                    <div>
                        <>
                            <b> {moment().format("ll")}  </b>
                            &nbsp;&nbsp;
                            <b>||&nbsp;&nbsp;Balance : ₹ {`${cost}`}  </b>
                            &nbsp;&nbsp;
                            <b>||&nbsp;&nbsp;Outstanding : ₹ {`${costA}`}</b>
                            &nbsp;&nbsp;
                        </>
                    </div>
                )
                : props.viewType === "all" ?
                    (

                        <div>
                            <>
                                <b> {moment().format("ll")}  </b>
                                &nbsp;&nbsp;
                                <b>||&nbsp;&nbsp;Balance : ₹ {`${cost1}`}  </b>
                                &nbsp;&nbsp;
                                <b>||&nbsp;&nbsp;Outstanding : ₹ {`${costB}`}</b>
                                &nbsp;&nbsp;
                            </>
                        </div>
                    ) : null}
        </FlexContainer>
    );
};

const mapStateToProps = ({ auth, distributor }) => ({
    user: auth.userDetails,
    allDistributorCount:distributor.allDistributorCount,
    accountRecordData:distributor.accountRecordData,
    recordData: distributor.recordData,
    recordAllData: distributor.recordAllData,
    userId: auth.userDetails.userId,
    distributorsByUserId: distributor.distributorsByUserId,
    allDistributors: distributor.allDistributors,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            inputDataSearch,
            getRecords,
            getAccountRecords,
            getAllRecords,
            getDistributorCount,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountActionLeft);
