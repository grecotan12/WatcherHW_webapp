class CpuInfoModel {
    processor: string;
    max_frequency: string;
    min_frequency: string;
    current_frequency: string;
    cores: string[]

    constructor(processor: string, max_frequency: string, min_frequency: string,
        current_frequency: string, cores: string[]
    ) {
        this.processor = processor;
        this.max_frequency = max_frequency;
        this.min_frequency = min_frequency;
        this.current_frequency = current_frequency;
        this.cores = cores;
    }
}

export default CpuInfoModel;