responseData = function (data){
    return {
        'result': true, 
        data,
    }
}


responseDataCount = function(data){
    return {
        'result':true, 
        'count': data.length, 
        data
    }
}

responseInfo = function(info, result = null){
    if(result === null){
        return{
            'result': false, 
            'data' : [],
            info
        }
    }else{
        return{ 
            'result': true, 
            'data' : result,
            info
        }    
    }
}

responseBadRequest = function(message, info){
    if(info ==""){
        return{
            message
        }
    }else{
        return{
            message,
            info
        }
    }
}

module.exports = {
    responseData,
    responseDataCount,
    responseInfo,
    responseBadRequest
}