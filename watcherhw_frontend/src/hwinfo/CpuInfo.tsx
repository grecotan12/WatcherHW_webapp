import CpuInfoModel from "../models/CpuInfoModel";
import { Spinner } from "../utils/Spinner";

export const CpuInfo: React.FC<{theCpuInfo : CpuInfoModel | undefined}> = (props) => {
    if (props.theCpuInfo == null) {
            return(
                <Spinner />
            );
        }
    return(
        <div className="container">
            <div className="container cpu-animation"></div>
            <div className="container d-flex justify-content-center mb-5">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Processor</td>
                            <td>{props.theCpuInfo?.processor}</td>
                        </tr>
                        <tr>
                            <td>Max Frequency</td>
                            <td>{props.theCpuInfo?.max_frequency}</td>
                        </tr>
                        <tr>
                            <td>Min Frequency</td>
                            <td>{props.theCpuInfo?.min_frequency}</td>
                        </tr>
                        <tr>
                            <td>Current Frequency</td>
                            <td>{props.theCpuInfo?.current_frequency}</td>
                        </tr>
                        {props.theCpuInfo?.cores.map((core, count) =>(
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