// modules
import react, { useEffect, useState } from "react";
import { MovementTable } from "./MovementTable";
import axios from "axios";

// styles
import "./cameras-page.css";

export const CamerasPage = (props) => {
  const [cameras, setCameras] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState("");

  useEffect(() => {
    const getCameras = async () => {
      try {
        const res = await axios.get(`http://172.20.0.3:8000/camera/`);

        setCameras(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCameras();
  }, []);

  const onClickHandler = (event) => {
    setSelectedCamera(event.target.id);
    setDrawerOpen(true);
  };
  const onCloseHandler = (event) => {
    setDrawerOpen(false);
  };

  return (
    <>
      <CamerasDrawer
        show={drawerOpen}
        camera={selectedCamera}
        onClose={onCloseHandler}
      />
      <CamerasView data={cameras} onClick={onClickHandler} />
    </>
  );
};

const CamerasView = (props) => {
  const camStreams = props.data.map((entry) => {
    return (
      <input
        type="image"
        onClick={props.onClick}
        key={entry.cam_id}
        id={entry.cam_id}
        class="stream-button"
        src={`http://172.20.0.3:8000/stream/${entry.cam_id}`}
      />
    );
  });

  return <div id="cameras-container">{camStreams}</div>;
};

const CamerasDrawer = (props) => {
  let drawerClasses = "bottom-drawer";
  let backdrop;
  if (props.show) {
    drawerClasses = "bottom-drawer open";
    backdrop = <Backdrop onCloseHandler={props.onClose} />;
  }

  return (
    <>
      <div className={drawerClasses} id="camera-table">
        <div id="drawer-header">
          <h3>Camera {props.camera}</h3>
          <h3>Main Entrance</h3>
          <h3>IP: 192.168.55.210</h3>
        </div>
        <MovementTable camera={props.camera} />
      </div>
      {backdrop}
    </>
  );
};

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onCloseHandler} />;
};
