/**
 * INSTRUCTIONS!!
 *
 * In order to scrape, do:
 *
 * 1. Go to https://www.ratemyprofessors.com/search/teachers
 * 2. Open dev tools
 * 3. Instantiate "query", "variables", and "res" variables in the console as shown below. We might need to replace the Authoirzation with a new bearer token, which can be extracted by looking at the Network tab in dev tools.
 * 
 * 
 * > const query = `query TeacherSearchResultsPageQuery(  $query: TeacherSearchQuery!  $schoolID: ID) {  search: newSearch {    ...TeacherSearchPagination_search_1ZLmLD  }  school: node(id: $schoolID) {    __typename    ... on School {      name    }    id  }}fragment TeacherSearchPagination_search_1ZLmLD on newSearch {  teachers(query: $query, first: 10000, after: "") {    didFallback    edges {      cursor      node {        ...TeacherCard_teacher        id        __typename      }    }    pageInfo {      hasNextPage      endCursor    }    resultCount    filters {      field      options {        value        id      }    }  }}fragment TeacherCard_teacher on Teacher {  id  legacyId  avgRating  numRatings  ...CardFeedback_teacher  ...CardSchool_teacher  ...CardName_teacher  ...TeacherBookmark_teacher}fragment CardFeedback_teacher on Teacher {  wouldTakeAgainPercent  avgDifficulty}fragment CardSchool_teacher on Teacher {  department  school {    name    id  }}fragment CardName_teacher on Teacher {  firstName  lastName}fragment TeacherBookmark_teacher on Teacher {  id  isSaved}`;
 * >  let variables = {
 *      "query": {
 *      "schoolID": "U2Nob29sLTQ5MTk=",
 *       "text": "",
 *      departmentID:	null,
 *       fallback: true
 *      },
 *     "schoolID": "U2Nob29sLTQ5MTk=",
 *   };
 * 
 *  >  let res = await fetch('/graphql', {
 *          method: 'POST',
 *          credentials: 'include', 
 *          headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic dGVzdDp0ZXN0' },
 *          body: JSON.stringify({
 *             "query": query,
 *            "variables": variables
 *       })
 *  });
 * 
 * 4. Run the following:
 * 
 * > await res.json();
 * 
 * 5. Copy the resulting JSON object data.
 * 
 * 6. Filter the relevant fields to a new JSON file by doing:
 * 
 * >   var fs = require('fs');
 * >   const professors_data = require("./prof_data.json");
 * >   professors_data.data.serach.teachers.edges.forEach(teacher => {
 *         let new_object = {school: teacher.node.school.name, firstName: teacher.node.firstName, lastName: teacher.node.lastName, department: teacher.node.department};
 *         new_prof_data.push(new_object);
 *     });
 * 
 * >   fs.writeFile("professors_data.json", JSON.stringify(new_prof_data, null, 4), function(err, res){
 *         if(err) console.err("error", err);
 *     });     
 *
 */



 

 
 