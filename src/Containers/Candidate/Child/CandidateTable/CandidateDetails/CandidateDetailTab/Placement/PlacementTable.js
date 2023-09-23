import React, { Component,useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import RecruitmentStages from "../../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentStages";
import { bindActionCreators } from "redux";
import PlacementDetails from "./PlacementDetails"
import {  Menu,Dropdown,Button,
  Progress,Tooltip,Input } from "antd";
  import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import moment from "moment";
import {
  StyledTable,
} from "../../../../../../../Components/UI/Antd";
import { Link } from "../../../../../../../Components/Common";
import {
   getPlacement,
} from "../../../../../CandidateAction";

import { elipsize } from "../../../../../../../Helpers/Function/Functions";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import styled from "styled-components";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}
class PlacementTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      stageList: [],
      candidateId:"",
      searchText: '',
    searchedColumn: '',
    };
  }
  getColumnSearchProps = dataIndex => ({

    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  
  handleIconClick = (profileId) => {
    debugger;
    this.setState({ show: true,profileId  });
  };

  handleCloseIconClick = () => {
    this.setState({ show: false });
  };
    
  componentDidMount() {
    // debugger;
    const { getPlacement, candidateId, } = this.props;
    console.log(candidateId);
    if (candidateId) {
      getPlacement(candidateId);
    }
  }
  
  render() {
    console.log(this.props.candidateId);
    const {
      placement,
      user,
      candidateId,
      fetchingPlacement,
      fetchingPlacementError,
      //   deleteDocument,
    } = this.props;
    console.log(candidateId);
    const columns = [
      {
        title: <FormattedMessage
          id="app.jobId"
          defaultMessage="Job ID"
        />,
        width: "12%",
        dataIndex: "jobOrder",
        ...this.getColumnSearchProps('jobOrder'),
        sorter: (a, b) => {
          var jobOrderA = a.jobOrder; // ignore upper and lowercase
          var jobOrderB = b.jobOrder; // ignore upper and lowercase
          if (jobOrderA < jobOrderB) {
            return -1;
          }
          if (jobOrderA > jobOrderB) {
            return 1;
          }
  
          return 0;
        },
        // ...getColumnSearchProps('jobOrder'),
       
      },
      {
        title: <FormattedMessage
          id="app.requirement"
          defaultMessage="Requirement"
        />,
        dataIndex: "requirementName",
        ...this.getColumnSearchProps('requirementName'),
        width: "12%",
        sorter: (a, b) => {
          var nameA = a.requirementName; // ignore upper and lowercase
          var nameB = b.requirementName; // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
  
          return 0;
        },
      },
      {
        title: <FormattedMessage
          id="app.opportunity"
          defaultMessage="Opportunity"
        />,
        dataIndex: "opprtunityName",
        width: "15%",
        sorter: (a, b) => {
          var nameA = a.opprtunityName; // ignore upper and lowercase
          var nameB = b.opprtunityName; // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
  
          return 0;
        },
        ...this.getColumnSearchProps('opprtunityName'),
      },
      {
        title: <FormattedMessage
          id="app.customer"
          defaultMessage="Customer"
        />,
        dataIndex: "accountName",
        width: "15%",
        sorter: (a, b) => {
          var nameA = a.accountName; // ignore upper and lowercase
          var nameB = b.accountName; // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
  
          return 0;
        },
        ...this.getColumnSearchProps('accountName'),
       
      },
      {
        title: "Start Date",
        dataIndex: "avilableDate",
        width: "10%",
        sorter: (a, b) => {
          var nameA = a.avilableDate; // ignore upper and lowercase
          var nameB = b.avilableDate; // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
  
          return 0;
        },
        render: (name, item, i) => {
          return <span>{` ${moment(item.avilableDate).format("ll")}`}</span>;
        },       
      },
      // {
      //   title: <FormattedMessage
      //     id="app.workflow"
      //     defaultMessage="Workflow"
      //   />,
      //   dataIndex: "processName",
      //   sorter: (a, b) => {
      //     var nameA = a.processName; // ignore upper and lowercase
      //     var nameB = b.processName; // ignore upper and lowercase
      //     if (nameA < nameB) {
      //       return -1;
      //     }
      //     if (nameA > nameB) {
      //       return 1;
      //     }
  
      //     return 0;
      //   },
      //    ...this.getColumnSearchProps('processName'),
      // },
      {
        title: <FormattedMessage
          id="app.callType"
          defaultMessage="Stages"
        />,
        dataIndex: "callType",
        // ...getColumnSearchProps('callType'),
        width: "7%",
        render: (name, item, i) => {
          var findProbability = 0;
          return (
            <span>
              <Dropdown
                overlay={
                  <div>
                    <Menu mode="horizontal">
                      <Menu.Item
                        style={{
                          paddingLeft: 5,
                          paddingRight: 5,
                          backgroundColor: "#F5F5F5",
                        }}
                      >
                        <RecruitmentStages
                        />{" "}
                      </Menu.Item>
                    </Menu>
                  </div>
                }
                trigger={["click"]}
              >
                <Tooltip>
                  {" "}
                  <Progress
                    type="circle"
                    style={{ cursor: "pointer" }}
                    width={40}
                    strokeColor={"#005075"}
                  />
                </Tooltip>
              </Dropdown>
            </span>
          );
        },
      },
      {
        title: "Result",
        dataIndex: "result",
        width: "7%",
        sorter: (a, b) => {
          var nameA = a.result; // ignore upper and lowercase
          var nameB = b.result; // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
  
          return 0;
        },
        // ...getColumnSearchProps('callType'),
        
        },
        {
          title: "End Date",
          width: "10%",
          dataIndex:"endDate",
          sorter: (a, b) => {
            var nameA = a.endDate; // ignore upper and lowercase
            var nameB = b.endDate; // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
    
            return 0;
          },
          render: (name, item, i) => {
            return <span>{` ${moment(item.endDate).format("ll")}`}</span>;
          },    
          
          },
        {
          title: "",
          dataIndex: "callType",
          width: "2%",
          render: (name, item, i) => {
            const close =
              this.state.show === true 
  
            return (
              <>
                {/* {item.candidateName ? ( */}
                  <>
                    {close ? (
                      <Tooltip //title="Close Details"
                        title={<FormattedMessage
                          id="app.closedetails"
                          defaultMessage="Close Details"
                        />}
                      >
                          <span
                          onClick={() => this.handleCloseIconClick()}
                          style={{
                            fontSize: "1.125em",
                            color:
                            this.state.show === true &&
                            this.state.profileId === item.profileId &&
                            "#1890ff",
                          }}
                          size="30"
                        >{user.pulseAccessInd ===true && ( 
                             <PulseIcon></PulseIcon>
                             )}
                             </span>
                      </Tooltip>
                    ) :
                     (
                        <>
                          <Tooltip //title="Access Details"
                            title={<FormattedMessage
                              id="app.accessdetails"
                              defaultMessage="Access Details"
                            />}
                          >
                  <span
                              onClick={() =>
                                this.handleIconClick(
                                  item.profileId,
                                )
                              }
                              style={{
                                fontSize: "1.125em",
                                color:
                                  this.state.show === true &&
                                  this.state.profileId === item.profileId &&
                                "#1890ff",
                                 
                                  
                              }}
                              size="30"
                            >{user.pulseAccessInd ===true && ( 
                              <MonitorHeartIcon style={{fontSize:"1rem" ,color: "#df9697"}}/>
                               )}
                            </span>
                          </Tooltip>
                        </>
                      )}
                  </>
                {/* ) : ( */}
                    <></>
                  {/* )} */}
              </>
            );
          },
        },
    ];

    return (
      <>
        {true && (
          <StyledTable
            pagination={false}
            scroll={{ y: 280 }}
            rowKey="candidateId"
            columns={columns}
            dataSource={placement}
            Loading={
              fetchingPlacement ||
               fetchingPlacementError
             }
            onChange={console.log("task onChangeHere...")}
          />
        
        )}
          {this.state.show && (
            <PlacementDetails
                 candidateId={this.state.candidateId}
            stageList={this.state.stageList}
            profileId={this.state.profileId}
            />
          )}
      </>
    );
  }
}

const mapStateToProps = ({ candidate,auth }) => ({
  placement: candidate.placement,
  fetchingPlacement: candidate.fetchingPlacement,
  user: auth.userDetails,
  fetchingPlacementError:candidate.fetchingPlacementError,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getPlacement,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlacementTable);
const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;

// function startDownload() {
//   var url =
//     "http://korero-env1.eba-sywkcsdt.eu-west-3.elasticbeanstalk.com/api/v2.0/Korero_logo1.png";
//   window.open(url, "Download");
// }
