var _date = new Date()
_date     = new Date(_date.getTime() + new Date().getTimezoneOffset() * 60 * 1000)

function GetYear(){
    return _date.getFullYear()
}

function GetMount(){
    var month = _date.getMonth() + 1
    if(month < 10){ return `0${month}` }
    return month
}

function Date(){
    return _date.getDate()
}

function GetHour(){
    var hour = _date.getHours()
    if(hour < 10){ return `0${hour}` }
    return hour
}

function GetMinute(){
    var minute = _date.getMinutes()
    if(minute < 10){ return `0${minute}` }
    return minute
}

module.exports.GetYear   = GetYear
module.exports.GetMount  = GetMount
module.exports.Date      = GetMount
module.exports.GetHour   = GetHour
module.exports.GetMinute = GetMinute
