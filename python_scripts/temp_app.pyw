import tkinter as tk
from tkinter import ttk
from PyLibreHardwareMonitor import Computer
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-i', '--infotype', 
                    help = "temp - for temperature, clock - for clock frequency,  pow - for cpu power, vol - for cpu voltage")
args = parser.parse_args()

if args.infotype:
    def update_vals():
        cpu_info = computer.cpu
        cpu_name = next(iter(cpu_info))
        the_info = dict()
        if args.infotype == "temp":
            the_info = cpu_info[cpu_name]["Temperature"]
        elif args.infotype == "pow":
            the_info = cpu_info[cpu_name]["Power"]
        elif args.infotype == "vol":
            the_info = cpu_info[cpu_name]["Voltage"]
        elif args.infotype == "clock":
            the_info = cpu_info[cpu_name]["Clock"]
        for i, temp_val in enumerate(the_info.values()):
            temps[i].config(text=f"{round(temp_val, 2)}")
        window.after(1000, update_vals)
            
    def create_widget(parent, widget_type, **options):
        return widget_type(parent, **options)

    def _on_mousewheel(event):
        canvas.yview_scroll(int(-1 * (event.delta / 120)), "units")
    
    computer = Computer()
    cpu_info = computer.cpu
    cpu_name = next(iter(cpu_info))
    the_info = dict()
    if args.infotype == "temp":
        the_info = cpu_info[cpu_name]["Temperature"]
    elif args.infotype == "pow":
        the_info = cpu_info[cpu_name]["Power"]
    elif args.infotype == "vol":
        the_info = cpu_info[cpu_name]["Voltage"]
    elif args.infotype == "clock":
        the_info = cpu_info[cpu_name]["Clock"]

    window = tk.Tk()
    window.geometry("425x400")
    window.title("CPU Details")
    row_c = 0

    canvas = tk.Canvas(window)
    canvas.grid(row=0, column=0, sticky="nsew")

    # Vertical Scrollbar
    yscrollbar = tk.Scrollbar(window, orient="vertical", command=canvas.yview)
    yscrollbar.grid(row=0, column=1, sticky="ns")
    canvas.configure(yscrollcommand=yscrollbar.set)

    # Frame for Scrollable Content
    frame = tk.Frame(canvas)
    canvas.create_window((0, 0), window=frame, anchor="nw")

    temps = []
    for key, value in the_info.items():
        key = create_widget(frame, tk.Label, text=f"{key}", 
                        width=30,
                        height=1,
                        bg='lightblue')
        key.grid(row = row_c , column = 0, padx=10, pady=1)

        value = create_widget(frame, tk.Label, 
                        text=f"{round(value, 2)}",
                        width=20,
                        height=1,
                        bg='lightblue', 
                        relief=tk.RAISED,
                        bd=3,
                        highlightthickness=2,
                        highlightbackground='black')
        value.grid(row = row_c, column = 1, padx=10, pady=1)
        temps.append(value)
        row_c += 1
    frame.update_idletasks()
    canvas.config(scrollregion=canvas.bbox("all"))

    # Configure row/column to expand
    window.grid_rowconfigure(0, weight=1)
    window.grid_columnconfigure(0, weight=1)

    def _on_mousewheel(event):
        canvas.yview_scroll(int(-1 * (event.delta / 120)), "units")

    canvas.bind_all("<MouseWheel>", _on_mousewheel)
    update_vals()
    window.mainloop()