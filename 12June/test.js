// // function fetchData(i){
// //     return new Promise((res,rej)=>{
// //         if(i==1)
// //             res("Success");
// //         else
// //             rej("Failure")
// //     })
// // }

// // fetchData(0)
// // .then(res=>console.log(res))
// // .catch(msg=>console.log(msg))


// // // Set Time Out 

// // setTimeout(()=>console.log("Set time out"))

// // console.log("Normal Execution");

// function fetchUserName(id){
//     return new Promise((res,rej)=>{
//         if(id==1){
//             res("ajay");
//         }else{
//             rej("Invalid Input")
//         }
//     });
// }

// function fetchUserDetails(username){
//     return new Promise((res,rej)=>{
//         if(username=="ajay"){
            
//         }
//     })
    
// }

// fetchUserName(1)
// .then(res=>{return fetchUserDetails(res)})
// .then(details=>console.log(details))
// .catch(err=>console.log(err))


async function getDetails(url){
    const response= await fetch(url);
    return response.text();
}

const url="https://en.wikipedia.org/wiki/Node.js";
console.log(await getDetails(url));