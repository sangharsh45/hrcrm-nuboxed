import React, {lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addHoliday, getHoliday, updateHoliday,deleteHoliday } from "../../../../Holiday/HolidayAction";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import {  TextInput } from "../../../../../Components/UI/Elements";
import dayjs from "dayjs";
import moment from "moment";
import { Button, Switch } from "antd";
import { FormattedMessage } from "react-intl";
import { DatePicker } from "antd";
const SettingsSingleHoliday = lazy(() => import("./SettingsSingleHoliday"));

const TabPane = StyledTabs.TabPane;

class SettingsHolidayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextInputOpen: false,
      holidayName: "",
      selectedYear: null,
      holidayType: false,
      date: "",
    };
  }
  componentDidMount() {
    const currentYear = new Date().getFullYear();
    this.props.getHoliday(this.props.country_name,currentYear);
  } 
  handleChangeHolidayTime = (checked) => {
    this.setState({
      holidayType: checked,
    });
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleAddProcess = () => {
    const { updateProcessName } = this.props;

    const {
      processName,

      currentProcess,
    } = this.state;
    const Id = currentProcess.processId;
    let process = { processName, processId: Id };
    updateProcessName(process, this.handleCallBack1);
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleCallBack = (status,dateString) => {
    if (status === "Success") {
      const currentYear = new Date().getFullYear();
      this.props.getHoliday(this.props.country_name,this.state.selectedYear?this.state.selectedYear:currentYear);
    } else {
      alert("error");
    }
  };
  // onChange = (date, dateString) => {
  //   this.setState({ selectedYear: dateString });
  //   console.log(date, dateString);
  // };
  onChange = (date, dateString) => {
    if (dateString) {
      const selectedYear = parseInt(dateString, 10);
      
     
      console.log('Selected Year:', selectedYear);
      this.setState({ selectedYear });
      this.props.getHoliday(this.props.country_name,selectedYear);
    }
   
  };
  handleAddStage = () => {
    console.log(this.state.holidayName);
    console.log(dayjs(this.state.date).toISOString());
    console.log(this.state.holidayType ? "Optional" : "Mandatory");
    this.props.addHoliday(
      {
        country:this.props.country_id,
        holidayName: this.state.holidayName,
        date: dayjs(this.state.date).toISOString(),
        holidayType: this.state.holidayType ? "Optional" : "Mandatory",
      },
      this.handleCallBack
    );

    this.setState({
      isTextInputOpen: false,
    });
  };
  handleCancel = () => {
    console.log("cancel button");
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  };
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  onChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
    this.setState({ date: dayjs(dateString) });
  };
  handleUpdateHoliday = (id, holidayName, date, holidayType) => {
    this.props.updateHoliday(id, holidayName, date, holidayType);
  };
  handleDeleteHoliday = (id) => {
    this.props.deleteHoliday(id);
    this.setState({ holidayType: "", singleHoliday: "" });
};
handleYearChange = (date) => {
  if (date) {
    const selectedYear = moment(date).year();
    console.log('Selected Year:', selectedYear);
    this.setState({ selectedYear });
  }
};
  render() {
    const currentYear = moment().format('YYYY');
   
    const { selectedYear } = this.state;
    const yearPickerConfig = {
      format: 'YYYY',
      mode: 'year',
      picker: 'year',
    };
    console.log(selectedYear)
    const { isTextInputOpen } = this.state;
    const {
      userType,

    } = this.props;
    // console.log(currentYear)
    console.log(this.state.holidayName);
    return (
      <>
        <div class=" flex ">
          <div class=" w-[80%]">
            <MainWrapper justifyContent="space-between">
              <h1 
                style={{
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "1.25em",
                  color: "white",
                  backgroundColor: "#40A9FF",
                }}
              >
                Holiday List-
                <div>
                {/* <DatePicker
          {...yearPickerConfig}
          value={moment(selectedYear, 'YYYY')}
          onChange={this.handleYearChange}
        /> */}
                 <DatePicker 
                //  format="YYYY"
                defaultValue={moment(currentYear, 'YYYY')}
                // value={this.state.selectedYear ? moment(this.state.selectedYear, 'YYYY') : null}
                    //  value={selectedYear}
                 onChange={this.onChange}
                  picker="year" />
                 </div>
                 {/* <Spacer/>
                 <div>Optional Allowed
                  <input
                  type="number"
                  ></input>
                 </div> */}
              {/* <div
                style={{
                  marginLeft:"326px"
                }}>
                Mandatory-10
              </div> */}
              </h1>
             
            
              {/* <FlexContainer
                justifyContent="space-between"
                style={{ fontSize: "1.2em", fontWeight: "bold" }}
              >
                <div style={{ marginLeft: "1.4375em" }}>Name</div>
                <div style={{ marginLeft: "5.375em" }}>Date</div>
                <div style={{ marginRight: "8.4375em" }}>Type</div>
              </FlexContainer> */}



              {/* {this.props.role === "ADMIN" && (
                <div>
                {this.props.holidays.map((item, i) => (
                  <SingleHoliday
                    holidays={item}
                    newHolidayName="holidayName"
                    handleUpdateHoliday={this.handleUpdateHoliday}
                  />
                ))}
                </div>
              )}

          
              {this.props.role !== "ADMIN" && (
                <div>
                {this.props.holidays.map((item, i) => (
                  <SingleHoliday2
                    holidays={item}
                    newHolidayName="holidayName"
                    handleUpdateHoliday={this.handleUpdateHoliday}
                  />
                ))}
                </div>
              )} */}
              <div>
                {this.props.holidays.map((item, i) => (
                  <SettingsSingleHoliday
                    holidays={item}
                    newHolidayName="holidayName"
                    handleUpdateHoliday={this.handleUpdateHoliday}
                    handleDeleteHoliday={this.handleDeleteHoliday}
                  />
                ))}
              </div>

              {isTextInputOpen ? (
                <div class=" flex items-left justify-between mt-[5%]"  >
                
                  <div >
                  <TextInput
                    placeholder="Holiday name"
                    name="holidayName"
                    value={this.state.holidayName}
                    onChange={this.handleChange}
                    width={"85%"}
                  />
                  </div>
                  <div>
                  <DatePicker onChange={this.onChangeDatePicker} />
                  </div>
                  <div>
                  <Switch
                    style={{ width: "6.25em", marginLeft: "0.625em" }}
                    onChange={this.handleChangeHolidayTime}
                    checked={this.state.holidayType}
                    checkedChildren="Optional"
                    unCheckedChildren="Mandatory"
                  />
                  </div>
                  <div class=" flex justify-end"  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      Loading={this.props.addingHoliday}
                      onClick={this.handleAddStage}
                    >
                    
                      <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                   />
                    </Button>
                    &nbsp;
                    <Button type="primary" ghost onClick={this.handleCancel}>
                   
                      <FormattedMessage
                 id="app.cancel"
                 defaultMessage="Cancel"
                />
                    </Button>
                  </div>
                </div>
              ) : (
                  <div class=" flex justify-end" style={{ float: "right" }} >
                    {this.props.role === "ADMIN" && (
                      <div style={{ marginTop: "0.3125em" }}>
                        <Button
                          style={{
                            border: "0.0625em solid #1890ff",
                            color: "#1890ff",
                          }}
                          htmlType="submit"
                          onClick={this.toggleInput}
                        >
                          Add Holiday
                    </Button>
                    &nbsp;
                      </div>
                    )}
                  </div>

                )} 
            </MainWrapper>
          </div>
        </div>
        <h4>Updated on {moment(this.props.holidays && this.props.holidays.length && this.props.holidays[0].updationDate).format("ll")} by {this.props.holidays && this.props.holidays.length && this.props.holidays[0].updatedBy}</h4>
      </>
    );
  }
}
const mapStateToProps = ({ holiday, auth }) => ({
  holidays: holiday.holidays,
  addingHoliday: holiday.addingHoliday,
  userType: auth.userDetails,
  deleteHoliday:holiday.deleteHoliday,
  deleteHolidayError:holiday.deleteHolidayError,
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addHoliday, getHoliday, updateHoliday,  deleteHoliday }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SettingsHolidayPage);
