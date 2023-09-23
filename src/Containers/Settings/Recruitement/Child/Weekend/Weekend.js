import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import { Switch, Button, Popconfirm } from "antd";
import { FlexContainer, MainWrapper } from "../../../../../Components/UI/Layout";
import { StyledLabel,Spacer } from "../../../../../Components/UI/Elements";
 import { addingWeekendAccess,
  getWeekendAccess, 
} from "../../../SettingsAction";

function Weekend(props) {
    useEffect(() => {
    props.getWeekendAccess(props.country_name);
  }, []);


  const { sundayInd } = props.weekendAccess;
  console.log(sundayInd);
  const [sundayInds, setSundayInd] = useState(sundayInd);
  function handleSundayClick(checked) {
    console.log(sundayInd);
    if (sundayInd) {
      //disable url
      props.addingWeekendAccess({
         ...props.weekendAccess,
        orgId: props.orgId,
        sundayInd: sundayInd ? false : true,
      }, props.country_name);
      setSundayInd(sundayInd ? false : true);
    } else {

      props.addingWeekendAccess({
        ...props.weekendAccess,
        orgId: props.orgId,
        sundayInd: sundayInd ? false : true,
      }, props.country_name);
      setSundayInd(sundayInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleSundayCancel() {
    if (sundayInd) {
      setSundayInd(true);
    } else {
      setSundayInd(false);
    }
  }


  const { tuesdayInd } = props.weekendAccess;
  console.log(mondayInd);
  const [tuesdayInds, setTuesdayInd] = useState(tuesdayInd);
  function handleTuesdayClick(checked) {
    console.log(tuesdayInd);
    if (tuesdayInd) {
      //disable url
      props.addingWeekendAccess({
         ...props.weekendAccess,
        orgId: props.orgId,
        tuesdayInd: tuesdayInd ? false : true,
      }, props.country_name);
      setTuesdayInd(tuesdayInd ? false : true);
    } else {

      props.addingWeekendAccess({
        ...props.weekendAccess,
        orgId: props.orgId,
        tuesdayInd: tuesdayInd ? false : true,
      }, props.country_name);
      setTuesdayInd(tuesdayInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleMondayCancel() {
    if (tuesdayInd) {
      setTuesdayInd(true);
    } else {
      setTuesdayInd(false);
    }
  }


  const { mondayInd } = props.weekendAccess;
  console.log(mondayInd);
  const [mondayInds, setMondayInd] = useState(mondayInd);
  function handleMondayClick(checked) {
    console.log(mondayInd);
    if (mondayInd) {
      //disable url
      props.addingWeekendAccess({
         ...props.weekendAccess,
        orgId: props.orgId,
        mondayInd: mondayInd ? false : true,
      }, props.country_name);
      setMondayInd(mondayInd ? false : true);
    } else {

      props.addingWeekendAccess({
        ...props.weekendAccess,
        orgId: props.orgId,
        mondayInd: mondayInd ? false : true,
      }, props.country_name);
      setMondayInd(mondayInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleTuesdayCancel() {
    if (mondayInd) {
      setMondayInd(true);
    } else {
      setMondayInd(false);
    }
  }


  const { wednesdayInd } = props.weekendAccess;
  console.log(wednesdayInd);
  const [wednesdayInds, setWednesdayInd] = useState(wednesdayInd);
  function handleWednesdayClick(checked) {
    console.log(wednesdayInd);
    if (wednesdayInd) {
      //disable url
      props.addingWeekendAccess({
         ...props.weekendAccess,
        orgId: props.orgId,
        wednesdayInd: wednesdayInd ? false : true,
      }, props.country_name);
      setWednesdayInd(wednesdayInd ? false : true);
    } else {

      props.addingWeekendAccess({
        ...props.weekendAccess,
        orgId: props.orgId,
        wednesdayInd: wednesdayInd ? false : true,
      }, props.country_name);
      setWednesdayInd(wednesdayInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleWednesdayCancel() {
    if (wednesdayInd) {
      setWednesdayInd(true);
    } else {
      setWednesdayInd(false);
    }
  }


  const { thursdayInd } = props.weekendAccess;
  console.log(thursdayInd);
  const [thursdayInds, setThursdayInd] = useState(thursdayInd);
  function handleThursdayClick(checked) {
    console.log(thursdayInd);
    if (thursdayInd) {
      //disable url
      props.addingWeekendAccess({
         ...props.weekendAccess,
        orgId: props.orgId,
        thursdayInd: thursdayInd ? false : true,
      }, props.country_name);
      setThursdayInd(thursdayInd ? false : true);
    } else {

      props.addingWeekendAccess({
        ...props.weekendAccess,
        orgId: props.orgId,
        thursdayInd: thursdayInd ? false : true,
      }, props.country_name);
      setThursdayInd(thursdayInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleThursdayCancel() {
    if (thursdayInd) {
      setThursdayInd(true);
    } else {
      setThursdayInd(false);
    }
  }


  const { fridayInd } = props.weekendAccess;
  console.log(fridayInd);
  const [fridayInds, setFridayInd] = useState(fridayInd);
  function handleFridayClick(checked) {
    console.log(fridayInd);
    if (fridayInd) {
      //disable url
      props.addingWeekendAccess({
         ...props.weekendAccess,
        orgId: props.orgId,
        fridayInd: fridayInd ? false : true,
      }, props.country_name);
      setFridayInd(fridayInd ? false : true);
    } else {

      props.addingWeekendAccess({
        ...props.weekendAccess,
        orgId: props.orgId,
        fridayInd: fridayInd ? false : true,
      }, props.country_name);
      setFridayInd(fridayInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleFridayCancel() {
    if (fridayInd) {
      setFridayInd(true);
    } else {
      setFridayInd(false);
    }
  }


  const { saturdayInd } = props.weekendAccess;
  console.log(saturdayInd);
  const [saturdayInds, setSaturdayInd] = useState(saturdayInd);
  function handleSaturdayClick(checked) {
    console.log(saturdayInd);
    if (saturdayInd) {
      //disable url
      props.addingWeekendAccess({
         ...props.weekendAccess,
        orgId: props.orgId,
        saturdayInd: saturdayInd ? false : true,
      }, props.country_name);
      setSaturdayInd(saturdayInd ? false : true);
    } else {

      props.addingWeekendAccess({
        ...props.weekendAccess,
        orgId: props.orgId,
        saturdayInd: saturdayInd ? false : true,
      }, props.country_name);
      setSaturdayInd(saturdayInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleSaturdayCancel() {
    if (saturdayInd) {
      setSaturdayInd(true);
    } else {
      setSaturdayInd(false);
    }
  }

  




  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
      <Spacer />
       <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Sunday</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleSundayClick}
            onCancel={handleSundayCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
                checked={sundayInds||sundayInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer>
      <Spacer />
      <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Monday</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
              onConfirm={handleMondayClick}
              onCancel={handleMondayCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
               checked={mondayInds||mondayInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer>
      <Spacer />
      <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Tuesday</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleTuesdayClick}
            onCancel={handleTuesdayCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
                checked={tuesdayInds||tuesdayInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer> 
      <Spacer />
      <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Wednesday</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleWednesdayClick}
            onCancel={handleWednesdayCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
                checked={wednesdayInds||wednesdayInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer> 
      <Spacer />
      <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Thursday</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleThursdayClick}
            onCancel={handleThursdayCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
                checked={thursdayInds||thursdayInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer> 
      <Spacer />
      <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Friday</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleFridayClick}
            onCancel={handleFridayCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
                checked={fridayInds||fridayInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer> 
      <Spacer />
      <FlexContainer style={{ width: "52%", justifyContent: "space-between" }}>
        <p>Saturday</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleSaturdayClick}
            onCancel={handleSaturdayCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
                checked={saturdayInds||saturdayInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </FlexContainer> 
    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  weekendAccess:settings.weekendAccess,
//   thirdPartyMonetize:settings.thirdPartyMonetize,
    orgId: auth.userDetails.organizationId,
   userId: auth.userDetails.userId,
addingWeekendAccess:settings.addingWeekendAccess,
   fetchingWeekendAccess:settings.fetchingWeekendAccess,
   fetchingWeekendAccessError:settings.fetchingWeekendAccessError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     
      getWeekendAccess,
    addingWeekendAccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weekend);

