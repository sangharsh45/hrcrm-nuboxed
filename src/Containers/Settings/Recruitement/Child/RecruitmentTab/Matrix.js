import React, { useState } from 'react';

const MatrixTable = () => {
  // Define the header labels for X and Y axes.
  const xHeaderLabels = ['Level 1', 'Level 2', 'Level 3'];
  const yHeaderLabels = ['React', 'Java', 'Angular',];

  // Define the initial data values for each cell in the matrix.
  const initialCellData = [
    [150, 260, 320],
    [180, 410, 420],
    [480, 310, 410],
    // Add more rows as needed
  ];

  // Create a state variable to store the cell data.
  const [cellData, setCellData] = useState(initialCellData);

  // Function to handle changes in cell values.
  const handleCellValueChange = (yIndex, xIndex, newValue) => {
    // Create a copy of the cell data array to avoid mutating state directly.
    const updatedCellData = [...cellData];
    updatedCellData[yIndex][xIndex] = newValue;
    setCellData(updatedCellData);
  };

  // Function to handle the "Save" button click for a specific row.
  const handleSaveRowClick = (yIndex) => {
    // Here, you can save the data for the specific row (yIndex).
    // For demonstration purposes, we'll log it to the console.
    console.log('Saving data for row', yIndex, ':', cellData[yIndex]);
  };

  // Create the table rows and cells based on the header labels and cell data.
  const rows = yHeaderLabels.map((yLabel, yIndex) => (
    <tr key={yIndex}>
      <th>{yLabel}</th>
      {xHeaderLabels.map((xLabel, xIndex) => (
        <td key={xIndex}>
          <input
            type="text"
            value={cellData[yIndex][xIndex]}
            onChange={(e) =>
              handleCellValueChange(yIndex, xIndex, e.target.value)
            }
          />
        </td>
      ))}
      <td>
        <button onClick={() => handleSaveRowClick(yIndex)}>Save</button>
      </td>
    </tr>
  ));

  return (
    <div>
      <table className="matrix-table">
        <thead>
          <tr>
            <th></th> {/* An empty cell for the top-left corner */}
            {xHeaderLabels.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
            <th>Save</th> {/* A header for the "Save" column */}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default MatrixTable