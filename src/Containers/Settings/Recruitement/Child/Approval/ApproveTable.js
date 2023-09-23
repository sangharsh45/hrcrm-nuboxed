
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyledTable } from '../../../../../Components/UI/Antd'
// import { getMultiApprovalList } from "../../../Settings/SettingsAction"

const ApproveTable = (props) => {

  useEffect(() => {
    // props.getMultiApprovalList("BOQ", "BOQApprove")
  }, [])
  const column = [
    // {
    //   title: "Level",
    //   render: (text, item) => {
    //     return (

    //     )
    //   }
    // },

    {
      title: "",
      width: "3%"
    },

    {
      title: "Level",
      dataIndex: "level",
      width: "20%"
    },
    {
      title: "Department",
      dataIndex: "departmentName",
      width: "20%"
    },
    {
      title: "",
      width: "20%"
    },
  ]
  // console.log(props.multiApproval.length)

  return (
    <>
      <StyledTable
        columns={column}
        // dataSource={props.multiApproval}
        pagination={false}
      />

    </>
  )
}

const mapStateToProps = ({ settings }) => ({
  multiApproval: settings.multiApproval
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    // getMultiApprovalList
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ApproveTable);
