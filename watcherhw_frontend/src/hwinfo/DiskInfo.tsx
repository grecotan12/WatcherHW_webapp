import { useState } from "react";
import DiskInfoModel from "../models/DiskInfoModel"

export const DiskInfo: React.FC<{ diskInfo: DiskInfoModel | undefined}> = (props) => {

    const [diskSpeed, setDiskSpeed] = useState([]);

    const handleInput = (event: any) => {
        event.preventDefault();

        const theLength: number | undefined = props.diskInfo?.mountpoints.length;

        console.log(event.target[0].value);
        console.log(theLength);
    }

    const fetchDiskSpeed = async (path: string) => {
        
    }

    return(
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
                        {props.diskInfo?.mountpoints.map((mp) => (
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
                            <td>{props.diskInfo?.disk_io_read}</td>
                        </tr>
                        <tr>
                            <td>Disk IO Write</td>
                            <td>{props.diskInfo?.disk_io_write}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="accordion" id="accordion">
               <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button"
                        data-bs-toggle="collapse" data-bs-target="#theForm"
                        aria-expanded="true" aria-controls="theForm">
                            Check Disk I/O Speed
                        </button>
                    </h2>
                    <form id="theForm" onSubmit={handleInput}
                    className="accordion-collapse collapse show" data-bs-parent="accordion">
                        <div className="accordion-body">
                            {props.diskInfo?.mountpoints.map((mp) => (
                                <div className="form-group">
                                    <label htmlFor={`pathInput${mp.mountpoint}`}>{mp.mountpoint} Path</label>
                                    <input type="text" className="form-control mt-2 mb-2" id={`pathInput${mp.mountpoint}`} aria-describedby={`pathHelp${mp.mountpoint}`} placeholder={`Enter absolute path to a empty folder of ${mp.mountpoint}`} />
                                    <small id={`pathHelp${mp.mountpoint}`} className="form-text text-muted mt-2 mb-2">Please enter path from {mp.mountpoint} where you have permission to an empty folder</small>
                                </div>
                            ))}
                            <button type="submit" className="btn btn-primary mt-2 mb-2">Submit</button>
                        </div>
                    </form>
               </div>
            </div>
            <div className="text-center disk-note">Reload page to recalculate</div>
        </div>
    )
}