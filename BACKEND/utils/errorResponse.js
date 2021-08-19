//this is a blueprint for error handling
class ErrorResponse extends Error{
    constructor(message , statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;