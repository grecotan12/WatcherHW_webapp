import DiskModel from "./DiskModel";

class DiskInfoModel {
    mountpoints: DiskModel[];
    disk_io_read: string;
    disk_io_write: string;

    constructor(mountpoints: DiskModel[],
    disk_io_read: string,
    disk_io_write: string) {
        this.mountpoints = mountpoints;
        this.disk_io_read = disk_io_read;
        this.disk_io_write = disk_io_write;
    }
}

export default DiskInfoModel;