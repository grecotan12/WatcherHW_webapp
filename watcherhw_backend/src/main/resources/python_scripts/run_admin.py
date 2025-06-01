import os
import admin
print("Are you root? ", end="")
# Check if root or not
# https://github.com/raspiduino/pythonadmin
if not admin.isUserAdmin():
    print("No")
    print("Getting root...")
    admin.runAsAdmin(f"python -i ./watcherhw_backend/src/main/resources/python_scripts/get-cputemps.py") # Run command as root
else:
    print("Now you are root!")
    input("")