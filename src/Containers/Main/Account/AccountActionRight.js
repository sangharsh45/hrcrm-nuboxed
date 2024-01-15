import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Icon, Tooltip } from "antd";

class AccountActionRight extends React.Component {
    render() {
        const { handleDistributorModal, viewType,user } = this.props;
        return (
            <FlexContainer alignItems="center">
                {viewType === "list" ? (
                    <Tooltip title="Create">
                        {user.accountCreateInd === true && user.erpInd === true &&(
                        <Button
                            type="primary"  onClick={() => handleDistributorModal(true)}>
                            Add {/* <PlusOutlined /> */}
                        </Button>
                        )}
                    </Tooltip>
                ) : null}
            </FlexContainer>
        );
    }
}

const mapStateToProps = ({auth }) => ({
    user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountActionRight);
