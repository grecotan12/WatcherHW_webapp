import React, { useEffect, useState } from 'react';
import './App.css';
import { SystemNav } from './navfooter/SystemNav';
import { BasicInfo } from './hwinfo/BasicInfo';
import SystemInfoModel from './models/SystemInfoModel';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CpuInfo } from './hwinfo/CpuInfo';
import CpuInfoModel from './models/CpuInfoModel';
import { OsImage } from './utils/OsImage';

export const App = () => {
  const [basicInfo, setBasicInfo] = useState<SystemInfoModel>();
  const [theCpuInfo, setTheCpuInfo] = useState<CpuInfoModel>();

  useEffect(() => {
    const fetchHwInfo = async () => {
      const url: string = "http://localhost:8080/api/gethw?infoType=basic";

      const response = await fetch(url);

      const responseJson = await response.json();
      
      const loadedSystemInfo: SystemInfoModel = {
        system_name: responseJson.system_name,
        node_name: responseJson.node_name,
        release: responseJson.release,
        version: responseJson.version,
        machine: responseJson.machine,
        boot_time: responseJson.boot_time
      }
      setBasicInfo(loadedSystemInfo);
    }
    fetchHwInfo().catch((error : any) => {
      console.log(error.message);
    })
  }, []);

  useEffect(() => {
    const fetchCpuInfo = async () => {
      const url: string = "http://localhost:8080/api/gethw?infoType=cpu";

      const response = await fetch(url);

      const responseJson = await response.json();

      const cores: any[] = [];

      for (const [key, value] of Object.entries(responseJson)) {
        if (key.includes("core")) { cores.push(value); }
      }

      const loadedCpuInfo: CpuInfoModel = {
        processor: responseJson.processor,
        max_frequency: responseJson.max_frequency,
        min_frequency: responseJson.min_frequency,
        current_frequency: responseJson.current_frequency,
        cores: cores
      };

      setTheCpuInfo(loadedCpuInfo);
    }
    const interval = setInterval(() => {
      fetchCpuInfo().catch((error: any) => {
        console.log(error.message);
      })
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return(
    <div className='d-flex flex-column min-vh-100'>
      <SystemNav system_name={basicInfo?.system_name} node_name={basicInfo?.node_name}/>
      <div className='container mt-5'>
        <OsImage system_name={basicInfo?.system_name} />
      </div>
      <div className='flex-grow-1'>
        <Switch>
          <Route path="/" exact>
            <Redirect to='/about'/>
          </Route>
          <Route path="/about">
            <BasicInfo basicInfo={basicInfo}/>
          </Route>
          <Route path="/cpu">
            <CpuInfo theCpuInfo={theCpuInfo} />
          </Route>
        </Switch>
      </div>
    </div>
  )
};
