export const OsImage: React.FC<{system_name: string | undefined}> = (props) => {
    if (props.system_name?.toLowerCase().includes('windows')) {
        return(
            <div className="d-flex justify-content-center align-items-center m-2">
                <img src={require('../images/windows.png')} alt="System Image" className="os-img"/>
            </div>
        );
    }
    else {
        return(
            // <a href="https://www.flaticon.com/free-icons/technology" title="technology icons">Technology icons created by Freepik - Flaticon</a>
            <div className="d-flex justify-content-center align-items-center m-2">
                <img src={require('../images/technology.png')} alt="System Image" className="os-img"/>
            </div>
        )
    }
}