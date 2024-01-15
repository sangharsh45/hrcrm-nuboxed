import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer} from "../../../Components/UI/Antd";
import UpdateSuppliesForm from "./UpdateSuppliesForm";


class UpdateSuppliesFormDrawer extends Component {
    render() {
        const { updateSuppliesDrawer, handleUpdateSupplieDrawer,particularDiscountData } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Update Material"
                    width="60%"                   
                    visible={updateSuppliesDrawer}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{marginTop:"3rem" }}
                    onClose={() => handleUpdateSupplieDrawer(false)}
                    footer={null}
                >
                    <UpdateSuppliesForm particularDiscountData={particularDiscountData}/>

                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSuppliesFormDrawer);
