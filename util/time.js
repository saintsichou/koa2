module.exports = function time() { 
    let y = new Date().getFullYear();
    let m = (new Date().getMonth()+1)<10?"0"+(new Date().getMonth()+1):new Date().getMonth()+1;
    let d = new Date().getDate()<10?"0"+new Date().getDate():new Date().getDate();
    let h = new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours();
    let min = new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes();
    let ms = new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds();
    
    let nowTime = `${y}-${m}-${d} ${h}:${min}:${ms}`
    return nowTime;
 }