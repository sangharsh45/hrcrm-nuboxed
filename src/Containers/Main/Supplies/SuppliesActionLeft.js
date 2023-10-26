import React from "react";
import { ActionIcon } from "../../../Components/Utils";
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledRangePicker, StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AliyunOutlined, AppstoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const Option = StyledSelect.Option;

class SuppliesActionLeft extends React.Component {
    render() {
        const {
            viewType,
            setSuppliesViewType,

        } = this.props;

        return (
            <FlexContainer alignItems="center">


                <Tooltip title="All Materials">
                    <AppstoreOutlined
                        style={{
                            marginRight: "0.3rem",
                            color: viewType === "all" && "#1890ff",
                        }}
                        // iconType="appstore-o"
                        // tooltipTitle="Supplies Library"
                        onClick={() => setSuppliesViewType("all")}
                    />
                </Tooltip>

                <Tooltip title="Deleted Materials">
                    <DeleteOutlined
                        style={{
                            marginRight: "0.5rem",
                            color: viewType === "dashboard" && "red",
                        }}
                        // iconType="book"
                        // tooltipTitle="All"
                        onClick={() => setSuppliesViewType("dashboard")}
                    />
                </Tooltip>

            </FlexContainer>
        );
    }
}
const mapStateToProps = ({ }) => ({

});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesActionLeft);
