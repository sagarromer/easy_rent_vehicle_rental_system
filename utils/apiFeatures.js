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
    filter() {

        const queryCopy = { ...this.queryStr };

        // Remove fields from query
        const removeFields = ['vehicleNumber', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);

        this.query = this.query.find(queryCopy);
        return this;
    }

}

export default APIFeatures; 