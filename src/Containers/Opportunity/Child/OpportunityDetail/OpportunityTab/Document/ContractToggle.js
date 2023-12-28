import React, { } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getOpportunityDocument,linkOpportunityContract} from "../../../../OpportunityAction";

function ContractToggle(props) {

    const [toggle, setToggle] = React.useState(props.contractInd)

    function handleToggleCollection(item) {
        // setPaymentCollection(!paymentCollection);
        if (props.contractInd) {
            props.linkOpportunityContract(
                {
                    documentId: props.documentId,
                   // userId: props.userId,
                    // status: true,
                    contractInd: props.contractInd ? false : true,
                },
                props.documentId,
                props.opportunityId,
               // props.userId,
                //  handleCallbackFalse
            );
        } else {
            props.linkOpportunityContract(
                {
                    documentId: props.documentId,
                   // userId: props.userId,
                    // status: true,
                    contractInd: props.contractInd ? false : true,
                },
                props.documentId,
                props.opportunityId,
                //  handleCallback
            );
        }
    }

    function handleCancel() {
        if (props.contractInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }
    return (
        <>
            <div>
                <Popconfirm
                    title="Confirm status change?"
                    onConfirm={() => handleToggleCollection()}
                    onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    
                    <Switch className="toggle-clr"
                        checked={props.contractInd || toggle}
                        // disabled={props.status}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                     
                    />
                   
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ opportunity  }) => ({
    documentsByOpportunityId: opportunity.documentsByOpportunityId,
  opportunityId: opportunity.opportunity.opportunityId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOpportunityDocument,
            linkOpportunityContract,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ContractToggle);
