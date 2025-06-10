import subprocess

file_path = "./help.txt"  # Replace with the actual file path

try:
    subprocess.run(["del", file_path], check=True, shell=True)
    print(f"File '{file_path}' deleted successfully.")
except subprocess.CalledProcessError as e:
    print(f"Error deleting file: {e}")
except FileNotFoundError:
    print(f"File not found: {file_path}")