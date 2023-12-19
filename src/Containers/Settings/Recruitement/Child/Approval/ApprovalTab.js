import React, { } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ApproveForm from "./ApproveForm";
import MileageApproveForm from "./MileageApproveForm";
import ExpenseApproveForm from "./ExpenseApproveForm";
import ContactUserForm from "./ContactUserForm";
import PhonesPairApproveForm from "./PhonesPairApproveForm";


const TabPane = StyledTabs.TabPane;

function ApprovalTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Leaves`} key="1">
                        <div style={{ marginTop: 10 }}>
                        <ApproveForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Mileage`} key="2">
                        <div style={{ marginTop: 10 }}>
                        <MileageApproveForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Expense`} key="3">
                        <div style={{ marginTop: 10 }}>
                        <ExpenseApproveForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Contact User`} key="4">
                        <div style={{ marginTop: 10 }}>
                        <ContactUserForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Phones Pair`} key="5">
                        <div style={{ marginTop: 10 }}>
                        <PhonesPairApproveForm/>
                        </div>
                    </TabPane>
                    {/* <TabPane tab={`ApproveList`} key="4">
                        <div style={{ marginTop: 10 }}>
                            <ApproveTable/>
                        </div>
                    </TabPane> */}
                </StyledTabs>
            </TabsWrapper>
        </>
    );
}

const mapStateToProps = ({ settings, auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalTab);


