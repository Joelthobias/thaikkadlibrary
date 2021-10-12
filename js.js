for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if(element.bkdatestatus=false){
    let dt=element.dat
    let Cdate=new Date()
    let Ddate= dat - Cdate().getTime()
    let diff = Ddate /  (1000 * 3600 * 24)
        if(diff >15 ){
            element.bkdatestatus=true
        }
    }
    
}