/**
 * Created by ewind on 15/5/6.
 */
var test = new Date();
var fromTime = 1000000000;

test.setTime(fromTime * 1000);

console.log(test.getFullYear() + "年" + (test.getMonth()+1) + "月" + test.getDate() + "日");