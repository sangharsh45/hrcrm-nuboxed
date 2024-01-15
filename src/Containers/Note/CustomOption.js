import React, { Component } from "react";
import { EditorState, Modifier } from "draft-js";
import PropTypes from "prop-types";
import { Select } from "antd";
const { Option } = Select;
const data = [
    { lable: "First_Name", value: "First_Name" },
    { lable: "Last_Name", value: "Last_Name" },
    { lable: "Lead_Info", value: "Lead_Info" },
    { lable: "Opportunity_name", value: "Opportunity_name" },
    { lable: "Proposal_value", value: "Proposal_value" },
    { lable: "Currency", value: "Currency" },
    { lable: "Customer_Name", value: "Customer_Name" },
    { lable: "Task_Name", value: "Task_Name" },
    { lable: "Quotation_ID", value: "Quotation_ID" },
    { lable: "Quotation_Value", value: "Quotation_Value" },
    { lable: "Quotation_Creation_Date", value: "Quotation_Creation_Date" },
    { lable: "Quotation_For", value: "Quotation_For" },
    { lable: "Quotation_From", value: "Quotation_From" },
    { lable: "Quotation_Table", value: "Quotation_Table" },
    { lable: "Invoice_ID", value: "Invoice_ID" },
    { lable: "Purchase_Order", value: "Purchase_Order" },
    { lable: "Personal_Signature", value: "Personal_Signature" },
    { lable: "Organization_Signature", value: "Organization_Signature" },
];

const data1 = [
    { lable: "First_Name", value: "First_Name" },
    { lable: "Last_Name", value: "Last_Name" },
    { lable: "Opportunity_name", value: "Opportunity_name" },
    { lable: "Proposal_value", value: "Proposal_value" },
    { lable: "Currency", value: "Currency" },
    { lable: "Customer_Name", value: "Customer_Name" },
    { lable: "Task_Name", value: "Task_Name" },
    { lable: "Personal_Signature", value: "Personal_Signature" },
    { lable: "Organization_Signature", value: "Organization_Signature" },
];
const data2 = [
    { lable: "First_Name", value: "First_Name" },
    { lable: "Last_Name", value: "Last_Name" },
    { lable: "Opportunity_name", value: "Opportunity_name" },
    { lable: "Proposal_value", value: "Proposal_value" },
    { lable: "Currency", value: "Currency" },
    { lable: "Customer_Name", value: "Customer_Name" },
    { lable: "Task_Name", value: "Task_Name" },
    { lable: "Personal_Signature", value: "Personal_Signature" },
];
const data3 = [
    { lable: "First_Name", value: "First_Name" },
    { lable: "Last_Name", value: "Last_Name" },
    { lable: "Opportunity_name", value: "Opportunity_name" },
    { lable: "Proposal_value", value: "Proposal_value" },
    { lable: "Currency", value: "Currency" },
    { lable: "Customer_Name", value: "Customer_Name" },
    { lable: "Task_Name", value: "Task_Name" },

    { lable: "Organization_Signature", value: "Organization_Signature" },
];
class CustomOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedData: "",
        };
    }
    static propTypes = {
        onChange: PropTypes.func,
        editorState: PropTypes.object,
    };

    handleChange = () => {
        const { editorState, onChange } = this.props;
        console.log("inside function...............");


        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            "⭐",
            editorState.getCurrentInlineStyle()
        );

        onChange(EditorState.push(editorState, contentState, "insert-characters"));
    };

    render() {
        // console.log(this.props.signatureInd);
        // const personal = this.props.signatureInd.personal_ind;
        // console.log(personal);
        // const admin = this.props.signatureInd.admin_ind;
        // console.log(admin);
        return (
            <>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.31em",
                    }}
                >
                    {/* <div style={{ margin: "0px 0px", fontWeight: "bold" }}>Tag</div> */}
                    <div onClick={this.handleChange}>⭐</div>

                </div>
            </>
        );
    }
}
export default CustomOption;
