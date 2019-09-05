var yesterday=new Date(new Date - 1000 * 60 * 60 * 24);      //昨天时间
var day2=new Date(new Date - 1000 * 60 * 60 * 24 * 2);      //前天时间
var day3=new Date(new Date - 1000 * 60 * 60 * 24 * 3);      
var day4=new Date(new Date - 1000 * 60 * 60 * 24 * 4);      
var day5=new Date(new Date - 1000 * 60 * 60 * 24 * 5);      
var day6=new Date(new Date - 1000 * 60 * 60 * 24 * 6);      
var day7=new Date(new Date - 1000 * 60 * 60 * 24 * 7);      

//时间转化
var formatDate = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
   return m + '-' + d;  
}; 
yesterday=formatDate(yesterday);
day2=formatDate(day2);
day3=formatDate(day3);
day4=formatDate(day4);
day5=formatDate(day5);
day6=formatDate(day6);
day7=formatDate(day7);

var dateList=[];
dateList.push(day7,day6,day5,day4,day3,day2,yesterday);

export {dateList}
