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
       return getHardwareService.getHw(infoType);
    }
}
