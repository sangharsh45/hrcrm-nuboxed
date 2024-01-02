import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Tooltip,  } from "antd";
import {
    StyledTable,  
} from "../../../Components/UI/Antd";

import { EditOutlined, FileWordFilled, HistoryOutlined, SearchOutlined } from "@ant-design/icons";

import moment from "moment";

import { MultiAvatar, Select, } from "../../../Components/UI/Elements";

import { base_url } from "../../../Config/Auth";
import { CurrencySymbol } from "../../../Components/Common";

const { Option } = Select;

function ProcurementIndentCard(props) {

    useEffect(() => {
       
    }, [])
   

    // const serviceOption = props.services
    //     .sort(function (a, b) {
    //         var nameA = a.serviceName.toUpperCase(); // ignore upper and lowercase
    //         var nameB = b.serviceName.toUpperCase(); // ignore upper and lowercase
    //         if (nameA < nameB) {
    //             return -1;
    //         }
    //         if (nameA > nameB) {
    //             return 1;
    //         }
    //         // names must be equal
    //         return 0;
    //     })
    //     .map((item) => {
    //         return {
    //             text: item.serviceName,
    //             value: item.serviceName,
    //         };
    //     });

    const [show, setshow] = useState(false);
    const [particularRowData, setParticularRowData] = useState({});
    const [currentIndentId, setCurrentIndentId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");


    function handleIndentDetails(indentId) {
        setCurrentIndentId(indentId);
        setshow(!show);
    }


  
    const { access } = props
    const columns = [
        {
            width: "2%"
        },
        {
            title: "Indent #",
            dataIndex: "indentCode",

            render: (name, item, i) => {
                const currentdate = moment().format("DD/MM/YYYY");
                const date = moment(item.creationDate).format("DD/MM/YYYY");
                return (
                    <>
                        {item.indentNum === 0 ?
                            <b style={{ color: "red" }}>There is no boq items for this indent</b>
                            :
                            (
                                <>
                                    <span
                                        onClick={() => {
                                            // props.handleIndentDetailsModal(true)
                                            // handleIndentDetails(item.indentId);
                                            // handleSetParticularIndentData(item)
                                        }}
                                        style={{
                                            textDecoration: "underline",
                                            color: item.indentUseInd === false
                                                ? "re"
                                                : "green",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {item.indentCode === null ? "" : item.indentUseInd ? <span style={{ color: "red" }}>{item.indentCode}</span> : item.indentCode}

                                    </span>
                                    &nbsp;
                                    {date === currentdate && item.indentCode !== null ? (
                                        <span
                                            style={{
                                                color: "tomato",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            New
                                        </span>
                                    ) : null}
                                </>
                            )
                        }
                    </>

                );
            },
            width: "20%"
        },
        {
            title: "",
            render: (text, item) => {
                return (
                    <>
                        {item.indentUseInd ? <span style={{ color: "blue" }}>All Items are used</span> :
                            <Tooltip title="Left Items">
                                <FileWordFilled
                                    onClick={() => {
                                        // props.handleIndentItemsLeft(true);
                                        // handleSetParticularIndentData(item)
                                    }}

                                />
                            </Tooltip>
                        }
                    </>
                )
            },
            width: "10%"
        },
        {
            title: "Services",
            dataIndex: "serviceName",
            editable: true,
            width: "15%",
            // filters: serviceOption,
            onFilter: (value, record) => {
                console.log(value, record);
                return record.serviceName === value;
            },
        },
        {
            title: "Supply",
            render: (text, item) => {
                return <>
                    <CurrencySymbol currencyType="USD" /> {item.totalSuppliePrice}
                </>;
            },
            width: "10%"
        },
        {
            title: "Installation",
            render: (text, item) => {
                return <>
                    <CurrencySymbol currencyType="USD" /> {item.totalInstallation}
                </>;
            },
            width: "10%"
        },
        {
            title: "Created By",
   
            render: (text, item) => {
                return <>
                    {item.userName} {`${moment(item.creationDate).format("lll")}`}
                </>;
            },
            width: "20%"
        },

        {
            title: "Send for approval",
            dataIndex: "",
            width: "14%",
            render: (text, item, a) => {
                return (
                    <>
                        
                            
                                 {/* <IndentConvertToggle
                                    item={item}
                                     projectOrderId={props.projectOrderId}
                             /> */}
                        
                    </>
                )
            }
        },
        {
            title: "Approved By",
            width: "13%",
            dataIndex: "approvedBy",
   
            render: (text, item) => {
                return <>
                    {/* {item.approvedBy} {item.approvedDate === null ? "" : `${moment(item.approvedDate).format("lll") || ""}`} */}
                    {item.indentData.map((name) => {
                        return (
                            <>
                                {name.approvedBy === "Not Approved" ? null :
                                    //<Tooltip title={`${name.approvedBy} ${moment(name.approvedDate).format("lll")} `}>
                                    <span>
                                        <MultiAvatar
                                            primaryTitle={` ${name.departmentName}-${name.designation} ${name.approvedBy} is approved on ${moment(name.approvedDate).format("lll")} `}
                                            imgWidth={"2.1em"}
                                            imgHeight={"2.1em"}
                                        />
                                        &nbsp;
                                    </span>

                                    //</Tooltip>
                                }
                            </>
                        )
                    })}
                </>;
            },
        },

        {
            title: "",
            width: "5%",
            render: (text, item) => {
                return (
                    <>
                        <Tooltip title="History">
                            <HistoryOutlined
                                onClick={() => {
                                    // handleSetParticularIndentData(item);
                                    // props.handleIndentRejectHistoryModal(true)
                                }}
                            />
                        </Tooltip>
                    </>
                )
            }
        },

        // {
        //     title: "",
        //     width: "3%",
        //     // dataIndex: "documentId",
        //     render: (name, item, i) => {
        //         return (
        //             <>
        //                 {access.indentUpdateInd === true && item.indentInd === 2 && item.indentNum !== 0 && (
        //                     <Tooltip title="Update Indent">
        //                         <FontAwesomeIcon icon={solid('pen-to-square')}
        //                             style={{ cursor: "pointer", color: "blue" }}
        //                             onClick={() => {
        //                                 props.handleIndentUpdateModal(true);
        //                                 handleSetParticularIndentData(item)
        //                             }}
        //                         />
        //                     </Tooltip>)}
        //             </>
        //         );
        //     },
        // },
        // {
        //     title: "",
        //     width: "5%",
        //     render: (name, item, i) => {
        //         return (
        //             <>
        //                 {item.indentNum === 0 &&
        //                     <Tooltip title="Delete ">
        //                         <Popconfirm
        //                             title="Do you want to delete?"
        //                             onConfirm={() => props.deleteIndentCode(item.indentId, props.projectOrderId)}
        //                         >
        //                             <FontAwesomeIcon icon={solid('trash')}
        //                                 style={{ cursor: "pointer", color: "red" }}
        //                             />
        //                         </Popconfirm>
        //                     </Tooltip>
        //                 }

        //             </>
        //         );
        //     },
        // },
    ];

    
    return (
        <>
           
                    <StyledTable
                        pagination={false}
                        dataSource={null}
                        columns={columns}
                        rowClassName="editable-row"
                        loading={props.fetchingIndentTableData}
                    />

                   
    
            
        </>
    );
}





const mapStateToProps = ({ order, service, auth, user }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProcurementIndentCard);

