class MemoryInfoModel {
    vmemory_total: string;
    vmemory_available: string;
    vmemory_used: string;
    vmemory_percentage: string;
    swap_total: string;
    swap_free: string;
    swap_used: string;
    swap_percentage: string;

    constructor(vmemory_total: string, vmemory_available: string, vmemory_used: string,
        vmemory_percentage: string, swap_total: string, swap_free: string,
        swap_used: string, swap_percentage: string
    ) {
        this.vmemory_total = vmemory_total;
        this.vmemory_available = vmemory_available;
        this.vmemory_used = vmemory_used;
        this.vmemory_percentage = vmemory_percentage;
        this.swap_total = swap_total;
        this.swap_free = swap_free;
        this.swap_used = swap_used;
        this.swap_percentage = swap_percentage;
    }
}

export default MemoryInfoModel;