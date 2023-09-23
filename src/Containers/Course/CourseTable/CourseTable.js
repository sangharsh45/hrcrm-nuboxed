import React, { useEffect, useState, useMemo, lazy } from "react";
import { StyledTable } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import { Tooltip, Button, Input } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import Highlighter from "react-highlight-words";
import "jspdf-autotable";
import { getCourse } from "../CourseAction";
import { BundleLoader } from "../../../Components/Placeholder";
import CourseDetailsView from "./CourseDetailsView";

function CourseTable(props) {
  useEffect(() => {
    props.getCourse();
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);

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

  const columns = [
    {
      title: "",
      //dataIndex: "logo",
      width: "2%",
    },
    {
      //title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "courseName",
      ...getColumnSearchProps("courseName"),
      width: "19%",
      render: (name, item, id) => {
        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
        return (
          <>
            <CourseDetailsView
              courseId={item.courseId}
              courseName={item.courseName}
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
      title: "Duration",
      dataIndex: "duration",
      width: "10%",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "10%",
      render: (name, item, i) => {
        return (
          <span>
            {item.currencyName} {item.price}
          </span>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "10%",
      render: (text, item) => {
        const content = item.description;
        return (
          <>
            {item.description === null ? (
              "No Data"
            ) : (
              <div>
                <p>
                  {isExpanded
                    ? content
                    : `${content && content.slice(0, 7)}...`}
                </p>
                {isExpanded ? (
                  <button onClick={handleCollapseClick}>Read Less</button>
                ) : (
                  <button onClick={handleExpandClick}>Read More</button>
                )}
              </div>
            )}
          </>
        );
      },
    },
  ];

  if (props.fetchingLeadsTabData) {
    return <BundleLoader />;
  }
  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={props.courseById}
        pagination={false}
      />
    </>
  );
}

const mapStateToProps = ({ course }) => ({
  courseById: course.courseById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCourse,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CourseTable);
