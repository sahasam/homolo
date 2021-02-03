CREATE SCHEMA IF NOT EXISTS homolo;

# cameras table - information about the security cameras
CREATE TABLE IF NOT EXISTS homolo.camera (
	cam_id INT NOT NULL,
    cam_name VARCHAR(40),
    location VARCHAR(30),
    cam_status INT,
    cam_ip VARCHAR(40),
    PRIMARY KEY(cam_id)
);

# movement table - registry of all movement detected by cameras
CREATE TABLE IF NOT EXISTS homolo.movement (
	movement_id INT NOT NULL,
    camera_id INT NOT NULL,
    time_stamp DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    person_detected BOOLEAN,
    file_name VARCHAR(100),
    PRIMARY KEY(movement_id),
    FOREIGN KEY(camera_id) REFERENCES homolo.camera(cam_id)
);

INSERT INTO homolo.camera VALUES (1, 'Camera 1', 'North Wall', 1, "192.168.55.1");
INSERT INTO homolo.camera VALUES (2, 'Camera 2', 'South Wall', 1, "192.168.55.2");
INSERT INTO homolo.camera VALUES (3, 'Camera 3', 'East Wall', 1, "192.168.55.3");
INSERT INTO homolo.camera VALUES (4, 'Camera 4', 'West Wall', 1, "192.168.55.4");
INSERT INTO homolo.camera VALUES (5, 'Camera 5', 'Garage Door', 1, "192.168.55.5");
INSERT INTO homolo.camera VALUES (6, 'Camera 6', 'Side Door', 1, "192.168.55.6");
INSERT INTO homolo.camera VALUES (7, 'Camera 7', 'Front Door', 1, "192.168.55.7");

INSERT INTO homolo.movement VALUES (1, 2, NOW(), 1, 'cam_2_movement_1.mp4');
INSERT INTO homolo.movement VALUES (2, 2, NOW(), 0, 'cam_2_movement_2.mp4');
INSERT INTO homolo.movement VALUES (3, 2, NOW(), 1, 'cam_2_movement_3.mp4');
INSERT INTO homolo.movement VALUES (4, 3, NOW(), 0, 'cam_3_movement_1.mp4');
INSERT INTO homolo.movement VALUES (5, 3, NOW(), 1, 'cam_3_movement_2.mp4');
INSERT INTO homolo.movement VALUES (6, 6, NOW(), 1, 'cam_6_movement_1.mp4');
