function Trim(sString) {
    while (sString.substring(0,1) == ' ' || sString.substring(0,1) == '\t' ||
      sString.substring(0,1) == '\r' || sString.substring(0,1) == '\n')
    {
        sString = sString.substring(1, sString.length)
    }
    while (sString.substring(sString.length-1, sString.length) == ' ' ||
      sString.substring(sString.length-1, sString.length) == '\t' ||
      sString.substring(sString.length-1, sString.length) == '\r' ||
      sString.substring(sString.length-1, sString.length) == '\n')
    {
        sString = sString.substring(0,sString.length-1)
    }
    return sString
}

module.exports.Trim = Trim
