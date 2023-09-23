import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import moment from "moment";
import {
  getCandidateTrainingDetails,
  setCandidateEditingTraining,
  handleUpdateCandidateTrainingModal,
  deleteDocument,
  deleteCandidateTrainingTable,
} from "../../../../../CandidateAction";
import { base_url } from "../../../../../../../Config/Auth";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import { DownloadOutlined, EditOutlined } from "@ant-design/icons";
const UpdateCandidateTrainingModal = lazy(()=>import("./UpdateCandidateTrainingModal"));

class CandidateTrainingTable extends Component {
  componentDidMount() {
    const { getCandidateTrainingDetails, candidateId } = this.props;
    getCandidateTrainingDetails(this.props.candidateId);
  }
  render() {
    // console.log(this.props.training);
    const {
      training,
      fetchingCandidateTrainingDetails,
      fetchingCandidateTrainingDetailsError,
      handleUpdateCandidateTrainingModal,
      updateCandidateTrainingModal,
      setCandidateEditingTraining,
      deleteCandidateTrainingTable,
    } = this.props;

    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        //title: " Course Name",
        title: (
          <FormattedMessage id="app.courseName" defaultMessage=" Course Name" />
        ),
        dataIndex: "courseName",
         width: "20%"
      },
      {
        title: (
          <FormattedMessage id="app.startDate" defaultMessage="Start Date" />
        ),
        dataIndex: "startDate",
        width: "20%",
        render: (name, item, i) => {
          return <span>{moment(item.startDate).format("LL")}</span>;
        },
      },
      {
        title: <FormattedMessage id="app.endDate" defaultMessage="End Date" />,
        dataIndex: "endDate",
        width: "20%",
        render: (name, item, i) => {
          return <span>{moment(item.endDate).format("LL")}</span>;
        },
       },
      {
        // title: "Organization/Institution",
        title: (
          <FormattedMessage
            id="app.organization"
            defaultMessage="Organization/Institution"
          />
        ),
        dataIndex: "organization",
        width: "20%"
      },
      {
        title: <FormattedMessage id="app.grade" defaultMessage="Grade" />,
        dataIndex: "grade",
        width:"10%",
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          return (
            <>
              {/* {item.documentId ? ( */}
                <a
                  href={`${base_url}/document/${item.documentId}`}
                  target="_blank"
                >
                  <DownloadIcon
                    type="download"
                    style={{ cursor: "pointer",fontSize:"0.8rem" }}
                  />
                </a>
              {/* ) : null} */}
            </>
          );
        },
      },

      {
        title: "",
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <BorderColorIcon
              type="edit"
              style={{ cursor: "pointer" ,fontSize:"0.8rem"}}
              onClick={() => {
                setCandidateEditingTraining(item);
                handleUpdateCandidateTrainingModal(true);
              }}
            />
          );
        },
      },
      
      // {
      //   title: "",
      //   dataIndex: "id",
      //   width: "2%",
      //   render: (name, item, i) => {
      //     return (
      //       <StyledPopconfirm
      //         title="Do you want to delete?"
      //         onConfirm={() => deleteCandidateTrainingTable(item.id)}
      //       >
      //         <Icon type="delete" style={{ cursor: "pointer", color: "red" }} />
      //         {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
      //       </StyledPopconfirm>
      //     );
      //   },
      // },
    ];

    if (fetchingCandidateTrainingDetailsError) {
      return <APIFailed />;
    }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={training}
          Loading={
            fetchingCandidateTrainingDetails ||
            fetchingCandidateTrainingDetailsError
          }
          scroll={{ y: 280 }}
          pagination={false}
          onChange={console.log("task onChangeHere...")}
        />
        <UpdateCandidateTrainingModal
          updateCandidateTrainingModal={updateCandidateTrainingModal}
          handleUpdateCandidateTrainingModal={
            handleUpdateCandidateTrainingModal
          }
        />
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  training: candidate.candidateTrainingDetails,
  fetchingCandidateTrainingDetails: candidate.fetchingCandidateTrainingDetails,
  fetchingCandidateTrainingDetailsError:
    candidate.fetchingCandidateTrainingDetailsError,
  candidateId: candidate.candidate.candidateId,
  updateCandidateTrainingModal: candidate.updateCandidateTrainingModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateTrainingDetails,
      handleUpdateCandidateTrainingModal,
      deleteCandidateTrainingTable,
      setCandidateEditingTraining,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateTrainingTable);
