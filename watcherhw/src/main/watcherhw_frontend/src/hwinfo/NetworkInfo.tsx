import { useEffect, useState } from "react";
import { Spinner } from "../utils/Spinner";

export const NetworkInfo = () => {
    const [networkInfo, setNetworkInfo]: any[] = useState([]);
    const [islibsLoaded, setIsLibsLoaded] = useState(true);
    const [networkSpeed, setNetworkSpeed]: any[] = useState([]);
    const [isSpeedLoading, setIsSpeedLoading] = useState(false);

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
            const fetchNetworkInfo = async () => {
                const url: string = "http://localhost:8080/api/gethw?infoType=network";

                const res = await fetch(url);

                const resJson = await res.json();

                const loadedNetworkInfo: any[] = [];

                Object.entries(resJson).map(([key, value]) => {
                    loadedNetworkInfo.push([key, value]);
                })
                setNetworkInfo(loadedNetworkInfo);
            }
            fetchNetworkInfo().catch((error: any) => console.log(error))
        }
    }, [islibsLoaded])

    const getNetworkSpeed = async () => {
        setIsSpeedLoading(true);
        try {
            const url: string = "http://localhost:8080/api/getNetworkSpeed";
            const res = await fetch(url);
            const resJson = await res.json();
            const loadedNetworkSpeed: any[] = [];
            Object.entries(resJson).map(([key, value]) => {
                loadedNetworkSpeed.push([key, value]);
            })
            setNetworkSpeed(loadedNetworkSpeed);
        }
        catch (error) { console.log(error) }
        finally { setIsSpeedLoading(false) }
    }

    if (networkInfo.length == 0) {
        return (
            <div>
                <Spinner />
                <div className="text-center disk-note">Loading libraries and data</div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center network-title">Network Info</h2>
            <div className="text-center mb-5">
                {isSpeedLoading ?
                    <div>
                        <Spinner /> 
                        <div className="text-center disk-note">Getting Speed...</div>
                    </div>
                    :
                    <button className="btn btn-primary runButton" id="network" onClick={getNetworkSpeed}>Network Speed</button>
                }
            </div>
            <div className="container d-flex justify-content-center mt-5">
                <table className="table table-striped">
                    <tbody>
                        {networkInfo.map((each: any) => (
                            <tr>
                                <td>{each[0]}</td>
                                <td>{each[1]}</td>
                            </tr>
                        ))}
                        {networkSpeed.map((each: any) => (
                            <tr>
                                <td>{each[0]}</td>
                                <td>{each[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}