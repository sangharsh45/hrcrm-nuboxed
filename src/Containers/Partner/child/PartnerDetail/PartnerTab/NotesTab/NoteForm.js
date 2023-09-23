import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Icon } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { addNote } from "../../../../PartnerAction";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FlexContainer } from "../../../../../../Components/UI/Layout";

/**
 * yup validation scheme for creating a note
 */
const NoteSchema = Yup.object().shape({
  notes: Yup.string().required(""),
});
const toolbarOption = {
  options: [
    "inline",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
  ],
  // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
};
class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      edit: true,
    };
  }
  onEditorStateChange = (editorState) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      editorState,
      edit: false,
    });
  };
  createCallback = () => {
    this.setState({ editorState: EditorState.createEmpty(), edit: true }, () =>
      this.props.callback()
    );
  };

  render() {
    const {
      user: { userId, firstName, lastName },
      addNote,
      partnerId,
      notes,
      collectionDTO,
      ownerId,
      accountId,
      opportunityId,
      distributorId,
      Loading,
      callback,
      teamId,
      callId,
      // leadsAccountId,
      // contactLeadsId,
      leadsId,
      eventId,
      taskId,
      type,
      vendorId,

      // partnerId,
      // userIdFromPartner,
      fetchingNotesListByLeadsId,
    } = this.props;
    const { editorState, placeholder } = this.state;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            notes: "",
            partnerId: partnerId ? partnerId : "",
            // type: type ? type : "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            );
            const htmlBody = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );
            // const htmlBody = 'draftToHtml(convertToRaw(editorState.getCurrentContent()))'

            console.log({ ...values, notes: htmlBody });
            addNote({ ...values, notes: htmlBody }, this.createCallback);
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
          }) => {
            console.log(editorState.getCurrentContent());

            return (
              <Form className="form-background">
                {/* <Field
                                name='description'
                                placeholder='Leave notes here ...'
                                component={TextareaComponent}
                            /> */}
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  editorStyle={{
                    height: 100,
                    overflow: "auto",
                    // textTransform: "capitalize",
                  }}
                  onEditorStateChange={this.onEditorStateChange}
                  placeholder={placeholder || "Type here"}
                  editorState={editorState}
                  toolbar={toolbarOption}
                />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.edit}
                    style={{
                      marginTop: "45px",
                      marginBottom: "5px",
                      marginRight: "5px",
                    }}
                  >
                    {/* Post */}
                    <FormattedMessage id="app.post" defaultMessage="Post" />
                  </Button>
                </FlexContainer>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, partner }) => ({
  user: auth.userDetails,
  fetchingNotesListByPartnerId: partner.fetchingNotesListByPartnerId,

  //   team: team.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNote,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
