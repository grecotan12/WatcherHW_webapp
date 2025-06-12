import time
import os
from PyLibreHardwareMonitor import Computer
import argparse
import sys
parser = argparse.ArgumentParser()
parser.add_argument('-i', '--infotype', 
                    help = "temp - for temperature, clock - for clock frequency,  pow - for cpu power, vol - for cpu voltage")

args = parser.parse_args()
if args.infotype:
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

    computer = Computer()
    if args.infotype == 'temp':
        while True:
            os.system("cls" if os.name == "nt" else "clear")
            cpu_info = computer.cpu
            cpu_name = next(iter(cpu_info))
            print("-"*5 + bcolors.BOLD + cpu_name + bcolors.ENDC + "-"*5)
            temperatures = cpu_info[cpu_name]["Temperature"]
            print("-"*5 + bcolors.BOLD + "Temperature" + bcolors.ENDC + "-"*5)
            for key, value in temperatures.items():
                if value >= 30 and value <= 50:
                    print(f"{key}: " + bcolors.OKBLUE + ("%.2f" % value) + bcolors.ENDC)
                elif value > 50 and value <= 70:
                    print(f"{key}: " + bcolors.OKCYAN + ("%.2f" % value) + bcolors.ENDC)
                elif value > 70 and value <= 80:
                    print(f"{key}: " + bcolors.WARNING + ("%.2f" % value) + bcolors.ENDC)
            time.sleep(5)
    elif args.infotype == 'clock':
        while True:
            os.system("cls" if os.name == "nt" else "clear")
            cpu_info = computer.cpu
            cpu_name = next(iter(cpu_info))
            print("-"*5 + bcolors.BOLD + "Clock" + bcolors.ENDC + "-"*5)
            clocks = cpu_info[cpu_name]['Clock']
            for key, value in clocks.items():
                print(f"{key}: " + bcolors.HEADER + ("%.2f" % value) + bcolors.ENDC)
            time.sleep(1)
    elif args.infotype == 'pow':
        while True:
            os.system("cls" if os.name == "nt" else "clear")
            cpu_info = computer.cpu
            cpu_name = next(iter(cpu_info))
            print("-"*5 + bcolors.BOLD + "Power" + bcolors.ENDC + "-"*5)
            powers = cpu_info[cpu_name]['Power']
            for key, value in powers.items():
                print(f"{key}: " + bcolors.HEADER + ("%.2f" % value) + bcolors.ENDC)
            time.sleep(5)
    elif args.infotype == 'vol':
        while True:
            os.system("cls" if os.name == "nt" else "clear")
            cpu_info = computer.cpu
            cpu_name = next(iter(cpu_info))
            print("-"*5 + bcolors.BOLD + "Voltage" + bcolors.ENDC + "-"*5)
            voltages = cpu_info[cpu_name]['Voltage']
            for key, value in voltages.items():
                print(f"{key}: " + bcolors.HEADER + ("%.2f" % value) + bcolors.ENDC)
            time.sleep(5)
    else:
        print("Please pass in temp, clock, pow, or vol")

#print(bcolors.WARNING + "TEST" + bcolors.ENDC)
    