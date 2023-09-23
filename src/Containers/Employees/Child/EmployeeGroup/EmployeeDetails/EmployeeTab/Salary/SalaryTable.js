import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import {
  getSalaryDetails,
  setEditSalary,
  handleUpdateSalaryModal,
} from "../../../../../../Profile/ProfileAction";
import UpdateSalaryModal from "./UpdateSalaryModal";
import moment from "moment";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";

class SalaryTable extends Component {

  componentDidMount() {
    const { getSalaryDetails, employeeId } = this.props;
    console.log(employeeId);
    if (employeeId) {
      getSalaryDetails(employeeId);
    }
  }

  render() {
    const {
      salaryDetails,
      handleUpdateSalaryModal,
      updateSalaryModal,
      setEditSalary,
      fetchingEmployeeSalaryDetails,
      fetchingEmployeeSalaryDetailsError,
    } = this.props;
    const columns = [
      {
        //title: "Gross Salary",
        title: <FormattedMessage
          id="app.grossMonthlySalary"
          defaultMessage="Gross Salary"
        />,
        dataIndex: "grossMonthlySalary",
        // width: "35%"
      },
      {
        // title: "Net Salary",
        title: <FormattedMessage
          id="app.netSalary"
          defaultMessage="Net Salary"
        />,
        dataIndex: "netSalary",
      },
      {
        // title: "Start Date",
        title: <FormattedMessage
          id="app.startingDate"
          defaultMessage="Start Date"
        />,
        dataIndex: "startingDate",
        render: (name, item, i) => {
          return <span>{moment(item.startingDate).format("LL")}</span>;
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
          return <span>{item.endDate}</span>;
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
            style={{ cursor: "pointer",fontSize:"0.8rem", }}
              onClick={() => {
                //debugger
                // this.props.setEmail(item);
                setEditSalary(item);
                handleUpdateSalaryModal(true);
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
            // onConfirm={() => deleteSalaryTable(item.id)}
            >
                <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"0.8rem", color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
      //combine and show salary +curr+type
      //   {
      //     title: "Salary",
      //     render: (name, item, i) => {
      //       return (
      //         <span>{`${item.salary} ${item.currency} ${item.salaryType}`}</span>
      //       );
      //     },
      //   },

      //   {
      //     title: "Description",
      //     dataIndex: "description",
      //   },
      //   {
      //     title: "",
      //     dataIndex: "documentId",
      //     width: "9%",
      //     render: (name, item, i) => {
      //       return (
      //         <>
      //           {item.documentId ? (
      //             <a
      //               href={`${base_url}/document/${item.documentId}`}
      //               target="_blank"
      //             >
      //               <Icon
      //                 type="download"
      //                 // onClick={() => startDownload()}
      //                 style={{ cursor: "pointer" }}
      //               />
      //             </a>
      //           ) : null}
      //         </>
      //       );
      //     },
      //   },
      //   {
      //     title: "",
      //     dataIndex: "id",
      //     width: "2%",
      //     render: (name, item, i) => {
      //       return (
      //         <StyledPopconfirm
      //           title="Do you want to delete?"
      //           onConfirm={() => deleteEmploymentTable(item.id)}
      //         >
      //           <Icon type="delete" style={{ cursor: "pointer", color: "red" }} />
      //           {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
      //         </StyledPopconfirm>
      //       );
      //     },
      //   },

      //   {
      //     title: "",
      //     dataIndex: "documentId",
      //     render: (name, item, i) => {
      //       //debugger
      //       return (
      //         <Icon
      //           type="edit"
      //           style={{ cursor: "pointer" }}
      //           onClick={() => {
      //             setEditEmployment(item);
      //             handleUpdateEmploymentModal(true);
      //           }}
      //         />
      //       );
      //     },
      //   },
    ];

    if (fetchingEmployeeSalaryDetailsError) {
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
          Loading={
            fetchingEmployeeSalaryDetails || fetchingEmployeeSalaryDetailsError
          }
          dataSource={salaryDetails}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />

        <UpdateSalaryModal
          updateSalaryModal={updateSalaryModal}
          handleUpdateSalaryModal={handleUpdateSalaryModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  salaryDetails: profile.salaryDetails,
  fetchingEmployeeSalaryDetails: profile.fetchingSalaryDetails,
  fetchingEmployeeSalaryDetailsError: profile.fetchingSalaryDetailsError,
  updateSalaryModal: profile.updateSalaryModal,
  employeeId: employee.singleEmployee && employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSalaryDetails,
      setEditSalary,
      handleUpdateSalaryModal,
      // deleteSalaryTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SalaryTable);
