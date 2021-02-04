import react, { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:8000/";

export const CamerasPage = (props) => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const getCameras = async () => {
      try {
        const res = await axios.get(`${url}camera/`);

        console.log(res.data);
        setCameras(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCameras();
  }, []);

  return <CamerasView data={cameras} />;
};

const CamerasView = (props) => {
  const camStream = props.data.map((entry) => {
    return <img src={`${url}stream/${entry.cam_id}`} />;
  });

  return camStream;
};
