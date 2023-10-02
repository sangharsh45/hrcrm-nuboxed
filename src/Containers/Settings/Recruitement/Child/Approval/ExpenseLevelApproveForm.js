import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
// import "antd/dist/antd.css";
import { CloseOutlined } from "@ant-design/icons";
import { getDepartments } from "../../../Department/DepartmentAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { FlexContainer } from "../../../../../Components/UI/Elements";
import { 
    addApprove, 
    getApproveData
 } from "../../../SettingsAction";
import { Field } from "formik";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
const { Option } = Select;
function ExpenseLevelApproveForm(props) {
    useEffect(() => {
        props.getDepartments();
    }, [])
    const [rows, setRows] = useState([
        { level: "", threshold: "", id: 1 },
      ]);
      const [id, setId] = useState(1);
    const [level, setLevel] = useState(1);


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
    function buttonOnClick() {
        const data = {
          levelCount: rows.length,
          approvalIndicator: props.approvalIndicator,
          approvalType: props.approvalType,
          subProcessName: "Mileage",
          userId:props.userId,
        };
      
        rows.forEach((row, i) => {
          data[`level${i + 1}`] = row.level;
          data[`threshold${i + 1}`] = row.threshold;
        });
      
        console.log(data);
        props.addApprove(data);
      }
      function handleChangeValue(value, id) {
        setRows((prevRows) =>
          prevRows.map((row) => {
            if (row.id === id) {
              return { ...row, level: value };
            } else {
              return row;
            }
          })
        );
      }
      
      function handleChangeValue1(value, id) {
        setRows((prevRows) =>
          prevRows.map((row) => {
            if (row.id === id) {
              return { ...row, threshold: value };
            } else {
              return row;
            }
          })
        );
      }
      
    function handleAddRowClick() {
        setId((v) => v + 1);
        setLevel((v) => v + 1);
        setRows((v) => [...v, { value: "", id: id + 1 }]);

    }

    function handleDelete(row) {
        setRows((v) => v.filter((d) => d.id !== row.id));
        setLevel((v) => v - 1);
    }
    console.log(rows);
    return (
        <div>
            <div className="MainBox">
                <div className="InputBox">
                {rows.map((row, i) => {
  return (
    <div key={row.id}>
           <div className="w-full flex font-bold mt-4">
           <div class=" w-20">
          <p>{`Level ${i + 1}`}</p>
        </div>
        <div style={{ width: "47%" }}>
          <Select
            name={`level_${row.id}`}
            value={row.level}
            onChange={(value) => handleChangeValue(value, row.id)}
          >
            {props.departments.map((a) => {
              return (
                <Option key={a.departmentId} value={a.departmentId}>
                  {a.departmentName}
                </Option>
              );
            })}
          </Select>
        </div>
        <div class=" w-24 ml-4">
          <p>Threshold </p>
        </div>
        <div style={{ width: "47%" }}>
          <input
            style={{ border: "2px solid black" }}
            type="number"
            value={row.threshold}
            onChange={(e) => handleChangeValue1(e.target.value, row.id)}
          />
        </div>
        {rows.length > 1 ? (
          <CloseOutlined onClick={() => handleDelete(row)} />
        ) : null}
      </div>

  
    </div>
  );
})}
                    <div class=" flex justify-end" >
                        <div className="button">
                            <Button type="primary" onClick={handleAddRowClick}>
                                Add Level
                            </Button>
                        </div>
                    </div>
                    <div class=" justify-end" 
                        style={{ marginLeft: "104%", marginTop: "52px" }}>
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
