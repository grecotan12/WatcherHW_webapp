import json
import admin
import sys
# print("Are you root? ", end="")
# Check if root or not
# https://github.com/raspiduino/pythonadmin
if not admin.isUserAdmin():
    if len(sys.argv) == 2:
        if sys.argv[1] == 'cpu_temps':
            print(json.dumps("Getting cpu details..."))
            admin.runAsAdmin(f"python -i ./python_scripts/get-cpudetails.py -i temp") # Run command as root
        if sys.argv[1] == 'cpu_clocks':
            print(json.dumps("Getting cpu details..."))
            admin.runAsAdmin(f"python -i ./python_scripts/get-cpudetails.py -i clock") # Run command as root
        if sys.argv[1] == 'cpu_powers':
            print(json.dumps("Getting cpu details..."))
            admin.runAsAdmin(f"python -i ./python_scripts/get-cpudetails.py -i pow") # Run command as root
        if sys.argv[1] == 'cpu_vols':
            print(json.dumps("Getting cpu details..."))
            admin.runAsAdmin(f"python -i ./python_scripts/get-cpudetails.py -i vol") # Run command as root
        if sys.argv[1] == 'gpu_power':
            print(json.dumps("Getting GPU Details..."))
            admin.runAsAdmin(f"python -i ./python_scripts/get-gpudetails.py")
        if sys.argv[1] == 'process_cpu':
            print(json.dumps("Stressing CPU to get Data For Prediction..."))
            admin.runAsAdmin(f"python -i ./python_scripts/stress-test-cpu.py")
else:
    print(json.dumps("Now you are root!"))
    input("")