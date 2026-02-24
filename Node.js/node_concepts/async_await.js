// Example 1
function loginUser(username, password){
    return new Promise((resolve, reject)=>{
        if (username === "admin" && password ==="admin"){
            resolve({userId: 100, token: "token_admin"})
        }else reject("Wrong username or password");
    })
}

function loadData(token){
    return new Promise((resolve, reject)=>{
        if (token ==="token_admin"){
            resolve({username: "admin", nPost: 20, location:"mumbai"})
        } else reject("Invalid token.");
    })
}

function loadPostsByLocation(location){
    return new Promise((resolve, reject)=>{
        if (location === "mumbai"){
            resolve("Hurrayy!!!!!");
        } else reject("This wont be executing.")
    })
}

async function runApplication(){
    try{
        const authData = await loginUser("admin", "admin");
        console.log("Login Success! User ID:", authData.userId);

        const userData = await loadData(authData.token)
        console.log("Username and number of posts -> " + userData.username + " " + userData.nPost)

        const posts = await loadPostsByLocation(userData.location);
        console.log("Posts: " + posts)
    } catch(error){
        console.log("Error: "+ error);
    }
}

runApplication();

// Example 2

function downloadFile(fileName){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (fileName){
                resolve({file: fileName});
            } else reject("Error");
        }, 1000);
    });
}

async function mainDownloader(){
    const fileOne = await downloadFile("file 1");
    console.log("File: " + fileOne.file);

    const fileTwo = await downloadFile("file 2");
    console.log("File: "+ fileTwo.file);

    console.log("Finished....")
}

mainDownloader();