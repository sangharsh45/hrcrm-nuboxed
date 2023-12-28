import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import {
  getShipperDocument,
} from "../../../ShipperAction";
import { OnlyWrapCard } from '../../../../../../Components/UI/Layout';

class ShipperDocumentTable extends Component {
  componentDidMount() {
    this.props.getShipperDocument(this.props.shipperId);
  }
  render() {
    const {
      documentsByShipperId,
      fetchingDocumentsByShipperId,
      fetchingDocumentsByShipperIdError,
    } = this.props;


    return (
      <>
              <div className=' flex justify-end sticky top-28 z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                    <div className=" flex justify-between w-[80%] pl-9 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]"><FormattedMessage id="app.date" defaultMessage="Date" /></div>
                        <div className=" md:w-[5.1rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.description" defaultMessage="Description" /></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.uploadedby" defaultMessage="Uploaded By" /></div>
                     


                    </div>
                    <div class="overflow-x-auto h-[64vh]">
                        {this.props.documentsByShipperId.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded-xl  mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                        <div class="flex w-3/4">
                                            <div className=" flex font-medium flex-col md:w-[1.56rem] max-sm:w-full  ">


                                            {` ${moment(item.creationDate).format("ll")}`}

                                            </div>

                                            <div className=" flex font-medium flex-col  md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.contactDocumentName}
                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.description}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.uploadedBy}
                                                </div></div>
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

const mapStateToProps = ({ shipper }) => ({
  shipper: shipper.shipper,
  fetchingDocumentsByShipperId: shipper.fetchingDocumentsByShipperId,
  fetchingDocumentsByShipperIdError: shipper.fetchingDocumentsByShipperIdError,
  documentsByShipperId: shipper.documentsByShipperId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipperDocument,
      //   deleteDocument,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperDocumentTable);


// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import moment from "moment";
// import {
//   StyledTable,
// } from "../../../../../../Components/UI/Antd";
// import {
//   getShipperDocument,
// } from "../../../ShipperAction";
// import { OnlyWrapCard } from '../../../../../../Components/UI/Layout';

// class ShipperDocumentTable extends Component {
//   componentDidMount() {
//     this.props.getShipperDocument(this.props.shipperId);
//   }
//   render() {
//     const {
//       documentsByShipperId,
//       fetchingDocumentsByShipperId,
//       fetchingDocumentsByShipperIdError,
//     } = this.props;
//     const columns = [
//       {
//         title: "Date",

//         // dataIndex: "creationDate",
//         // render: (name, item, i) => {
//         //   return <span>{` ${moment(item.creationDate).format("ll")}`}</span>;
//         // },
//       },
//       {
//         title: "Name",

//         dataIndex: "contactDocumentName",
//         // onFilter: (value, record) => record.taskSubject.indexOf(value) === 0,
//         // sorter: (a, b) => a.taskSubject.length - b.taskSubject.length,
//       },
//       {
//         title: "Description",

//         // dataIndex: "documentType",
//         // width: "20%",
//         // render: (name, item, i) => {
//         //   console.log(item);
//         //   return <span>{elipsize(item.documentType || "", 15)}</span>;
//         // },
//         // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
//         // sorter: (a, b) => a.taskType.length - b.taskType.length,
//       },
//       {
//         title: "Uploaded By",

//         // dataIndex: "uploadedBy",
//         // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
//         // sorter: (a, b) => a.taskType.length - b.taskType.length
//       },
//     ];

//     return (
//       <>
//         {true && (
//           <StyledTable
//             // rowSelection={rowSelection}
//             pagination={{ pageSize: 50 }}
//             scroll={{ y: 280 }}
//             expandedRowRender={(record) => {
//               //debugger;
//               // return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
//             }}
//             rowKey="CustomerId"
//             columns={columns}
//             dataSource={documentsByShipperId}
//             Loading={
//               fetchingDocumentsByShipperId || fetchingDocumentsByShipperIdError
//             }
//           />
//         )}
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ shipper }) => ({
//   shipper: shipper.shipper,
//   fetchingDocumentsByShipperId: shipper.fetchingDocumentsByShipperId,
//   fetchingDocumentsByShipperIdError: shipper.fetchingDocumentsByShipperIdError,
//   documentsByShipperId: shipper.documentsByShipperId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getShipperDocument,
//       //   deleteDocument,
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ShipperDocumentTable);
