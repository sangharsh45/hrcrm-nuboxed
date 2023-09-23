import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { message, Button, Upload } from "antd";
import { Formik, Form, Field } from "formik";
import { StyledUpload, StyledSteps } from "../../../Components/UI/Antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { Title, HeaderText } from "../../../Components/UI/Elements";
import { Link } from "../../../Components/Common";
import { SelectComponent } from "../ImportSelect";
import ImportHeader from "./ImportHeader";
import ImportHelpGuide from "./ImportHelpGuide";
import { LoadingOutlined, InboxOutlined } from '@ant-design/icons';
import {
  importExcel,
  getExcelHeaders,
  getAccountMatchingFields,
  mapExcelToAccount,
} from "../ImportAction";

const Step = StyledSteps.Step;
const { Dragger } = Upload;

class AccountImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      fileList: null,
      accountNumber: "",
    };
  }
  handleBeforeUpload = (file) => {
    console.log(file);
    const isJPG = file.type === "xlx" || "xlxs";
    if (!isJPG) {
      message.error("You can only upload excel file!");
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //     message.error('Image must smaller than 2MB!');
    // }
    // return isJPG && isLt2M;
    return false;
  };

  handleChange = (info) => {
    this.setState({ fileList: info.fileList });
    if (info.file.status === "done") {
      this.props.input.onChange(info.file.response);
      this.setState({
        uploadResponse: info.file.response,
      });
    }
  };
  handleUpload = (file) => {
    this.props.importExcel(file.file, "account", this.afterImportCallback);
  };
  afterImportCallback = () => this.next();
  afterMappingCallback = (data) => {
    this.setState({ accountNumber: data });
    this.next();
  };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    const {
      exportingExcelFile,
      excelFileId,
      excelHeaders,
      accountMatchingFields,
      mapExcelToAccount,
      mappingExcelToAccount,
    } = this.props;
    const accountRequiredFields =
      accountMatchingFields &&
      accountMatchingFields
        .filter((field) => {
          if (field.required === true) {
            return field.fieldKey;
          }
        })
        .map((field) => field.fieldKey);
    return (
      <>
        <ImportHeader />
        <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
          <div style={{ width: "65%" }}>
            <MainWrapper>
              <HeaderText style={{ textAlign: "center" }}>
                Upload Customers here
              </HeaderText>
              <StyledSteps current={current} labelPlacement="vertical">
                <Step
                  title={"Upload"}
                  icon={exportingExcelFile && <LoadingOutlined />}
                // type="loading"
                />
                <Step
                  title={"Map"}
                  icon={mappingExcelToAccount && <LoadingOutlined />}
                // type="loading" 
                />
                <Step title={"Finish"} icon={null} />
              </StyledSteps>
              <div className="steps-content">
                {current === 0 && (
                  <FlexContainer
                    justifyContent="center"
                    alignItems="center"
                    style={{ width: "100%", height: 400 }}
                  >
                   
                    <div className="clearfix" style={{ height: "200px" }}>
                      <Dragger
                        accept=".csv,.xls,.xlsx"
                        {...this.props}
                        customRequest={this.handleUpload}
                        // listType="picture-card"
                        name="file"
                        onChange={this.handleChange}
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                          {/* type="inbox" */}
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p
                          className="ant-upload-hint"
                          style={{ margin: "0px 3.12em 0px 3.12em" }}
                        >
                          The import tool accepts CSV, XLS, or XLSX files with
                          single tab, multi tab files cannot be uploaded..
                        </p>
                      </Dragger>
                    </div>
                  </FlexContainer>
                )}
                {current === 1 && (
                  <FlexContainer
                    style={{ maxHeight: 400, overflow: "auto", marginTop: 10 }}
                  >
                    {accountMatchingFields && (
                      <Formik
                        onSubmit={(values) => {
                          console.log(values);
                          const errors = [];
                          Object.values(values).map((value) => {
                            console.log(value);
                            if (accountRequiredFields.includes(value)) {
                              errors.push(value);
                            }
                          });
                          const array3 = accountRequiredFields.filter(function (
                            obj
                          ) {
                            return errors.indexOf(obj) == -1;
                          });
                          if (array3.length < 0) {
                            message.error(
                              `${array3.join(", ")} fields are required`,
                              3.5
                            );
                          } else {
                            const arr = Object.entries(values).map(
                              ([key, val]) => ({
                                excelHeader: key,
                                mappingField: val,
                              })
                            );
                            mapExcelToAccount(
                              arr,
                              excelFileId,
                              this.props.history,
                              this.afterMappingCallback
                            );
                          }
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
                          <Form style={{ width: "100%" }}>
                            {excelHeaders &&
                              excelHeaders.map((header, i) => { 
                                return (
                                  <>
                                    <Field
                                      key={i}
                                      name={header}
                                      placeholder="Select"
                                      component={SelectComponent}
                                      label={header}
                                      options={
                                        accountMatchingFields &&
                                        accountMatchingFields
                                      } 
                                    />
                                  </>
                                 ); 
                               })} 
                            <FlexContainer
                              justifyContent="flex-end"
                              marginRight="0.62em"
                            >
                              <Button
                                style={{ marginRight: 8 }}
                                onClick={() => this.prev()}
                              >
                                {" "}
                                Previous{" "}
                              </Button>
                              <Button
                                type="primary"
                                htmlType="submit"
                                loading={mappingExcelToAccount}
                              >
                                Map
                              </Button>
                            </FlexContainer>
                          </Form>
                        )}
                      </Formik>
                 )} 
                  </FlexContainer>
              )} 
                {current === 2 && (
                  <FlexContainer
                    justifyContent="center"
                    alignItems="center"
                    style={{ width: "100%", height: 400 }}
                  >
                    <FlexContainer justifyContent="center">
                      <Title
                        style={{
                          fontSize: "1.37em",
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "3.12em",
                        }}
                      >
                        You have successfully imported{" "}
                        {this.state.accountNumber}
                        Customer data.
                      </Title>
                      {/* <Link toUrl="/account" title="Go to Customer" /> */}
                    </FlexContainer>
                  </FlexContainer>
              )} 
              </div>
            </MainWrapper>
          </div>
          <div style={{ width: "35%" }}>
            <ImportHelpGuide />
          </div>
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ importReducer }) => ({
  exportingExcelFile: importReducer.exportingExcelFile,
  excelFileId: importReducer.excelFileId,
  fetchingExcelHeaders: importReducer.fetchingExcelHeaders,
  excelHeaders: importReducer.excelHeaders,
  // fetchingAccountMatchingFields: importReducer.fetchingAccountMatchingFields,
  // accountMatchingFields: importReducer.accountMatchingFields,
  // mappingExcelToAccount: importReducer.mappingExcelToAccount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      importExcel,
      getExcelHeaders,
      // getAccountMatchingFields,
      // mapExcelToAccount,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccountImport)
);
