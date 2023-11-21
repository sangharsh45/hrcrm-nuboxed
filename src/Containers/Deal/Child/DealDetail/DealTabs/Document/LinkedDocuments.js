import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from 'dayjs';
import { base_url } from "../../../../../../Config/Auth";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import DownloadIcon from '@mui/icons-material/Download';
import {
    getDealDocument
,
//   deleteDocument 
} from "../../../../DealAction";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";

class LinkedDocuments extends Component {
  componentDidMount() {
    const {
        dealDetailsbyID: { invOpportunityId },
      getDealDocument
      ,
    } = this.props;
    getDealDocument
    (invOpportunityId);
  }
  render() {
    const {
        documentsByInnOppId,
        fetchingDocumentsByDealId,
        fetchingDocumentsByDealIdError,
        deleteDocument,
    } = this.props;
    const columns = [
      {
        //title: "Name",
        title: <FormattedMessage
          id="app.date"
          defaultMessage="Date"
        />,
        dataIndex: "creationDate",
        render: (name, item, i) => {
          return <span>{` ${moment(item.creationDate).format("ll")}`}</span>;
        },
      },
      {
        //title: "Name",
        title: <FormattedMessage
          id="app.name"
          defaultMessage="Name"
        />,
        dataIndex: "documentTitle",
        onFilter: (value, record) => record.taskSubject.indexOf(value) === 0,
        sorter: (a, b) => a.taskSubject.length - b.taskSubject.length,
      },

      {
        //title: "Description",
        title: <FormattedMessage
          id="app.description"
          defaultMessage="Description"
        />,
        dataIndex: "documentDescription",
        width: "20%",
        render: (name, item, i) => {
          console.log(item);
          return <span>{elipsize(item.documentDescription || "", 15)}</span>;
        },
        onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        sorter: (a, b) => a.taskType.length - b.taskType.length,
      },
      {
        //title: "Uploaded By",
        title: <FormattedMessage
          id="app.uploadedBy"
          defaultMessage="Uploaded By"
        />,
        dataIndex: "uploadedBy",
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length
      },
     
      {
        title: "",
        // dataIndex: "documentTypeId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
              <DownloadIcon
                type="download"
                style={{ cursor: "pointer" ,fontSize:"0.8rem"}}
              />
            </a>
          );
        },
      },
      {
        title: "",
        dataIndex: "documentTypeId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/download/${item.documentTypeId}`}
            >
              
            </a>
          );
        },
      },
     
      {
        title: "",
        dataIndex: "documentId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
            //   onConfirm={() => deleteDocument(item.documentId)}
           >
              <DeleteOutlined type="delete" style={{ cursor: "pointer", fontSize:"0.8rem",color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {true && (
          <StyledTable
            pagination={false}
            scroll={{ y: tableHeight }}
            expandedRowRender={(record) => {
              //debugger;
              return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
            }}
            rowKey="ContactId"
            columns={columns}
            dataSource={documentsByInnOppId}
            Loading={
                fetchingDocumentsByDealId || fetchingDocumentsByDealIdError
            }
            onChange={console.log("task onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ contact,deal }) => ({
  contact: contact.contact,
  fetchingDocumentsByDealId: deal.fetchingDocumentsByDealId,
  fetchingDocumentsByDealIdError: deal.fetchingDocumentsByDealIdError,
  documentsByInnOppId: deal.documentsByInnOppId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getDealDocument
,
        // deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocuments);


