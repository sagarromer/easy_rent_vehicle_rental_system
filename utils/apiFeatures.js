class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const location = this.queryStr.vehicleNumber ? {
            vehicleNumber: {
                $regex: this.queryStr.vehicleNumber,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...vehicleNumber })
        return this;
    }

}

export default APIFeatures; 