// import React, { useEffect, useState } from "react";
// import { Button, Select } from "antd";
// // import "antd/dist/antd.css";
// import { CloseOutlined } from "@ant-design/icons";
// import { getDepartments } from "../../../Department/DepartmentAction";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// // import { FlexContainer } from "../../../../../Components/UI/Elements";
// import { 
//     addApprove, 
//     getApproveData
//  } from "../../../SettingsAction";
// import { Field } from "formik";
// import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
// import { BundleLoader } from "../../../../../Components/Placeholder";
// const { Option } = Select;
// function MileageLevelApproveForm(props) {
//     useEffect(() => {
//         props.getDepartments();
//     }, [])
   
//     const selectedDepartment = props.departments;
//     const [rows, setRows] = useState(props.approvalData.level);
       
//     // [ { level:"", threshold: "", id: 1 }]
//       const [id, setId] = useState(1);
      
      
//     const [row, setRow] = useState([{ value1: "", id: 1 }]);
//     // const [id, setId] = useState(1);
//     const [level, setLevel] = useState(1);
//     const [threshold, setThreshold] = useState(1);
    

 
      
      
//     function buttonOnClick() {
//         const data = {
//           levelCount: rows.length,
//           level: rows.map((row, i) => ({ level: row.level,threshold: row.threshold })),
//           // thresholds: rows.map((row, i) => ({ [`threshold${i + 1}`]: row.threshold })),
//           approvalIndicator: props.approvalIndicator,
//           approvalType: props.approvalType,
//           subProcessName: "Mileage",
//         };
      
//         console.log(data);
//         props.addApprove(data);
//       }
      

//     function handleChangeValue(value, id) {
//         setRows((prevRows) =>
//           prevRows.map((row) => {
//             if (row.id === id) {
//               return { ...row, level: value };
//             } else {
//               return row;
//             }
//           })
//         );
//       }
      
//       function handleChangeValue1(value, id) {
//         setRows((prevRows) =>
//           prevRows.map((row) => {
//             if (row.id === id) {
//               return { ...row, threshold: value };
//             } else {
//               return row;
//             }
//           })
//         );
//       }
      
//     function handleAddRowClick() {
//         setId((v) => v + 1);
//         setLevel((v) => v + 1);
//         setRows((v) => [...v, { value: "", id: id + 1 }]);

//     }

//     function handleDelete(row) {
//         setRows((v) => v.filter((d) => d.id !== row.id));
//         setLevel((v) => v - 1);
//     }
//     console.log(rows);
//     // console.log("report",props.approvalData.level)
//     if (!props.approvalData.level) {
//       return <BundleLoader/>; 
//     }
//     return (
//         <div>
//             <div className="MainBox">
//                 <div className="InputBox">
//                 {rows.map((row, i) => {
//   return (
//     <div key={row.id}>
//            <div className="w-full flex font-bold mt-4">
//         <div class=" w-20">
//           <p>{`Level ${i + 1}`}</p>
//         </div>
//         <div style={{ width: "47%" }}>
//           <Select
//             name={`level_${row.id}`}
//             value={row.level}
          
//             onChange={(value) => handleChangeValue(value, row.id)}
//           >
//                <option value="ReportingManager">Reporting Manager</option>
//                                         <option value="ReportingManager1">Reporting Manager1</option>
//                                         <option value="Management">Management</option>
           
//           </Select>
//         </div>
     
//         <div class=" w-24 ml-4">
//           <p>Threshold </p>
//         </div>
//         <div style={{ width: "47%" }}>
//           <input
//             style={{ border: "2px solid black" }}
//             type="number"
//             value={row.threshold}
//             onChange={(e) => handleChangeValue1(e.target.value, row.id)}
//           />
//         </div>
//         {rows.length > 1 ? (
//           <CloseOutlined onClick={() => handleDelete(row)} />
//         ) : null}
//       </div>

//       {/* <div className="w-full flex font-bold mt-4">
      
//       </div> */}
//     </div>
//   );
// })}

// <div class=" flex justify-end" >
//                         <div className="button">
//                             <Button type="primary" onClick={handleAddRowClick}>
//                                 Add Level
//                             </Button>
//                         </div>
//                     </div>
//                     <div class=" justify-end" 
//                         style={{ marginLeft: "104%", marginTop: "52px" }}>
//                         <Button
//                             type="primary"
//                             style={{
//                                 marginRight: "-230px",
//                                 marginTop: "52px",
//                                 marginBottom: "5px",
//                             }}
//                             onClick={() => buttonOnClick()}
//                         >
//                             Submit
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// const mapStateToProps = ({ settings,auth, departments }) => ({
//     departments:departments.departments,
//     approvalData: settings.approvalData,
//     userId:auth.userDetails.userId,
//     // selectedDepartment: settings.selectedDepartment,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
//         getDepartments,
//         addApprove,
//         getApproveData
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(MileageLevelApproveForm);


import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getDepartments } from "../../../Department/DepartmentAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addApprove,
  getApproveData,
} from "../../../SettingsAction";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { BundleLoader } from "../../../../../Components/Placeholder";
const { Option } = Select;

function MileageLevelApproveForm(props) {
  useEffect(() => {
    props.getDepartments();
  }, []);

  const selectedDepartment = props.departments;
  const [rows, setRows] = useState(props.approvalData.level || []);
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
    // Once approvalData.level is available, set rows and update isLoading
    if (props.approvalData.level) {
      setRows(props.approvalData.level);
      setIsLoading(false);
    }
  }, [props.approvalData.level]);

  function buttonOnClick() {
    const data = {
      levelCount: rows.length,
      level: rows.map((row) => ({
        level: row.level,
        threshold: row.threshold,
      })),
      approvalIndicator: props.approvalIndicator,
      approvalType: props.approvalType,
      subProcessName: "Mileage",
    };

    console.log(data);
    props.addApprove(data);
  }

  function handleChangeValue(value, index) {
    setRows((prevRows) =>
      prevRows.map((row, i) => {
        if (i === index) {
          return { ...row, level: value };
        }
        return row;
      })
    );
  }

  function handleChangeValue1(value, index) {
    setRows((prevRows) =>
      prevRows.map((row, i) => {
        if (i === index) {
          return { ...row, threshold: value };
        }
        return row;
      })
    );
  }

  function handleAddRowClick() {
    const newRow = { level: "", threshold: "" };
    setRows((prevRows) => [...prevRows, newRow]);
  }

  function handleDelete(index) {
    setRows((prevRows) =>
      prevRows.filter((_, i) => i !== index)
    );
  }

  // if (!props.approvalData.level) {
  //   return <BundleLoader />;
  // }
  if (isLoading) {
    return <BundleLoader />;
  }

  return (
    <div>
      <div className="MainBox">
        <div className="InputBox">
          {rows.map((row, index) => (
            <div key={index}>
              <div className="w-full flex font-bold mt-4">
                <div className="w-20">
                  <p>{`Level ${index + 1}`}</p>
                </div>
                <div style={{ width: "47%" }}>
                  <Select
                    name={`level_${index}`}
                    value={row.level}
                    onChange={(value) => handleChangeValue(value, index)}
                  >
                    <option value="ReportingManager">Reporting Manager</option>
                    <option value="Management">Management</option>
                  </Select>
                </div>
                <div className="w-24 ml-4">
                  <p>Threshold</p>
                </div>
                <div style={{ width: "47%" }}>
                  <input
                    style={{ border: "2px solid black" }}
                    type="number"
                    value={row.threshold}
                    onChange={(e) =>
                      handleChangeValue1(e.target.value, index)
                    }
                  />
                </div>
                {rows.length > 1 ? (
                  <CloseOutlined onClick={() => handleDelete(index)} />
                ) : null}
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <div className="button">
              <Button type="primary" onClick={handleAddRowClick}>
                Add Level
              </Button>
            </div>
          </div>
          <div style={{ marginLeft: "104%", marginTop: "52px" }}>
            <Button
              type="primary"
              style={{
                marginRight: "-230px",
                marginTop: "52px",
                marginBottom: "5px",
              }}
              onClick={() => buttonOnClick()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ settings, auth, departments }) => ({
  departments: departments.departments,
  approvalData: settings.approvalData,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDepartments,
      addApprove,
      getApproveData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MileageLevelApproveForm);


