import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
} from "../../../../../../../Components/UI/Antd";
import { Icon,Tooltip } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { handleCandidateUpdateEmploymentModal } from "../../../../../CandidateAction";
import { CurrencySymbol } from "../../../../../../../Components/Common";
import {
  getCandidateEmploymentDetails,
  setCandidateEditEmployment,
  deleteDocument,
  deleteCandidateEmploymentTable,
} from "../../../../../CandidateAction";
import DownloadIcon from '@mui/icons-material/Download';
import moment from "moment";
import { base_url } from "../../../../../../../Config/Auth";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
const UpdateCandidateEmploymentModal = lazy(()=>import("../Employment/UpdateCandidateEmploymentModal"));
class CandidateEmploymentTable extends Component {
  componentDidMount() {
    const { getCandidateEmploymentDetails, candidateId } = this.props;
    getCandidateEmploymentDetails(this.props.candidateId);
  }

  render() {
    const {
      handleCandidateUpdateEmploymentModal,
      fetchingCandidateEmploymentDetails,
      fetchingCandidateEmploymentDetailsError,
      candidateEmploymentDetails,
      updateCandidateEmploymentModal,
      setCandidateEditEmployment,
      deleteCandidateEmploymentTable,
    } = this.props;

    // const { emailCredential, fetchingEmailCredential } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        // title: "Company Name",
        title: (
          <FormattedMessage
            id="app.companyname"
            defaultMessage="Company Name"
          />
        ),
        dataIndex: "companyName",
         width: "15%"
      },
      {
        //title: "Designation",
        title: (
          <FormattedMessage id="app.designationType" defaultMessage="Designation" />
        ),
        dataIndex: "designationType",
        width: "12%"
      },
      {
        //title: "Start Date",
        title: (
          <FormattedMessage id="app.start" defaultMessage="Start" />
        ),
        dataIndex: "startDate",
        width: "12%",
        render: (name, item, i) => {
          return <span>{moment(item.startDate).format("LL")}</span>;
        },
      },
      {
        //title: "End Date",
        title: <FormattedMessage id="app.end" defaultMessage="End" />,
        dataIndex: "endDate",
        width: "12%",
        render: (name, item, i) => {
          return <span>{moment(item.endDate).format("LL")}</span>;
        },
      },
      //combine and show salary +curr+type
      {
        title: "Salary",
         width:"12%",
        render: (name, item, i) => {
          return (
            <span>
               <CurrencySymbol currencyType={item.currency} />
               {`${item.salary} ${item.salaryType}`}
              </span>
          );
        },
      },

      {
        title: (
          <FormattedMessage id="app.remarks" defaultMessage="Remarks" />
        ),
        width:"10%",
        dataIndex: "description",
      },
     
     
      // {
      //   title:"Document",
      //   dataIndex:"documentType",
      //   width:"12%",

      // },
      // {
      //   title: "",
      //   dataIndex: "id",
      //   width: "2%",
      //   render: (name, item, i) => {
      //     return (
      //       <StyledPopconfirm
      //         //title="Do you want to delete?"
      //         title={<FormattedMessage
      //           id="app.doyouwanttodelete?"
      //           defaultMessage="Do you want to delete?"
      //         />}
      //         onConfirm={() => deleteCandidateEmploymentTable(item.id)}
      //       >
      //         <Icon type="delete" style={{ cursor: "pointer", color: "red" }} />
      //         {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
      //       </StyledPopconfirm>
      //     );
      //   },
      // },
      {
        title: "",
        dataIndex: "documentTypeId",
        width: "2%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
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
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <BorderColorIcon
              type="edit"
              style={{ cursor: "pointer",fontSize:"0.8rem" }}
              onClick={() => {
                setCandidateEditEmployment(item);
                handleCandidateUpdateEmploymentModal(true);
              }}
            />
          );
        },
      },
    ];

    if (fetchingCandidateEmploymentDetailsError) {
      return <APIFailed />;
    }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={candidateEmploymentDetails}
          Loading={
            fetchingCandidateEmploymentDetails ||
            fetchingCandidateEmploymentDetailsError
          }
          scroll={{ y: 280 }}
          pagination={false}
          onChange={console.log("task onChangeHere...")}
        />

        <UpdateCandidateEmploymentModal
          updateCandidateEmploymentModal={updateCandidateEmploymentModal}
          handleCandidateUpdateEmploymentModal={
            handleCandidateUpdateEmploymentModal
          }
        />
        {/* )} */}
        {/* <StyledModal
                    title={"Configure"}
                    width="36%"
                    // height="50%"
                    visible={this.state.emailModalVisible}
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={this.handleEmailModalVisible}
                    footer={null}
                >
                    <EditEmailForm handleEmailModalVisible={this.handleEmailModalVisible} />
                </StyledModal> */}
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  candidateEmploymentDetails: candidate.candidateEmploymentDetails,
  fetchingCandidateEmploymentDetails:
    candidate.fetchingCandidateEmploymentDetails,
  fetchingCandidateEmploymentDetailsError:
    candidate.fetchingCandidateEmploymentDetailsError,
  updateCandidateEmploymentModal: candidate.updateCandidateEmploymentModal,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateEmploymentDetails,
      setCandidateEditEmployment,
      handleCandidateUpdateEmploymentModal,
      deleteCandidateEmploymentTable,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateEmploymentTable);
