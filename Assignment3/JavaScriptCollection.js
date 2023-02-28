// 1. Write a JavaScript function that reverse a number. 
// Example x = 32243;
// Expected Output: 34223 
function reverseNumber(num){
    let reverseNum = num.toString().split('').reverse().join('');
    return parseInt(reverseNum)*Math.sign(num); //parseInt() and parseFloat: convert string into number, Math.sign():keep the sign
}

// console.log(reverseNumber(1234500));

// 2. Write a JavaScript function that checks whether a passed string is palindrome or not? 
// A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g., madam or nurses run.
function palindromeCheck(str) {
    let newStr = str.split('').reverse().join('');
    if(newStr == str){
        console.log("It is a Palindrome.")
    }else{
        console.log("It is NOT a Palindrome.")
    }
}

// palindromeCheck("nur run");


// 3. Write a JavaScript function that generates all combinations of a string. 
// Example string: 'dog' 
// Expected Output: d, do, dog, o, og, g 
function combinWords(str) {
    let res = new Array();
    let arr = str.split('');
    for (let i = 0; i < arr.length; i++) {
        for(let j = i+1; j <= arr.length; j++){
            let word = arr.slice(i,j).join(''); //Array.slice(i,j):选取数组的范围为[i,j),因此不包含j，所以loop时要注意
            res.push(word);
        }
    }

    return res;
}

// console.log(combinWords("god"));

// 4. Write a JavaScript function that returns a passed string with letters in alphabetical order. 
// Example string: 'webmaster' 
// Expected Output: 'abeemrstw'
// Assume punctuation and numbers symbols are not included in the passed string.
function alphaOrder(str) {
    let res = str.split('').sort().join(''); //array中sort()默认按照字母顺序排序
    return res;
}
// console.log(alphaOrder("webmaster"));

// 5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case. 
// Example string: 'the quick brown fox' 
// Expected Output: 'The Quick Brown Fox '
function toUpper(str) {
    str = str.split(" ");
    for (let i = 0; i < str.length; i++){
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    str = str.join(" ");
    return str;
}

// console.log(toUpper("the quick brown fox"));


// 6. Write a JavaScript function that accepts a string as a parameter and find the longest word within the string. 
// Example string: 'Web Development Tutorial' 
// Expected Output: 'Development'
function longestWord(str){
    let arr = str.split(' ');
    let res = "";
    for(let i of arr) {
        if(i.length > res.length){
            res = i;
        }
    }
    return res;
}

// console.log(longestWord("Web Development Tutorialaaaaa"));

// 7. Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string. 
// Note: As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as vowel here. 
// Example string: 'The quick brown fox' 
// Expected Output: 5
function countVowels(str) {
    let res = 0;
    str = str.split('');
    for(let i of str ){
        if(i=='a'||i=='e'||i=='i'||i=='o'||i=='u'){
            res++;
        }
    }
    return res;
}

// console.log(countVowels('The quick brown fx'));

// 8. Write a JavaScript function that accepts a number as a parameter and check the number is prime or not. 
// Note: A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.
function checkPrime(num) {
    if(num>=1&&num <= 3){
        return true;
    }
    else{
        let sqrt = Math.sqrt(num);
        for(let i = 1; i < sqrt; i++){
            if(num%i == 0){
                return false;
            }
        }
        return true;
    }
}

// console.log(checkPrime(27));

// 9. Write a JavaScript function which accepts an argument and returns the type. 
// Note: There are six possible values that typeof returns: object, boolean, function, number, string, and undefined.
function checkType(arg){
    return typeof(arg);
}
let person = {
    name:"Jackie",
    age:"20"
}

// console.log(checkType(person));

// 10. Write a JavaScript function which returns the n rows by n columns identity matrix. 
function identityMatrix(n){
    let res = new Array();
    for(let i = 0; i < n; i++){
        res[i] = [];
        for(let j = 0; j < n; j++){
            if(i == j){
                res[i][j] = 1;
            }
            else{
                res[i][j] = 0;
            }
        }
    }
    return res;
}

// console.log(identityMatrix(6));

// 11. Write a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively. 
// Sample array: [1,2,3,4,5]
// Expected Output: 2,4 
function findSecondNumber(arr){
    let res = new Array();
    arr = arr.sort(function(x, y){return x - y});
    let s_low = arr[1], s_high = arr[arr.length-2];
    res.push(s_low);
    res.push(s_high);
    return res;
}
// let arr = [1,3,-1,5,6,2,2,11];
// console.log(findSecondNumber(arr));

// 12. Write a JavaScript function which says whether a number is perfect. 
// According to Wikipedia: In number theory, a perfect number is a positive integer that is equal to the sum of its proper positive divisors, that is, the sum of its positive divisors excluding the number itself (also known as its aliquot sum). Equivalently, a perfect number is a number that is half the sum of all of its positive divisors (including itself).
// Example: The first perfect number is 6, because 1, 2, and 3 are its proper positive divisors, and 1 + 2 + 3 = 6. Equivalently, the number 6 is equal to half the sum of all its positive divisors: ( 1 + 2 + 3 + 6 ) / 2 = 6. The next perfect number is 28 = 1 + 2 + 4 + 7 + 14. This is followed by the perfect numbers 496 and 8128.
function findPerfect(num){
    if(num < 6){
        return false;
    }
    else{
        let sum = 0;
        for(let i = 1; i < num/2 + 1; i++){
            if(num%i == 0){
                sum = sum + i;
            }
        }
        if(sum == num){
            return true;
        }
        else{
            return false;
        }
    }
}
// console.log(findPerfect(8129));


// 13. Write a JavaScript function to compute the factors of a positive integer. 
function findFactors(num){
    let factors = [];
    for(let i = 1; i < (num/2)+1; i++){
        if(num%i == 0){
            factors.push(i);
        }
    }
    return factors;
}

// console.log(findFactors(7));

// 14. Write a JavaScript function to convert an amount to coins. 
// Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
// Here 46 is the amount. and 25, 10, 5, 2, 1 are coins. 
// Output: 25, 10, 10, 1
function amountTocoins(amount , coins) {
    let res = [];
    coins = coins.sort(function(x, y){return y - x});
    for(let i = 0; i < coins.length; i++){
        let num = parseInt(amount/coins[i]);
        for(let j = 0; j < num; j++){
            res.push(coins[i]);
            amount = amount - coins[i];
        }
    }
    return res;
}
// coins = [2,5 ,1, 25];
// amount = 46;
// console.log(amountTocoins(amount,coins));


// 15. Write a JavaScript function to compute the value of bn where n is the exponent and b is the bases. Accept b and n from the user and display the result. 
function exponent(b, n){
    return Math.pow(b,n);
}
// console.log(exponent(2,3));

// 16. Write a JavaScript function to extract unique characters from a string. 
// Example string: "thequickbrownfoxjumpsoverthelazydog"
// Expected Output: "thequickbrownfxjmpsvlazydg"
function findUniqueChars(str) {
    let res = "";
    for(let i = 0; i < str.length; i++){
        if(!res.includes(str[i])){
            res = res + str[i];
        }
    }
    return res;
}

// console.log(findUniqueChars("thequickbrownfoxjumpsoverthelazydog"));

// 17. Write a JavaScript function to get the number of occurrences of each letter in specified string. 
function countOccurrences(str){
    let hashMap  = new Map();
    arr = str.split('');
    for(let i of arr){
        if(!hashMap.has(i)){
            hashMap.set(i, 1);
        }else{
            hashMap.set(i, hashMap.get(i)+1);
        }
    }
    return hashMap;
}

// console.log(countOccurrences("aaabbceefffff"));

// 18. Write a function for searching JavaScript arrays with a binary search. 
// Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds the desired value.
function binarySearch(arr, target){
    let left = 0;
    let right = arr.length-1 ;
    if(target > arr[right]||target < arr[left]){
        return -1;
    }
    while(left <= right){
        let index = parseInt((left+right)/2)
        if(target == arr[index]){
            return index;
        }else if(target > arr[index]){
            left = index+1;
        }else{
            right = index-1;
        }
    }
    return -1;
}


// console.log(binarySearch([11,12,13,14,15,16,20], 11));

// 19. Write a JavaScript function that returns array elements larger than a number. 
function findLargerArray(arr, num){
    let res = [];
    arr = arr.sort(function(x,y){return x - y});
    let left = 0; 
    let right = arr.length - 1;
    if(num < arr[left]){
        res = arr;
        return res;
    }
    else if(num > arr[right]){
        res = -1;
        return res;
    }
    else{
        
        while(left < right){
            let index = parseInt((left + right)/2);
            if(num == arr[index]){
                res = arr.slice(index);
                return res;
            }else if(num > arr[index]){
                left = index + 1;
            }else{
                right = index ;
            }
        }
        res = arr.slice(right);
        return res
    }
}

// let arr = [2,4,1,15,6,9,3,22,34,7];
// console.log(findLargerArray(arr, 6));


// 20. Write a JavaScript function that generates a string id (specified length) of random characters. 
// Sample character list: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
function generateID(n){
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = "";
    for(let i = 0; i < n; i++){
        // console.log(str.length);
        // console.log(parseInt(Math.random()*str.length) );
        res = res + str[parseInt(Math.random()*str.length) ];
    }
    return res;
}
// console.log(generateID(4));

// 21. Write a JavaScript function to get all possible subset with a fixed length (for example 2) combinations in an array. 
// Sample array: [1, 2, 3] and subset length is 2 
// Expected output: [[2, 1], [3, 1], [3, 2]]
function getSubset(array, len){
    var result_set = [], 
        result;
    
   
for(var x = 0; x < Math.pow(2, array.length); x++)
  {
    result = [];
    i = array.length - 1; 
     do
      {
      if( (x & (1 << i)) !== 0)
          {
             result.push(array[i]);
           }
        }  while(i--);

    if( result.length == len)
       {
          result_set.push(result);
        }
    }

    return result_set; 
}


//a << b : a * (2 pow b)
// console.log(1<<10);

console.log(getSubset([1,2,3,4,5],2));

// 22. Write a JavaScript function that accepts two arguments, a string and a letter and the function
// will count the number of occurrences of the specified letter within the string. 
// Sample arguments: 'microsoft.com', 'o'
// Expected output: 3
function countLetter(str, c){
    let hashMap = new Map();
    let arr = str.split('');
    for(let i of arr){
        if(!hashMap.has(i)){
            hashMap.set(i, 1);
        }else{
            hashMap.set(i, hashMap.get(i)+1);
        }
    }
    return hashMap.get(c);
}

// console.log(countLetter('microsoft.com', 'm'));

// 23. Write a JavaScript function to find the first not repeated character. 
// Sample arguments: 'abacddbec' 
// Expected output: 'e' 
function firstNotRepeat(str){
    let hashMap = new Map();
    let arr = str.split('');
    for(let i of arr){
        if(!hashMap.has(i)){
            hashMap.set(i, 1);
        }else{
            hashMap.set(i, hashMap.get(i)+1);
        }
    }
    for(let i of arr){
        if(hashMap.get(i) == 1){
            return i;
        }
    }
    return -1;
}

// console.log(firstNotRepeat('abacddbec'));

// 24. Write a JavaScript function to apply Bubble Sort algorithm. 
// Note: According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order". 
// Sample array: [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
// Expected output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
function bubbleSort(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = i; j < arr.length; j++){
            if(arr[i] < arr[j]){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// console.log(bubbleSort([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]));

// 25. Write a JavaScript function that accept a list of country names as input and returns the longest country name as output. 
//  Sample function: Longest_Country_Name(["Australia", "Germany", "United States of America"])
// Expected output: "United States of America"
function LongestCountryName(arr) {
    let longest = "";
    for(let i of arr){
        if(i.length > longest.length){
            longest = i;
        }
    }
    return longest;
}

// console.log(LongestCountryName(["Australia", "Germany", "United States of America"]));

// 26. Write a JavaScript function to find longest substring in a given a string without repeating characters. 
//input: "abcaccabef"
//output: "cabef"
function longestNoRepeat(str){
    let longest = "";
    let curr = "";
    for(let i = 0; i < str.length; i++){
        if(!curr.includes(str[i])){
            curr = curr + str[i];
        }else{
            if(curr.length > longest.length){
                longest = curr;
            }
        }
    }
    return longest;
}

// console.log(longestNoRepeat('aabcdefgabazbwfrbc'));

// 27. Write a JavaScript function that returns the longest palindrome in a given string. 
// Note: According to Wikipedia "In computer science, the longest palindromic substring or longest symmetric factor problem is the problem of finding a maximum-length contiguous substring of a given string that is also a palindrome. For example, the longest palindromic substring of "bananas" is "anana". The longest palindromic substring is not guaranteed to be unique; for example, in the string "abracadabra", there is no palindromic substring with length greater than three, but there are two palindromic substrings with length three, namely, "aca" and "ada".
// In some applications it may be necessary to return all maximal palindromic substrings (that is, all substrings that are themselves palindromes and cannot be extended to larger palindromic substrings) rather than returning only one substring or returning the maximum length of a palindromic substring.
function longestPalindrome(str){
    let longest = "";
    for(let i = 0; i < str.length; i++){
         // Check for palindromes with odd length
      let palindrome = getLongestPalindrome(str, i, i);
      if (palindrome.length > longest.length) longest = palindrome;
  
      // Check for palindromes with even length
      palindrome = getLongestPalindrome(str, i, i + 1);
      if (palindrome.length > longest.length) longest = palindrome;
        }
        return longest;
}
    

function getLongestPalindrome(str, left, right) {
    while(left > 0 && right < str.length && str[left]==str[right]){
        left --;
        right ++;
    }
    let longestPalindrome = str.slice(left + 1, right);
    return longestPalindrome;
}

// console.log(longestPalindrome('bananas'));


// 28. Write a JavaScript program to pass a 'JavaScript function' as parameter. 
function foo(cb){
    cb();
}
function helloWorld(){
    console.log('Hello World!!!');
}

// foo(helloWorld);

// 29. Write a JavaScript function to get the function name. 
function getFunctionName(cb){
    return cb.name;

}
// console.log(getFunctionName(foo));