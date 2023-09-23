import React, { useEffect,useState,useMemo } from 'react'
import { StyledTable } from '../../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { base_url } from "../../../../Config/Auth";
import jsPDF from "jspdf";
import "jspdf-autotable";
import EditIcon from '@mui/icons-material/Edit';
import Highlighter from 'react-highlight-words';
import {
  EditOutlined,
  EyeInvisibleOutlined, MailOutlined, SearchOutlined, UpCircleOutlined,
 
  
} from '@ant-design/icons';
import { Button, Empty,Switch, Select, Tooltip, Icon,Input} from "antd";
import { getAssessment } from '../../AccessmentAction';
import AssessmentDetails, {AssessmenntDetails} from "../AssessmentDetails/AssessmentDetails";
import AssessmentDetailsView from '../AssessmentDetails/AssessmentDetailsView';
import StatusToggle from './StatusToggle';


const AccessmentTable = (props) => {

   useEffect(() => {
    props.getAssessment(props.userId,props.orgId);
  }, []);
    function onChange(pagination, filters, sorter) {
      console.log("params", pagination, filters, sorter);
    }
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
  
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
              // ref={node => {
              //   this.searchInput = node;
              // }}
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
                 icon={<SearchOutlined />}
                //icon="search"
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
          // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
          <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
          ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) : "",
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
              textToHighlight={text ? text.toString(): ""}
            />
          ) : (
            text
          ),
      };
    }
  
    function handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    }
  
    function handleReset(clearFilters) {
      clearFilters();
      setSearchText("");
    }
    const categoryTypeOption = useMemo(() => {
      if (!props.assessment) return [];
      return (
        props.assessment.length &&
        props.assessment.map((assessment) => {
          return {
            text: assessment.category || "",
            value: assessment.category,
          };
        })
      );
    }, [props.assessment]);
    const columns = [
      {
        title: "",
        width:"2%"
    },
        {
            title: "Name",
            dataIndex:"assessmentName",
            ...getColumnSearchProps('assessmentName'),
            render: (name, item, i) => {
              const assessmentNameS = `${item.assessmentName}`;
              const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
              return (
                <>
                <AssessmentDetailsView assessmentId={item.assessmentId} assessmentName={item.assessmentName}/>
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
            title: "Theme",
            dataIndex:"theme",
            ...getColumnSearchProps('theme')
        },
        {
            title: "Category",
            dataIndex:"category",
            filters:categoryTypeOption,
      
            onFilter: (value, record) => {
              return record.category === value;
        },
      },
        {
            title: "Questions #",
            dataIndex:"noOfQuestions",
        },
        {
            title: "Time",
            dataIndex:"duration",
            sorter: (a, b) => {
              var nameA = a.time; // ignore upper and lowercase
              var nameB = b.time; // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
        
              return 0;
            },
            // render: (text, item) => {
            //   const time = moment(item.time).format("ll");
            //   return <span>{time}</span>;
            // },
        },
        {
            title: "Level",
            dataIndex:"level",
            sorter: (a, b) => {
              var nameA = a.level; // ignore upper and lowercase
              var nameB = b.level; // ignore upper and lowercase
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
            title: "URL",
             dataIndex: "url"
        },
        {
            title: "",
            dataIndex: "documentId",
            width: "2%",
            render: (name, item, i) => {
              //debugger
              return (
                <>
                    <EditIcon
                      type="edit"
                      style={{ cursor: "pointer" }}
                    />
                </>
              );
            },
          },
          {
            title: "", 
            width:"8%",          
            // dataIndex: "paidInd",           
            render: (name, item, i) => {
              return (
                <StatusToggle               
               item={item}
                assessmentId={item.assessmentId}
                publishInd={item.publishInd}
                //serviceId={item.serviceId}
                />
              );
            },
        },
           
    ]
    return (
        <>
       
            <StyledTable
                columns={columns}
                loading={props.fetchingAssessment}
                 dataSource={props.assessment}
                pagination={false}
            />

        </>
    )
}

const mapStateToProps = ({ auth,assessment }) => ({
  assessment:assessment.assessment,
fetchingAssessment:assessment.fetchingAssessment,
userId: auth.userDetails.userId,
orgId: auth.userDetails.organizationId,

});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
      getAssessment

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccessmentTable);
