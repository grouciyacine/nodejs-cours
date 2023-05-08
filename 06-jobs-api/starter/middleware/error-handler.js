const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError={
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Somthing went wrong try again later'
  }

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if(err.name === 'ValidationError'){
    console.log(Object.values(err.errors))
customError.statusCode=400
customError.msg=`${Object.values(err.errors).map((it)=>it.message).join(",")}`
  }
  if(err.name==='CastError'){
    customError.msg=`NO ITEM found with id: ${err.value}`
    customError.statusCode=400
  }
  if(err.code && err.code===11000){
    customError.msg=`Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
  customError.statusCode=400
  }
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
  return res.status(customError.statusCode).json( customError.msg )

}

module.exports = errorHandlerMiddleware
