const http=require("http")
const fs=require("fs")

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        fs.readFile("students.json",(err,data)=>{
            res.writeHead(200,{"Content-Type":"text/plain"})
            res.write(data);
            res.end();
        })
    } else if(req.url=="/addStudent" && req.method=="POST"){
        let newStudent="";
        
        req.on('data',chunk=>{newStudent+=chunk})
        req.on('end',()=>{
            let students=[];
            fs.readFile("students.json",(err,data)=>{
                students=JSON.parse(data);
            })
            students.push(JSON.parse(newStudent))
            fs.writeFile("students.json",JSON.stringify(students),(err)=>res.write(err))
            res.end("Student Added Successfully")
        })
    } 
})

server.listen(3000,()=>console.log("Server started"))