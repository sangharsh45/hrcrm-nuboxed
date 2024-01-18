

import React, {  PureComponent, Suspense,lazy  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import {getCountries} from "../../../Auth/AuthAction"
const LeadsForm = lazy(() => import("./LeadsForm"));


const TabPane = StyledTabs.TabPane;
class LeadsTab extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {}
        }
    }

    componentDidMount() {
        this.props.getCountries()
    }

    handleOnClick = (data) => {
        console.log(data);
        debugger;
        this.setState({
            departmentData: data,
        });

    };
    render() {
        const { countries } = this.props;
        return (
            <>
                <TabsWrapper>
                    <StyledTabs type="card">
                        {countries.map((member, i) => {
                            return (
                                <TabPane
                                    key={i}
                                    tab={
                                        <span onClick={() => this.handleOnClick(member)}>
                                            {member.country_name}
                                        </span>
                                    }
                                >
                                    {this.state.departmentData.country_id && (
                                        <Suspense fallback={"Loading..."}>
                                            <LeadsForm 
                                    countryId={this.state.departmentData.country_id}
                                    
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
  countries: auth.countries,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
      getCountries
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTab);













