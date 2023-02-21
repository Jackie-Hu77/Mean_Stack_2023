function findClosestElements(givenNum, givenArr) {
	        
    givenArr.sort((a,b)=>{
        const dist1 = Math.abs(a-givenNum), dist2 = Math.abs(b-givenNum);
        return dist1 == dist2 ? a-b : dist1-dist2;
    });
    const ans = givenArr.slice(0,3);
    ans.sort();
    return ans;

}
// var test = [55, 32, 45, 16, 25, 74, 22, 13, 27, 41];
// document.write(findClosestElements(50, test));
function findPlindrome(str){
let reg = /\s*/g; // \w 匹配所有字母和数字以及下划线； \W与之相反； [\W_] 表示匹配下划线或者所有非字母非数字中的任意一个；/g全局匹配
    let newStr = str.replace(reg, '').toLowerCase();
    let reverseStr = newStr.split('').reverse().join('')
    return reverseStr === newStr; // 与 newStr 对比
}

var str = " a ba d";
document.write(findPlindrome(str));

function reverseString(str) {
    var splitString = str.split(' ');
    var reverseString = splitString.reverse();
    var joinString = reverseString.join(" ");
    return joinString;
}

// var str = "This is a string";
// document.write(reverseString(str));