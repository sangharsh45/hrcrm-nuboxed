import React,{useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import {MainWrapper} from "../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { Button,Switch} from "antd";
import dayjs from "dayjs";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import {UpdateAdminUser,getAdminUser} from "../../EmployeeAction";
import moment from "moment";

function NotifyDrawerForm(props){
    useEffect(()=>{
        props.getAdminUser(props.currentEmployeeId.employeeId);
      },[]);

    const [admini,setAdmini]=useState(props.userAdminnoti.adminInd)
    
        const {
          user:{timeZone},
          startDate,
          endDate,
        }=props;
    
     const handleAdmini = () => {
        // if (props.userAdminnoti.adminInd){
        //   setAdmini(false);
        // }
        //   else{
        //     setAdmini(true);
        //     };
        setAdmini((prevAdmini) => !prevAdmini);
        };
   
 
        return (
          <>
        <Formik
        initialValues={{
            userId: props.userId,
           startDate: props.userAdminnoti.startDate
      ? moment.utc(props.userAdminnoti.startDate)
      : moment(),
    endDate: props.userAdminnoti.endDate
      ? moment.utc(props.userAdminnoti.endDate)
      : moment(),
            adminInd: admini ? "true" : "false", 
            employeeId:props.currentEmployeeId.employeeId,
            orgId:props.orgId,
    
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          let timeZoneFirst = values.timeZone || "";
          console.log(timeZone);
          
          let mytimeZone = timeZoneFirst.substring(4, 10);
          console.log(mytimeZone);
          var a = mytimeZone.split(":");
          console.log(a);
          var timeZoneminutes = +a[0] * 60 + +a[1];
          console.log(timeZoneminutes);
          if (!values.endDate) {
            values.endDate = values.startDate;
          }
          let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
          console.log(newStartDate);
          //Time calculation
          let firstStartTime = dayjs(values.startTime).format(
            "HH:mm:ss.SSS[Z]"
          ); // getting start time from form input
          console.log(firstStartTime);
          let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
          console.log(firstStartHours);

          let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
          console.log(timeEndPart);

          var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
          console.log(firstStartTimeSplit);
          var minutes =
            +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
          console.log(minutes);

          var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
          console.log(firstStartTimeminutes);

          let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
          let m = firstStartTimeminutes % 60;
          h = h < 10 ? "0" + h : h;
          m = m < 10 ? "0" + m : m;
          let finalStartTime = `${h}:${m}`;

          let newStartTime = `${finalStartTime}${timeEndPart}`;

          let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
          let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
          let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
          var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
          var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
          console.log(endMinutes);
          var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
          console.log(firstEndTimeminutes);
          let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
          let mi = firstEndTimeminutes % 60;
          hr = hr < 10 ? "0" + hr : hr;
          mi = mi < 10 ? "0" + mi : mi;
          let finalEndTime = `${hr}:${mi}`;

          let newEndTime = `${finalEndTime}${timeEndPart}`;

        
          props.UpdateAdminUser(
                {
                  ...values,
                  startDate: `${newStartDate}T20:00:00Z`,
                  endDate: `${newEndDate}T20:00:00Z`,
                  // startDate: `${newStartDate}T${newStartTime}`,
                  // endDate: `${newEndDate}T${newEndTime}`,
                  adminInd: admini ? "true" : "false",
                },
          
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
            <MainWrapper style={{ minHeight: "50%" }}>
                <Form>
                  
                    <div>
                            <Switch
                              style={{ width: "6.25em" }}
                              checked={props.userAdminnoti.adminInd||admini}
                              onChange={handleAdmini}
                              checkedChildren="Admin"
                              unCheckedChildren="User"
                            />
                          </div>
                          
                          {admini && (
                          <div class="flex justify-between mt-4" >
                        <div class=" h-full w-[35%]">
                     
                            <div class="justify-between">
                            <div class=" w-1/2">
                            <Field
                              isRequired
                              name="startDate"
                              label={
                                <FormattedMessage
                                  id="app.startDate"
                                  defaultMessage="Start Date"
                                />
                              }
                              isColumn
                              component={DatePicker}
                              value={values.startDate}
                              // defaultValue={{
                              //   // label: props.userAdminnoti.dayjs(startDate),
                              //    value: props.userAdminnoti.startDate,
                              // }}
                              inlineLabel
                              style={{
                                width: "100%",
                              }}
                            />
                          </div>
                        
                    </div>
                        </div>
                        <div class=" h-full w-[35%]">
                            <div class="justify-between">
                            <div class=" w-1/2">
                          <Field
                            isRequired
                            name="endDate"
                            // label="End "
                            label={
                              <FormattedMessage
                                id="app.enddate"
                                defaultMessage="enddate"
                              />
                            }
                            component={DatePicker}
                            isColumn
                            value={values.endDate || values.startDate}

                            inlineLabel
                            style={{
                              width: "100%",
                            }}
                            disabledDate={(currentDate) => {
                              if (values.startDate) {
                                if (
                                  dayjs(currentDate).isBefore(
                                    dayjs(values.startDate)
                                  )
                                ) {
                                  return true;
                                } else {
                                  return false;
                                }
                              }
                            }}
                          />
                        </div>
                     
                            </div>
                          
                        </div>
    
                            
                        </div>
                          )}
             
                        <div class="flex justify-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.updateAdminUser
                                    }
                                >
                                    Submit
                                </Button>
                            </div>
                </Form>
            </MainWrapper>
        )}
    </Formik>
    </>
        )
      }

  const mapStateToProps = ({ auth,employee  }) => ({
    userId:auth.userDetails.userId,
    user: auth.userDetails,
    updateAdminUser:employee.updateAdminUser,
    userAdminnoti:employee.userAdminnoti,
    orgId:auth.userDetails.organizationId,
    
    });
    const mapDispatchToProps = (dispatch) =>
      bindActionCreators(
        {
          UpdateAdminUser,
          getAdminUser
         
        },
        dispatch
      );
    export default connect(mapStateToProps, mapDispatchToProps)(NotifyDrawerForm);