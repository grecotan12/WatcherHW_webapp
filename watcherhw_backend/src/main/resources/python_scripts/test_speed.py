# Python program to test
# internet speed

import json
import speedtest 
import sys

try:
    st = speedtest.Speedtest()
except:
    speed_info = dict()
    speed_info["Download Speed"] = "Network Not Stable. Try again later"
    speed_info["Upload Speed"] = "Network Not Stable. Try again later"
    speed_info["Ping"] = "Network Not Stable. Try again later"
    print(json.dumps(speed_info))
    sys.exit()

def get_size(bytes, suffix="B"):
        """
        Scale bytes to its proper format
        e.g:
            1253656 => '1.20MB'
            1253656678 => '1.17GB'
        """
        factor = 1024
        for unit in ["", "K", "M", "G", "T", "P"]:
            if bytes < factor:
                return f"{bytes:.2f}{unit}{suffix}"
            bytes /= factor

speed_info = dict()
speed_info["Download Speed"] = get_size(st.download()) 
speed_info["Upload Speed"] = get_size(st.upload()) 
servernames =[]  
st.get_servers(servernames)  
speed_info["Ping"] = st.results.ping

print(json.dumps(speed_info))