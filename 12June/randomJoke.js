const getJoke=async ()=>{
    const response=await fetch("https://official-joke-api.appspot.com/random_joke");
    console.log(response);
    const setup=await response.setup;
    const punchline=await response.punchline;
    console.log(setup);
    console.log(punchline);
}

await getJoke();