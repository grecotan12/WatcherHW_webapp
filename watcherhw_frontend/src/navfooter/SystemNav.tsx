import { NavLink } from "react-router-dom"

export const SystemNav: React.FC<{ system_name: string | undefined, node_name: string | undefined}> = (props) => {
    return (
        // <a href="https://www.flaticon.com/free-icons/big-data" title="big data icons">Big data icons created by xnimrodx - Flaticon</a>
        <nav className="navbar thenav">
            <div className="container-fluid">
                <span className="nav-brand mb-2 h1"><img src={require('../images/monitor.png')} alt="monitor image" style={{width: 50, height: 50}}/> WatcherHW</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">System Information</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/about">About</NavLink>
                            </li>
                            <hr />
                            <li className="nav-item">
                                <NavLink className="nav-link"  to="/cpu">CPU Performance</NavLink>
                            </li>
                            <hr />
                            <li className="nav-item">
                                <NavLink className="nav-link"  to="/ram">Memory Performance</NavLink>
                            </li>
                            <hr />
                            <li className="nav-item">
                                <a className="nav-link" href="#">Disk Performance</a>
                            </li>
                            <hr />
                            <li className="nav-item">
                                <a className="nav-link" href="#">GPU Performance</a>
                            </li>
                            <hr />
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}