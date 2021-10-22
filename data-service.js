const fs = require("fs");

var employees = [];

var managers = [];

var departments = [];

module.exports.initialize = function(){

    return new Promise((resolve, reject) => {
        fs.readFile("./data/employees.json", "utf-8", (err, data)=>{
            if(err)
            {
                reject(err);
            }
            employees = JSON.parse(data);
        });
        fs.readFile("./data/departments.json", "utf-8", (err, data) => {
          if (err){
            reject("Error! " + err);
          }
          departments = JSON.parse(data);
          resolve();
        });
    })
};
module.exports.getAllEmployees = function(){
    return new Promise((resolve,reject)=>{
        if(employees.length==0){
            reject("No Data Found!");
            return;
        }
        resolve(employees);
    });
};

module.exports.getDepartments = function(){
  return new Promise((resolve,reject)=>{
      if(departments.length==0){
          reject("No Data Found!");
          return;
      }
      resolve(departments);
  });
};

module.exports.getManagers = function(){
  return new Promise((resolve,reject)=>{
      if(employees.length==0){
          reject("No Data Found!");
          return;
      }
      employees.forEach((employee)=>{
        if(employee.isManager===true)
        {
          managers.push(employee)
        }
      })
      resolve(managers);
  });
};