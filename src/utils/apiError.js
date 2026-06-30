class ApiError extends Error {
    constructor(
        message = "something went wrong",
        statusCode,
        errors = [],
        stack = " "
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null
        this.message = message
        this.sucess = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }