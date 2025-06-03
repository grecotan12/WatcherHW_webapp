import json
from PyLibreHardwareMonitor import Computer
import time
import os
import WinTmp

computer = Computer()

class bcolors:
        HEADER = '\033[95m'
        OKBLUE = '\033[94m'
        OKCYAN = '\033[96m'
        OKGREEN = '\033[92m'
        WARNING = '\033[93m'
        FAIL = '\033[91m'
        ENDC = '\033[0m'
        BOLD = '\033[1m'
        UNDERLINE = '\033[4m'
while True:
    os.system("cls" if os.name == "nt" else "clear")
    gpu_info = computer.gpu
    gpu_name = next(iter(gpu_info))
    print("-"*5 + bcolors.BOLD + gpu_name + bcolors.ENDC + "-"*5)
    power = gpu_info[gpu_name]['Power']['GPU Power']
    print("GPU Power: " + bcolors.OKCYAN + f"{power}" + bcolors.ENDC)
    print("-"*5 + bcolors.BOLD + "Load" + bcolors.ENDC + "-"*5)
    loads = gpu_info[gpu_name]['Load']
    for key, value in loads.items():
          print(f"{key}: " + bcolors.OKGREEN + f"{power}" + bcolors.ENDC)
    print("-"*5 + bcolors.BOLD + "Temperature" + bcolors.ENDC + "-"*5)
    gpu_temp = WinTmp.GPU_Temp()
    if gpu_temp == None:
        print("GPU Temp: " + bcolors.FAIL + "NOT FOUND" + bcolors.ENDC)
    else:
        if gpu_temp >= 30 and gpu_temp <= 50:
            print(f"GPU Temp: " + bcolors.OKBLUE + ("%.2f" % gpu_temp) + bcolors.ENDC)
        elif gpu_temp > 50 and gpu_temp <= 70:
            print(f"GPU Temp: " + bcolors.OKGREEN + ("%.2f" % gpu_temp) + bcolors.ENDC)
        elif gpu_temp > 70 and gpu_temp <= 80:
            print(f"GPU Temp: " + bcolors.WARNING + ("%.2f" % gpu_temp) + bcolors.ENDC)
    time.sleep(5)

