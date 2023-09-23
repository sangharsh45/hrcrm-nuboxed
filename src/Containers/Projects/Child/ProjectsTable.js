import React, { useEffect, useState, useMemo, lazy } from "react";
import { StyledTable ,StyledPopconfirm} from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import {
  MultiAvatar2,
} from "../../../Components/UI/Elements";
import ReceiptIcon from '@mui/icons-material/Receipt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { FormattedMessage } from "react-intl";
import { Tooltip, Button, Input } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from "@mui/icons-material/Search";
import Highlighter from "react-highlight-words";
import "jspdf-autotable";
 import { getProjectsData,
  removeProjectData ,
  setEditProjects,
  handleUpdateProjectsModal,
  handleInvoiceProjectModal
} from "../../Projects/ProjectsAction";
import { BundleLoader } from "../../../Components/Placeholder";
import ProjectsDetailsView from "./ProjectsDetail/ProjectsDetailsView";
import UpdateProjectsModal from "./UpdateProject/UpdateProjectsModal";
import AddInvoiceProjectsModal from "./ProjectsDetail/AddInvoiceProjectsModal";

function ProjectsTable(props) {
  useEffect(() => {
     props.getProjectsData(props.organizationId);
  }, []);
  console.log("data",props.projectsData);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCollapseClick = () => {
    setIsExpanded(false);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  function handleSetCurrentProjectId(item) {
    setCurrentProjectId(item);
    // console.log("opp",item);
  }
  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />

          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
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
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchIcon
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
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
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    };
  }
  const {
    removeProjectData,
    handleUpdateProjectsModal,
    updateProjectsModal
  } = props;

  const columns = [
    {
      title: "",
      //dataIndex: "logo",
      width: "2%",
    },
    {
      title: <FormattedMessage id="app.projectName" defaultMessage="Project Name" />,
       dataIndex: "projectName",
      width: "8%",
      render: (name, item, id) => {
        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
        return (
          <>
            <ProjectsDetailsView
              projectId={item.projectId}
              projectName={item.projectName}
            />
            &nbsp;&nbsp;
            {date === currentdate ? (
              <span
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                New
              </span>
            ) : null}
          </>
        );
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      width: "8%",
      render: (name, item, i) => {
        return (
          <>
            <span>
            {item.customerName === null ? (
                ""
              ) : (
                <MultiAvatar2
                  primaryTitle={item.customerName}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
                )}
            </span>
          </>
        );
      },
    },
    {
      title: "Creator Name",
      dataIndex: "creatorName",
      width: "8%",
      render: (name, item, i) => {
        return (
          <>
            <span>
                <MultiAvatar2
                  primaryTitle={item.creatorName}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
            </span>
          </>
        );
      },
    },

    {
      width:"2%",
      //  title:"Comments",
       render:(name,item,i)=> {

         return (
          <Tooltip title="Create Invoice">
           <ReceiptIcon
           onClick={()=>{
             props.handleInvoiceProjectModal(true);
            // handlePassRowData(item);
            

           
          }}
          style={{fontSize:"0.8rem",cursor:"pointer"}}
           
           />
            </Tooltip>
         );
        }
       
     },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip title="Edit">
            <BorderColorIcon 
              type="edit"
              style={{ cursor: "pointer", fontSize:"0.8rem"}}
              onClick={() => {
                props.setEditProjects(item);
               handleUpdateProjectsModal(true);
                handleSetCurrentProjectId(item);
             }}
            />
          </Tooltip>
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
             onConfirm={() => removeProjectData(item.projectId)}
          >
            <DeleteIcon
            type="delete" style={{ cursor: "pointer", color: "red",fontSize:"0.8rem" }} />
          </StyledPopconfirm>
        );
      },
    },
  
  ];

  if (props.fetchingProjectsData) {
    return <BundleLoader />;
  }
  return (
   
    <>
      <StyledTable
        columns={columns}
         dataSource={props.projectsData}
        pagination={false}
        scroll={{ y: 600 }}
      />

        <AddInvoiceProjectsModal
        // rowDataPass={rowDataPass}
        invoiceProjectModal={props.invoiceProjectModal}
        handleInvoiceProjectModal={props.handleInvoiceProjectModal}
        />

<UpdateProjectsModal
        updateProjectsModal={updateProjectsModal}
        projectData={currentProjectId}
        handleUpdateProjectsModal={handleUpdateProjectsModal}
        handleSetCurrentProjectId={handleSetCurrentProjectId}
      />
    </>
  );
}

const mapStateToProps = ({ projects,auth }) => ({
  projectsData: projects.projectsData,
  updateProjectsModal:projects.updateProjectsModal,
  fetchingProjectsData:projects.fetchingProjectsData,
  organizationId: auth.userDetails.organizationId,
  invoiceProjectModal:projects.invoiceProjectModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProjectsData,
      removeProjectData,
      setEditProjects,
      handleUpdateProjectsModal,
      handleInvoiceProjectModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
