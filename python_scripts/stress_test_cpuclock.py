import numpy as np
import time
import psutil
from PyLibreHardwareMonitor import Computer
import csv
import subprocess
import os
import pandas as pd

current_directory = os.getcwd()
file_path = f"{current_directory}\\cpu_clock_data.csv" 
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
            cpu_info = computer.cpu
        
            info["Usage"] = round(psutil.cpu_percent(), 2)

            temps = cpu_info[cpu_name]['Temperature']
            temp_averages = []
            for value in temps.values():
                temp_averages.append(value)
            info["Temperature"] = round(pd.Series(temp_averages).mean(), 2)

            powers = cpu_info[cpu_name]['Power']
            power_averages = []
            for value in powers.values():
                power_averages.append(value)
            info["Power"] = round(pd.Series(power_averages).mean(), 2)

            voltages = cpu_info[cpu_name]['Voltage']
            voltages_averages = []
            for value in voltages.values():
                voltages_averages.append(value)
            info["Voltage"] = round(pd.Series(voltages_averages).mean(), 2)

            clock_averages = []
            clocks = cpu_info[cpu_name]['Clock']
            for key, value in clocks.items():
                if key == "Bus Speed":
                    continue
                else:
                    clock_averages.append(value)
            info["clock_mhz"] = round(pd.Series(clock_averages).mean(), 2)

            data.append(info)
            count += 1
        
    print(f"Stress test matrix num: {matrix_num} completed.")
    matrix_num += 500

df = pd.DataFrame(data)
df.to_csv('cpu_clock_data.csv', index=False)
print("Saved.")