#!/usr/bin/env python3
# expected output
# movement_id, camera_id, time_stamp, person_detected, file_name

"""
Back Yard -> 3
Front Yard -> null
Main Entrance -> 2
Side Door -> 1
Drive Way -> 4
"""


import os
import datetime

# where all surveilance videos are stored
# on filesystem
FILE_FOLDER = "/mnt/test/"

def get_camera_id(folder_name):
    if(folder_name.lower() == "side door"): return 1
    if(folder_name.lower() == "main entrance"): return 2
    if(folder_name.lower() == "back yard"): return 3
    if(folder_name.lower() == "drive way"): return 4
    if(folder_name.lower() == "front yard"): return 5

    return -1

def generate_movement_records(folder_list):
    """generate the list of movements based on files already stored in NFS"""
    records = []
    camera_id = 1
    for folder in folder_list:
        camera_id = get_camera_id(folder)
        days = filter(lambda x: x[-1] == "M", os.listdir(os.path.join(FILE_FOLDER, folder)))
        for d in days:
            for file in os.listdir(os.path.join(FILE_FOLDER, folder, d)):
                try:
                    time = datetime.datetime.strptime(''.join(file.split('-')[1:3]), "%Y%m%d%H%M%S")
                    records.append((camera_id, time, file))
                except ValueError as e:
                    #something wrong with file name format. Skip
                    print(f"{file} cannot be converted. Please rename or ignore")

    return records



if __name__ == "__main__": # list of folders with saved movement details.
    # i.e. folders to check
    try:
        folder_list = list(filter(lambda x: x[0] != "@", os.listdir(FILE_FOLDER)))
    except OSError as e:
        print(f"Could not access NFS at {FILE_FOLDER}. Mount to this directory or change the constant")


    print(generate_movement_records(folder_list))





