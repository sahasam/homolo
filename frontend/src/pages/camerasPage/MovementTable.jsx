import React, { useState, useEffect } from "react";
import { FaTv, FaTrash } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
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
              <td class="flipping">{entry.movement_id}</td>
              <td class="flipping">{entry.time_stamp}</td>
              <td class="flipping">{entry.file_name}</td>
              <td>
                <button class="action-button" class="primary"><FaTv /></button>
                <button class="delete-button" class="danger"><FaTrash /></button>
                <button class="view-button" class="primary"><AiOutlineStar /></button>
              </td>
              <td class="flipping">{entry.person_detected === 1 ? 'Y' : 'N'}</td>
            </tr>
          ))}
    </>
  );
};
