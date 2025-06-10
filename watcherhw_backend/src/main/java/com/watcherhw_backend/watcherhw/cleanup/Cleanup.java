package com.watcherhw_backend.watcherhw.cleanup;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.watcherhw_backend.watcherhw.service.GetHardwareService;

@Component
public class Cleanup {
    @PreDestroy
    public void cleanup() {
        try {

            String [] cmd = {"python", "./python_scripts/delete_help.py", ""};

            Process process = Runtime.getRuntime().exec(cmd);

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            String output = "";
            String line;
            while ((line = reader.readLine()) != null) {
                output += line + " ";
            }
            int exitCode = process.waitFor();
 
            System.out.println(output);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            System.out.println("ERROR RUNNING SCRIPT");
        }
    }
}
