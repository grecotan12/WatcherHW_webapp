class GpuInfoModel {
    name: string;
    chip_type: string;
    dev_status: string;
    problem_code: string;
    driver_code: string;
    display_mem: string;
    ded_mem: string;
    shared_mem: string;

    constructor(
        name: string,
        chip_type: string,
        dev_status: string,
        problem_code: string,
        driver_code: string,
        display_mem: string,
        ded_mem: string,
        shared_mem: string
    ) {
        this.name = name;
        this.chip_type = chip_type;
        this.dev_status = dev_status;
        this.problem_code = problem_code;
        this.driver_code = driver_code;
        this.display_mem = display_mem;
        this.ded_mem = ded_mem;
        this.shared_mem = shared_mem;
    }
}

export default GpuInfoModel;