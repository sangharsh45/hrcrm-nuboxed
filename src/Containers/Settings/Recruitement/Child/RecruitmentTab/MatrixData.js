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


