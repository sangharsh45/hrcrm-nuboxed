import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLibrarys } from "../../../Library/LibraryAction";
import {addSkillLevel} from "../../../SettingsAction"

const MatrixData = (props) => {
  // Ensure props.librarys is not undefined or null before using it
  useEffect(() => {
    props.getLibrarys(props.organizationId)
  }, []);
  const librarysData = props.librarys || [];

  // Define the header labels for X axis.
  const xHeaderLabels = ['Level 1', 'Level 2', 'Level 3'];

  // Extract Y axis header labels from the data array.
  const yHeaderLabels = librarysData.map(item => item.name);

  // Initial cell data.
  const initialCellData = {};
  librarysData.forEach(item => {
    initialCellData[item.name] = ["0", "0", "0"];
  });

  // Create a state variable to store the cell data.
  const [cellData, setCellData] = useState(initialCellData);

  // Use useEffect to update cellData when props.librarys changes
  useEffect(() => {
    const updatedCellData = {};
    librarysData.forEach(item => {
      const name = item.name;
      updatedCellData[name] = cellData[name] || ["0", "0", "0"];
    });
    setCellData(updatedCellData);
  }, [librarysData]);

  // Handle cell value change.
  const handleCellValueChange = (name, xIndex, newValue) => {
    const updatedCellData = { ...cellData };
    updatedCellData[name][xIndex] = newValue;
    setCellData(updatedCellData);
  };

  // Handle save row click.
  const handleSaveRowClick = (name) => {
    const result = {
      skillDefinationId: librarysData.find(item => item.name === name)?.definationId || "",
      level1: cellData[name][0],
      level2: cellData[name][1],
      level3: cellData[name][2],
      countryId:props.activeTab
    };

    props.addSkillLevel(result)
    console.log('Saving data:', result);
  };

  // Generate rows based on Y and X axis header labels.
  const rows = yHeaderLabels.map((name, yIndex) => (
    <tr key={yIndex}>
      <th>{name}</th>
      {xHeaderLabels.map((xLabel, xIndex) => (
        <td key={xIndex}>
          <input
            type="text"
            value={cellData[name]?.[xIndex] || ''}
            onChange={(e) =>
              handleCellValueChange(name, xIndex, e.target.value)
            }
          />
        </td>
      ))}
      <td>
        <button onClick={() => handleSaveRowClick(name)}>Save</button>
      </td>
    </tr>
  ));

  return (
    <div>
      <table className="matrix-table">
        <thead>
          <tr>
            <th></th>
            {xHeaderLabels.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
            <th>Save</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
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
      addSkillLevel
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MatrixData);

// import React, { useState,useEffect } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getLibrarys } from "../../../Library/LibraryAction";
// import {addSkillLevel} from "../../../SettingsAction"

// const MatrixData = (props) => {
//   useEffect(() => {
//         props.getLibrarys(props.organizationId)
//       }, []);
//   const data2 = [
//     {
//       skill: "Java",
//       level1: "124",
//       level2: "321",
//       level3: "596"
//     },
//     {
//       skill: "React",
//       level1: "157",
//       level2: "329",
//       level3: "486"
//     }
//   ];

//   const data = [
//     { skillName: "Java" },
//     { skillName: "React" },
//     { skillName: "Angular" }
//   ];
//   const [skills, setSkills] = useState(props.matrixData.reduce((acc, skill) => {
//     acc[skill.skill] = {
//       level1: skill.level1 || '',
//       level2: skill.level2 || '',
//       level3: skill.level3 || ''
//     };
//     return acc;
//   }, {}));

//   const handleInputChange = (name, level, value) => {
//     setSkills(prevSkills => ({
//       ...prevSkills,
//       [name]: {
//         ...prevSkills[name],
//         [level]: value
//       }
//     }));
//   };

//   const handleSaveClick = (name) => {
//     const { level1, level2, level3 } = skills[name] || { level1: '', level2: '', level3: '' };
//     console.log(`Skill: ${name}, Level 1: ${level1}, Level 2: ${level2}, Level 3: ${level3}`);
//     // Add your saving logic here
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Skill Name</th>
//           <th>Level 1</th>
//           <th>Level 2</th>
//           <th>Level 3</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {props.librarys.map(skill => (
//           <tr key={skill.name}>
//             <td>{skill.name}</td>
//             <td>
//               <input
//                 type="text"
//                 value={skills[skill.name]?.level1 || ''}
//                 onChange={(e) => handleInputChange(skill.name, 'level1', e.target.value)}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 value={skills[skill.name]?.level2 || ''}
//                 onChange={(e) => handleInputChange(skill.name, 'level2', e.target.value)}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 value={skills[skill.name]?.level3 || ''}
//                 onChange={(e) => handleInputChange(skill.name, 'level3', e.target.value)}
//               />
//             </td>
//             <td>
//               <button onClick={() => handleSaveClick(skill.name)}>Save</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
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













