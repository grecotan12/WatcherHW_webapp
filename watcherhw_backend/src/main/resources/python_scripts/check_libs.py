import importlib
import json
import subprocess
import sys

def check_module(module):
    try:
        importlib.import_module(module)
        return True
    except ImportError:
        return False
    
def install_module(module):
    subprocess.check_call([sys.executable, "-m", "pip", "install", module], stdout=subprocess.DEVNULL)

if __name__ == "__main__":
    if check_module('psutil') == False:
        install_module('psutil')
    if check_module('platform') == False:
        install_module('lib-platform')
    if check_module('cpuinfo') == False:
        install_module('py-cpuinfo')
    if check_module('win32com') == False:
        install_module('pywin32')
    if check_module('PyLibreHardwareMonitor') == False:
        install_module('PyLibreHardwareMonitor')
    if check_module('speedtest-cli') == False:
        install_module('speedtest-cli')

    print(json.dumps("Done"))
