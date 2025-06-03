import { use, useEffect, useState } from "react";

export const NetworkInfo = () => {
    const [networkInfo, setNetworkInfo]: any[] = useState([]);
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

    return (
        <div className="container mt-5">
            <h2 className="text-center network-title">Network Info</h2>
            <div className="container d-flex justify-content-center mt-5">
                <table className="table table-striped">
                    <tbody>
                        {networkInfo.map((each: any) => (
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