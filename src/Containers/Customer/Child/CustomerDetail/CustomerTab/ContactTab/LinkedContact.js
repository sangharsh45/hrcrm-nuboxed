import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Input } from "antd";
import { getDepartments } from "../../../../../Settings/Department/DepartmentAction";
import { getDesignations } from "../../../../../Settings/Designation/DesignationAction";
import {
  getContactListByCustomerId,
  setEditCustomerContact,
  handleUpdateCustomerContactModal,
} from "../../../../CustomerAction";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "../../../../../../Components/Common";
import { ActionIcon } from "../../../../../../Components/Utils";
import CustomerContactActiveToggle from "./CustomerContactActiveToggle";
import styled from "styled-components";
const AddCustomerUpdateContactModal = lazy(() =>
  import("./AddCustomerUpdateContactModal")
);
const UpdateContactModal = lazy(() =>
  import("../../../../../Contact/Child/UpdateContact/UpdateContactModal")
);
const ButtonGroup = Button.Group;

class LinkedContact extends Component {
  componentDidMount() {
    this.props.getContactListByCustomerId(this.props.customerId);
    this.props.getDesignations();
    this.props.getDepartments();
  }

  state = {
    searchText: "",
    searchedColumn: "",
    contactId: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />

        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          // icon={<SearchOutlined />}
          icon="search"
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
            this.setState({
              searchText: selectedKeys[0],
              searchedColumn: dataIndex,
            });
          }}
        >
          Filter
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
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

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  handleIconClick = (contactId) => {
    debugger;
    this.setState({ contactId });

    // this.props.getContactDocument(contactId);
  };

  render() {
    const designationTypeOption = this.props.designations.map((item) => {
      return {
        text: item.designationType,
        value: item.designationType,
      };
    });

    const departmentNameOption = this.props.departments.map((item) => {
      return {
        text: item.departmentName,
        value: item.departmentName,
      };
    });
    const {
      //   opportunity: { opportunityId },
      fetchingCustomerContact,
      fetchingCustomerContactError,
      contactByCustomerId,
      unlinkContactFromOpportunity,
      setContactRoleForOpportunity,
      handleUpdateCustomerContactModal,
      addUpdateCustomerContactModal,
    } = this.props;

    const columns = [
      {
        title: "",
        dataIndex: "",
        width: "5%",
        render: (name, item, i) => {
          console.log(item);
        },
      },
      {
        title: <FormattedMessage id="app.name" defaultMessage="Name" />,
        width: "20%",
        ...this.getColumnSearchProps("name"),
        render: (name, item, i) => {
          const fullName = ` ${item.salutation || ""} ${item.firstName || ""} ${
            item.middleName || ""
          } ${item.lastName || ""}`;
          return (
            <>
              {/* {fullName} */}
              <Link
                toUrl={`/contact/${item.contactId}`}
                title={`${item.fullName || ""}`}
              />
            </>
          );
        },
      },
      {
        title: "",
        width: "2%",
        render: (name, item, i) => {
          //  console.log(props.candidateByUserId.address&&props.candidateByUserId.address.length&&props.candidateByUserId.address[0].address1)
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
           Street : ${
             item.address && item.address.length && item.address[0].street
           }   
          State : ${
            item.address && item.address.length && item.address[0].state
          }
         Country : ${
           (item.address && item.address.length && item.address[0].country) ||
           ""
         } 
           PostalCode : ${
             item.address && item.address.length && item.address[0].postalCode
           } `;
          return (
            <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
              <span
                style={{
                  cursor: "pointer",
                }}
              >
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
            </Tooltip>
          );
        },
      },
      {
        title: <FormattedMessage id="app.email" defaultMessage="Email" />,
        width: "25%",
        dataIndex: "emailId",
      },
      {
        title: <FormattedMessage id="app.mobileno" defaultMessage="Mobile #" />,
        width: "15%",
        dataIndex: "mobileNumber",
        render: (name, item, i) => {
          return (
            <span>
              {item.countryDialCode} {item.mobileNumber}
            </span>
          );
        },
      },

      {
        title: (
          <FormattedMessage id="app.department" defaultMessage="Department" />
        ),
        dataIndex: "department",
        width: "15%",
        filters: departmentNameOption,
        onFilter: (value, record) => {
          return record.department === value;
        },
        sorter: (a, b) => {
          const departmentA = a.department;
          const departmentB = b.department;
          if (departmentA < departmentB) {
            return -1;
          }
          if (departmentA > departmentB) {
            return 1;
          }

          // names must be equal
          return 0;
        },
      },

      {
        //title: "Designation",
        title: (
          <FormattedMessage id="app.designation" defaultMessage="Designation" />
        ),
        dataIndex: "designation",
        width: "15%",
        // defaultSortOrder: "descend",
        filters: designationTypeOption,
        onFilter: (value, record) => {
          return record.designation === value;
        },
        sorter: (a, b) => {
          const designationA = a.designation;
          const designationB = b.designation;
          if (designationA < designationB) {
            return -1;
          }
          if (designationA > designationB) {
            return 1;
          }

          // names must be equal
          return 0;
        },
      },
      {
        title: "",
        dataIndex: "contactId",
        width: "2%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
            <Tooltip title="LinkedIn">
              <span
                //type="edit"
                style={{ cursor: "pointer" }}
                onClick={() => {}}
              >
                {" "}
                <a href={`https://www.linkedin.com`} target="_blank">
                  <i class="fab fa-linkedin"></i>
                </a>
              </span>
            </Tooltip>
          );
        },
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          return (
            <Tooltip title="Edit">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.setEditCustomerContact(item);
                  this.props.handleUpdateCustomerContactModal(true);
                  this.handleIconClick(item.contactId);
                }}
              >
                <BorderColorIcon style={{ fontSize: "0.8rem", }} />
              </span>
              {/* )} */}
            </Tooltip>
          );
        },
      },

      {
        title: "",
        dataIndex: "contactId",
        width: "2%",
        render: (name, item, i) => {
          console.log(name);
          console.log(item);
          return (
            <StyledPopconfirm
              placement="bottom"
              //title="Do you wish to detach?"
              title={
                <FormattedMessage
                  id="app.doyouwishtodetach?"
                  defaultMessage="Do you wish to detach?"
                />
              }
              //   onConfirm={() =>
              //     unlinkContactFromOpportunity(opportunityId, name)
              //   }
            >
              <ActionIcon
                //tooltipTitle="Detach Contact"
                tooltiptitle={
                  <FormattedMessage
                    id="app.detachcontact"
                    defaultMessage="Detach Contact"
                  />
                }
                iconType="api"
                onClick={null}
                size="1em"
                style={{ color: "#fb8500" }}
              />
            </StyledPopconfirm>
          );
        },
      },
      {
        title: "Portal Access",
        // dataIndex: "active",
        width: "12%",
        render: (name, item, i) => {
          console.log(item.thirdPartyAccessInd);
          return (
            <span>
              {item.thirdPartyAccessInd === true && (
                <CustomerContactActiveToggle
                  accessInd={item.accessInd}
                  contactId={item.contactId}
                  emailId={item.emailId}
                  thirdPartyAccessInd={item.thirdPartyAccessInd}
                />
              )}
            </span>
          );
        },
      },
    ];

    // if (fetchingCustomerContactError) {
    //   return <APIFailed />;
    // }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <StyledTable
          // rowSelection={rowSelection}
          rowKey="contactId"
          columns={columns}
          pagination={false}
          scroll={{ y: tableHeight }}
          dataSource={contactByCustomerId}
          Loading={fetchingCustomerContact || fetchingCustomerContactError}
          onChange={console.log("contact onChangeHere...")}
          //   expandedRowRender={(record) => {
          //      return (
          //       <Tooltip title="Address">
          //          <p>{record.address[0].address1 || ""},{record.address[0].street || ""},{record.address[0].city || ""},{record.address[0].country || ""}</p>
          //          </Tooltip>
          //      );
          //  }}
        />
        <AddCustomerUpdateContactModal
          addUpdateCustomerContactModal={addUpdateCustomerContactModal}
          contactId={this.state.contactId}
          defaultCustomers={this.props.defaultCustomers}
          customerId={this.props.customerId}
          handleUpdateCustomerContactModal={handleUpdateCustomerContactModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ customer, designations, departments, contact }) => ({
  fetchingCustomerContact: customer.fetchingCustomerContact,
  fetchingCustomerContactError: customer.fetchingCustomerContactError,
  customerId: customer.customer.customerId,
  designations: designations.designations,
  contactByCustomerId: customer.contactByCustomerId,
  departments: departments.departments,
  addUpdateCustomerContactModal: customer.addUpdateCustomerContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByCustomerId,
      getDesignations,
      setEditCustomerContact,
      getDepartments,
      handleUpdateCustomerContactModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedContact);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  if (role === type) {
    size = "1.375em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.25em" }}></i>
      </Button>
    </Tooltip>
  );
}

const AppIcon1 = (props) => (
  <BorderColorIcon
  />
);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
