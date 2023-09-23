import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../../../../../Config/Auth";
import {
  getCandidateEducationDetails,
  setEditCandidateEducation,
} from "../../../../../CandidateAction";
import { handleUpdateCandidateEducationModal } from "../../../../../CandidateAction";
import {
  getOpportunityDocument,
  deleteCandidateEducationTable,
} from "../../../../../CandidateAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import { FormattedMessage } from "react-intl";
const UpdateCandidateEducationModal = lazy(()=>import("../Education/UpdateCandidateEducationModal"));
class CandidateEducationTable extends Component {
  componentDidMount() {
    // debugger;
    const { getCandidateEducationDetails, candidateId } = this.props;
    console.log(candidateId);
    if (candidateId) {
      getCandidateEducationDetails(candidateId);
    }
  }

  render() {
    console.log(this.props.candidateId);
    const {
      eduCandidateDetails,
      fetchingCandidateEducationDetails,
      fetchingCandidateEducationDetailsError,
      handleUpdateCandidateEducationModal,
      updateCandidateEducationModal,
      singleCandidate,
      setEditCandidateEducation,
      candidateId,
      deleteCandidateEducationTable,
    } = this.props;
    console.log(candidateId);

    const columns = [
      {
        //title: "Education Type",
        title: (
          <FormattedMessage
            id="app.Type"
            defaultMessage="Type"
          />
        ),
        dataIndex: "educationType",
         width: "8%"
      },
      {
        //title: "Course Name",
        title: (
          <FormattedMessage id="app.course" defaultMessage="Course" />
        ),
        dataIndex: "courseName",
        width: "10%"
      },
      {
        title: "Course Type",
        dataIndex: "courseType",
      },
      {
        //title: "Year of Passing",
        title: (
          <FormattedMessage
            id="app.yearOfPassing"
            defaultMessage="Year of Passing"
          />
        ),
        dataIndex: "yearOfPassing",
        width: "18%"
      },
      {
        //title: "University/Institute Name",
        title: (
          <FormattedMessage
            id="app.university"
            defaultMessage="University/Institute"
          />
        ),
        dataIndex: "university",
        width: "20%"
      },
      {
        title: "Specialization",
        dataIndex: "specialization",
      },
      {
        //title: "Marks Secured",
        title: (
          <FormattedMessage
            id="app.marksSecured"
            defaultMessage="Marks Secured"
          />
        ),
        dataIndex: "marksSecured",
        width: "15%",
        render: (name, item, i) => {
          return (
            <span>
              
               {`${item.marksSecured} ${item.marksType}`}
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
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <BorderColorIcon
              type="edit"
              style={{ cursor: "pointer",fontSize: "0.8rem" }}
              onClick={() => {
                setEditCandidateEducation(item);
                handleUpdateCandidateEducationModal(true);
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
              //title="Do you want to delete?"
              title={<FormattedMessage
                id="app.doyouwanttodelete?"
                defaultMessage="Do you want to delete?"
              />}
              onConfirm={() => deleteCandidateEducationTable(item.id)}
            >
              <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"0.8rem", color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingCandidateEducationDetailsError) {
      return <APIFailed />;
    }
    return (
      <>

        <StyledTable
          columns={columns}
          dataSource={eduCandidateDetails}
          Loading={
            fetchingCandidateEducationDetails ||
            fetchingCandidateEducationDetailsError
          }
          scroll={{ y: 280 }}
          pagination={false}
          onChange={console.log("task onChangeHere...")}
        />

        <UpdateCandidateEducationModal
          updateCandidateEducationModal={updateCandidateEducationModal}
          handleUpdateCandidateEducationModal={
            handleUpdateCandidateEducationModal
          }
        />
      </>
    );
  }
}

const mapStateToProps = ({ candidate, employee }) => ({
  eduCandidateDetails: candidate.eduCandidateDetails,
  updateCandidateEducationModal: candidate.updateCandidateEducationModal,
  fetchingCandidateEducationDetails:
    candidate.fetchingCandidateEducationDetails,
  fetchingCandidateEducationDetailsError:
    candidate.fetchingCandidateEducationDetailsError,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateEducationDetails,
      handleUpdateCandidateEducationModal,
      setEditCandidateEducation,
      deleteCandidateEducationTable,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateEducationTable);
