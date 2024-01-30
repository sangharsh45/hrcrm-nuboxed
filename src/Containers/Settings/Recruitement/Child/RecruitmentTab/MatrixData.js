// import React, { useState, useEffect } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getLibrarys } from "../../../Library/LibraryAction";
// import {addSkillLevel} from "../../../SettingsAction"

// const MatrixData = (props) => {
//   // Ensure props.librarys is not undefined or null before using it
//   useEffect(() => {
//     props.getLibrarys(props.organizationId)
//   }, []);
//   const librarysData = props.librarys || [];

//   // Define the header labels for X axis.
//   const xHeaderLabels = ['Level 1', 'Level 2', 'Level 3'];

//   // Extract Y axis header labels from the data array.
//   const yHeaderLabels = librarysData.map(item => item.name);

//   // Initial cell data.
//   const initialCellData = {};
//   librarysData.forEach(item => {
//     initialCellData[item.name] = ["0", "0", "0"];
//   });

//   // Create a state variable to store the cell data.
//   const [cellData, setCellData] = useState(initialCellData);

//   // Use useEffect to update cellData when props.librarys changes
//   useEffect(() => {
//     const updatedCellData = {};
//     librarysData.forEach(item => {
//       const name = item.name;
//       updatedCellData[name] = cellData[name] || ["0", "0", "0"];
//     });
//     setCellData(updatedCellData);
//   }, [librarysData]);

//   // Handle cell value change.
//   const handleCellValueChange = (name, xIndex, newValue) => {
//     const updatedCellData = { ...cellData };
//     updatedCellData[name][xIndex] = newValue;
//     setCellData(updatedCellData);
//   };

//   // Handle save row click.
//   const handleSaveRowClick = (name) => {
//     const result = {
//       skillDefinationId: librarysData.find(item => item.name === name)?.definationId || "",
//       level1: cellData[name][0],
//       level2: cellData[name][1],
//       level3: cellData[name][2],
//       countryId:props.activeTab
//     };

//     props.addSkillLevel(result)
//     console.log('Saving data:', result);
//   };

//   // Generate rows based on Y and X axis header labels.
//   const rows = yHeaderLabels.map((name, yIndex) => (
//     <tr key={yIndex}>
//       <th>{name}</th>
//       {xHeaderLabels.map((xLabel, xIndex) => (
//         <td key={xIndex}>
//           <input
//             type="text"
//             value={cellData[name]?.[xIndex] || ''}
//             onChange={(e) =>
//               handleCellValueChange(name, xIndex, e.target.value)
//             }
//           />
//         </td>
//       ))}
//       <td>
//         <button onClick={() => handleSaveRowClick(name)}>Save</button>
//       </td>
//     </tr>
//   ));

//   return (
//     <div>
//       <table className="matrix-table">
//         <thead>
//           <tr>
//             <th></th>
//             {xHeaderLabels.map((label, index) => (
//               <th key={index}>{label}</th>
//             ))}
//             <th>Save</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     </div>
//   );
// };

// const mapStateToProps = ({ librarys, auth }) => ({
//   librarys: librarys.librarys,
//   organizationId: auth.userDetails.organizationId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getLibrarys,
//       addSkillLevel
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(MatrixData);

import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLibrarys } from '../../../Library/LibraryAction';
import { addSkillLevel } from '../../../SettingsAction';

const { Option } = Select;

const EditableTable = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getLibrarys(props.organizationId);
  }, [props.organizationId]);

  useEffect(() => {
    // Update component state when matrixData changes
    setData(props.matrixData.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.matrixData]);

  const handleAddRow = () => {
    const newRow = {
      key: String(data.length + 1),
      skill: '',
      level1: '',
      level2: '',
      level3: '',
      skillDefinationId: '',
    };
    setData([...data, newRow]);
  };

  const columns = [
    {
      title: 'Skill',
      dataIndex: 'skill',
      render: (_, record) => (
        <Select
          style={{ width: 120 }}
          value={record.skillDefinationId} // Updated to use definationId instead of skill
          onChange={(value) => handleSelectChange(value, record.key, 'skillDefinationId')}
        >
          {props.librarys.map((s) => (
            <Option key={s.definationId} value={s.definationId}>
              {s.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Level 1',
      dataIndex: 'level1',
      render: (_, record) => (
        <Input
          value={record.level1}
          onChange={(e) => handleInputChange(e.target.value, record.key, 'level1')}
        />
      ),
    },
    {
      title: 'Level 2',
      dataIndex: 'level2',
      render: (_, record) => (
        <Input
          value={record.level2}
          onChange={(e) => handleInputChange(e.target.value, record.key, 'level2')}
        />
      ),
    },
    {
      title: 'Level 3',
      dataIndex: 'level3',
      render: (_, record) => (
        <Input
          value={record.level3}
          onChange={(e) => handleInputChange(e.target.value, record.key, 'level3')}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleSave(record.key)}>
          Save
        </Button>
      ),
    },
  ];

  const handleSelectChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value, skillDefinationId: value } : row
    );
    setData(updatedData);
  };

  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };

  const handleSave = (key) => {
    const targetRow = data.find((row) => row.key === key);
    if (targetRow) {
      const { level1, level2, level3, skillDefinationId } = targetRow;
      console.log(`Skill ID: ${skillDefinationId}, Level 1: ${level1}, Level 2: ${level2}, Level 3: ${level3}`);
      const result = {
              skillDefinationId: skillDefinationId,
              level1: level1,
              level2: level2,
              level3: level3,
              countryId:props.activeTab
            };
      props.addSkillLevel(result)
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

const mapStateToProps = ({ librarys, auth }) => ({
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLibrarys,
      addSkillLevel,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditableTable);



// import React, { useState } from 'react';
// import { Table, Input, Select, Button } from 'antd';

// const { Option } = Select;

// const initialData = [
//   {
//     level1: 144,
//     level2: 232,
//     level3: 567,
//     skill: 'Java',
//     id: '1',
//   },
// ];

// const EditableTable = () => {
//   const skillOptions = [
//     {
//       skillName: 'Java',
//       id: '1',
//     },
//     {
//       skillName: 'Angular',
//       id: '2',
//     },
//   ];

//   const [data, setData] = useState(initialData.map((item, index) => ({ ...item, key: String(index) })));

//   const handleAddRow = () => {
//     const newRow = {
//       key: String(data.length + 1),
//       skill: '',
//       level1: '',
//       level2: '',
//       level3: '',
//       id: '',
//     };
//     setData([...data, newRow]);
//   };

//   const columns = [
//     {
//       title: 'Skill',
//       dataIndex: 'skill',
//       render: (_, record) => (
//         <Select
//           style={{ width: 120 }}
//           value={record.id}
//           onChange={(value) => handleSelectChange(value, record.key, 'skill')}
//         >
//           {skillOptions.map((s) => (
//             <Option key={s.id} value={s.id}>
//               {s.skillName}
//             </Option>
//           ))}
//         </Select>
//       ),
//     },
//     {
//       title: 'Level 1',
//       dataIndex: 'level1',
//       render: (_, record) => (
//         <Input
//           value={record.level1}
//           onChange={(e) => handleInputChange(e.target.value, record.key, 'level1')}
//         />
//       ),
//     },
//     {
//       title: 'Level 2',
//       dataIndex: 'level2',
//       render: (_, record) => (
//         <Input
//           value={record.level2}
//           onChange={(e) => handleInputChange(e.target.value, record.key, 'level2')}
//         />
//       ),
//     },
//     {
//       title: 'Level 3',
//       dataIndex: 'level3',
//       render: (_, record) => (
//         <Input
//           value={record.level3}
//           onChange={(e) => handleInputChange(e.target.value, record.key, 'level3')}
//         />
//       ),
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       render: (_, record) => (
//         <Button type="primary" onClick={() => handleSave(record.key)}>
//           Save
//         </Button>
//       ),
//     },
//   ];

//   const handleSelectChange = (value, key, dataIndex) => {
//     const updatedData = data.map((row) =>
//       row.key === key ? { ...row, [dataIndex]: value, id: value } : row
//     );
//     setData(updatedData);
//   };

//   const handleInputChange = (value, key, dataIndex) => {
//     const updatedData = data.map((row) =>
//       row.key === key ? { ...row, [dataIndex]: value } : row
//     );
//     setData(updatedData);
//   };

//   const handleSave = (key) => {
//     const targetRow = data.find((row) => row.key === key);
//     if (targetRow) {
//       const { level1, level2, level3, id } = targetRow;
//       console.log(`Skill ID: ${id}, Level 1: ${level1}, Level 2: ${level2}, Level 3: ${level3}`);
//     }
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
//         Add Row
//       </Button>
//       <Table dataSource={data} columns={columns} />
//     </div>
//   );
// };

// export default EditableTable;