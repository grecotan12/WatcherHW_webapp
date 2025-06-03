import { useEffect, useState } from "react"
import GpuInfoModel from "../models/GpuInfoModel"
import { Spinner } from "../utils/Spinner";

export const GpuInfo = () => {
    const [gpuInfo, setGpuInfo] = useState<GpuInfoModel>();

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
            const fetchGpuInfo = async () => {
                const url: string = "http://localhost:8080/api/gethw?infoType=gpu";
                
                const res = await fetch(url);
    
                const resJson = await res.json();
    
                const loadedGpuInfo: GpuInfoModel = {
                    name: resJson.name,
                    chip_type: resJson.chip_type,
                    dev_status: resJson.dev_status,
                    problem_code: resJson.problem_code,
                    driver_code: resJson.driver_code,
                    display_mem: resJson.display_mem,
                    ded_mem: resJson.ded_mem,
                    shared_mem: resJson.shared_mem
                };
                setGpuInfo(loadedGpuInfo);
            }
            fetchGpuInfo().catch((error: any) => console.log(error))
        }
    }, [islibsLoaded])

    const runGpuDetails = async () => {
        const url: string = "http://localhost:8080/api/getGpuPowerLoadsTemp";

        const res = await fetch(url);

        const resJson = await res.json();

        console.log(resJson);
    }

    if (gpuInfo == null) {
        return (
            <div>
                <Spinner />
                <div className="text-center disk-note">Loading libraries and data</div>
            </div>
        );
    }

    return(
        <div className="container">
            <div className="container gpu-animation"></div>
            <div className="text-center mb-5">
                <button className="btn btn-primary runButton" onClick={runGpuDetails}>GPU Details</button>
            </div>
            <div className="container d-flex justify-content-center mb-5">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>GPU Name</td>
                            <td>{gpuInfo.name}</td>
                        </tr>
                        <tr>
                            <td>Chip Type</td>
                            <td>{gpuInfo.chip_type}</td>
                        </tr>
                        <tr>
                            <td>Device Status</td>
                            <td>{gpuInfo.dev_status}</td>
                        </tr>
                        <tr>
                            <td>Problem ?</td>
                            <td>{gpuInfo.problem_code}</td>
                        </tr>
                        <tr>
                            <td>Driver Code</td>
                            <td>{gpuInfo.driver_code}</td>
                        </tr>
                        <tr>
                            <td>Display Memory</td>
                            <td>{gpuInfo.display_mem}</td>
                        </tr>
                        <tr>
                            <td>Dedicated Memory</td>
                            <td>{gpuInfo.ded_mem}</td>
                        </tr>
                        <tr>
                            <td>Shared Memory</td>
                            <td>{gpuInfo.shared_mem}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}