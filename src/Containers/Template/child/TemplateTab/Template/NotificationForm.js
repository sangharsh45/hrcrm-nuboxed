import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { Spacer } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { addNotificationTemplate } from "../../../../Rules/RulesAction";
import CustomOption from "../../../../Rules/Child/RulesTab/CustomOption";
import * as Yup from "yup";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import CustomOptionForNotification from "../../../../Rules/Child/RulesTab/CustomOptionForNotification";
const NotificationSchema = Yup.object().shape({
  notificationName: Yup.string().required("Input needed!"),
});
function NotificationForm(props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [edit, setEdit] = useState(true);

  function onEditorStateChange(editorState) {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    seteditorState(editorState);
    setEdit(false);
  }

  return (
    <>
      <Formik
        initialValues={{
          notificationName: "",
          message: "",
          templateId: "",
          description: "",
        }}
        // validationSchema={NotificationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          const editText = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          );
          props.addNotificationTemplate({
            ...values,
            message: editText,
          });
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <Field
                  isRequired
                  name="notificationName"
                  type="text"
                  isColumn
                  width={"100%"}
                  //label="Name"
                  label={
                    <FormattedMessage
                      id="app.notificationName"
                      defaultMessage="Name"
                    />
                  }
                  component={InputComponent}
                  inlineLabel
                  style={{
                    flexBasis: "80%",
                    height: "2.0625em",
                    marginTop: "0.25em",
                  }}
                />
                <Spacer />
                <Field
                  name="description"
                  //label="Description"
                  label={
                    <FormattedMessage
                      id="app.description"
                      defaultMessage="Description"
                    />
                  }
                  width={"100%"}
                  isColumn
                  height={"4.375em"}
                  component={TextareaComponent}
                  style={{
                    flexBasis: "80%",
                    height: "5em",
                    // marginLeft: "2.5em",
                    marginTop: "0.25em",
                  }}
                />
                <Spacer />
                <Editor
                  editorState={editorState}
                  //   toolbarHidden
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  toolbar={{
                    options: [
                      "inline",
                      //   "blockType",
                      //   "fontSize",

                      //   "list",
                      //   "textAlign",
                      //   "colorPicker",
                      //   "link",
                      //   "embedded",
                      "emoji",
                      //   "image",
                      //   "remove",
                    ],
                    inline: {
                      options: ["bold", "italic"],
                    },
                  }}
                  editorStyle={{
                    height: 250,
                    overflow: "auto",
                    border: "0.0625em solid #aaa",
                    padding: "0.3125em 0.625em ",
                  }}
                  toolbarCustomButtons={[<CustomOptionForNotification />]}
                  onEditorStateChange={onEditorStateChange}
                  placeholder={"Type here"}
                />
              </div>
            </div>
            <Spacer />
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                Loading={props.addingNotificationTemplate}
                disabled={edit}
              >
                <FormattedMessage id="app.create" defaultMessage="Create" />

                {/* Create */}
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ rule }) => ({
  addingNotificationTemplate: rule.addingNotificationTemplate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNotificationTemplate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationForm);
