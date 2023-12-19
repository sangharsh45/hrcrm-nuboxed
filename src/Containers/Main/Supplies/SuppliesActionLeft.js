import React from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {  AppstoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip,Badge } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import { getSuppliesCount } from "./SuppliesAction";
class SuppliesActionLeft extends React.Component {
   
    componentDidMount(){
        this.props.getSuppliesCount();
    }
    render() {
        const {
            viewType,
            setSuppliesViewType,
            suppliesCount,
        } = this.props;

        return (
            <FlexContainer alignItems="center">


                <Tooltip title="All Materials">
                <Badge
        size="small"
        count={(viewType === "all" && suppliesCount.count) || 0}
        overflowCount={999}
      >
                    <TocIcon
                        style={{
                            fontSize: "1.4rem",
                            color: viewType === "all" && "#1890ff",
                        }}
                        // iconType="appstore-o"
                        // tooltipTitle="Supplies Library"
                        onClick={() => setSuppliesViewType("all")}
                    />
                       </Badge>
                </Tooltip>

                <Tooltip title="Deleted Materials">
                <Badge
        size="small"
        // count={(props.viewType === "card" && props.pitchCount.InvestorLeadsDetails) || 0}
        
        overflowCount={999}
      >
                                        <DeleteOutlined
                        style={{
                            marginRight: "0.5rem",
                            color: viewType === "dashboard" && "red",
                        }}
                        // iconType="book"
                        // tooltipTitle="All"
                        onClick={() => setSuppliesViewType("dashboard")}
                    />
                       </Badge>
                </Tooltip>

            </FlexContainer>
        );
    }
}
const mapStateToProps = ({supplies }) => ({
    suppliesCount:supplies.suppliesCount
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSuppliesCount
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesActionLeft);
