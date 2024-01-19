import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLibrarys } from "../../../Library/LibraryAction";

const MatrixData = (props) => {
    useEffect(() => {
        props.getLibrarys(props.organizationId);
      },[]);
  // Define the header labels for X axis.
  const xHeaderLabels = ['Level 1', 'Level 2', 'Level 3'];

  // Sample data for Y axis header labels.


  // Extract Y axis header labels from the data array.
  const yHeaderLabels = props.librarys.map(item => item.name);

  // Initial cell data.
  const initialCellData = [
    [150, 260, 320],
    [180, 410, 420],
    [480, 310, 410],
  ];

  // Create a state variable to store the cell data.
  const [cellData, setCellData] = useState(initialCellData);

  // Handle cell value change.
  const handleCellValueChange = (yIndex, xIndex, newValue) => {
    const updatedCellData = [...cellData];
    updatedCellData[yIndex][xIndex] = newValue;
    setCellData(updatedCellData);
  };

  // Handle save row click.
  const handleSaveRowClick = (yIndex) => {
    console.log('Saving data for row', yIndex, ':', cellData[yIndex]);
  };

  // Generate rows based on Y and X axis header labels.
//   const rows = yHeaderLabels.map((yLabel, yIndex) => (
//     <tr key={yIndex}>
//       <th>{yLabel}</th>
//       {xHeaderLabels.map((xLabel, xIndex) => (
//         <td key={xIndex}>
//           <input
//             type="text"
//             value={cellData[yIndex][xIndex]}
//             onChange={(e) =>
//               handleCellValueChange(yIndex, xIndex, e.target.value)
//             }
//           />
//         </td>
//       ))}
//       <td>
//         <button onClick={() => handleSaveRowClick(yIndex)}>Save</button>
//       </td>
//     </tr>
//   ));
const rows = yHeaderLabels.map((yLabel, yIndex) => (
    <tr key={yIndex}>
      <th>{yLabel}</th>
      {xHeaderLabels.map((xLabel, xIndex) => (
        <td key={xIndex}>
          <input
            type="text"
            value={cellData[yIndex]?.[xIndex] || ''}
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




const mapStateToProps = ({
 
    librarys,
    auth
  
  }) => ({
   
    librarys: librarys.librarys,
    organizationId: auth.userDetails.organizationId,
    
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
       
        getLibrarys,
     
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(MatrixData);

