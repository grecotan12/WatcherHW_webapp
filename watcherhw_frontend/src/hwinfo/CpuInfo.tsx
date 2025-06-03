import { useEffect, useState } from "react";
import CpuInfoModel from "../models/CpuInfoModel";
import { Spinner } from "../utils/Spinner";

export const CpuInfo = () => {
    const [theCpuInfo, setTheCpuInfo] = useState<CpuInfoModel>();
    const [islibsLoaded, setIsLibsLoaded] = useState(true);

    useEffect(() => {
        const checkPythonLibs = async () => {
            const url: string = "http://localhost:8080/api/checkLibs";
            
            const res = await fetch(url);

            const resJson = await res.json();

            console.log(resJson);

            setIsLibsLoaded(false);
        }
        checkPythonLibs().catch((error : any) => console.log(error.message));
    }, []);

    useEffect(() => {
        if (!islibsLoaded) {
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
            fetchCpuInfo().catch((error: any) => {
                console.log(error.message);
            })
            const interval = setInterval(() => {
                fetchCpuInfo().catch((error: any) => {
                    console.log(error.message);
                })
            }, 10000);
    
            return () => clearInterval(interval);
        }
    }, [islibsLoaded]);


    const fetchCpuTemps = async () => {
        const url: string = "http://localhost:8080/api/monitorCpu?cpuInfoType=cpu_temps";

        const res = await fetch(url);

        const resJson = await res.json();

        console.log(resJson);
    }

    const fetchCpuClocks = async () => {
        const url: string = "http://localhost:8080/api/monitorCpu?cpuInfoType=cpu_clocks";

        const res = await fetch(url);

        const resJson = await res.json();

        console.log(resJson);
    }

    const fetchCpuPowers = async () => {
        const url: string = "http://localhost:8080/api/monitorCpu?cpuInfoType=cpu_powers";

        const res = await fetch(url);

        const resJson = await res.json();

        console.log(resJson);
    }

    const fetchCpuVols = async () => {
        const url: string = "http://localhost:8080/api/monitorCpu?cpuInfoType=cpu_vols";

        const res = await fetch(url);

        const resJson = await res.json();

        console.log(resJson);
    }

    if (theCpuInfo == null) {
        return (
            <div>
                <Spinner />
                <div className="text-center disk-note">Loading libraries and data</div>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="container cpu-animation"></div>
            <div className="container d-flex justify-content-around mb-5">
                <button className="btn btn-primary runButton" onClick={fetchCpuTemps}>CPU Temps</button>
                <button className="btn btn-primary runButton" onClick={fetchCpuClocks}>CPU Clocks</button>
                <button className="btn btn-primary runButton" onClick={fetchCpuPowers}>CPU Powers</button>
                <button className="btn btn-primary runButton" onClick={fetchCpuVols}>CPU Voltages</button>
            </div>
            <div className="container d-flex justify-content-center mb-5">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Processor</td>
                            <td>{theCpuInfo.processor}</td>
                        </tr>
                        <tr>
                            <td>Max Frequency</td>
                            <td>{theCpuInfo.max_frequency}</td>
                        </tr>
                        <tr>
                            <td>Min Frequency</td>
                            <td>{theCpuInfo.min_frequency}</td>
                        </tr>
                        <tr>
                            <td>Current Frequency</td>
                            <td>{theCpuInfo.current_frequency}</td>
                        </tr>
                        {theCpuInfo.cores.map((core, count) => (
                            <tr>
                                <td>Core {count + 1}</td>
                                <td className="changing_output">{core}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}