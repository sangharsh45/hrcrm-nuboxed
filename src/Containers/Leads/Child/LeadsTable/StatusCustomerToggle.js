import React, { Component } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    convertCustomerStatus,
    getLeads,
    
} from "../../LeadsAction";


function CustomerStatusToggle(props) {
    const [toggle, setToggle] = React.useState(props.convertInd)

    function handleToggleCollection(item) {
        if (props.convertInd) {
            props.convertCustomerStatus(
                {
                    leadsId: props.leadsId,
                    userId: props.userId,
                    convertInd: props.convertInd ? false : true,
                },
                props.leadsId,
                props.userId,
            );
        } else {
            props.convertCustomerStatus(
                {
                    leadsId: props.leadsId,
                    userId: props.userId,
                    convertInd: props.convertInd ? false : true,
                },
                props.leadsId,
                props.userId,
            );
        }
    }

    function handleCancel() {
        if (props.convertInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }
    return (
        <>
            <div>
                <Popconfirm
                    title="Qualify? Lead will move to Customer section!"
                    onConfirm={() => handleToggleCollection()}
                    onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch className="toggle-clr"
                      checked={props.convertInd || toggle}
                         isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
        
        </>
          
    );
}

const mapStateToProps = ({ auth,leads, provider }) => ({
    userId: auth.userDetails.userId,
  
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            convertCustomerStatus,
            getLeads,
            
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerStatusToggle);
