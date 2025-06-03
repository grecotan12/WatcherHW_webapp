package com.watcherhw_backend.watcherhw.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.watcherhw_backend.watcherhw.service.GetHardwareService;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class TheController {

    @Autowired
    private GetHardwareService getHardwareService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/gethw")
    public String getHw(@RequestParam String infoType) {
       return getHardwareService.runScript("./watcherhw_backend/src/main/resources/python_scripts/hw-test.py", infoType);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getDiskSpeed")
    public String getDiskSpeed(@RequestParam String absolutePath) {
        return getHardwareService.runScript("./watcherhw_backend/src/main/resources/python_scripts/disk_speed_lib/diskspeed.py", absolutePath);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/monitorCpu")
    public String monitorCpu(@RequestParam String cpuInfoType) {
        return getHardwareService.runScript("./watcherhw_backend/src/main/resources/python_scripts/run_admin.py",  cpuInfoType);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/checkLibs")
    public String checkLibs() {
        return getHardwareService.runScript("./watcherhw_backend/src/main/resources/python_scripts/check_libs.py", "");
    }
}
