class DiskModel {
    mountpoint: string;
    file_system_type: string;
    total: string;
    used: string;
    free: string;
    percent: string;

    constructor(mountpoint: string,
    file_system_type: string,
    total: string,
    used: string,
    free: string,
    percent: string) {
        this.mountpoint = mountpoint;
        this.file_system_type = file_system_type;
        this.total = total;
        this.used = used;
        this.free = free;
        this.percent = percent;
    }
}

export default DiskModel;