import { useEffect, useState } from "react";
import MemoryInfoModel from "../models/MemoryInfoModel"
import { Spinner } from "../utils/Spinner";

export const MemoryInfo = () => {
    const [memoryInfo, setMemoryInfo] = useState<MemoryInfoModel>();
    const [islibsLoaded, setIsLibsLoaded] = useState(true);

    useEffect(() => {
        const checkPythonLibs = async () => {
            const url: string = "http://localhost:8080/api/checkLibs";

            const res = await fetch(url);

            const resJson = await res.json();

            console.log(resJson);

            setIsLibsLoaded(false);
        }
        checkPythonLibs().catch((error: any) => console.log(error.message));
    }, []);

    useEffect(() => {
        if (!islibsLoaded) {
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
            fetchMemoryInfo().catch((error: any) => {
                console.log(error.message);
            })
            const interval = setInterval(() => {
                fetchMemoryInfo().catch((error: any) => {
                    console.log(error.message);
                })
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [islibsLoaded]);

    if (memoryInfo == null) {
        return (
            <div>
                <Spinner />
                <div className="text-center disk-note">Loading libraries and data</div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="container mt-5 justify-content-center align-items-center ram-animation"></div>
            <div className="container d-flex justify-content-center mt-5 mb-5">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Virtual Memory Total</td>
                            <td className="changing_output">{memoryInfo?.vmemory_total}</td>
                        </tr>
                        <tr>
                            <td>Virtual Memory Available</td>
                            <td className="changing_output">{memoryInfo?.vmemory_available}</td>
                        </tr>
                        <tr>
                            <td>Virtual Memory Used</td>
                            <td className="changing_output">{memoryInfo?.vmemory_used}</td>
                        </tr>
                        <tr>
                            <td>Virtual Memory Percentage</td>
                            <td className="changing_output">{memoryInfo?.vmemory_percentage}</td>
                        </tr>
                        <tr>
                            <td>Swap Total</td>
                            <td className="changing_output">{memoryInfo?.swap_total}</td>
                        </tr>
                        <tr>
                            <td>Swap Free</td>
                            <td className="changing_output">{memoryInfo?.swap_free}</td>
                        </tr>
                        <tr>
                            <td>Swap Used</td>
                            <td className="changing_output">{memoryInfo?.swap_used}</td>
                        </tr>
                        <tr>
                            <td>Swap Percentage</td>
                            <td className="changing_output">{memoryInfo?.swap_percentage}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}