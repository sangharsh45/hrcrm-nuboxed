// // import { Button, Popconfirm } from "antd";
// // import React, { useEffect, useState } from "react";
// // import { connect } from "react-redux";
// // import { bindActionCreators } from "redux";
// // import { addAttendence, getAttendanceList } from "../../Customer/CustomerAction";

// // function StartStop(props) {
// //   useEffect(() => {
// //     props.getAttendanceList(props.userId);
// //   }, []);

// //   const toggle = () => {
// //     let data = {
// //       userId: props.userId,
// //       startInd: props.attendanceByList.startInd === true ? true : false, 
// //     };
// //     props.addAttendence(data,props.userId);
// //   };

// //   return (
// //     <div>
// //       <Popconfirm
// //         title="Are you sure you want to start/stop?"
// //         onConfirm={toggle}
// //         okText="Yes"
// //         cancelText="No"
// //       >
// //         <Button
// //           type="primary"
// //           htmlType="submit"
// //           style={{ backgroundColor: props.attendanceByList.startInd ? "#77dd77" : "#ff7158bf" }}
// //         >
// //           {props.attendanceByList.startInd ? "Start" : "Stop" }
// //         </Button>
// //       </Popconfirm>
// //     </div>
// //   );
// // }

// // const mapStateToProps = ({ customer, auth }) => ({
// //   userId: auth.userDetails.userId,
// //   attendanceByList: customer.attendanceByList,
// // });

// // const mapDispatchToProps = (dispatch) =>
// //   bindActionCreators(
// //     {
// //       addAttendence,
// //       getAttendanceList,
// //     },
// //     dispatch
// //   );

// // export default connect(mapStateToProps, mapDispatchToProps)(StartStop);













// import { Button, Popconfirm } from "antd";
// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { addAttendence,
//   getAttendanceList
//  } from "../../Customer/CustomerAction";
//  import { BundleLoader } from "../../../Components/Placeholder";

// function StartStop(props) {




// const [isLoading, setIsLoading] = useState(true)

//  const [startInd, setStartInd] = useState(props.attendanceByList.startInd);

//   const handleClick = () => {
//     if (startInd) {
//       setStartInd(startInd);
//       let data={
//         userId: props.userId,
//         startInd:false,
//       }
//       props.addAttendence(data,props.userId);
//       console.log('startInd=false');
//     } else {
//       setStartInd(startInd);
//       let data={
//         userId: props.userId,
//         startInd:true,
//       }
//       props.addAttendence(data,props.userId);
//       console.log('startInd=true');
//     }
//   };
//   useEffect(() => {
//     props.getAttendanceList(props.userId);
//  }, [props.userId]);
//   useEffect(() => {
    
//     if (props.attendanceByList.startInd) {
//       setStartInd(props.attendanceByList.startInd);
//       setIsLoading(false);
//     }
//   }, [props.attendanceByList.startInd]);
// //  useEffect(() => {

// // }, [props.attendanceByList]);
// //   const [state, setState] = useState(props.attendanceByList);



//   // const toggle = () => {
//   //   if (state) {

//   //     let data = {
//   //       userId: props.userId,
//   //       startInd: false, 
//   //     };
//   //     props.addAttendence(data,props.userId);
//   //   } else {

//   //     let data = {
//   //       userId: props.userId,
//   //       startInd: true, 
//   //     };
//   //     props.addAttendence(data,props.userId);
//   //   }

//   //   setState(!state);
//   // };
//   // if (isLoading) {
//   //   return <BundleLoader/>;
//   // }
//   console.log("startInd",startInd)
//   return (
//     <div>
//       {/* <Popconfirm
//         title="Are you sure you want to start/stop?"
//         onConfirm={toggle}
//         onCancel={toggle} // Add onCancel handler to handle the cancel action
//         okText="Yes"
//         cancelText="No"
//       > */}
//        <button onClick={handleClick}>
//         {startInd ? 'Stop' : 'Start'}
//       </button>
//       {/* </Popconfirm> */}
//     </div>
//   );
// }

// const mapStateToProps = ({ customer, auth }) => ({
//   userId: auth.userDetails.userId,
//   attendanceByList:customer.attendanceByList,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addAttendence,
//        getAttendanceList
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(StartStop);


// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import StopwatchDisplay from "./StopwatchDisplay";
// // import StopwatchHistory from './StopwatchHistory';

// // class Stopwatch extends React.Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       running: false,
// //       currentTimeMs: 0,
// //       currentTimeSec: 0,
// //       currentTimeMin: 0,
// //     };
// //   }

// //   formatTime = (val, ...rest) => {
// //     let value = val.toString();
// //     if (value.length < 2) {
// //       value = '0' + value;
// //     }
// //     if (rest[0] === 'ms' && value.length < 3) {
// //       value = '0' + value;
// //     }
// //     return value;
// //   };

// //   start = () => {
// //     if (!this.state.running) {
// //       this.setState({ running: true });
// //       this.watch = setInterval(() => this.pace(), 10);
// //     }
// //   };

// //   stop = () => {
// //     this.setState({ running: false });
// //     clearInterval(this.watch);
// //   };

// //   pace = () => {
// //     this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
// //     if (this.state.currentTimeMs >= 1000) {
// //       this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
// //       this.setState({ currentTimeMs: 0 });
// //     }
// //     if (this.state.currentTimeSec >= 60) {
// //       this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
// //       this.setState({ currentTimeSec: 0 });
// //     }
// //   };

// //   reset = () => {
// //     this.setState({
// //       currentTimeMs: 0,
// //       currentTimeSec: 0,
// //       currentTimeMin: 0,
// //     });
// //   };

// //   render() {
// //     return (
// //       <div className={'stopwatch'}>
// //         <h2 ref="header">Stopwatch</h2>
// //         {this.state.running === false && (
// //           <button onClick={this.start}>START</button>
// //         )}
// //         {this.state.running === true && (
// //           <button onClick={this.stop}>STOP</button>
// //         )}
// //         <button onClick={this.reset}>RESET</button>
// //         <StopwatchDisplay
// //           ref="display"
// //           {...this.state}
// //           formatTime={this.formatTime}
// //         />
// //         <StopwatchHistory {...this.state} formatTime={this.formatTime} />
// //       </div>
// //     );
// //   }
// // }

// // export default Stopwatch;


import { Button, DatePicker, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getCountries} from "../../Auth/AuthAction"
import {getCountry } from "../../../Containers/Settings/Category/Country/CountryAction"
import { addAttendence, getAttendanceList,addLocationDetails } from "../../Customer/CustomerAction";
import { BundleLoader } from "../../../Components/Placeholder";

function StartStop(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [startInd, setStartInd] = useState(false); 
const[drop1,setDrop1]=useState(props.attendanceByList.location); 
const[mandatorCountry,setmandatoryCountry]=useState(props.attendanceByList.country); 
const[country,setAllCountry]=useState(""); 
  console.log("Initial startInd:", startInd);
  console.log(drop1)


  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {

    if (date) {
      setSelectedDate(date.format("YYYY-MM-DD"))
      console.log("Selected date:", date.format("YYYY-MM-DD"));
    } else {
      console.log("No date selected");
    }
    // setSelectedDate(date);
  };

  // const handleLogDate = () => {
  //   if (selectedDate) {
  //     setSelectedDate(selectedDate.format("YYYY-MM-DD"))
  //     console.log("Selected date:", selectedDate.format("YYYY-MM-DD"));
  //   } else {
  //     console.log("No date selected");
  //   }
  // };



  const returnDate=`${selectedDate}T20:00:00Z`
  console.log(returnDate)

  // const handleClick = () => {
  //   if (startInd) {
  //     let data = {
  //       userId: props.userId,
  //       startInd: false,
  //     };
  //     props.addAttendence(data, props.userId);
  //   } else {
  //     let data = {
  //       userId: props.userId,
  //       startInd: true,
  //     };
  //     props.addAttendence(data, props.userId);
  //   }
  // };

  const handleClick = () => {
    const data = {
      userId: props.userId,
      startInd: !startInd, 
    };
    props.addAttendence(data, props.userId);
  };

  const handleDrop1=(event)=>{
    setDrop1(
    event.target.value
    )
  
  }

  const handleMandatoryCountry=(event)=>{
    setmandatoryCountry(
    event.target.value
    )
 
  }
  console.log(mandatorCountry)

  const handleAllCountry=(event)=>{
    setAllCountry(
    event.target.value
    )
  
  }


  const handleSubmit=()=>{
    let data={
      attendanceId:props.attendanceByList.attendanceId,
      country:mandatorCountry?mandatorCountry:null,
      location:drop1?drop1:null,
      other:country?country:null,
      returnDate:returnDate,
    }
    props.addLocationDetails(data)
  }


  



useEffect(() => {
  const fetchData = async () => {
    try {
     
      await props.getAttendanceList(props.userId);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); 
    }
  };

  fetchData(); 
}, [props.userId]);

// ...
useEffect(()=>{
  props.getCountries()
  props.getCountry()
},[])


  useEffect(() => {
    
    if (props.attendanceByList.startInd !== undefined&&props.attendanceByList.location !== undefined&&props.attendanceByList.country !== undefined) {
      setStartInd(props.attendanceByList.startInd);
      setDrop1(props.attendanceByList.location);
      setmandatoryCountry(props.attendanceByList.country)
      // setDrop1(props.attendanceByList.location)
    }
  }, [props.attendanceByList.startInd]);

  if (isLoading) {
    return <BundleLoader />;
  }

  return (
    <div style={{display:"flex"}}>
        {/* <Popconfirm
        title="Are you sure you want to start/stop?"
       onConfirm={handleClick}
        onCancel={handleClick} // Add onCancel handler to handle the cancel action
       okText="Yes"
     cancelText="No"
     >

      <button >
       {startInd ? 'Stop' : 'Start'}
      </button>
     </Popconfirm> */}
      {/* <Popconfirm
        title="Are you sure you want to start/stop?"
       onConfirm={handleClick}
        onCancel={handleClick} // Add onCancel handler to handle the cancel action
       okText="Yes"
     cancelText="No"
     > */}
     <div>
       <Button 
        type="primary"
       style={{backgroundColor:!startInd?"#77dd77" : "#ff7158bf"}} onClick={handleClick}>
        {!startInd ? "Start" : "Stop"}
      </Button>
      </div>
      {/* </Popconfirm> */}
      <div class="ml-[22px] mt-[0.2rem]">
      <select
      value={drop1}
      onChange={handleDrop1}
      disabled={!startInd}
      style={{border:"0.5px solid lightgray ",height:"1.59rem"}}
      >
         {/* <option value="">Select</option> */}
        <option value="In Office">In Office</option>
        <option value="On Travel">On Travel</option>
        <option value="Remote">Remote</option>
      </select>
      
      </div>

      {drop1==="On Travel" ?  
     <div class="mt-[0.2rem]" style={{marginLeft:"11px"}}>
     <DatePicker onChange={handleDateChange}/>
      </div>:null
     }
     {drop1==="On Travel" ?  
     <div class="mt-[0.2rem]" style={{marginLeft:"11px"}}>
      <select
       style={{border:"0.5px solid lightgray"}}
        value={mandatorCountry}
onChange={handleMandatoryCountry}
      >
         <option value="">Select Country</option>
         <option value="Others">Others</option>
        {props.countries.map((item)=>{
          return(
           
 <option value={item.country_name}>{item.country_name}</option>
          )
        })}
       
       
      </select>
      </div>:null
     }
    
{mandatorCountry==="Others"? 
<div style={{marginLeft:"11px"}}>
      <select
       style={{border:"2px solid black"}}
       onChange={handleAllCountry}
      >
          <option value="">Select other country</option>
        {props.country.map((item)=>{
          return(
          <option value={item.country_name}>{item.country_name}</option>
          )
        })}
        
        
      </select>
      </div>:null
}

<div>
  <Button onClick={handleSubmit}>Submit</Button>
</div>
     
    </div>
   
  );
}

const mapStateToProps = ({ customer, auth,countrys }) => ({
  userId: auth.userDetails.userId,
  attendanceByList: customer.attendanceByList,
  countries:auth.countries,
  country: countrys.country,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addAttendence,
      getAttendanceList,
      getCountries,
      getCountry,
      addLocationDetails
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StartStop);
