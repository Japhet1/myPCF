// import { Service } from "pcf-core";



// const fetch = Service.webApi.retrieveMultipleRecords("contact", "?$select=fullname,gendercode&$filter=statecode eq 0").then(
//     function success(results) {
//         console.log(results);
//         for (let i = 0; i < results.entities.length; i++) {
//             let result = results.entities[i];
//             // Columns
//             let contactid = result["contactid"]; // Guid
//             let fullname = result["fullname"]; // Text
//             let gendercode = result["gendercode"]; // Choice
//             let gendercode_formatted = result["gendercode@OData.Community.Display.V1.FormattedValue"];
//         }
//     },
//     function(error) {
//         console.log(error.message);
//     }
// );

// console.log(fetch)