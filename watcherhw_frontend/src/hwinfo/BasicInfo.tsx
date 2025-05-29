import { useState } from "react";
import SystemInfoModel from "../models/SystemInfoModel";
import { Spinner } from "../utils/Spinner";

export const BasicInfo: React.FC<{ basicInfo: SystemInfoModel | undefined }> = (props) => {
    if (props.basicInfo == null) {
        return (
            <Spinner />
        );
    }
    return (
        <div className="container d-flex justify-content-center mt-5 mb-5">
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <td>System Name</td>
                        <td>{props.basicInfo?.system_name}</td>
                    </tr>
                    <tr>
                        <td>Node Name</td>
                        <td>{props.basicInfo?.node_name}</td>
                    </tr>
                    <tr>
                        <td>Release</td>
                        <td>{props.basicInfo?.release}</td>
                    </tr>
                    <tr>
                        <td>Version</td>
                        <td>{props.basicInfo?.version}</td>
                    </tr>
                    <tr>
                        <td>Machine</td>
                        <td>{props.basicInfo?.machine}</td>
                    </tr>
                    <tr>
                        <td>Boot Time</td>
                        <td>{props.basicInfo?.boot_time}</td>
                    </tr>
                </tbody>
            </table>
            {/* <a href="https://www.flaticon.com/free-icons/logos" title="logos icons">Logos icons created by Pixel perfect - Flaticon</a> */}
        </div>
    );
}