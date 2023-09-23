import React, { useEffect } from "react";
import { Switch, Popconfirm, message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { putPartnerContactToggle ,getContactListByPartnerId} from "../../../../PartnerAction";

function PartnerContactActiveToggle(props) {

    const [toggle, setToggle] = React.useState(props.accessInd)

    function handleToggleCollection(item) {
        console.log("toggle",props.accessInd)
        if (props.accessInd) {
            props.putPartnerContactToggle(
                {
                accessInd: props.accessInd ? false : true,
                partnerId:props.partnerId
                },
                props.contactId,
                handleCallbackFalse
            );
        } else {
            props.putPartnerContactToggle(
              
                {
                accessInd: props.accessInd ? false : true, 
                partnerId:props.partnerId
                },
                props.contactId,
                handleCallback
            );
        }
    }

    function handleCancel() {
        if (props.accessInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }

    function handleCallback(a) {
        if (a === "success") {
            message.success("Vendor Portal access request in progress!");
            props.getContactListByPartnerId(props.partnerId);
        } else {
            message.error("something went wrong");
        }
    }

    function handleCallbackFalse(a) {
        if (a === "success") {
            message.success(" Vendor Portal access request is unsuccess!");
            props.getContactListByPartnerId(props.partnerId);
        } else {
            message.error("something went wrong");
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
                    <Switch
                        checked={toggle || props.accessInd}
                        disabled={props.user.partnerContactInd!=true||props.emailId===""}
                        //isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth,partner }) => ({
    puttingPartnerContcToggle: partner.puttingPartnerContcToggle,
    user: auth.userDetails,
    puttingPartnerContcToggleError:partner.puttingPartnerContcToggleError,

});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
      putPartnerContactToggle,
      getContactListByPartnerId
  },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(PartnerContactActiveToggle);
