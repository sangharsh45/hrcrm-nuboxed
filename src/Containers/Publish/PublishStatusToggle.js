import React, { useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkPublishStatus } from "../Publish/PublishAction";

function PublishStatusToggle(props) {

    const [toggle, setToggle] = React.useState(props.pingInd)

    function handleTogglePublish(item) {
        if (props.pingInd) {
            props.linkPublishStatus(
                {
                   
                pingInd: props.pingInd ? false : true,
                },
                 props.recruitmentId,
            );
        } else {
            props.linkPublishStatus(
              
                {
                    
                 
                  pingInd: props.pingInd ? false : true,
                },
                 props.recruitmentId,
            );
        }
    }

    function handleCancel() {
        if (props.pingInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }
    return (
        <> 
        {/* {props.thirdPartyAccessInd==="false"&& */}
             <div>
                <Popconfirm
                    title="Confirm status change?"
            onConfirm={() => handleTogglePublish()}
                   onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch
                     checked={props.pingInd || toggle}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div> 
{/* } */}
        </>
    );
}

const mapStateToProps = ({ auth,customer }) => ({

});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    linkPublishStatus
  },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(PublishStatusToggle);
