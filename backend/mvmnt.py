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

    return -1




if __name__ == "__main__":
    # list of folders with saved movement details.
    # i.e. folders to check
    folder_list = list(filter(lambda x: x[0] != "@", os.listdir(FILE_FOLDER)))

    camera_id = 1
    for folder in folder_list:
        print(f"\n{folder} camera_id:{get_camera_id(folder)}")
        days = filter(lambda x: x[-1] == "M", os.listdir(os.path.join(FILE_FOLDER, folder)))
        for d in days:
            year = d[0:4]
            month = d[4:6]
            day = d[6:8]
            locale_time = d[8:10]
            print(f"{month}/{day}/{year} {locale_time}")

            for file in os.listdir(os.path.join(FILE_FOLDER, folder, d)):
                print(file)





