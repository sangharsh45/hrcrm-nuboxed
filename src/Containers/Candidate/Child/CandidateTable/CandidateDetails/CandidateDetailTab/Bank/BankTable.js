import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledModal,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {getBankDetails, handleUpdateBankModal, setEditBank, deleteBankTable } from "../../../../../CandidateAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import { FormattedMessage } from "react-intl";
import DefultToggle from "./DefultToggle";

const UpdateBankModal = lazy(()=>import("./UpdateBankModal"));
class BankTable extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {

  //         educationModalVisible: false
  //         // data:this.props.processTask
  //     };
  // }
  // handleEducationModalVisible = () =>
  //     this.setState({ educationModalVisible: !this.state.educationModalVisible });
  componentDidMount() {
    const { getBankDetails, candidateId } = this.props;
    getBankDetails(this.props.candidateId);
  }
  render() {
    const {
      fetchingBankDetails,
      fetchingBankDetailsError,
      bankDetails,
      handleUpdateBankModal,
      updateBankModal,
      setEditBank,
      deleteBankTable,
    } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        //title: "Bank Name",
        title: (
          <FormattedMessage id="app.accHolder" defaultMessage="Account Holder" />
        ),
        dataIndex: "accountHolderName",
        // width: "35%"
      },
      {
        //title: "Bank Name",
        title: (
          <FormattedMessage id="app.bankName" defaultMessage="Bank Name" />
        ),
        dataIndex: "bankName",
        // width: "35%"
      },

      {
        //title: "Branch Name",
        title: (
          <FormattedMessage id="app.branchName" defaultMessage="Branch Name" />
        ),
        dataIndex: "branchName",
      },

      {
        //title: "A/C Number",
        title: (
          <FormattedMessage id="app.accountNo" defaultMessage=" Account#" />
        ),
        dataIndex: "accountNo",
      },

      {
        //title: "IFSC CODE",
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
            <BorderColorIcon style={{ fontSize: "0.8rem" }}
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
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];
   
    if (fetchingBankDetailsError) {
      return <APIFailed />;
    }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={bankDetails}
          Loading={fetchingBankDetails || fetchingBankDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: 460 }}
          pagination={false}
        />

        <UpdateBankModal
          updateBankModal={updateBankModal}
          handleUpdateBankModal={handleUpdateBankModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  bankDetails: candidate.bankDetails,
  fetchingBankDetails: candidate.fetchingBankDetails,
  fetchingBankDetailsError: candidate.fetchingBankDetailsError,
  candidateId: candidate.candidate.candidateId,
  updateBankModal: candidate.updateBankModal,
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
