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
            admin.runAsAdmin(f"pythonw ./python_scripts/cpu_app.pyw -i temp") # Run command as root
        if sys.argv[1] == 'cpu_clocks':
            print(json.dumps("Getting cpu details..."))
            admin.runAsAdmin(f"pythonw ./python_scripts/cpu_app.pyw -i clock") # Run command as root
        if sys.argv[1] == 'cpu_powers':
            print(json.dumps("Getting cpu details..."))
            admin.runAsAdmin(f"pythonw ./python_scripts/cpu_app.pyw -i pow") # Run command as root
        if sys.argv[1] == 'cpu_vols':
            print(json.dumps("Getting cpu details..."))
            admin.runAsAdmin(f"pythonw ./python_scripts/cpu_app.pyw -i vol") # Run command as root
        if sys.argv[1] == 'gpu_power':
            print(json.dumps("Getting GPU Details..."))
            admin.runAsAdmin(f"python -i ./python_scripts/get-gpudetails.py")
        if sys.argv[1] == 'process_cpu':
            print(json.dumps("Stressing CPU to get Data For Prediction..."))
            admin.runAsAdmin(f"python -i ./python_scripts/cputemp_stress_model.py")
else:
    print(json.dumps("Now you are root!"))
    input("")