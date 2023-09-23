import React, { Component } from "react";
import { Button, Upload, Switch } from "antd";
import { CompassOutlined, PaperClipOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as Yup from "yup";
import { bindActionCreators } from "redux";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { Spacer, StyledLabel } from "../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import EmailCandidateForm from "../CandidateTable/EmailCandidateForm"
//import { getCustomerListByUserId } from "../../../../Containers/Customer/CustomerAction";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { StyledModal } from "../../../../Components/UI/Antd";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
//import { addCandidateEmail, getFilteredEmailContact } from "../../CandidateAction";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
// import { getNoOfEmailsSent } from "../../ContactAction";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ChooseCandidateEmailTable from "./ChooseCandidateEmailTable";

const emailCandidateSchema = Yup.object().shape({
  // tag_with_company: Yup.string().required("Select Company"),
  // billing: Yup.string().required("Input needed!"),
  contact1: Yup.string().required("Select Contact"),
  customer1: Yup.string().required("Select Contact"),
});

class AddEmailCandidateModal extends Component {
  // componentDidMount() {
  //   const { getFilteredEmailContact, getCustomerListByUserId, userId } = this.props;
  //   getFilteredEmailContact(userId);
  //   getCustomerListByUserId(userId)
  // }
 
  // handleCustomer = (checked) => {
  //   this.setState({ customer: checked });
  // };
  handleReset = (resetForm) => {
    this.props.setEmailModalVisible(false);
    resetForm();
    this.setState({ editorState: EditorState.createEmpty() });
  };
  // handleRemove = ({ }) => {
  //   ////debugger
  //   console.log(this.state.flag);
  //   if (this.state.flag === true) {
  //     return this.setState({ file: null });
  //   }
  //   console.log(this.state.files);
  // };
  // onEditorStateChange = (editorState) => {
  //   console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  //   this.setState({ editorState });
  // };
  // createCallback = () => {
  //   this.setState({ editorState: EditorState.createEmpty(), edit: true }, () =>
  //     this.props.callback()
  //   );
  // };
  // onFileChoose = (file) => {
  //   //debugger;

  //   console.log(file);
  //   if (file.status !== "uploading") {
  //     this.setState({
  //       files: file.file.originFileObj,
  //       flag: true,
  //     });
  //   }
  // };
  // onEditorBlank = () => {
  //   ////debugger;
  //   // this.setState({ editorState: EditorState.createEmpty() });
  // };
  // getcontactOptions = (filterOptionKey, filterOptionValue) => {
  //   const contactOptions =
  //     this.props.filteredContact.length &&
  //     this.props.filteredContact
  //       .filter((option) => {
  //         if (
  //           option.customerId === filterOptionValue &&
  //           option.probability !== 0
  //         ) {
  //           return option;
  //         }
  //       })
  //       .map((option) => ({
  //         label: option.fullName || "",
  //         value: option.contactId,
  //       }));

  //   return contactOptions;
  // }

  render() {
    const {
     // candidateEmailDrawerProps: { name,  },
      handleCustomerDrawerModal,
      opportunityDrawerVisible
    } = this.props;
    

    // const customerOption = this.props.customerByUserId.map((item) => {
    //   return {
    //     label: item.name || "",
    //     value: item.customerId,
    //   };
    // });
    // console.log(this.state.editorState);
    // console.log("Email", this.props.chooseCandidateEmail.name)
    const {
      user,
      //   user: { userId, organizationId },
      visible,
      setEmailModalVisible,
      sendEmail,
      defaultContacts,
      sendingEmail,
      addCandidateEmail
      //   contact: { firstName, middleName, lastName, phoneNo, emailId, contactId },
    } = this.props;
    console.log(sendEmail);
    // console.log("mail", this.props.chooseCandidateEmail.length && this.props.chooseCandidateEmail[0].emailInd)
    // console.log("mail2", this.props.chooseCandidateEmail)
    // const emptyTo = emailId;
    // const { editorState, placeholder } = this.state;
    // const sender = user.emailId;
    // console.log(sender);
    return (
      <div>
        <StyledDrawer
          title="Email to"
          width="70%"
          visible={this.props.addCandidateEmailModal}
          //   maskClosable={false}
          closable
          placement="right"
          destroyOnClose
          style={{marginTop:"5rem"}}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          //   onCancel={() => this.props.handleCandidateEmailModal(false)}
          onClose={() => this.props.handleCandidateEmailModal(false)}
        //style={{ top: 40 }}
        //   footer={null}

        >
        
          <EmailCandidateForm

selectedRowKeys={this.props.selectedRowKeys}
          />
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth, employee, candidate, customer }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails.user,
  customerByUserId: customer.customerByUserId,
  filteredContact: candidate.filteredContact,
  chooseCandidateEmail: candidate.chooseCandidateEmail,
  addingCandidateEmail: candidate.addingCandidateEmail
  // contactId: contact.contactByUserId.contactId,
  // customerId: customer.customer.customerId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // addCandidateEmail,
      // getFilteredEmailContact,
      // getCustomerListByUserId
      //   getNoOfEmailsSent,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddEmailCandidateModal);
