import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledModal,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpdateBankModal from "../../../../../../Employees/Child/EmployeeGroup/EmployeeDetails/EmployeeTab/Bank/UpdateBankModal";
import {
  handleUpdateBankModal,
  setEditBank,
} from "../../../../../../Profile/ProfileAction";
import { getBankDetails } from "../../../../../../Profile/ProfileAction";
import { deleteBankTable } from "../../../../../../Profile/ProfileAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import DefultToggle from "./DefultToggle";

class BankTable extends Component {
 
  componentDidMount() {
    const { getBankDetails, employeeId } = this.props;
    getBankDetails(this.props.employeeId);
  }
  render() {
    const {
      fetchingBankDetails,
      fetchingBankDetailsError,
      bank,
      handleUpdateBankModal,
      updateBankModal,
      setEditBank,
      deleteBankTable,
    } = this.props;
    const columns = [
      {
        title: (
          <FormattedMessage id="app.bankName" defaultMessage="Account Holder" />
        ),
        dataIndex: "accountHolderName",
      },
      {
        title: (
          <FormattedMessage id="app.bankName" defaultMessage="Bank Name" />
        ),
        dataIndex: "bankName",
        // width: "35%"
      },

      {
        title: (
          <FormattedMessage id="app.branchName" defaultMessage="Branch Name" />
        ),
        dataIndex: "branchName",
      },

      {
        title: (
          <FormattedMessage id="app.accountNo" defaultMessage=" Account#" />
        ),
        dataIndex: "accountNo",
      },

      {
        title: (
          <FormattedMessage id="app.ifscCode" defaultMessage="SWIFT Code" />
        ),
        dataIndex: "ifscCode",
      },
      {
        title: "",
        width: "7%",
        
  
        render: (name, item, i) => {
          return (
            <>
          
              <DefultToggle
                // partnerId={item.partnerId}
                 defaultInd={item.defaultInd}
                // assignedIndicator={item.assignedInd}
                id={item.id}
              />
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
              type="edit"
              style={{ cursor: "pointer",fontSize:"0.8rem", }}
              onClick={() => {
                setEditBank(item);
                handleUpdateBankModal(true);
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
              onConfirm={() => deleteBankTable(item.id)}
            >
                 <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"0.8rem", color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingBankDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={bank}
          Loading={fetchingBankDetails || fetchingBankDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />

        <UpdateBankModal
          updateBankModal={updateBankModal}
          handleUpdateBankModal={handleUpdateBankModal}
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

const mapStateToProps = ({ profile, employee }) => ({
  bank: profile.bankDetails,
  fetchingBankDetails: profile.fetchingBankDetails,
  fetchingBankDetailsError: profile.fetchingBankDetailsError,
  employeeId: employee.singleEmployee.employeeId,
  updateBankModal: profile.updateBankModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBankDetails,
      handleUpdateBankModal,
      setEditBank,
      deleteBankTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BankTable);
