// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import moment from 'moment';
// import { base_url } from "../../../../../../Config/Auth";
// import {
//   StyledTable,
//   StyledPopconfirm,
// } from "../../../../../../Components/UI/Antd";
// import DownloadIcon from '@mui/icons-material/Download';
// import {
//   getContactDocument,
//   deleteDocument 
// } from "../../../../../Contact/ContactAction";
// import { elipsize } from "../../../../../../Helpers/Function/Functions";
// import { DeleteOutlined} from "@ant-design/icons";

// class LinkedContactInvestDocuments extends Component {
//   componentDidMount() {
//     const {
//       contactInVestDetail: { contactId },
//       getContactDocument,
//     } = this.props;
//     getContactDocument(contactId);
//   }
//   render() {
//     const {
//       documentsByContactId,
//       fetchingDocumentsByContactId,
//       fetchingDocumentsByContactIdError,
//         deleteDocument,
//     } = this.props;
//     const columns = [
//       {
//         //title: "Name",
//         title: <FormattedMessage
//           id="app.date"
//           defaultMessage="Date"
//         />,
//         dataIndex: "creationDate",
//         render: (name, item, i) => {
//           return <span>{` ${moment(item.creationDate).format("ll")}`}</span>;
//         },
//       },
//       {
//         //title: "Name",
//         title: <FormattedMessage
//           id="app.name"
//           defaultMessage="Name"
//         />,
//         dataIndex: "documentTitle",
//         onFilter: (value, record) => record.taskSubject.indexOf(value) === 0,
//         sorter: (a, b) => a.taskSubject.length - b.taskSubject.length,
//       },

//       {
//         //title: "Description",
//         title: <FormattedMessage
//           id="app.description"
//           defaultMessage="Description"
//         />,
//         dataIndex: "documentDescription",
//         width: "20%",
//         render: (name, item, i) => {
//           console.log(item);
//           return <span>{elipsize(item.documentDescription || "", 15)}</span>;
//         },
//         onFilter: (value, record) => record.taskType.indexOf(value) === 0,
//         sorter: (a, b) => a.taskType.length - b.taskType.length,
//       },
//       {
//         //title: "Uploaded By",
//         title: <FormattedMessage
//           id="app.uploadedBy"
//           defaultMessage="Uploaded By"
//         />,
//         dataIndex: "uploadedBy",
//         // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
//         // sorter: (a, b) => a.taskType.length - b.taskType.length
//       },
     
//       {
//         title: "",
//         // dataIndex: "documentTypeId",
//         width: "5%",
//         render: (name, item, i) => {
//           return (
//             <a
//               href={`${base_url}/document/${item.documentId}`}
//             // target="_blank"
//             >
//               <DownloadIcon
//                 type="download"
//                 style={{ cursor: "pointer" ,fontSize:"0.8rem"}}
//               />
//             </a>
//           );
//         },
//       },
//       {
//         title: "",
//         dataIndex: "documentTypeId",
//         width: "5%",
//         render: (name, item, i) => {
//           return (
//             <a
//               href={`${base_url}/download/${item.documentTypeId}`}
//             >
              
//             </a>
//           );
//         },
//       },
     
//       {
//         title: "",
//         dataIndex: "documentId",
//         width: "5%",
//         render: (name, item, i) => {
//           return (
//             <StyledPopconfirm
//               title="Do you want to delete?"
//               onConfirm={() => deleteDocument(item.documentId)}
//            >
//               <DeleteOutlined type="delete" style={{ cursor: "pointer", fontSize:"0.8rem",color: "red" }} />
//             </StyledPopconfirm>
//           );
//         },
//       },
//     ];

//     const tab = document.querySelector(".ant-layout-sider-children");
//   const tableHeight = tab && tab.offsetHeight * 0.75;
//     return (
//       <>
//         {true && (
//           <StyledTable
//             pagination={false}
//             scroll={{ y: tableHeight }}
//             expandedRowRender={(record) => {
//               //debugger;
//               return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
//             }}
//             rowKey="ContactId"
//             columns={columns}
//             dataSource={documentsByContactId}
//             Loading={
//               fetchingDocumentsByContactId || fetchingDocumentsByContactIdError
//             }
//             onChange={console.log("task onChangeHere...")}
//           />
//         )}
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ contact,contactinvest }) => ({
//   contact: contact.contact,
//   fetchingDocumentsByContactId: contact.fetchingDocumentsByContactId,
//   fetchingDocumentsByContactIdError: contact.fetchingDocumentsByContactIdError,
//   documentsByContactId: contact.documentsByContactId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getContactDocument,
//         deleteDocument,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(LinkedContactInvestDocuments);


import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { base_url } from "../../../../../../Config/Auth";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import DownloadIcon from '@mui/icons-material/Download';
import {
  getContactDocument,
  deleteDocument 
} from "../../../../../Contact/ContactAction";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import { DeleteOutlined} from "@ant-design/icons";

class LinkedContactInvestDocuments extends Component {
  componentDidMount() {
    const {
      contactInVestDetail: { contactId },
      getContactDocument,
    } = this.props;
    getContactDocument(contactId);
  }
  render() {
    return (
      <>
          <div className=' flex justify-end sticky top-28 z-auto'>          
<div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                  <div className=" flex  w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                  
                  <div className="md:w-[9.7rem]">Date</div>
                      <div className=" md:w-[11.12rem]">Name</div>
                      <div className=" md:w-[9.5rem]">Description</div>
                      <div className=" md:w-[9.8rem] ">Uploaded By</div>
                     
                  </div>
                  <div class="overflow-y-auto h-[67vh]">
                  {this.props.documentsByContactId.map((item) => {
                      
                      return (
                          <div >
                              <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 "

                              >
                                  <div class="flex">
                                      <div className=" flex font-medium  md:w-[6.8rem] max-sm:w-full  ">
                                      <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
                                      </div>

                                      <div className=" flex font-medium   md:w-[14.2rem] max-sm:flex-row w-full max-sm:justify-between items-center  ">
                                          <div class=" text-xs text-cardBody font-poppins">
                                             {item.documentTitle}
                                          </div>

                                      </div>
                                      <div className=" flex font-medium  md:w-[10.2rem] max-sm:flex-row w-full max-sm:justify-between items-center ">
                                          <div class=" text-xs text-cardBody font-poppins">
                                              {item.documentDescription}
                                          </div>
                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between ">


                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      {item.uploadedBy}

                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[2.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
              <DownloadIcon
                type="download"
                style={{ cursor: "pointer" ,fontSize:"0.8rem"}}
              />
            </a>

                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[2.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      <a
              href={`${base_url}/download/${item.documentTypeId}`}
            >
              
            </a>

                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[5.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      <StyledPopconfirm
              title="Do you want to delete?"
            //   onConfirm={() => deleteDocument(item.documentId)}
           >
              <DeleteOutlined type="delete" style={{ cursor: "pointer", fontSize:"0.8rem",color: "red" }} />
            </StyledPopconfirm>

                                      </div>
                                  </div>
                                  

                              </div>
                          </div>
                      )
                  })}
                  </div>
              </div>
             
              
          </div>
      </>
  )
  }
}

const mapStateToProps = ({ contact,contactinvest }) => ({
  contact: contact.contact,
  fetchingDocumentsByContactId: contact.fetchingDocumentsByContactId,
  fetchingDocumentsByContactIdError: contact.fetchingDocumentsByContactIdError,
  documentsByContactId: contact.documentsByContactId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactDocument,
        deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedContactInvestDocuments);


