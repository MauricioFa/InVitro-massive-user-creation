const csv=require('csvtojson')
const express = require("express") 
const path = require("path") 
const multer = require("multer") 
const app = express() 
const fs = require("fs")
const multiUserCreation = require("./modules/fbadmin")
require('dotenv').config()

//Access environment variables
const port= process.env.PORT ? process.env.PORT : 8000

const multicreation = new multiUserCreation()
    
// View Engine Setup 
app.set("views",path.join(__dirname,"views")) 
app.set("view engine","ejs") 
    
// var upload = multer({ dest: "Upload_folder_name" }) 
// If you do not want to use diskStorage then uncomment it 

const csvfilename = `Users-${Date.now()}.csv`
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "temp") 
    }, 
    filename: function (req, file, cb) { 
      cb(null, csvfilename) 
    } 
  }) 
       
// Define the maximum size for uploading 
const maxSize = 1e6; 
    
var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    // fileFilter: function (req, file, cb){ 
    
    //     // Set the filetypes, it is optional 
    //     var filetypes = /csv/; 
    //     var mimetype = filetypes.test(file.mimetype); 
  
    //     var extname = filetypes.test(path.extname( 
    //                 file.originalname).toLowerCase()); 
        
    //     if (mimetype && extname) { 
    //         return cb(null, true); 
    //     } 
      
    //     cb("Error: File upload only supports the "
    //             + "following filetypes - " + filetypes); 
    //   }  
  
// usersdata is the name of file attribute 
}).single("usersdata");        
  
app.get("/",function(req,res){ 
    res.render("Signup"); 
}) 
    
app.post("/uploadCSV",function (req, res, next) { 
        
    upload(req,res,function(err) { 
  
        if(err) { 
  
            res.send(err) 
        } 
        else { 
  
            // SUCCESS, csv successfully uploaded 
            // res.send("Success, File uploaded!") 

            // Invoking csv returns a promise
            const converter=csv()
            .fromFile(`./temp/${csvfilename}`)
            .then((json)=>{
                res.json(json)
                //create users
                multicreation.userCreation(json)
                //delete file -check if asyncronically is right
                fs.unlinkSync(`./temp/${csvfilename}`)
            })
        } 
    }) 
}) 
    
// Take any port number of your choice which 
// is not taken by any other process 
app.listen(port,function(error) { 
    if(error) throw error 
        console.log(`Server created Successfully on ${port}`) 
}) 


