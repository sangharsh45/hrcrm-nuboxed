import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
} from "../../../../../../../Components/UI/Antd";
import {
  getContractDetails,
  handleUpdateContractModal,
  setEditContract,
} from "../../../../../../Profile/ProfileAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
import UpdateContractModal from "./UpdateContractModal";
class ContractTable extends Component {
  componentDidMount() {
    const { getContractDetails, employeeId } = this.props;
    getContractDetails(this.props.employeeId);
  }
  render() {
    const {
      fetchingContractDetails,
      fetchingContractDetailsError,
      contractDetails,
      handleUpdateContractModal,
      updateContractModal,
      setEditContract,
    } = this.props;

    const columns = [

      {
        title:"",
        width:"2%",
      },

      {
        title: <FormattedMessage
          id="app.startDate"
          defaultMessage="Start Date"
        />,
        dataIndex: "previous_start_date",
        render: (name, item, i) => {
          return <span>{dayjs(item.previous_start_date).format("DD/MM/YYYY")}</span>;
        },
      },
      {
        title: <FormattedMessage
          id="app.endDate"
          defaultMessage="End Date"
        />,
        dataIndex: "previous_end_date",
        render: (name, item, i) => {
          return <span>{dayjs(item.previous_end_date).format("DD/MM/YYYY")}</span>;
        },
      },

      {
        title: <FormattedMessage
          id="app.contractType"
          defaultMessage="Contract Type"
        />,
        dataIndex: "contract_Type",
      },
      {
        //title: "End Date",
        title: <FormattedMessage
          id="app.notes"
          defaultMessage="Notes"
        />,
        dataIndex: "notes",
      },

      {
        title: "",
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <BorderColorIcon style={{ fontSize: "0.8rem" }} 
              onClick={() => {
                setEditContract(item);
                handleUpdateContractModal(true);
              }}
            />
          );
        },
      },
    ];


    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={contractDetails}
          Loading={fetchingContractDetails || fetchingContractDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />
        <UpdateContractModal
          handleUpdateContractModal={handleUpdateContractModal}
          updateContractModal={updateContractModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  contractDetails: profile.contractDetails,
  fetchingContractDetails: profile.fetchingContractDetails,
  fetchingContractDetailsError: profile.fetchingContractDetailsError,
  updateContractModal: profile.updateContractModal,

  employeeId: employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContractDetails,
      handleUpdateContractModal,
      setEditContract,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContractTable);
