import React, { useEffect, useState } from 'react';
import './App.css';
import { SystemNav } from './navfooter/SystemNav';
import { BasicInfo } from './hwinfo/BasicInfo';
import SystemInfoModel from './models/SystemInfoModel';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CpuInfo } from './hwinfo/CpuInfo';
import CpuInfoModel from './models/CpuInfoModel';
import { MemoryInfo } from './hwinfo/MemoryInfo';
import MemoryInfoModel from './models/MemoryInfoModel';
import { DiskInfo } from './hwinfo/DiskInfo';
import DiskInfoModel from './models/DiskInfoModel';

export const App = () => {
  const [basicInfo, setBasicInfo] = useState<SystemInfoModel>();
  const [theCpuInfo, setTheCpuInfo] = useState<CpuInfoModel>();
  const [memoryInfo, setMemoryInfo] = useState<MemoryInfoModel>();
  const [diskInfo, setDiskInfo] = useState<DiskInfoModel>();

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

  useEffect(() => {
    const fetchMemoryInfo = async () => {
      const url: string = "http://localhost:8080/api/gethw?infoType=memory";

      const response = await fetch(url);

      const responseJson = await response.json();

      const loadedMemoryInfo: MemoryInfoModel = {
        vmemory_total: responseJson.vmemory_total,
        vmemory_available: responseJson.vmemory_available,
        vmemory_used: responseJson.vmemory_used,
        vmemory_percentage: responseJson.vmemory_percentage,
        swap_total: responseJson.swap_total,
        swap_free: responseJson.swap_free,
        swap_used: responseJson.swap_used,
        swap_percentage: responseJson.swap_percentage
      }

      setMemoryInfo(loadedMemoryInfo);
    }
    const interval = setInterval(() => {
      fetchMemoryInfo().catch((error: any) => {
        console.log(error.message);
      })
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    const fetchDiskInfo = async () => {
      const url: string = "http://localhost:8080/api/gethw?infoType=disk";

      const response = await fetch(url);

      const responseJson = await response.json();

      const partitions: any[] = [];

      for (const [key, value] of Object.entries(responseJson)) {
          if (key === "disk_io_read" || key === "disk_io_write") {
            continue;
          } 
          partitions.push(value);
      }

      const loadedDiskInfo: DiskInfoModel = {
        mountpoints: partitions,
        disk_io_read: responseJson.disk_io_read,
        disk_io_write: responseJson.disk_io_write,
      }

      setDiskInfo(loadedDiskInfo);
    }
    fetchDiskInfo().catch((error: any) => {
      console.log(error.message);
    })
 
  }, []);

  return(
    <div className='d-flex flex-column min-vh-100'>
      <SystemNav system_name={basicInfo?.system_name} node_name={basicInfo?.node_name}/>
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
          <Route path="/ram">
            <MemoryInfo memoryInfo={memoryInfo} />
          </Route>
          <Route path="/disk">
            <DiskInfo diskInfo={diskInfo} />
          </Route>
        </Switch>
      </div>
    </div>
  )
};
