import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import {
  getTrainingDetails,
  setEditTraining,
  handleUpdateTrainingModal,
  deleteDocument,
} from "../../../../../../Profile/ProfileAction";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { deleteTrainingTable } from "../../../../../../Profile/ProfileAction";
import UpdateTrainingModal from "./UpdateTrainingModal";
import moment from "moment";
import { base_url } from "../../../../../../../Config/Auth";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";


class TrainingTable extends Component {
  componentDidMount() {
    const { getTrainingDetails, employeeId } = this.props;
    getTrainingDetails(employeeId);
  }
  render() {
    console.log(this.props.training);
    const {
      training,
      fetchingTrainingDetails,
      fetchingTrainingDetailsError,
      handleUpdateTrainingModal,
      updateTrainingModal,
      setEditTraining,
      deleteTrainingTable,
    } = this.props;

    const columns = [
      {
        //title: " Course Name",
        title: (
          <span className="font-poppins">
          <FormattedMessage
            id="app.courseName"
            defaultMessage=" Course Name"
          />
             </span>
        )
       ,
        dataIndex: "courseName",
        render: (text) => (
          <span className="font-poppins">{text}</span>
        ),
        // width: "35%"
      },
      {
        //title: "Start Date",
        title: 
        (
          <span className="font-poppins">
        <FormattedMessage
          id="app.startDate"
          defaultMessage="Start Date"
        />
          </span>
        )
        ,
        dataIndex: "startDate",
        render: (name, item, i) => {
          return <span className="font-poppins">{moment(item.startDate).format("LL")}</span>;
        },
      },
//       {
//         //title: "End Date",
//         title:
//         (
//           <span className="font-poppins">
// <FormattedMessage
//           id="app.endDate"
//           defaultMessage="End Date"
//         />
//           </span>
//         ) ,
//         dataIndex: "endDate",
//         render: (name, item, i) => {
//           return <span className="font-poppins">{moment(item.endDate).format("LL")}</span>;
//         },
//       },
      {
        // title: "Organization/Institution",
        title:(
          <span className="font-poppins">
 <FormattedMessage
          id="app.organization"
          defaultMessage="Organization/Institution"
        />
          </span>
        ),
        dataIndex: "organization",
        render: (text) => (
          <span className="font-poppins">{text}</span>
        ),
      },
      {
        //title: "Grade",
        title: 
        (
          <span className="font-poppins">
        <FormattedMessage
          id="app.grade"
          defaultMessage="Grade"
        />
        </span>),
        dataIndex: "grade",
        render: (text) => (
          <span className="font-poppins">{text}</span>
        ),
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
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <BorderColorIcon
              style={{ cursor: "pointer",fontSize: "0.8rem" }}
              onClick={() => {
                setEditTraining(item);
                handleUpdateTrainingModal(true);
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
              onConfirm={() => deleteTrainingTable(item.id)}
            >
              <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"0.8rem", color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingTrainingDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={training}
          Loading={fetchingTrainingDetails || fetchingTrainingDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />
        <UpdateTrainingModal
          updateTrainingModal={updateTrainingModal}
          handleUpdateTrainingModal={handleUpdateTrainingModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  training: profile.trainingDetails,
  fetchingTrainingDetails: profile.fetchingTrainingDetails,
  fetchingTrainingDetailsError: profile.fetchingTrainingDetailsError,
  employeeId: employee.singleEmployee.employeeId,
  updateTrainingModal: profile.updateTrainingModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTrainingDetails,
      handleUpdateTrainingModal,
      setEditTraining,
      deleteTrainingTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TrainingTable);
