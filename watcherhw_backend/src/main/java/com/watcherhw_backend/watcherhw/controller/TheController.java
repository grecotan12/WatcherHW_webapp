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
       return getHardwareService.runScript("./scripts/hw-test.py", infoType);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getDiskSpeed")
    public String getDiskSpeed(@RequestParam String absolutePath) {
        return getHardwareService.runScript("./scripts/disk_speed_lib/diskspeed.py", absolutePath);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/monitorCpu")
    public String monitorCpu(@RequestParam String cpuInfoType) {
        return getHardwareService.runScript("./scripts/run_admin.py",  cpuInfoType);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getGpuPowerLoadsTemp")
    public String getGpuPowerLoadsTemp() {
        return getHardwareService.runScript("./scripts/run_admin.py",  "gpu_power");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/checkLibs")
    public String checkLibs() {
        return getHardwareService.runScript("./scripts/check_libs.py", "");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getNetworkSpeed")
    public String getNetworkSpeed() {
        return getHardwareService.runScript("./scripts/test_speed.py", "");
    }
}
