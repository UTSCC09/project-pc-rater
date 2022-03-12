/**
 * INSTRUCTIONS!!
 * 
 * In order to do scrape UofT course data, do:
 * 
 * 1) Go to https://raw.githubusercontent.com/nikel-api/nikel-datasets/master/data/courses.json and download the file.
 * 2) Filter the relevant fields to a new JSON file by doing:
 * 
 * >   var fs = require('fs');
 * >   const all_course_data = require("./all_course_data.json");
*  >   let new_course_data = [];
*          all_course_data.forEach(course => {
*             if(!new_course_data.find(existing_course => course.code == existing_course.code)){
*               let new_object = {code: course.code, department: course.department, name: course.name, university: "University of Toronto at " + course.campus};                            
*               new_course_data.push(new_object);
*             }    
*          });
*
*
* > fs.writeFile("new_course_data.json", JSON.stringify(new_course_data, null, 4), function(err, res){
*    if(err) console.err("error", err);
*   });
* 
*/