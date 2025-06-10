import { useEffect, useState } from "react";
import SystemInfoModel from "../models/SystemInfoModel";
import { Spinner } from "../utils/Spinner";
import { OsImage } from "../utils/OsImage";

export const BasicInfo = () => {
    const [basicInfo, setBasicInfo] = useState<SystemInfoModel>();
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
            fetchHwInfo().catch((error: any) => {
                console.log(error.message);
            })
        }
    }, [islibsLoaded]);

    if (basicInfo == null) {
        return (
            <div>
                <Spinner />
                <div className="text-center disk-note">Loading libraries and data</div>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">
            <OsImage system_name={basicInfo.system_name} />
            <div className="container d-flex justify-content-center mt-5 mb-5">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>System Name</td>
                            <td>{basicInfo.system_name}</td>
                        </tr>
                        <tr>
                            <td>Node Name</td>
                            <td>{basicInfo.node_name}</td>
                        </tr>
                        <tr>
                            <td>Release</td>
                            <td>{basicInfo.release}</td>
                        </tr>
                        <tr>
                            <td>Version</td>
                            <td>{basicInfo.version}</td>
                        </tr>
                        <tr>
                            <td>Machine</td>
                            <td>{basicInfo.machine}</td>
                        </tr>
                        <tr>
                            <td>Boot Time</td>
                            <td>{basicInfo.boot_time}</td>
                        </tr>
                    </tbody>
                </table>
                {/* <a href="https://www.flaticon.com/free-icons/logos" title="logos icons">Logos icons created by Pixel perfect - Flaticon</a> */}
            </div>
        </div>
    );
}