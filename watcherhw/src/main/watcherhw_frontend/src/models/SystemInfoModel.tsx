class SystemInfoModel {
    system_name: string;
    node_name: string;
    release: string;
    version: string;
    machine: string;
    boot_time: string;

    constructor(system_name: string,
    node_name: string,
    release: string,
    version: string,
    machine: string,
    boot_time: string) {
        this.system_name = system_name;
        this.node_name = node_name;
        this.release = release;
        this.version = version;
        this.machine = machine;
        this.boot_time = boot_time;
    }
}

export default SystemInfoModel;