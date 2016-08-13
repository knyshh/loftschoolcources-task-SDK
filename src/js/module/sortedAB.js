function sortAB(a, b) {
    let
        aMonth = parseInt(a.bdate.split('.')[1]),
        bMonth = parseInt(b.bdate.split('.')[1]),
        aDay = parseInt(a.bdate.split('.')[0]),
        bDay = parseInt(b.bdate.split('.')[0]);


    if(aMonth > bMonth) return 1;
    else if(aMonth < bMonth) return -1;
    else {
        if(aDay > bDay) return 1;
        else if(aDay < bDay) return -1;
        else return 0;
    }
}
module.exports = sortAB;