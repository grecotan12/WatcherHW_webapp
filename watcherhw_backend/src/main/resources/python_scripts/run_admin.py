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
            admin.runAsAdmin(f"python -i ./watcherhw_backend/src/main/resources/python_scripts/get-cpudetails.py -i temp") # Run command as root
        if sys.argv[1] == 'cpu_clocks':
            print(json.dumps("Getting cpu details..."))
            admin.runAsAdmin(f"python -i ./watcherhw_backend/src/main/resources/python_scripts/get-cpudetails.py -i clock") # Run command as root
        if sys.argv[1] == 'cpu_powers':
            print(json.dumps("Getting cpu details..."))
            admin.runAsAdmin(f"python -i ./watcherhw_backend/src/main/resources/python_scripts/get-cpudetails.py -i pow") # Run command as root
        if sys.argv[1] == 'cpu_vols':
            print(json.dumps("Getting cpu details..."))
            admin.runAsAdmin(f"python -i ./watcherhw_backend/src/main/resources/python_scripts/get-cpudetails.py -i vol") # Run command as root
    
else:
    print(json.dumps("Now you are root!"))
    input("")