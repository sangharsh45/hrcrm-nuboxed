// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../../Components/UI/Antd";
// import PlantDetailView from "./PlantDetailView";
// import UpdatePlantModal from "../UpdatePlant/UpdatePlantModal";
// import { Tooltip, Button, Input, Space } from "antd";
// import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
// import {
//   getPlant,
//   setEditPlant,
//   handleUpdatePlantModal,
// } from "../../PlantAction";
// import Highlighter from "react-highlight-words";
// import { SearchOutlined } from "@ant-design/icons";
// import { getLocationsType } from "../../../Locations/LocationsAction";
// import moment from "moment";

// function PlantTable(props) {
//   useEffect(() => {
//     props.getPlant(props.userId);
//     props.getLocationsType();
//   }, []);

//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");

//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//     }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={(node) => {
//             this.searchInput = node;
//           }}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() =>
//             handleSearch(selectedKeys, confirm, dataIndex)
//           }
//           style={{ marginBottom: 8, display: "block" }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex]
//             .toString()
//             .toLowerCase()
//             .includes(value.toLowerCase())
//         : "",
//     onFilterDropdownVisibleChange: (visible) => {
//       if (visible) {
//         setTimeout(() => this.searchInput.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText("");
//   };

//   const { plant, handleUpdatePlantModal, updatePlantModal } = props;
//   const locationsTypeOption = props.locationsType.map((item) => {
//     return {
//       text: item.locationType || "",
//       value: item.locationtypeId,
//     };
//   });
//   const columns = [
//     {
//       title: "",
//       dataIndex: "",
//       width: "2%",
//     },
//     {
//       title: "Name",
//       width: "15%",
//       dataIndex: "name",
//       ...getColumnSearchProps("name"),
//       render: (name, item, i) => {
//         const currentdate = moment().format("DD/MM/YYYY");
//         const date = moment(item.creationDate).format("DD/MM/YYYY");
//         return (
//           <>
//             <PlantDetailView
//               locationDetailsId={item.locationDetailsId}
//               plantName={item.name}
//             />
//             &nbsp;&nbsp;
//             {date === currentdate ? (
//               <span
//                 style={{
//                   color: "tomato",
//                   fontWeight: "bold",
//                 }}
//               >
//                 New
//               </span>
//             ) : null}
//           </>
//         );
//       },
//     },
//     {
//       title: "Management",
//       width: "14%",
//       ...getColumnSearchProps("managementDetails"),
//       render: (name, item, i) => {
//         return {
//           children: `${item.managementDetails.firstName || ""} 
//           ${item.managementDetails.lastName || ""}`,
//         };
//       },
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//       width: "7%",
//       filters: locationsTypeOption,
//       onFilter: (value, record) => {
//         return record.locationType === value;
//       },
//     },
//     {
//       title: "Country",
//       dataIndex: "country",
//       width: "8%",
//       ...getColumnSearchProps("country"),
//       render: (name, item, i) => {
//         return (
//           <span>{(item.addresses && item.addresses[0].country) || ""}</span>
//         );
//       },
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       width: "18%",
//       render: (name, item, i) => {
//         return (
//           <span>
//             {`${(item.addresses && item.addresses[0].city) || ""}` +
//               " " +
//               `${(item.addresses && item.addresses[0].state) || ""}`}
//           </span>
//         );
//       },
//     },
//     {
//       title: "Pin Code",
//       dataIndex: "pinCode",
//       render: (name, item, i) => {
//         return (
//           <span>{(item.addresses && item.addresses[0].pinCode) || ""}</span>
//         );
//       },
//       width: "8%",
//     },
//   ];

//   if (props.fetchingPlantError) {
//     return <APIFailed />;
//   }
//   const tab = document.querySelector(".ant-layout-sider-children");
//   const tableHeight = tab && tab.offsetHeight - 300;
//   return (
//     <>
//       <StyledTable
//         columns={columns}
//         dataSource={plant}
//         loading={props.fetchingPlant || props.fetchingPlantError}
//         onChange={console.log("task onChangeHere...")}
//         scroll={{ y: tableHeight }}
//         pagination={false}
//       />
//       <UpdatePlantModal
//         updatePlantModal={updatePlantModal}
//         handleUpdatePlantModal={handleUpdatePlantModal}
//       />
//     </>
//   );
// }

// const mapStateToProps = ({ plant, auth, locations }) => ({
//   userId: auth.userDetails.userId,
//   fetchingPlant: plant.fetchingPlant,
//   plant: plant.plant,
//   updatePlantModal: plant.updatePlantModal,
//   locationsType: locations.locationsType,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getPlant,
//       setEditPlant,
//       handleUpdatePlantModal,
//       getLocationsType,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(PlantTable);

// function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
//   console.log(role);
//   console.log(type);
//   if (role === type) {
//     size = "22px";
//   } else {
//     size = "16px";
//   }
//   return (
//     <Tooltip title={tooltip}>
//       <Button
//         style={{
//           padding: "6px",
//           borderColor: "transparent",
//           color: role === type ? "#1890ff" : "grey",
//         }}
//         ghost={role !== type}
//         onClick={onClick}
//       >
//         <i className={`${iconType}`} style={{ fontSize: "20px" }}></i>
//       </Button>
//     </Tooltip>
//   );
// }

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Button, Input, Space } from "antd"; // Import Card component
// import PlantDetailView from "./PlantDetailView";
// import UpdatePlantModal from "../UpdatePlant/UpdatePlantModal";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import {
  getPlant,
  setEditPlant,
  handleUpdatePlantModal,
} from "./PlantAction";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
// import { getLocationsType } from "../../../Locations/LocationsAction";
import moment from "moment";

function PlantTable(props) {
  useEffect(() => {
    props.getPlant(props.userId);
    props.getLocationsType();
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = (dataIndex) => ({
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
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
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
        </Space>
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
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const { plant, handleUpdatePlantModal, updatePlantModal } = props;
//   const locationsTypeOption = props.locationsType.map((item) => {
//     return {
//       text: item.locationType || "",
//       value: item.locationtypeId,
//     };
//   });

//   if (props.fetchingPlantError) {
//     return <APIFailed />;
//   }
  
  return (
    <div className="plant-table">
      {plant.map((item, index) => (
        <Card key={index} style={{ marginBottom: 16 }}>
          <div className="plant-card-content">
            {/* <PlantDetailView
              locationDetailsId={item.locationDetailsId}
              plantName={item.name}
            /> */}
            <p>
              {item.creationDate === moment().format("YYYY-MM-DD") && (
                <span className="new-plant-label">New</span>
              )}
            </p>
          </div>
          <div className="plant-card-details">
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Management:</strong>{" "}
              {`${item.managementDetails.firstName || ""} 
          ${item.managementDetails.lastName || ""}`}
            </p>
            <p>
              <strong>Type:</strong> {item.type}
            </p>
            <p>
              <strong>Country:</strong> {(item.addresses && item.addresses[0].country) || ""}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {`${(item.addresses && item.addresses[0].city) || ""} 
              ${(item.addresses && item.addresses[0].state) || ""}`}
            </p>
            <p>
              <strong>Pin Code:</strong>{" "}
              {(item.addresses && item.addresses[0].pinCode) || ""}
            </p>
          </div>
          <div className="actions">
            <Button
              onClick={() => {
                props.setEditPlant(item);
                handleUpdatePlantModal(true);
              }}
            >
              Edit
            </Button>
          </div>
        </Card>
      ))}
      {/* <UpdatePlantModal
        updatePlantModal={updatePlantModal}
        handleUpdatePlantModal={handleUpdatePlantModal}
      /> */}
    </div>
  );
}

const mapStateToProps = ({ plant, auth, locations }) => ({
  userId: auth.userDetails.userId,
 // fetchingPlant: plant.fetchingPlant,
//   plant: plant.plant,
//   updatePlantModal: plant.updatePlantModal,
//   locationsType: locations.locationsType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPlant,
      setEditPlant,
      handleUpdatePlantModal,
     // getLocationsType,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlantTable);
