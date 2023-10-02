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
    const [rows, setRows] = useState([{ value: "", id: 1 }]);
    const [id, setId] = useState(1);
    const [level, setLevel] = useState(1);


    function buttonOnClick() {
        var mapped = rows.map((item, i) => ({ [`level${i + 1}`]: item.value }));
        var data = Object.assign(
            {},
            ...mapped,
            { levelCount: level },
            { approvalIndicator: props.approvalIndicator },
            { approvalType: props.approvalType },
            // { ammendmentInd: props.ammendmentInd },
            // { processName: "BOQ" },
            { subProcessName: "Expense" },
        );
        console.log(data);
         props.addApprove(data);
    };
    //     approvalIndicator: true
    // approvalType: "Exception"
    // designationId: "DDG49470159634152021"
    // functionId: "FDG18460358639152021"
    // jobLevel: "3"
    // processName: "BOQ"
    // reportingTo: ""
    // subProcessName: "BOQApprove"
    // threshold: ""
    function handleChangeValue(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, value: value };
                } else {
                    return d;
                }
            });
        });
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
                            <div>
                            <div style={{ width: "100%", display: "flex", fontWeight: "bold" }}>
                                <div style={{ width: "16%" }}>
                                    <p>{`Level ${i + 1}`}</p>
                                </div>
                                <div style={{ width: "47%" }}>
                                    <Select
                                        name={`${row.id}_value`}
                                        value={`${row.value}`}
                                        onChange={(value) =>
                                            handleChangeValue(value, `${row.id}_value`)
                                        }
                                    // placeholder={`select`}
                                    >
                                        {props.departments.map((a) => {
                                            return <Option value={a.departmentId}>{a.departmentName}</Option>;
                                        })}
                                    </Select>
                                </div>
                                {rows.length > 1 && (row.id + 1 > row.id) ? (
                                    <CloseOutlined onClick={() => handleDelete(row)} />
                                ) : null}
                            </div>
                                         
                                         <div class=" w-full flex font-bold mt-4" > 
                                         <div style={{ width: "16%" }}>
                                                 <p>Name</p>
                                             </div>
                                             <div style={{ width: "47%" }}>
                                         <Field
                               isRequired
                               name="name"
                               type="text"
                               isColumn
                               width={"100%"}
                               component={InputComponent}
                               // accounts={accounts}
                               inlineLabel
                             />
                             </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseLevelApproveForm);
