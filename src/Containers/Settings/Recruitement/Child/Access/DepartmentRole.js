

import React, { Component, lazy, PureComponent, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { getDepartmentRoleData } from "../../../SettingsAction"
import AccessForm from "./AccessForm";

const TabPane = StyledTabs.TabPane;
class DepartmentRole extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {}
        }
    }

    componentDidMount() {
        this.props.getDepartmentRoleData(this.props.departmentId)
    }

    handleOnClick = (data) => {
        console.log(data);
        debugger;
        this.setState({
            departmentData: data,
        });

    };
    render() {
        const { departmentRoleData } = this.props;
        console.log(this.state.departmentData.roleTypeId)
        return (
            <>
                <TabsWrapper>
                    <StyledTabs type="card">
                        {departmentRoleData.map((member, i) => {
                            return (
                                <TabPane
                                    key={i}
                                    tab={
                                        <span onClick={() => this.handleOnClick(member)}>
                                            {member.roleType}
                                        </span>
                                    }
                                >
                                    {this.state.departmentData.roleTypeId && (
                                        <Suspense fallback={"Loading..."}>
                                          
                                            <AccessForm 
                                            departmentId={this.props.departmentId}
                                            departmentData={this.state.departmentData}
                                            roleTypeId={this.state.departmentData.roleTypeId} 

                                            />
                                        </Suspense>
                                    )}

                                </TabPane>
                            );
                        })}

                    </StyledTabs>
                </TabsWrapper>
            </>
        )
    }
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    departmentRoleData: settings.departmentRoleData,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDepartmentRoleData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentRole);













