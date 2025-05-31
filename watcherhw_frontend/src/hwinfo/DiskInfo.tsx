import { useEffect, useRef, useState } from "react";
import DiskInfoModel from "../models/DiskInfoModel"
import { Spinner } from "../utils/Spinner";
import { clear } from "console";

export const DiskInfo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [speedInfo, setSpeedInfo]: any[] = useState([]);

    const [diskInfo, setDiskInfo] = useState<DiskInfoModel>();

    const inputElement = useRef(null);
    const [thePath, setThePath]: any[] = useState([]);

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

    const handleInput = async (event: any) => {
        event.preventDefault();
        const loadedPaths: any[] = [];

        const theLength: any = diskInfo?.mountpoints.length;
        for (let i = 0; i < theLength; i++) {
            setIsLoading(true);
            loadedPaths.push(event.target[i].value);
            setIsLoading(false);
        }
        setThePath(loadedPaths);
    }

    useEffect(() => {
        const fetchSpeed = async () => {
            const loadedSpeedInfo: any = [];
            for (let i = 0; i < thePath.length; i++) {
                try {
                    const pathEncode: string = encodeURIComponent(thePath[i]);
                    const url: string = `http://localhost:8080/api/getDiskSpeed?absolutePath=${pathEncode}`;
    
                    const response = await fetch(url);
                    const responseJson = await response.json();
    
                    const theSpeedInfo = {
                        mountpoint: diskInfo?.mountpoints[i].mountpoint,
                        speed: responseJson.speedInfo,
                    }
    
                    if (responseJson.speedInfo.includes('Mbytes')) {
                        document.getElementById(`pathInput${i}`)?.setAttribute("disabled", "true");
                    }
                    loadedSpeedInfo.push(theSpeedInfo);
                } catch (error) {
                    console.log(error);
                }
            }
            setSpeedInfo(loadedSpeedInfo);
        }
        const interval = setInterval(() => {
            fetchSpeed().catch((error: any) => console.log(error));
        }, 10000)
        return () => clearInterval(interval);
    }, [thePath]);
    return (
        <div className="container">
            <div className="container mt-5 mb-5 justify-content-center align-items-center disk-animation"></div>
            <div className="container d-flex justify-content-center mt-5">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Mountpoint</th>
                            <th>File System Type</th>
                            <th>Total</th>
                            <th>Used</th>
                            <th>Free</th>
                            <th>Percent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diskInfo?.mountpoints.map((mp) => (
                            <tr>
                                <td>{mp.mountpoint}</td>
                                <td>{mp.file_system_type}</td>
                                <td>{mp.total}</td>
                                <td>{mp.used}</td>
                                <td>{mp.free}</td>
                                <td>{mp.percent}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div className="container d-flex justify-content-center mt-5 mb-5">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Disk IO Read</td>
                            <td>{diskInfo?.disk_io_read}</td>
                        </tr>
                        <tr>
                            <td>Disk IO Write</td>
                            <td>{diskInfo?.disk_io_write}</td>
                        </tr>
                        {speedInfo.map((each: any) => (
                            <tr>
                                <td>{each.mountpoint} Write Speed</td>
                                <td className="changing_output">{each.speed}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="accordion" id="accordion">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button"
                            data-bs-toggle="collapse" data-bs-target="#theForm"
                            aria-expanded="true" aria-controls="theForm">
                            Check Disk Write Speed
                        </button>
                    </h2>
                    <form id="theForm" onSubmit={handleInput}
                        className="accordion-collapse collapse show" data-bs-parent="accordion">
                        <div className="accordion-body">
                            {diskInfo?.mountpoints.map((mp, count) => (
                                <div className="form-group">
                                    <label htmlFor={`pathInput${count}`}>{mp.mountpoint} Path</label>
                                    <input ref={inputElement} type="text" className="form-control mt-2 mb-2" id={`pathInput${count}`} aria-describedby={`pathHelp${count}`} placeholder={`Enter absolute path to a empty folder of ${mp.mountpoint}`} />
                                    <small id={`pathHelp${count}`} className="form-text text-muted mt-2 mb-2">Please enter path from {mp.mountpoint} where you have permission to an empty folder</small>
                                </div>
                            ))}
                            {isLoading ? <Spinner />
                                :
                                <button type="submit" className="btn btn-primary mt-2 mb-2">Submit</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            <div className="text-center disk-note">Reload page to recalculate</div>
        </div>
    )
}