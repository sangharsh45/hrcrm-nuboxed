

import React, { PureComponent,lazy, Suspense, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { getDepartmentList } from "../../../SettingsAction"
const DepartmentRole = lazy(() => import("./DepartmentRole"));

const TabPane = StyledTabs.TabPane;
class Access extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {}
        }
    }

    componentDidMount() {
        this.props.getDepartmentList()
    }

    handleOnClick = (data) => {
        console.log(data);
        debugger;
        this.setState({
            departmentData: data,
        });

    };
    render() {
        const { departmentList } = this.props;
        console.log(this.state.departmentData.departmentId)
        return (
            <>
                <TabsWrapper style={{height:"100vh",overflowY: "scroll", }}>
                    <StyledTabs type="card">
                        {departmentList.map((member, i) => {
                            return (
                                <TabPane
                                    key={i}
                                    tab={
                                        <span onClick={() => this.handleOnClick(member)}>
                                            {member.departmentName}
                                        </span>
                               
                                    }
                                    
                                >

                                    {this.state.departmentData.departmentId && (
                                        <Suspense fallback={"Loading..."}>
                                            <DepartmentRole 
                                     departmentId={this.state.departmentData.departmentId} 
                                                />
                                            {/* <AccessForm 
                                            departmentId={this.state.departmentData.departmentId} 
                                            /> */}
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
    departmentList: settings.departmentList,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDepartmentList
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Access);













