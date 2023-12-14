import React, { } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    convertCustomerStatus,
    getLeads,
    handleLeadsConfirmationModal    
} from "../../LeadsAction";



function CustomerStatusToggle(props) {
    const [toggle, setToggle] = React.useState(props.convertInd)

    // function handleToggleCollection(item) {
    //     if (props.convertInd) {
    //         props.convertCustomerStatus(
    //             {
    //                 leadsId: props.leadsId,
    //                 userId: props.userId,
    //                 convertInd: props.convertInd ? false : true,
    //             },
    //             props.leadsId,
    //             props.userId,
    //         );
    //     } else {
    //         props.convertCustomerStatus(
    //             {
    //                 leadsId: props.leadsId,
    //                 userId: props.userId,
    //                 convertInd: props.convertInd ? false : true,
    //             },
    //             props.leadsId,
    //             props.userId,
    //         );
    //     }
    // }

    // function handleCancel() {
    //     if (props.convertInd) {
    //         setToggle(true);
    //     } else {
    //         setToggle(false);
    //     }
    // }
    return (
        <>
            <div>
                <Popconfirm
                    title="Qualify? Lead will move to Customer section!"
                    onConfirm={props.handleToggleCollection} 
                    // onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch className="toggle-clr"
                    // onChange={handleToggleCollection}
                    //   checked={props.convertInd || toggle}
                    //      isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
            {/* <AddConfirmLedsStatusModal
           rowdata={props.rowdata}
        //    handleRowData={handleRowData}
           addLeadsConfirmationModal={props.addLeadsConfirmationModal}
           handleLeadsConfirmationModal={props.handleLeadsConfirmationModal}
           /> */}
        </>
          
    );
}

const mapStateToProps = ({ auth,leads, provider }) => ({
    userId: auth.userDetails.userId,
    addLeadsConfirmationModal:leads.addLeadsConfirmationModal,
  
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            convertCustomerStatus,
            getLeads,
            handleLeadsConfirmationModal
            
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerStatusToggle);
