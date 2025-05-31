import { useEffect, useState } from "react";
import CpuInfoModel from "../models/CpuInfoModel";
import { Spinner } from "../utils/Spinner";

export const CpuInfo = () => {
    const [theCpuInfo, setTheCpuInfo] = useState<CpuInfoModel>();
    
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
        fetchCpuInfo().catch((error: any) => {
            console.log(error.message);
        })
        const interval = setInterval(() => {
            fetchCpuInfo().catch((error: any) => {
                console.log(error.message);
            })
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    if (theCpuInfo == null) {
        return (
            <Spinner />
        );
    }
    return (
        <div className="container">
            <div className="container cpu-animation"></div>
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