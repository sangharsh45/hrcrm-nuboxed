import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addHoliday, getHoliday, updateHoliday,deleteHoliday } from "../HolidayAction";
import { StyledTabs } from "../../../Components/UI/Antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import dayjs from "dayjs";
import moment from "moment";
import SingleHoliday2 from "./SingleHoliday2"; 
import { BundleLoader } from "../../../Components/Placeholder";
import { DatePicker } from "antd";
const SingleHoliday=lazy(()=>import("./SingleHoliday"));

const TabPane = StyledTabs.TabPane;

class HolidayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextInputOpen: false,
      holidayName: "",
      holidayType: false,
      date: "",
    };
  }
  componentDidMount() {
    const currentYear = new Date().getFullYear();
    // const country=this.props.address && this.props.address.length && this.props.address[0].country
    this.props.getHoliday(this.props.workplace,currentYear);
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
  handleCallBack = (status) => {
    if (status === "Success") {
      this.props.getHoliday();
    } else {
      alert("error");
    }
  };
  handleAddStage = () => {
    console.log(this.state.holidayName);
    console.log(dayjs(this.state.date).toISOString());
    console.log(this.state.holidayType ? "Optional" : "Mandatory");
    this.props.addHoliday(
      {
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
  onChange = (date, dateString) => {
    if (dateString) {
      const selectedYear = parseInt(dateString, 10);
      
     
      console.log('Selected Year:', selectedYear);
      this.setState({ selectedYear });
      this.props.getHoliday(this.props.workplace,selectedYear);
    }
   
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
  render() {
    const currentYear = moment().format('YYYY');
   
    const { selectedYear } = this.state;
    console.log(this.props.workplace)
  
    const { isTextInputOpen } = this.state;
    const {
      userType,
      fetchingHoliday
    } = this.props;
    console.log(this.state.holidayName);
    if (fetchingHoliday) {
      return <BundleLoader />;
    }

    return (
      <>
        <FlexContainer>
          <div  class="max-sm:w-[24rem] md:w-2/4">
            <MainWrapper>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "1.25em",
                  color: "white",
                  backgroundColor: "#40A9FF",
                }}
              >
                Holiday List-<div>
                <DatePicker 
                //  format="YYYY"
                defaultValue={moment(currentYear, 'YYYY')}
                // value={this.state.selectedYear ? moment(this.state.selectedYear, 'YYYY') : null}
                    //  value={selectedYear}
                 onChange={this.onChange}
                  picker="year" />
                 </div>
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
                  <SingleHoliday
                    holidays={item}
                    newHolidayName="holidayName"
                    handleUpdateHoliday={this.handleUpdateHoliday}
                    handleDeleteHoliday={this.handleDeleteHoliday}
                  />
                ))}
              </div>

              {/* {isTextInputOpen ? (
                <FlexContainer alignItems="left" style={{ marginTop: "5%", justifyContent:"space-between" }} >
                
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
                  <FlexContainer justifyContent="flex-end" >
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
                  </FlexContainer>
                </FlexContainer>
              ) : (
                  <FlexContainer style={{ float: "right" }} alignItems="flex-end">
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
                  </FlexContainer>
                )} */}
            </MainWrapper>
          </div>
        </FlexContainer>
      </>
    );
  }
}
const mapStateToProps = ({ holiday, auth }) => ({
  holidays: holiday.holidays,
  fetchingHoliday:holiday.fetchingHoliday,
  addingHoliday: holiday.addingHoliday,
  userType: auth.userDetails,
  deleteHoliday:holiday.deleteHoliday,
  address:auth.userDetails.address,
  workplace:auth.userDetails.workplace,
  // country:auth.userDetails.address && auth.userDetails.address.length && auth.userDetails.address[0].country,
  deleteHolidayError:holiday.deleteHolidayError,
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addHoliday, getHoliday, updateHoliday,  deleteHoliday }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HolidayPage);
