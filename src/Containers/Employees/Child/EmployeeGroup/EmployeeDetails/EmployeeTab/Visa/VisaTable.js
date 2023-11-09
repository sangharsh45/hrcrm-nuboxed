import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from "@mui/icons-material/Delete";
import {getVisaDetails,
  deleteVisa,
  handleUpdateVisaModal,
  setEditVisa
} from "../../../../../../Profile/ProfileAction"
import DownloadIcon from "@mui/icons-material/Download";
import { base_url } from "../../../../../../../Config/Auth";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import moment from "moment";
import UpdateVisaModal from "./UpdateVisaModal";

class VisaTable extends Component {
  componentDidMount() {
    // debugger;
    const { getVisaDetails, userId } = this.props;
    // console.log(employeeId);
    if (userId) {
      getVisaDetails(userId);
    }
  }

  render() {
    console.log(this.props.userId);
    const {
      visaDetails,
      fetchingVisaDetails,
      fetchingVisaDetailsError,
      handleUpdateVisaModal,
      updateVisaModal,
      singleEmployee,
      user,
      setEditVisa,
      employeeId,
      deleteVisa,
    } = this.props;
    console.log(employeeId);

    const columns = [
 
      {
        //title: "Course Name",
        title: (
          <span className="font-poppins">
          <FormattedMessage id="app.country" defaultMessage="Country" />
          </span>
        ),
        dataIndex: "country",
      
      },
      {
        //title: "Year of Passing",
        title: (
          <span className="font-poppins">
          <FormattedMessage
            id="app.type"
            defaultMessage="Type"
          />
           </span>
        ),
        dataIndex: "type",
     
      },
  
   
    {
      //title: "Start Date",
      title: <FormattedMessage
        id="app.startDate"
        defaultMessage="Start Date"
      />,
      dataIndex: "startDate",
      render: (name, item, i) => {
        return <span>{moment.utc(item.startDate).format("LL")}</span>;
      },
    },
    {
      //title: "End Date",
      title: <FormattedMessage
        id="app.endDate"
        defaultMessage="End Date"
      />,
      dataIndex: "endDate",
      render: (name, item, i) => {
        return <span>{moment(item.endDate).format("LL")}</span>;
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        return (
          <>
            {/* {item.documentId ? ( */}
              <a
                href={`${base_url}/document/${item.documentId}`}
                target="_blank"
              >
                {user.userAccessInd === true ? (
                <DownloadIcon
                  type="download"
                  // onClick={() => startDownload()}
                  style={{ cursor: "pointer",fontSize: "0.8rem" }}
                />
                ):null}
              </a>
            {/* ) : null} */}
          </>
        );
      },
    },
      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          return (
            <BorderColorIcon
              style={{ cursor: "pointer", fontSize: "0.8rem" }}
              onClick={() => {
                setEditVisa(item);
                handleUpdateVisaModal(true);
              }}
            />
          );
        },
      },
      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deleteVisa(item.visaId)}
            >
              <DeleteIcon
                type="delete"
                style={{ cursor: "pointer", fontSize: "0.8rem", color: "red" }}
              />
            </StyledPopconfirm>
          );
        },
      },
    ];

    // if (fetchingEducationDetailsError) {
    //   return <APIFailed />;
    // }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={visaDetails}
          loading={fetchingVisaDetails || fetchingVisaDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.courseType || ""}</p>
                <p>{record.specialization || ""}</p>
              </>
            );
          }}
        />
 <UpdateVisaModal
          updateVisaModal={updateVisaModal}
          handleUpdateVisaModal={handleUpdateVisaModal}
        />
     
      </>
    );
  }
}

const mapStateToProps = ({ profile,auth, employee }) => ({
  visaDetails:profile.visaDetails,
  userId:auth.userDetails.userId,
  user:auth.userDetails,
  updateVisaModal:profile.updateVisaModal,
  fetchingVisaDetails:profile.fetchingVisaDetails,
  fetchingVisaDetailsError:profile.fetchingVisaDetailsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getVisaDetails,
      deleteVisa,
      handleUpdateVisaModal,
      setEditVisa
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(VisaTable);
