import tkinter as tk
from tkinter import ttk
from PyLibreHardwareMonitor import Computer
import argparse
import tkinter.font as tkFont

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
            the_val = ""
            if args.infotype == "temp":
                the_val = f"{round(temp_val, 2)}°C"
            elif args.infotype == "pow":
                the_val = f"{round(temp_val, 2)} W"
            elif args.infotype == "vol":
                the_val = f"{round(temp_val, 2)} V"
            elif args.infotype == "clock":
                the_val = f"{round(temp_val, 2)} Mhz"
            temps[i].config(text=the_val)
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
    window.geometry("600x400")
    
    row_c = 0
    
    if args.infotype == "temp":
        window.title("CPU Temperature")
    elif args.infotype == "pow":
        window.title("CPU Power")
    elif args.infotype == "vol":
        window.title("CPU Voltage")
    elif args.infotype == "clock":
        window.title("CPU Clock")
    
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
        label_font = tkFont.Font(family="Helvetica", size=12)
        key = create_widget(frame, tk.Label, text=f"{key}", height=1, padx=10, pady=10,
                        bg='#90D1CA', font=label_font)
        key.grid(row = row_c , column = 0, padx=10, pady=2)

        the_val = ""
        if args.infotype == "temp":
            the_val = f"{round(value, 2)}°C"
        elif args.infotype == "pow":
            the_val = f"{round(value, 2)} W"
        elif args.infotype == "vol":
            the_val = f"{round(value, 2)} V"
        elif args.infotype == "clock":
            the_val = f"{round(value, 2)} Mhz"
        
        val_font = tkFont.Font(family="Arial", size=12, weight=tkFont.BOLD)
        value = create_widget(frame, tk.Label, fg="#FFFBDE",
                        text=the_val, height=1, width=15, padx=10, pady=10,
                        bg='#129990', 
                        relief=tk.RAISED,
                        bd=3,
                        highlightthickness=2,
                        highlightbackground='black', font=val_font)
        value.grid(row = row_c, column = 1, padx=10, pady=2)
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