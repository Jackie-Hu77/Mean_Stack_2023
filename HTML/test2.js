const students = [
    { name: "John", age: 19 , course: {name : "Math"}},
    { name: "Mark", age: 13 , course: {name : "English"}},
    { name: "Bill", age: 22 , course: {name : "Math"}},
    { name: "Alise", age: 14, course: {name : "Chemistry"} },
    { name: "Ben", age: 17, course: {name : "Math"} },
  ]
const result = students.filter(filterOutStudent);
document.write(result);

function filterOutStudent(course) {


  return course.name == "Math";
}

