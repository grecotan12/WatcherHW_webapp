import React from 'react';
import './App.css';
import { SystemNav } from './navfooter/SystemNav';
import { BasicInfo } from './hwinfo/BasicInfo';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CpuInfo } from './hwinfo/CpuInfo';
import { MemoryInfo } from './hwinfo/MemoryInfo';
import { DiskInfo } from './hwinfo/DiskInfo';
import { GpuInfo } from './hwinfo/GpuInfo';

export const App = () => {

  return(
    <div className='d-flex flex-column min-vh-100'>
      <SystemNav/>
      <div className='flex-grow-1'>
        <Switch>
          <Route path="/" exact>
            <Redirect to='/about'/>
          </Route>
          <Route path="/about">
            <BasicInfo/>
          </Route>
          <Route path="/cpu">
            <CpuInfo/>
          </Route>
          <Route path="/ram">
            <MemoryInfo/>
          </Route>
          <Route path="/disk">
            <DiskInfo/>
          </Route>
          <Route path="/gpu">
            <GpuInfo/>
          </Route>
        </Switch>
      </div>
    </div>
  )
};
