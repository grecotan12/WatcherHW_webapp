############### Getting HW Info and Display in JSON
############### Wrote by Tan Nguyen
############### Preference to
############### https://thepythoncode.com/article/get-hardware-system-information-python
import re
import subprocess
import psutil
import platform
import json 
from datetime import datetime
import sys
import warnings
from cpuinfo import get_cpu_info
import os


if len(sys.argv) == 2:
    def get_size(bytes, suffix="B"):
        """
        Scale bytes to its proper format
        e.g:
            1253656 => '1.20MB'
            1253656678 => '1.17GB'
        """
        factor = 1024
        for unit in ["", "K", "M", "G", "T", "P"]:
            if bytes < factor:
                return f"{bytes:.2f}{unit}{suffix}"
            bytes /= factor


    if sys.argv[1] == "basic": 
        system_info = platform.uname()
        hwinfo = dict()

        hwinfo["system_name"] = system_info.system
        hwinfo["node_name"] = system_info.node
        hwinfo["release"] = system_info.release
        hwinfo["version"] = system_info.version
        hwinfo["machine"] = system_info.machine

        boot_time_timestamp = psutil.boot_time()
        bt = datetime.fromtimestamp(boot_time_timestamp)

        hwinfo["boot_time"] = f"{bt.year}/{bt.month}/{bt.day} {bt.hour}:{bt.minute}:{bt.second}"
        print(json.dumps(hwinfo))
        sys.exit()

    if sys.argv[1] == "cpu":
        cpuinfo = dict()
        cpufreq = psutil.cpu_freq()
        brand_name = get_cpu_info()["brand_raw"]
        cpu_counts = get_cpu_info()["count"]
        cpu_hz = get_cpu_info()["hz_actual_friendly"]
        processor_name = f"{brand_name} {cpu_counts} (CPUs) {cpu_hz}"
        cpuinfo["processor"] = processor_name
        cpuinfo["max_frequency"] = f"{cpufreq.max:.2f}Mhz"
        cpuinfo["min_frequency"] = f"{cpufreq.min:.2f}Mhz"
        cpuinfo["current_frequency"] = f"{cpufreq.current:.2f}Mhz"

        for i, percentage in enumerate(psutil.cpu_percent(percpu=True, interval=1)):
            cpuinfo[f"core_{i}"]  = f"{percentage}%"

        cpuinfo[f"total_cpu_usage"] = f"{psutil.cpu_percent()}%"
        print(json.dumps(cpuinfo))
        sys.exit()

    if sys.argv[1] == "memory":
        svmem = psutil.virtual_memory()
        memory = dict()
        memory["vmemory_total"] = get_size(svmem.total)
        memory["vmemory_available"] = get_size(svmem.available)
        memory["vmemory_used"] = get_size(svmem.used)
        memory["vmemory_percentage"] = f"{svmem.percent}%"

        swap = psutil.swap_memory()
        memory["swap_total"] = get_size(swap.total)
        memory["swap_free"] = get_size(swap.free)
        memory["swap_used"] = get_size(swap.used)
        memory["swap_percentage"] = f"{swap.percent}%"
        print(json.dumps(memory))
        sys.exit()

    if sys.argv[1] == "disk":
        partitions = psutil.disk_partitions()
        disk_info = dict()

        for partition in partitions:
            partition_device_dict = dict()
            partition_device_dict["mountpoint"] = partition.mountpoint
            partition_device_dict["file_system_type"] = partition.fstype
            try:
                partition_usage = psutil.disk_usage(partition.mountpoint)
            except PermissionError:
                continue

            partition_device_dict["total"] = get_size(partition_usage.total)
            partition_device_dict["used"] = get_size(partition_usage.used)
            partition_device_dict["free"] = get_size(partition_usage.free)
            partition_device_dict["percent"] = f"{partition_usage.percent}%"
            disk_info[partition.device] = partition_device_dict


        disk_io = psutil.disk_io_counters()
        disk_info["disk_io_read"] = get_size(disk_io.read_bytes)
        disk_info["disk_io_write"] = get_size(disk_io.write_bytes)
        print(json.dumps(disk_info))
        sys.exit()

    if sys.argv[1] == "network":
        network_info = dict()
        # Traverse the ipconfig information
        data = subprocess.check_output(['ipconfig','/all']).decode('utf-8').split('\n')

        # Arrange the bytes data
        for item in data:
            info = item.split('\r')[:-1]
            if len(info) == 1:
                if info[0] != '':
                    the_list = info[0].split(":")
                    if len(the_list) == 2:
                        key = the_list[0].replace(".", "")
                        if key.strip() != "" and the_list[1].strip() != "":
                            network_info[key.strip()] = the_list[1].strip()
        
        print(json.dumps(network_info))
        sys.exit()

    if sys.argv[1] == "gpu":
        gpu_info = dict()
        if not os.path.exists('help.txt'):
            subprocess.run(["dxdiag", "/t", "./watcherhw_backend/src/main/resources/python_scripts/help.txt"])

        try:
            with open('./watcherhw_backend/src/main/resources/python_scripts/help.txt', 'r') as file:
                for line in file:
                    if "Card name: " in line:
                        gpu_info["name"] = line.strip().split(":")[1].strip()
                    if "Chip type: " in line:
                        gpu_info["chip_type"] = line.strip().split(":")[1].strip()
                    if "Device Status: " in line:
                        gpu_info["dev_status"] = line.strip().split(":")[1].strip()
                    if "Device Problem Code: " in line:
                        gpu_info["problem_code"] = line.strip().split(":")[1].strip()
                    if "Driver Problem Code: " in line:
                        gpu_info["driver_code"] = line.strip().split(":")[1].strip()
                    if "Display Memory: " in line:
                        gpu_info["display_mem"] = line.strip().split(":")[1].strip()
                    if "Dedicated Memory: " in line:
                        gpu_info["ded_mem"] = line.strip().split(":")[1].strip()
                    if "Shared Memory: " in line:
                        gpu_info["shared_mem"] = line.strip().split(":")[1].strip()
        except FileNotFoundError:
            print(None)  # Return None if the file does not exist

        print(json.dumps(gpu_info))
        sys.exit()

else:
    warnings.warn('WARNING: PLEASE PASS IN ONE ARGUMENT')
    sys.exit()
