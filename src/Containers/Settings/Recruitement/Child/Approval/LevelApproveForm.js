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
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { FormattedMessage } from "react-intl";
import { Field } from "formik";
const { Option } = Select;
function LevelApproveForm(props) {
    useEffect(() => {
        props.getDepartments();
    }, [])
    const selectedDepartment = props.departments;
    const [rows, setRows] = useState([
        { level: "",  id: 1 },
      ]);
      const [id, setId] = useState(1);
      
      
    const [row, setRow] = useState([{ value1: "", id: 1 }]);
    // const [id, setId] = useState(1);
    const [level, setLevel] = useState(1);
    const [threshold, setThreshold] = useState(1);

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
    //         { subProcessName: "Leave" },
    //     );
    //     console.log(data);
    //      props.addApprove(data);
    // };
    function buttonOnClick() {
        const data = {
          levelCount: rows.length,
          levels: rows.map((row, i) => ({ level: row.level,})),
          // thresholds: rows.map((row, i) => ({ [`threshold${i + 1}`]: row.threshold })),
          approvalIndicator: props.approvalIndicator,
          approvalType: props.approvalType,
          subProcessName: "Leave",
        };
      
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
    // function handleChangeValue(value, a) {
    //     setRows((v) => {
    //         return v.map((d) => {
    //             if (`${d.id}_value` === a) {
    //                 return { ...d, value: value };
    //             } else {
    //                 return d;
    //             }
    //         });
    //     });
    // }
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
                            <div  >
                            <div style={{ width: "100%", display: "flex", fontWeight: "bold", }}>
                                <div style={{ width: "16%" }}>
                                    <p>{`Level ${i + 1}`}</p>
                                </div>
                                <div style={{ width: "47%" }}>
                                    <Select
                                       name={`level_${row.id}`}
                                       value={row.level}
                                        // name={`${row.id}_value`}
                                        // value={`${row.value}`}
                                        onChange={(value) => handleChangeValue(value, row.id)}
                                        // onChange={(value) =>
                                        //     handleChangeValue(value, `${row.id}_value`)
                                        // }
                                    >
                                        <option value="ReportingManager">Reporting Manager</option>
                                        <option value="ReportingManager1">Reporting Manager1</option>
                                        <option value="Management">Management</option>
                                        {/* {props.departments.map((a) => {
                                            return <Option value={a.departmentId}>{a.departmentName}</Option>;
                                        })} */}
                                    </Select>
                                </div>
                                {rows.length > 1 && (row.id + 1 > row.id) ? (
                                    <CloseOutlined onClick={() => handleDelete(row)} />
                                ) : null}


                            </div>
               
                            </div>
                           
                        );
                    })}
                    <div class=" justify-end" >
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


const mapStateToProps = ({ settings, departments }) => ({
    departments:departments.departments,
    approvalData: settings.approvalData,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDepartments,
        addApprove,
        getApproveData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LevelApproveForm);
