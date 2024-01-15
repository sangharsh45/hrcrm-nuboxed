import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon } from "antd";
import moment from "moment";
import {
    StyledTable,
} from "../../../../../Components/UI/Antd";
import {
    getDistributorTable,
} from "../../AccountAction";
import { OnlyWrapCard } from "../../../../../Components/UI/Layout";


class DistributorDocumentTable extends Component {
    componentDidMount() {
        this.props.getDistributorTable(this.props.distributorId);
    }
    render() {
        const {
            documentTable,
            fetchingDocumentsByTable,
            fetchingDocumentsByTableError,

        } = this.props;
       

        return (
            <>
                <div className=' flex justify-end sticky top-28 z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                    <div className=" flex justify-between w-[80%] pl-9 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]">Date</div>
                        <div className=" md:w-[5.1rem]">Name</div>
                        <div className=" md:w-[8.8rem] ">Description</div>
              
                     


                    </div>
                    <div class="overflow-x-auto h-[64vh]">
                        {this.props.documentTable.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded-xl  mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                        <div class="flex w-3/4">
                                            <div className=" flex font-medium flex-col md:w-[1.56rem] max-sm:w-full  ">


                                            {` ${moment(item.creationDate).format("ll")}`}

                                            </div>

                                            <div className=" flex font-medium flex-col  md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.documentTitle}
                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.Description}
                                                </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>


                            )
                        })}
                    </div>
     
                </OnlyWrapCard>
            </div>
            </>
        );
    }
}

const mapStateToProps = ({ distributor }) => ({
    distributor: distributor.distributor,
    documentTable:distributor.documentTable,
    fetchingDocumentsByTable: distributor.fetchingDocumentsByTable,
    fetchingDocumentsByTableError:
        distributor.fetchingDocumentsByTableError,
    documentsByDistributorId: distributor.documentsByDistributorId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDistributorTable,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorDocumentTable);




// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Icon } from "antd";
// import moment from "moment";
// import {
//     StyledTable,
// } from "../../../../../Components/UI/Antd";
// import {
//     getDistributorTable,
// } from "../../AccountAction";


// class DistributorDocumentTable extends Component {
//     componentDidMount() {
//         this.props.getDistributorTable(this.props.distributorId);
//     }
//     render() {
//         const {
//             documentTable,
//             fetchingDocumentsByTable,
//             fetchingDocumentsByTableError,

//         } = this.props;
//         const columns = [
//             {
//                 title: "Date",

//                 dataIndex: "creationDate",
//                 render: (name, item, i) => {
//                   return <span>{` ${moment(item.creationDate).format("ll")}`}</span>;
//                 },
//             },
//             {
//                 title: "Name",

//                 dataIndex: "documentTitle",
               
//             },
//             {
//                 title: "Description",

//                  dataIndex: "discription",

//             },
//             {
//                 //title: "Uploaded By",

//                 // dataIndex: "uploadedBy",
//                 // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
//                 // sorter: (a, b) => a.taskType.length - b.taskType.length
//             },
//         ];

//         return (
//             <>
//                 {true && (
//                     <StyledTable
//                         // rowSelection={rowSelection}
//                         pagination={{ pageSize: 50 }}
//                         scroll={{ y: 280 }}
//                         expandedRowRender={(record) => {
//                             //debugger;
//                             // return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
//                         }}
//                         rowKey="CustomerId"
//                         columns={columns}
//                         dataSource={documentTable}
//                         Loading={
//                             fetchingDocumentsByTable ||
//                             fetchingDocumentsByTableError
//                         }
//                         onChange={console.log("task onChangeHere...")}
//                     />
//                 )}
//             </>
//         );
//     }
// }

// const mapStateToProps = ({ distributor }) => ({
//     distributor: distributor.distributor,
//     documentTable:distributor.documentTable,
//     fetchingDocumentsByTable: distributor.fetchingDocumentsByTable,
//     fetchingDocumentsByTableError:
//         distributor.fetchingDocumentsByTableError,
//     documentsByDistributorId: distributor.documentsByDistributorId,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getDistributorTable,
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(DistributorDocumentTable);


