const {StatusCodes} = require('http-status-codes')
const errorHandler = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later'
    }

    if(err.name === 'ValidationError'){
        customError.msg  = Object.values(err.errors).map((item)=> item.message).join(', ')
        customError.statusCode = StatusCodes.BAD_REQUEST //400
      }
    
      if(err.name === 'CastError'){
        customError.msg=`no item found with id : ${err.value}`
        customError.statusCode = StatusCodes.NOT_FOUND //404
      }

      return res.status(customError.statusCode).json({Error: err.name, msg:customError.msg})

}

module.exports = errorHandler