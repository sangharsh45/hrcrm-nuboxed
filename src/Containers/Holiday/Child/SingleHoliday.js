import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Button, Tooltip,Popconfirm, DatePicker, Switch } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Spacer } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { elipsize } from "../../../Helpers/Function/Functions";
import moment from "moment";
import { date } from "yup";

class SingleHoliday extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      color: "red",
      currentStage: "",
      fields: {},
      date: this.props.holidays.date,
      holidayType: false,
      
    };
  }
  handleChange = ({ target: { name, value } }) => {
    debugger;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  onChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
    this.setState({ date: moment(dateString) });
  };
 
  handleChangeHolidayTime = (checked) => {
    console.log(checked);
    this.setState({
      holidayType: checked,
    });
  };
  render() {
    console.log(this.state.fields);
    const { holidays } = this.props;
    console.log(holidays);

    const {
      holidays: { holidayName, date, holidayType, holidayId,handleDeleteHoliday },
    } = this.props;

    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex ">
                <StageName
                  style={{
                   
                   width:"13rem",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "tomato",
                    fontWeight: "normal",
                  }}
                >
                  {elipsize(holidayName, 23)}
                </StageName>
                <StageValue
                  style={{
                    width:"10rem",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "tomato",
                    fontWeight: "normal",
                    // marginRight: "8%",
                  }}
                >
                  {`${moment(date).format("ll")}`}
                </StageValue>
                <StageValue
                  style={{
                    width:"10rem",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "Green" : "tomato",
                    fontWeight: "normal",
                  }}
                >
                  {`${holidayType}`}
                </StageValue>
            
          
       
          {holidayType === "Optional" ?
          <StageValue
          style={{
            // flexBasis: "41%",
            textAlign: "left",
           
            // fontWeight: "normal",
          }}
          >
            <Button 
            type="primary"
            >Apply</Button>
            {/* <Popconfirm
              title="Do you wish to change Status ? "
              okText="Yes"
              cancelText="No"
            >
              <Switch
                style={{ width: "7em" }}
                checkedChildren="Applied"
                unCheckedChildren="Not Applied"
              />
            </Popconfirm> */}
          </StageValue>
          :null}
      
              
                {this.props.role === "ADMIN" && (
                  <div style={{}}>
                    <ActionIcon
                      tooltipTitle="Edit"
                      iconType="edit"
                      handleIconClick={toggleViewType}
                      size="0.75em"
                    />
                  </div>)}
                  &nbsp; &nbsp;
                  {this.props.role === "ADMIN" && (
                  <div style={{}}>
                    <ActionIcon
                      tooltipTitle="Delete"
                      iconType="delete"
                      //  onClick={() => this.props.handleDeleteHoliday(holidayId)}
                      // handleIconClick={item.holidayId}
                      handleIconClick={() => this.props.handleDeleteHoliday(holidayId)}
                      size="0.75em"
                    />
                  </div>)}
              </div>

            ) : (
                <FlexContainer>
                  <TextInput
                    name={this.props.newHolidayName}
                    defaultValue={holidayName}
                    onChange={this.handleChange}
                    width={"48%"}
                  />
                &nbsp;
                  <DatePicker
                    defaultValue={moment(date)}
                    onChange={this.onChangeDatePicker}
                  />
                &nbsp;
                  <Switch
                    style={{ width: "6.25em", marginLeft: "0.625em" }}
                    onChange={this.handleChangeHolidayTime}
                    checked={this.state.holidayType}
                    checkedChildren="Optional"
                    unCheckedChildren="Mandatory"
                  />
                  {/* <TextInput
                                        name={newProbability}
                                        defaultValue={probability}
                                        // disabled={disabled}
                                        // style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                                        onChange={this.handleChange}

                                        width={"25%"}
                                    /> */}
                &nbsp;
                  {/* <TextInput
                                        name={newDays}
                                        defaultValue={days}


                                        // style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                                        onChange={this.handleChange}
                                        placeholder="Days"
                                        width={"24%"}
                                    /> */}
                  <Spacer />
                  <Spacer style={{ marginBottom: "0.625em" }} />
                  <FlexContainer
                    justifyContent="flex-end"
                    marginRight="0.3125em"
                    marginTop="0.625em"
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      // Loading={updatingStages}

                      onClick={() =>
                        this.props.handleUpdateHoliday(
                          holidayId,
                          this.state.fields.holidayName,
                          this.state.date,
                          this.state.holidayType === true
                            ? "Optional"
                            : "Mandatory",
                          toggleViewType()
                        )
                      }
                    >
                      {/* Save */}
                      <FormattedMessage
                 id="app.save"
                 defaultMessage="Save"
                />
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                      {/* Cancel */}
                      <FormattedMessage
                 id="app.cancel"
                 defaultMessage="Cancel"
                />
                  </Button>
                  </FlexContainer>
                </FlexContainer>
              )
          }
        </ViewEditCard>
      </StageWrapper>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
  
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SingleHoliday);

const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  // margin-bottom: 0;
  margin: 0;
`;
const StageValue = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-size: 1 rem;
  font-weight: 400;
  margin: 0;
`;
