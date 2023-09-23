import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DownloadIcon from '@mui/icons-material/Download';
import moment from "moment";
import UpdatePersonalDetailsModal from "./UpdatePersonalDetailsModal";
import {
  handleUpdatePersonalDetailsModal,
  getDocumentDetails,
  setEditDocument,
  deletePersonalTable,
} from "../../../../../../Profile/ProfileAction";
import { base_url } from "../../../../../../../Config/Auth";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";

class EducationTable extends Component {
  componentDidMount() {
    const { getDocumentDetails, employeeId } = this.props;

    getDocumentDetails(this.props.employeeId);
  }
  // }
  render() {
    const {
      documentDetails,
      fetchingDocumentDetails,
      fetchingDocumentDetailsError,
      handleUpdatePersonalDetailsModal,
      updatePersonalDetailsModal,
      setEditDocument,
      deletePersonalTable,
    } = this.props;

    const columns = [
      {
        //title: " Type",
        title: <FormattedMessage
          id="app.name"
          defaultMessage="Name"
        />,
        dataIndex: "documentName",
        // width: "35%"
      },
      {
        //title: " Type",
        title: <FormattedMessage
          id="app.type"
          defaultMessage="Type"
        />,
        dataIndex: "idType",
        // width: "35%"
      },
      {
        //title: "Document ID number",
        title: <FormattedMessage
          id="app.idNo"
          defaultMessage="Document ID number"
        />,
        dataIndex: "idNo",
      },
      {
        //title: " Type",
        title: <FormattedMessage
          id="app.description"
          defaultMessage="Description"
        />,
        dataIndex: "description",
        // width: "35%"
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          return (
            <>
              {item.documentId ? (
                <a
                  href={`${base_url}/document/${item.documentId}`}
                  target="_blank"
                >
                  <DownloadIcon
                    type="download"
                    // onClick={() => startDownload()}
                    style={{ cursor: "pointer" }}
                  />
                </a>
              ) : null}
            </>
          );
        },
      },

      {
        title: "",
        width: "2%",
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <BorderColorIcon 
            style={{ cursor: "pointer",fontSize:"0.8rem", }}
              tooltipTitle="Edit"
              iconType="edit"
              onClick={() => {
                setEditDocument(item);
                handleUpdatePersonalDetailsModal(true);
              }}
            />
          );
        },
      },
      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deletePersonalTable(item.id)}
            >
             <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"0.8rem", color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingDocumentDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={documentDetails}
          Loading={fetchingDocumentDetails || fetchingDocumentDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />

        <UpdatePersonalDetailsModal
          updatePersonalDetailsModal={updatePersonalDetailsModal}
          handleUpdatePersonalDetailsModal={handleUpdatePersonalDetailsModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  documentDetails: profile.documentDetails,
  fetchingDocumentDetails: profile.fetchingDocumentDetails,
  fetchingDocumentDetailsError: profile.fetchingDocumentDetailsError,
  employeeId: employee.singleEmployee.employeeId,
  updatePersonalDetailsModal: profile.updatePersonalDetailsModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDocumentDetails,
      setEditDocument,
      handleUpdatePersonalDetailsModal,
      deletePersonalTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EducationTable);
