const express=require('express')
const fs=require('fs');

const app=express()
app.use(express.json())

const FILE_PATH="./courses.json";

const getCourses=()=>{
    const data=fs.readFileSync(FILE_PATH,"utf8");
    return JSON.parse(data)
}

const saveData=(courses)=>{
    fs.writeFileSync(FILE_PATH,JSON.stringify(courses),(err)=>{
        console.log("Error in writing to the File");
    })
}

app.get("/",(req,res)=>{
    res.status(200).json({"Message":"Success"})
})

app.get("/courses",(req,res)=>{
    res.status(200).json(getCourses())
})

app.get("/courses/:id",(req,res)=>{
    const id=req.params.id;
    const courses=getCourses();
    const course=courses.find(c=>c.id==id);
    res.status(200).json(course);
})

app.post("/courses",(req,res)=>{
    const courses=getCourses();
    const newCourse=req.body;
    courses.push({"id":courses.length>0 ? courses[courses.length-1].id+1: 1,...newCourse})
    saveData(courses);
    res.status(200).json({"message":"Course added Successfullly"})
    
})

app.put("/courses/:id",(req,res)=>{
    const id=req.params.id;
    const courses=getCourses();
    const index=courses.findIndex(c=>c.id==id);
    const course=req.body;
    const updatedCourse={...courses[index],...course}
    courses[index]=updatedCourse
    saveData(courses)
    res.status(200).json(course);
})

app.delete("/courses/:id",(req,res)=>{
    const id=req.params.id;
    let courses=getCourses()
    courses=courses.filter(c=>c.id!=id)
    saveData(courses);
    res.status(200).json({"message":"Course deleted successfully"})
})

app.listen(3000,()=>{
    console.log("Server Running at port 3000...")
})