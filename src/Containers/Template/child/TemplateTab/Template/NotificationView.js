import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field } from "formik";
import { Spacer } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { updateNotificationTemplate } from "../../../../Rules/RulesAction";
import CustomOption from "../../../../Rules/Child/RulesTab/CustomOption";
import * as Yup from "yup";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import CustomOptionForNotification from "../../../../Rules/Child/RulesTab/CustomOptionForNotification";
const NotificationSchema = Yup.object().shape({
  notificationName: Yup.string().required("Input needed!"),
});


function NotificationView(props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [edit, setEdit] = useState(true);
  function onEditorStateChange(editorState) {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    seteditorState(editorState);
    setEdit(false);
  }
  useEffect(() => {
    if (props.currentNotification.message) {
      debugger;
      const sampleMarkup = props.currentNotification.message || editorState;
      console.log(convertFromHTML(props.currentNotification.message));
      const blocksFromHTML = convertFromHTML(sampleMarkup);
      seteditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks || "",
            blocksFromHTML.entityMap
          )
        )
      );
    } else {
      seteditorState(EditorState.createEmpty());
    }
  }, [props.currentNotification.message]);

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
      const data = new FormData(); // eslint-disable-line no-undef
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }
  function handleCallBack(status) {
    if (status === "success") {
      setEdit(true);
      message.success("Changes updated successfully");
    }
  }
  return (
    <>
      <Formik
        initialValues={{
          notificationName: props.currentNotification.notificationName || "",
          message: "",
          notificationTemplateId:
            props.currentNotification.notificationTemplateId || "",
          description: props.currentNotification.description || "",
        }}
        validationSchema={NotificationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          const editText = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          );

          props.updateNotificationTemplate(
            {
              ...values,
              message: editText,
            },
            handleCallBack
          );
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // height: "50vh",
                  // overflow: "scroll",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    marginLeft: "1.25em",
                    marginRight: "1.25em",
                  }}
                >
                  <div style={{ marginTop: "1.25em" }}></div>
                  <Field
                    isRequired
                    name="notificationName"
                    type="text"
                    isColumn
                    width={"100%"}
                    //label="Name"
                    label={<FormattedMessage
                      id="app.notificationName"
                      defaultMessage="Name"
                    />}
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
                    label={<FormattedMessage
                      id="app.description"
                      defaultMessage="Description"
                    />}
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

                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{
                      height: 100,
                      overflow: "auto",
                      border: "0.0625em solid #aaa",
                      padding: "0.3125em 0.625em ",
                    }}
                    toolbar={{
                      image: {
                        uploadCallback: uploadImageCallBack,
                        alt: { present: true, mandatory: false },
                        inputAccept:
                          "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                        previewImage: true,
                      },
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "fontFamily",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "emoji",
                        "image",
                        "remove",
                        "history",
                      ],
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
                  Loading={props.udatingNotification}
                  disabled={edit}
                >
                  <FormattedMessage
                    id="app.update"
                    defaultMessage=" Update"
                  />

                  {/* Update */}
                </Button>
              </FlexContainer>
            </Form>
          )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ rule }) => ({
  udatingNotification: rule.udatingNotification,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateNotificationTemplate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationView);

// import React, { useEffect, useState } from "react";
// import {
//   FlexContainer,
//   MainWrapper,
// } from "../../../../../Components/UI/Layout";
// import {
//   EditorState,
//   convertToRaw,
//   ContentState,
//   convertFromHTML,
// } from "draft-js";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import draftToHtml from "draftjs-to-html";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Editor } from "react-draft-wysiwyg";
// import CustomOption from "../../../../Rules/Child/RulesTab/CustomOption";
// import { Button, Icon, Tag } from "antd";
// import { updateNotificationTemplate } from "../../../../Rules/RulesAction";
// import { Spacer, TextInput } from "../../../../../Components/UI/Elements";
// import { OmitProps } from "antd/lib/transfer/renderListBody";
// import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
// import { withRouter } from "react-router-dom";
// function NotificationView(props) {
//   const [editorState, seteditorState] = useState(EditorState.createEmpty());
//   const [show, setShow] = useState(false);
//   const [editedName, setEditedName] = useState("");
//   const [edit, setEdit] = useState(false);

//   function onEditorStateChange(editorState) {
//     console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
//     seteditorState(editorState);
//     setEdit(true);
//   }

//   useEffect(() => {
//     if (props.message) {
//       debugger;

//       seteditorState(
//         EditorState.createWithContent(
//           ContentState.createFromBlockArray(convertFromHTML(props.message))
//         )
//       );
//     } else {
//       seteditorState(EditorState.createEmpty());
//     }
//   }, [props.message]);
//   function handleIconClick() {
//     setShow(true);
//   }
//   function handleCancel() {
//     setShow(false);
//   }

//   function handleChange(e) {
//     setEditedName(e.target.value);
//   }
//   function handleSave() {
//     props.updateNotificationTemplate({
//       notificationName: editedName,

//       notificationTemplateId: props.notificationTemplateId,
//     });
//   }
//   function handleUpdate() {
//     console.log(editorState);
//     const editText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
//     console.log(editText);
//     props.updateNotificationTemplate({
//       message: editText,
//       notificationTemplateId: props.notificationTemplateId,
//     });
//   }
//   return (
//     <div>
//       <MainWrapper>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",

//             margin: "0.625em",
//           }}
//         >
//           {show ? (
//             <div style={{ width: "30%" }}>
//               <TextInput
//                 name="notificationName"
//                 defaultValue={props.notificationName}
//                 onChange={handleChange}
//                 width={"100%"}
//               />

//               <FlexContainer justifyContent="flex-end" marginTop="0.3125em">
//                 <Button
//                   style={{
//                     border: "0.0625em solid #1890ff",
//                     color: "#1890ff",
//                   }}
//                   htmlType="submit"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </Button>
//                 &nbsp;
//                 <Button
//                   style={{
//                     border: "0.0625em solid #1890ff",
//                     color: "#1890ff",
//                   }}
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </Button>
//               </FlexContainer>
//             </div>
//           ) : (
//             <Tag
//               color="#FFA500"
//               style={{
//                 cursor: "pointer",
//                 width: "25%",
//                 fontWeight: "bold",
//                 fontSize: "1em",
//                 display: "flex",
//                 alignItems: "center",
//                 textAlign: "center",
//                 borderColor: "orange",
//                 justifyContent: "center",
//                 height: "2.0625em",
//               }}
//             >
//               {props.notificationName} &nbsp;&nbsp;
//               <Icon
//                 type="edit"
//                 style={{ fontSize: "1em" }}
//                 onClick={handleIconClick}
//               ></Icon>
//             </Tag>
//             // <div
//             //   style={{
//             //     display: "flex",
//             //     justifyContent: "center",
//             //     fontSize: "1.125em",
//             //     margin: "0.625em",
//             //   }}
//             // >
//             //   {props.notificationName}&nbsp;{" "}
//             //   {/* <Icon
//             //     type="edit"
//             //     style={{ fontSize: "1em" }}
//             //     onClick={handleIconClick}
//             //   ></Icon> */}
//             // </div>
//           )}
//         </div>
//         <Editor
//           editorState={editorState}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           editorStyle={{
//             height: 250,
//             overflow: "auto",
//             border: "0.0625em solid #aaa",
//             padding: "0.3125em 0.625em ",
//           }}
//           toolbarCustomButtons={[<CustomOption />]}
//           onEditorStateChange={onEditorStateChange}
//           placeholder={"Type here"}
//         />
//         <Spacer />
//         <FlexContainer justifyContent="flex-end" marginRight="0.625em">
//           <StyledPopconfirm
//             title="Do you want to Update?"
//             onConfirm={handleUpdate}
//           >
//             <Button
//               type="primary"
//               htmlType="submit"
//               disabled={!edit}
//               //  Loading={props.updatingPersonalSignature}
//             >
//               Update
//             </Button>
//           </StyledPopconfirm>
//         </FlexContainer>
//       </MainWrapper>
//     </div>
//   );
// }

// const mapStateToProps = ({ rule }) => ({});
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       updateNotificationTemplate,
//     },
//     dispatch
//   );

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(NotificationView)
// );
