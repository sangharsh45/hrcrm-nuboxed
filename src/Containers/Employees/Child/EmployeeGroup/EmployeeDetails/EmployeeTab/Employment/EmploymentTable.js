import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { handleUpdateEmploymentModal } from "../../../../../../Profile/ProfileAction";
import {
  getEmploymentDetails,
  setEditEmployment,
} from "../../../../../../Profile/ProfileAction";
import { CurrencySymbol } from "../../../../../../../Components/Common";
import UpdateEmploymentModal from "../Employment/UpdateEmploymentModal";
import moment from "moment";
import { base_url } from "../../../../../../../Config/Auth";
import { deleteEmploymentTable } from "../../../../../../Profile/ProfileAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
class EmploymentTable extends Component {

  componentDidMount() {
    const { getEmploymentDetails, employeeId } = this.props;
    getEmploymentDetails(this.props.employeeId);
  }

  render() {
    const {
      fetchingEmploymentDetails,
      fetchingEmploymentDetailsError,
      employment,
      handleUpdateEmploymentModal,
      updateEmploymentModal,
      setEditEmployment,
      deleteEmploymentTable,
    } = this.props;

    const columns = [
      {
        // title: "Company Name",
        title: <FormattedMessage
          id="app.companyname"
          defaultMessage="Company Name"
        />,
        dataIndex: "companyName",
        // width: "35%"
      },
      {
        //title: "Designation",
        title: <FormattedMessage
          id="app.designation"
          defaultMessage="Designation"
        />,
        dataIndex: "designationType",
      },
      {
        //title: "Start Date",
        title: <FormattedMessage
          id="app.startDate"
          defaultMessage="Start Date"
        />,
        dataIndex: "startDate",
        render: (name, item, i) => {
          return <span>{moment.utc(item.startDate).format("LL")}</span>;
        },
      },
      {
        //title: "End Date",
        title: <FormattedMessage
          id="app.endDate"
          defaultMessage="End Date"
        />,
        dataIndex: "endDate",
        render: (name, item, i) => {
          return <span>{moment(item.endDate).format("LL")}</span>;
        },
      },
      //combine and show salary +curr+type
      {
        title: "Salary",
        render: (name, item, i) => {
          return (
            <span>
               <CurrencySymbol currencyType={item.currency} />
               {`${item.salary} ${item.salaryType}`}
              {/* {`${item.salary} ${item.currency} ${item.salaryType}`} */}
              </span>
          );
        },
      },

      {
        //title: "Description",
        title: <FormattedMessage
          id="app.description"
          defaultMessage="Description"
        />,
        dataIndex: "description",
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
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deleteEmploymentTable(item.id)}
            >
              <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"0.8rem", color: "red" }} />
            </StyledPopconfirm>
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
              style={{ cursor: "pointer",fontSize:"0.8rem" }}
              onClick={() => {
                setEditEmployment(item);
                handleUpdateEmploymentModal(true);
              }}
            />
          );
        },
      },
    ];

    if (fetchingEmploymentDetailsError) {
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
          dataSource={employment}
          Loading={fetchingEmploymentDetails || fetchingEmploymentDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />

        <UpdateEmploymentModal
          updateEmploymentModal={updateEmploymentModal}
          handleUpdateEmploymentModal={handleUpdateEmploymentModal}
        />
        {/* )} */}
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  employment: profile.employmentDetails,
  fetchingEmploymentDetails: profile.fetchingEmploymentDetails,
  fetchingEmploymentDetailsError: profile.fetchingEmploymentDetailsError,
  updateEmploymentModal: profile.updateEmploymentModal,
  employeeId: employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmploymentDetails,
      setEditEmployment,
      handleUpdateEmploymentModal,
      deleteEmploymentTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentTable);
