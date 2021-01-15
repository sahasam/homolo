import React, { useState } from "react";

//Components
import { Radio, Space } from "antd";
import ThreeScene from "./Components/ReactCanvas";
import CameraDrawer from "./Components/CameraDrawer";

//Styles
import "./App.css";

const vantage_point_names = ["Main", "ADU"];

function App() {
  const [viewIndex, setViewIndex] = useState(0);

  return (
    <>
      <div id="container">
        <div id="container">
          <div id="menu-container">
            <Space>
              <Radio.Group
                value={viewIndex}
                buttonStyle="solid"
                defaultValue={viewIndex.toString()}
                size="large"
                onChange={(e) => setViewIndex(e.target.value)}
              >
                {vantage_point_names.map((buttonLabel, i) => (
                  <Radio.Button value={i} key={i}>
                    {buttonLabel}
                  </Radio.Button>
                ))}
              </Radio.Group>
              <CameraDrawer />
            </Space>
          </div>
        </div>

        <div id="canvas-container">
          <ThreeScene />
        </div>
      </div>
    </>
  );
}

export default App;
