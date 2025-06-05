#!/usr/bin/env python

import json
import time, os, sys

def writetofile(filename,mysizeMB):
	# writes string to specified file repeatdely, until mysizeMB is reached. Then deletes fle 
	mystring = "The quick brown fox jumps over the lazy dog"
	writeloops = int(1000000*mysizeMB/len(mystring))
	try:
		f = open(filename, 'w')
	except:
		# no better idea than:
		raise
	for x in range(0, writeloops):
		f.write(mystring)
	f.close()
	os.remove(filename)

############## 

def diskspeedmeasure(dirname):
	# returns writing speed to dirname in MB/s
	# method: keep writing a file, until 0.5 seconds is passed. Then divide bytes written by time passed
	filesize = 1	# in MB
	maxtime = 0.5 	# in sec
	filename = os.path.join(dirname,'outputTESTING.txt')
	start = time.time()
	loopcounter = 0
	while True:
		try:
			writetofile(filename, filesize)
		except:
			# I have no better idea than:
			raise	
		loopcounter += 1
		diff = time.time() - start
		if diff > maxtime: break
	return (loopcounter*filesize)/diff

############## Start of main


if __name__ == "__main__":
	speedInfo = dict()
	if len(sys.argv) >= 2:
		dirname = sys.argv[1]
		if not os.path.isdir(dirname): 
			speedInfo["speedInfo"] = "Can't find directory"
			print(json.dumps(speedInfo))
			sys.exit(1)
	# else:
	# 	# no argument, so use current working directory
	# 	dirname = os.getcwd()
	# 	print("Using current working directory")

		try:
			speed = diskspeedmeasure(dirname)
			speedInfo["speedInfo"] = "%.2f Mbytes/sec" % speed
			print(json.dumps(speedInfo))
		except IOError:
			speedInfo["speedInfo"] = f"Check that you have write rights to directory {dirname}"
			print(json.dumps(speedInfo))
		except:
			speedInfo["speedInfo"] = "Something went wrong"
			print(json.dumps(speedInfo))

