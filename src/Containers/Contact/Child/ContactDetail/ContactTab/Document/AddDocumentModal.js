import React, {  Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { Spacer } from "../../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
  handleDocumentUploadModal,
  addContactDocument,
  getContactDocument,
} from "../../../../ContactAction";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";

const ButtonGroup = Button.Group;
const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class AddDocumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentshare: false,
      approvalAbove: false,
      ownerAbove: "Specific",
      selectedownerAbove: "Specific",
      data: [1],
    };
  }
  handleButtonClick = () => {
    console.log(length);
    let length = this.state.data.length;
    this.setState({ data: [...this.state.data, length + 1] });
  };

  handleChange = (checked) => {
    this.setState({
      documentshare: checked,
    });
    console.log(this.state.documentshare);
  };
  handleAboveChange = (data) => {
    debugger;
    this.setState({ ownerAbove: data });
    this.setState({ selectedownerAbove: data });
  };
  handleClose = () => {
    //debugger
    const { handleDocumentUploadModal } = this.props;
    //debugger
    this.setState(
      {
        documentshare: this.state.documentshare ? false : false,
        approvalAbove: this.state.approvalAbove ? false : false,
      },
      handleDocumentUploadModal(false)
    );
  };
  callback = () => {
    const { contactInVestDetail, getContactDocument, handleDocumentUploadModal } =
      this.props;
    getContactDocument(contactInVestDetail.contactId);
    handleDocumentUploadModal(false);
  };
  //   componentDidMount() {
  //     this.props.getOppoStages();
  //     this.props.getLevels();
  //   }
  handleApprovalAboveChange = (checked) => {
    this.setState({
      approvalAbove: checked,
    });
  };
  render() {
    console.log(this.state.data);
    const {
      opportunity,
      documentUploadModal,
      handleDocumentUploadModal,
      addContactDocument,
      addingDocumentByContactId,
      documentContentType,
      documentTypeName,
      documentTypeId,
      oppoStages,
      subscriptionType,
      handleButtonClick,
      organization,
    } = this.props;
    return (
      <>
        <StyledDrawer
          // title="Document"
          title={
            <FormattedMessage id="app.document" defaultMessage="Document" />
          }
          width="65vw"
          visible={documentUploadModal}
          destroyOnClose
          maskClosable={false}
          style={{ marginTop: "5rem" }}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.handleClose()}
          footer={null}
        >
          <Suspense fallback={""}>
            <Formik
              // enableReinitialize
              initialValues={{
                documentTypeId: "",
                // contactId: this.props.contactInVestDetail.contactId,
                documentTitle: "", //input
                documentDescription: "",
                // levelType:
                //   this.state.approvalAbove === true ? "Above" : "Specific",
                // type:
                //   this.state.documentshare === true ? "Public" : "Confidential",
                documentId: "",
              }}
              validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                addContactDocument(
                  // values.documentId,
                  {
                    ...values,
                  },
                  this.callback
                );
                resetForm();
              }}
            >
              {({
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                values,
                ...rest
              }) => (
                <Form className="form-background">
                  <div class=" flex justify-between ">
                    <div class=" h-full w-2/4">
                      <Field
                        name="documentId"
                        isRequired
                        component={DragableUpload}
                        // component={DocumentUpload}
                      />
                      {errors.documentId && (
                        <p style={{ color: "tomato", fontWeight: 600 }}>
                          {errors.documentId}
                        </p>
                      )}
                      <Spacer />
                      <Field
                        name="documentTypeId"
                        selectType="documentTypeName"
                        isColumnWithoutNoCreate
                        // label="Type"
                        label={
                          <FormattedMessage
                            id="app.documentId"
                            defaultMessage="Type"
                          />
                        }
                        // isRequired
                        component={SearchSelect}
                        isColumn
                        value={values.documentId}
                        inlineLabel
                      />
                    </div>
                    <div class=" h-full w-5/12">
                      <Field
                        name="documentTitle"
                        //label="Name"
                        label={
                          <FormattedMessage
                            id="app.documentName"
                            defaultMessage="Name"
                          />
                        }
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                      />
                      <Spacer />
                      <Field
                        name="documentDescription"
                        //label="Description"
                        label={
                          <FormattedMessage
                            id="app.documentDescription"
                            defaultMessage="Description"
                          />
                        }
                        isRequired
                        isColumn
                        width={"100%"}
                        component={TextareaComponent}
                      />
                      <Spacer style={{ marginBottom: "0.9375em" }} />
                    </div>
                  </div>

                  <Spacer />
                  <div class=" flex justify-end">
                    <Button
                      htmlType="submit"
                      type="primary"
                      Loading={addingDocumentByContactId}
                    >
                      <FormattedMessage
                        id="app.submit"
                        defaultMessage="Submit"
                      />
                      {/* Submit */}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

const mapStateToProps = ({ contact, settings, auth }) => ({
  contact: contact.contact,
  documentUploadModal: contact.documentUploadModal,
  addingDocumentByContactId: contact.addingDocumentByContactId,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  organization:
    auth.userDetails.metaData && auth.userDetails.metaData.organization,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      addContactDocument,
      getContactDocument,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentModal);
