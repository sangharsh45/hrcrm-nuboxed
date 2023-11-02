import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getDepartments } from "../../../Department/DepartmentAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { 
    addApprove, 
    getApproveData
 } from "../../../SettingsAction";
import { BundleLoader } from "../../../../../Components/Placeholder";
const { Option } = Select;
function ExpenseLevelApproveForm(props) {
    useEffect(() => {
        props.getDepartments();
    }, [])
    // const [rows, setRows] = useState([
    //     { level: "", threshold: "", id: 1 },
    //   ]);
    const [rows, setRows] = useState(props.approvalData.level || []);
    const [isLoading, setIsLoading] = useState(true)
      const [id, setId] = useState(1);
    const [level, setLevel] = useState(1);
    useEffect(() => {
      // Once approvalData.level is available, set rows and update isLoading
      if (props.approvalData.level) {
        setRows(props.approvalData.level);
        setIsLoading(false);
      }
    }, [props.approvalData.level]);


    // function buttonOnClick() {
    //     var mapped = rows.map((item, i) => ({ [`level${i + 1}`]: item.value }));
    //     var data = Object.assign(
    //         {},
    //         ...mapped,
    //         { levelCount: level },
    //         { approvalIndicator: props.approvalIndicator },
    //         { approvalType: props.approvalType },
    //         // { ammendmentInd: props.ammendmentInd },
    //         // { processName: "BOQ" },
    //         { subProcessName: "Expense" },
    //     );
    //     console.log(data);
    //      props.addApprove(data);
    // };
    // function buttonOnClick() {
    //     const data = {
    //       levelCount: rows.length,
    //       approvalIndicator: props.approvalIndicator,
    //       approvalType: props.approvalType,
    //       subProcessName: "Expense",
    //       userId:props.userId,
    //     };
      
    //     rows.forEach((row, i) => {
    //       data[`level${i + 1}`] = row.level;
    //       data[`threshold${i + 1}`] = row.threshold;
    //     });
      
    //     console.log(data);
    //     props.addApprove(data);
    //   }
    function buttonOnClick() {
      const data = {
        levelCount: rows.length,
        level: rows.map((row, i) => ({ level: row.level,threshold: row.threshold })),
        // thresholds: rows.map((row, i) => ({ [`threshold${i + 1}`]: row.threshold })),
        approvalIndicator: props.approvalIndicator,
        approvalType: props.approvalType,
        subProcessName: "Expense",
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
    if (isLoading) {
      return <BundleLoader />;
    }
    console.log(rows);
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
                    <option value="ReportingManager+1">Reporting Manager +1</option>
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
                     <div class=" flex justify-end">
                  
                  <div className="button">
                      <Button type="primary" onClick={handleAddRowClick}>
                          Add Level
                      </Button>
                  
              </div>
            
              <div className="button">
                  <Button
                      type="primary"
                   
                      onClick={() => buttonOnClick()}
                  >
                      Submit
                  </Button>
                  </div>
           
              </div>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = ({ settings,auth, departments }) => ({
    departments:departments.departments,
    approvalData: settings.approvalData,
    userId:auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDepartments,
        addApprove,
        getApproveData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseLevelApproveForm);
