import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getEducationDetails,
  handleUpdateEducationModal,
  setEditEducation,
} from "../../../../../../Profile/ProfileAction";
import DownloadIcon from "@mui/icons-material/Download";
import UpdateEducationModal from "../../../../EmployeeGroup/EmployeeDetails/EmployeeTab/Education/UpdateEducationModal";
import { base_url } from "../../../../../../../Config/Auth";
import { deleteEducationTable } from "../../../../../../Profile/ProfileAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import BorderColorIcon from "@mui/icons-material/BorderColor";

class EducationTable extends Component {
  componentDidMount() {
    // debugger;
    const { getEducationDetails, employeeId } = this.props;
    console.log(employeeId);
    if (employeeId) {
      getEducationDetails(employeeId);
    }
  }

  render() {
    console.log(this.props.employeeId);
    const {
      eduDetails,
      fetchingEducationDetails,
      fetchingEducationDetailsError,
      handleUpdateEducationModal,
      updateEducationModal,
      singleEmployee,
      user,
      setEditEducation,
      employeeId,
      deleteEducationTable,
    } = this.props;
    console.log(employeeId);

    const columns = [
      {
        title: (
          <span className="font-poppins">
            <FormattedMessage id="app.type" defaultMessage="Type" />
          </span>
        ),
        dataIndex: "educationType",
        render: (text) => (
          <span className="font-poppins">{text}</span>
        ),
      },
      {
        //title: "Course Name",
        title: (
          <span className="font-poppins">
          <FormattedMessage id="app.courseName" defaultMessage="Course Name" />
          </span>
        ),
        dataIndex: "courseName",
        render: (text) => (
          <span className="font-poppins">{text}</span>
        ),
      },
      {
        //title: "Year of Passing",
        title: (
          <span className="font-poppins">
          <FormattedMessage
            id="app.yearOfPassing"
            defaultMessage="Year of Passing"
          />
           </span>
        ),
        dataIndex: "yearOfPassing",
        render: (text) => (
          <span className="font-poppins">{text}</span>
        ),
      },
      {
        //title: "University/Institute Name",
        title:(
          <span className="font-poppins">
         <FormattedMessage id="app.college" defaultMessage="College" />
         </span>),
        dataIndex: "university",
        render: (text) => (
          <span className="font-poppins">{text}</span>
        ),
      },
      {
        title: "Marks Secured",
         dataIndex:"marksSecured",
         render: (name, item, i) => {
            return (
                <span>
                {item.marksSecured} {item.marksType}
              </span>
            );
          },
       
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
                  {user.userAccessInd ? (
                  <DownloadIcon
                    type="download"
                    // onClick={() => startDownload()}
                    style={{ cursor: "pointer" }}
                  />
                  ):null}
                </a>
              ) : null}
            </>
          );
        },
      },

      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          return (
            <BorderColorIcon
              style={{ cursor: "pointer", fontSize: "0.8rem" }}
              onClick={() => {
                setEditEducation(item);
                handleUpdateEducationModal(true);
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
              onConfirm={() => deleteEducationTable(item.id)}
            >
              <DeleteIcon
                type="delete"
                style={{ cursor: "pointer", fontSize: "0.8rem", color: "red" }}
              />
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingEducationDetailsError) {
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
          dataSource={eduDetails}
          Loading={fetchingEducationDetails || fetchingEducationDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.courseType || ""}</p>
                <p>{record.specialization || ""}</p>
              </>
            );
          }}
        />

        <UpdateEducationModal
          updateEducationModal={updateEducationModal}
          handleUpdateEducationModal={handleUpdateEducationModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile,auth, employee }) => ({
  eduDetails: profile.eduDetails,
  user:auth.userDetails,
  updateEducationModal: profile.updateEducationModal,
  fetchingEducationDetails: profile.fetchingEducationDetails,
  fetchingEducationDetailsError: profile.fetchingEducationDetailsError,
  employeeId: employee.singleEmployee && employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEducationDetails,
      handleUpdateEducationModal,
      setEditEducation,
      deleteEducationTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EducationTable);
