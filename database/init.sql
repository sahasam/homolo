CREATE SCHEMA IF NOT EXISTS homolo;

-- cameras table - information about the security cameras
CREATE TABLE IF NOT EXISTS public.camera (
	cam_id INT NOT NULL,
    cam_name VARCHAR(40),
    location VARCHAR(30),
    cam_status INT,
    cam_ip VARCHAR(40),
    PRIMARY KEY(cam_id)
);

-- movement table - registry of all movement detected by cameras
CREATE TABLE IF NOT EXISTS public.movement (
	movement_id INT NOT NULL,
    camera_id INT NOT NULL,
    time_stamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    person_detected BOOLEAN,
    file_name VARCHAR(100),
    PRIMARY KEY(movement_id),
    FOREIGN KEY(camera_id) REFERENCES public.camera(cam_id)
);

INSERT INTO public.camera VALUES (1, 'Camera 1', 'North Wall', 1, '192.168.55.210');
INSERT INTO public.camera VALUES (2, 'Camera 2', 'South Wall', 1, '192.168.55.212');
INSERT INTO public.camera VALUES (3, 'Camera 3', 'East Wall', 1, '192.168.55.213');
INSERT INTO public.camera VALUES (4, 'Camera 4', 'West Wall', 1, '192.168.55.214');

INSERT INTO public.movement VALUES (1, 2, NOW(), true, 'cam_2_movement_1.mp4');
INSERT INTO public.movement VALUES (2, 2, NOW(), false, 'cam_2_movement_2.mp4');
INSERT INTO public.movement VALUES (3, 2, NOW(), true, 'cam_2_movement_3.mp4');
INSERT INTO public.movement VALUES (4, 3, NOW(), false, 'cam_3_movement_1.mp4');
INSERT INTO public.movement VALUES (5, 3, NOW(), true, 'cam_3_movement_2.mp4');
INSERT INTO public.movement VALUES (6, 1, NOW(), true, 'cam_1_movement_1.mp4');
