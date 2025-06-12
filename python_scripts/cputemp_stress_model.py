import numpy as np
import time
import psutil
from PyLibreHardwareMonitor import Computer
import csv
import subprocess
import os
import pandas as pd

current_directory = os.getcwd()
file_path = f"{current_directory}\\cpu_temp_data.csv" 
subprocess.run(["del", file_path], check=True, shell=True)

data = []
computer = Computer()
cpu_info = computer.cpu
cpu_name = next(iter(cpu_info))

matrix_num = 0

while matrix_num <= 3000:
    # Create large matrices
    m1 = np.random.rand(matrix_num, matrix_num)
    m2 = np.random.rand(matrix_num, matrix_num)

    start_time = time.time()
    duration = 30  # Seconds
    count = 1
    while time.time() - start_time < duration:
        # Perform matrix multiplication and normalization repeatedly
        np.linalg.norm(np.dot(m1, m2))
        if int(time.time() - start_time) == count:
            info = dict()
            info["Usage"] = round(psutil.cpu_percent(), 2)
            cpu_info = computer.cpu

            powers = cpu_info[cpu_name]['Power']
            power_average = 0
            for value in powers.values():
                power_average += value
            power_average /= len(powers.values())
            info["Power"] = round(power_average, 2)

            clock_average = 0
            clocks = cpu_info[cpu_name]['Clock']
            for key, value in clocks.items():
                if key == "Bus Speed":
                    continue
                else:
                    clock_average += value
            clock_average /= (len(clocks.values()) - 1)
            info["Frequency"] = round(clock_average, 2)

            voltage_average = 0
            voltages = cpu_info[cpu_name]['Voltage']
            for value in voltages.values():
                voltage_average += value
            voltage_average /= len(voltages.values())
            info["Voltage"] = round(voltage_average, 2)

            temps = cpu_info[cpu_name]['Temperature']
            temp_averages = []
            for value in powers.values():
                temp_averages.append(value)
            info["Temperature"] = round(pd.Series(temp_averages).mean(), 2)

            data.append(info)
            count += 1
        
    print(f"Stress test matrix num: {matrix_num} completed.")
    matrix_num += 500

with open('cpu_temp_data.csv', 'w', newline='') as csvfile:
    fieldnames = ['Usage', 'Power', 'Frequency', 'Voltage', 'Temperature']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)