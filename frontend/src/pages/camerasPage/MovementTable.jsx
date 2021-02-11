import React, { useState, useEffect } from "react";
import axios from "axios";

//styles
import "./movement-table.css";
const url = "http://localhost:8000";

export const MovementTable = (props) => {
  const [cameraData, setCameraData] = React.useState({});
  //Get new camera details when new camera is selected
  useEffect(() => {
    const getCameraDetails = async () => {
      try {
        const res = await axios.get(`${url}/camera/${props.camera}`);
        setCameraData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCameraDetails();
  }, [props.camera]);

  console.log(cameraData.movements);

  return (
    <table>
      <tr>
        <th>ID</th>
        <th>Timestamp</th>
        <th>Filename</th>
        <th>Actions</th>
        <th>PD</th>
      </tr>
      <TableData movements={cameraData.movements} />
    </table>
  );
};

const TableData = (props) => {
  return (
    <>
      {props.movements === undefined
        ? null
        : props.movements.map((entry) => (
            <tr>
              <td>12345</td>
              <td>Timestamp</td>
              <td>home/files/12345.jpg</td>
              <td>
                <button class="action-button">action</button>
                <button class="delete-button">delete</button>
                <button class="view-button">view</button>
              </td>
              <td>Y</td>
            </tr>
          ))}
    </>
  );
};
