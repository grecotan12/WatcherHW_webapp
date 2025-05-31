import MemoryInfoModel from "../models/MemoryInfoModel"

export const MemoryInfo: React.FC<{ memoryInfo: MemoryInfoModel | undefined }> = (props) => {
    return(
        <div className="container">
            <div className="container mt-5 justify-content-center align-items-center ram-animation"></div>
            <div className="container d-flex justify-content-center mt-5 mb-5">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Virtual Memory Total</td>
                            <td className="changing_output">{props.memoryInfo?.vmemory_total}</td>
                        </tr>
                        <tr>
                            <td>Virtual Memory Available</td>
                            <td className="changing_output">{props.memoryInfo?.vmemory_available}</td>
                        </tr>
                        <tr>
                            <td>Virtual Memory Used</td>
                            <td className="changing_output">{props.memoryInfo?.vmemory_used}</td>
                        </tr>
                        <tr>
                            <td>Virtual Memory Percentage</td>
                            <td className="changing_output">{props.memoryInfo?.vmemory_percentage}</td>
                        </tr>
                        <tr>
                            <td>Swap Total</td>
                            <td className="changing_output">{props.memoryInfo?.swap_total}</td>
                        </tr>
                        <tr>
                            <td>Swap Free</td>
                            <td className="changing_output">{props.memoryInfo?.swap_free}</td>
                        </tr>
                        <tr>
                            <td>Swap Used</td>
                            <td className="changing_output">{props.memoryInfo?.swap_used}</td>
                        </tr>
                        <tr>
                            <td>Swap Percentage</td>
                            <td className="changing_output">{props.memoryInfo?.swap_percentage}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}