import subprocess

subprocess.run(["dxdiag", "/t", "help"])


# IF THERE IS NO FILE THEN RUN THE COMMAND
# ELSE READ THE COMMAND AND DISPLAY GPU INFO