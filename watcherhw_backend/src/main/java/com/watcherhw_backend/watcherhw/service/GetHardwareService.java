package com.watcherhw_backend.watcherhw.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.springframework.stereotype.Service;

@Service
public class GetHardwareService {
    public String getHw(String infoType) {
        try {
            String pythonScriptPath = "./watcherhw_backend/src/main/resources/python_scripts/hw-test.py";

            String [] cmd = {"python", pythonScriptPath, infoType};

            Process process = Runtime.getRuntime().exec(cmd);

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            String output = "";
            String line;
            while ((line = reader.readLine()) != null) {
                output += line + " ";
            }
            int exitCode = process.waitFor();
 
            return output;
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "Error running script";
        }
    }
}
