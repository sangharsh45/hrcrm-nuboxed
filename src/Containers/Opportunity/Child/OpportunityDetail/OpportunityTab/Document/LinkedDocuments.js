import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon } from "antd";
import { FormattedMessage } from "react-intl";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import { base_url } from "../../../../../../Config/Auth";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import { Link } from "../../../../../../Components/Common";
import {
  getOpportunityDocument,
  deleteDocument,
} from "../../../../OpportunityAction";

import { elipsize } from "../../../../../../Helpers/Function/Functions";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";

class LinkedDocuments extends Component {
  componentDidMount() {
    const {
      opportunity: { opportunityId },
      getOpportunityDocument,
      // opportunity,
    } = this.props;
    getOpportunityDocument(opportunityId);
  }
  render() {
    const {
      documentsByOpportunityId,
      fetchingDocumentsByOpportunityId,
      fetchingDocumentsByOpportunityIdError,
        deleteDocument,
    } = this.props;
    const columns = [
      {
        title: <FormattedMessage id="app.date" defaultMessage="Date" />,
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
      // {
      //   title: "Description",
      //   dataIndex: "documentDescription",
      //   onFilter: (value, record) => record.taskType.indexOf(value) === 0,
      //   sorter: (a, b) => a.taskType.length - b.taskType.length
      // },
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
      // {
      //   // title: "Circulation",
      //   title: <FormattedMessage
      //     id="app.circulation"
      //     defaultMessage="Circulation"
      //   />,
      //   render: (name, item, i) => {
      //     debugger;

      //     if (item.levelType && item.levelType === "Above") {
      //       return (
      //         <SubTitle style={{ height: "0.3125em", marginBottom: "0.75em" }}>
      //           {item.type === "confidential"
      //             ? "Private"
      //             : `${item.type || ""} (${item.department || ""})
      //             (${item.documentLevel[0] || ""}
      //             `}
      //           <Icon type="to-top" />)
      //         </SubTitle>
      //       );
      //     } else {
      //       debugger;
      //       return (
      //         <SubTitle style={{ height: "0.3125em", marginBottom: "0.75em" }}>
      //           {item.type === "confidential"
      //             ? "Private"
      //             : `${item.type || ""} (${item.department || ""})(${item
      //               .documentLevel[0] || ""})`}{" "}
      //           &nbsp;
      //         </SubTitle>
      //       );
      //     }
      //   },

      //   onFilter: (value, record) => record.taskType.indexOf(value) === 0,
      //   sorter: (a, b) => a.taskType.length - b.taskType.length,
      // },
      // {
      //     title: 'Stage',
      //     dataIndex: 'documentDescription',
      //     onFilter: (value, record) => record.taskType.indexOf(value) === 0,
      //     sorter: (a, b) => a.taskType.length - b.taskType.length,
      // },
      {
        title: "",
        dataIndex: "documentId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
              <DownloadIcon
                type="download"
                style={{ cursor: "pointer",fontSize:"0.8rem" }}
              />
            </a>
          );
        },
      },
      {
        title: "",
       // dataIndex: "documentTypeId",
       dataIndex: "documentTitle",
        width: "5%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
            onConfirm={() => deleteDocument(item.documentId)}
           >
              <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"0.8rem" , color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingDocumentsByOpportunityId) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {true && (
          <StyledTable
            // rowSelection={rowSelection}
            pagination={false}
            scroll={{ y: tableHeight }}
            expandedRowRender={(record) => {
              //debugger;
              return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
            }}
            rowKey="CustomerId"
            columns={columns}
            dataSource={documentsByOpportunityId}
            loading={fetchingDocumentsByOpportunityIdError}
            onChange={console.log("task onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  opportunity: opportunity.opportunity,
  fetchingDocumentsByOpportunityId:
    opportunity.fetchingDocumentsByOpportunityId,
  fetchingDocumentsByOpportunityIdError:
    opportunity.fetchingDocumentsByOpportunityIdError,
  documentsByOpportunityId: opportunity.documentsByOpportunityId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityDocument,
        deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocuments);

// function startDownload() {
//   var url =
//     "http://korero-env1.eba-sywkcsdt.eu-west-3.elasticbeanstalk.com/api/v2.0/Korero_logo1.png";
//   window.open(url, "Download");
// }
