############### Getting HW Info and Display in JSON
############### Wrote by Tan Nguyen
############### Preference to
############### https://thepythoncode.com/article/get-hardware-system-information-python
import psutil
import platform
import GPUtil
import json 
from datetime import datetime
import sys
import warnings

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
    if sys.argv[1] == "basic": 
        print(json.dumps(hwinfo))
        sys.exit()

    cpufreq = psutil.cpu_freq()
    cpuinfo = dict()
    cpuinfo["processor"] = system_info.processor
    cpuinfo["max_frequency"] = f"{cpufreq.max:.2f}Mhz"
    cpuinfo["min_frequency"] = f"{cpufreq.min:.2f}Mhz"
    cpuinfo["current_frequency"] = f"{cpufreq.current:.2f}Mhz"

    for i, percentage in enumerate(psutil.cpu_percent(percpu=True, interval=1)):
        cpuinfo[f"core_{i}"]  = f"{percentage}%"

    cpuinfo[f"total_cpu_usage"] = f"{psutil.cpu_percent()}%"
    if sys.argv[1] == "cpu":
        print(json.dumps(cpuinfo))
        sys.exit()

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
    if sys.argv[1] == "memory":
        print(json.dumps(memory))
        sys.exit()

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
    if sys.argv[1] == "disk":
        print(json.dumps(disk_info))
        sys.exit()

    if_addrs = psutil.net_if_addrs()
    network_info = dict()
    for interface_name, interface_addresses in if_addrs.items():
        interface_info = dict()
        for address in interface_addresses:
            interface_info["address_family"] = address.family
            if str(address.family) == 'AddressFamily.AF_INET':
                interface_info["ip_address"] = address.address
                interface_info["netmask"] = address.netmask
                interface_info["broadcast_ip"] = address.broadcast
            elif str(address.family) == 'AddressFamily.AF_PACKET':
                interface_info["mac_address"] = address.address
                interface_info["netmask"] = address.netmask
                interface_info["broadcast_ip"] = address.broadcast
        network_info[interface_name] = interface_info

    net_io = psutil.net_io_counters()
    network_info["netio_bytes_send"] = get_size(net_io.bytes_sent)
    network_info["netio_bytes_receive"] = get_size(net_io.bytes_recv)
    if sys.argv[1] == "network":
        print(json.dumps(network_info))
        sys.exit()

    gpus = GPUtil.getGPUs()
    gpu_list_info = dict()
    for gpu in gpus:
        gpu_info = dict()
        gpu_info["gpu_name"] = gpu.name
        gpu_info["gpu_load"] = f"{gpu.load*100}%"
        gpu_info["gpu_free_memory"] = f"{gpu.memoryFree}MB"
        gpu_info["gpu_used_memory"] = f"{gpu.memoryUsed}MB"
        # get total memory
        gpu_info["gpu_total_memory"] = f"{gpu.memoryTotal}MB"
        # get GPU temperature in Celsius
        gpu_info["gpu_temperature"] = f"{gpu.temperature} °C"
        gpu_info["gpu_uuid"] = gpu.uuid
        gpu_list_info [f"gpu_{gpu.id}"] = gpu_info

    if sys.argv[1] == "gpu":
        print(json.dumps(gpu_list_info))
        sys.exit()

else:
    warnings.warn('WARNING: PLEASE PASS IN ONE ARGUMENT')
    sys.exit()
