class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }


    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        } : {}

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        // all object default sent pass by reference
        // so we will make a copy by spread operator
        const queryCopy = {...this.queryStr};
        // removing some field for category
        const removeField = ["keyword","page","limit"];
        removeField.forEach((key) => delete queryCopy[key]);

        // convert querycopy into string because we will replace some keywords
        console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=> `$${key}`);
        console.log(queryStr);

        // convert string into object for mongo query
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;