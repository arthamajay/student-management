const http=require("http");
const fs=require("fs");
const path=require("path");

const filePath=path.join(__dirname,"students.json");

const server=http.createServer((req,res)=>{
    if(req.url==="/"&&req.method==="GET"){
        fs.readFile(filePath,"utf8",(err,data)=>{
            if(err){
                res.writeHead(500,{"Content-Type":"text/plain"});
                return res.end("Error reading file");
            }

            res.writeHead(200,{"Content-Type":"application/json"});
            res.end(data);

        });
    }else if(req.url==="/addStudent"&&req.method==="POST"){
        let newStudent="";

        req.on('data',chunk=>{
            newStudent+=chunk;
        });

        req.on('end',()=>{

            const parsedNewStudent=JSON.parse(newStudent);
            fs.readFile(filePath,"utf8",(err,data)=>{
                if(err){
                    res.writeHead(500,{"Content-Type":"text/plain"});
                    return res.end("Error reading file");
                }

                const students=JSON.parse(data);
                students.push(parsedNewStudent);

                fs.writeFile(filePath,JSON.stringify(students,null,2),(err)=>{
                    if(err){
                        res.writeHead(500,{"Content-Type":"text/plain"});
                        return res.end("Error writing to file");
                    }
                    res.writeHead(200,{"Content-Type":"text/plain"});
                    res.end("Student Added Successfully");
                });
            });
        });
    }else{
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.end("Not Found");
    }
});
server.listen(3000,()=>console.log("Server started on port 3000"));
