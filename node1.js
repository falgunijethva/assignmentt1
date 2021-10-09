const readline=require("readline");
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

const fs=require("fs");

var dirname="";
var filename="";
var content="";

//  ---- Menu -----
var instruction = () => {
    console.log("\n     ---  MENU  ---");
    console.log(" 1. Create Directory . ");
    console.log(" 2. remove Directory . ")
    console.log(" 3. write file . ");
    console.log(" 4. Read file . ");
    console.log(" 5. Delete file . ");
    console.log(" 6. Append data to file . ");
    console.log(" 7. Update and replace file with new data . ");
    console.log(" 8.  Rename file . ");
    console.log(" 9. Exit . ");

};

var start = () => {
    rl.question("Enter your choice :", (ans) =>{
        if(ans==="1"){
            createDirectoryWizard();
        }
        if(ans==="2"){
            removeDirectoryWizard();
        }
        if(ans==="3"){
            writeFile();
        }
        if(ans==="4"){
            readFile();
        }
        if(ans==="5"){
            deleteFile();
        }
        if(ans==="6"){
            appendFile();
        }
        if(ans==="7"){
            replaceFile();
        }
        if(ans==="8"){
            renameFile();
        }
        if(ans==="9"){
            rl.close();
        }

    });
};

//  ---- create Directory ----
var createDirectoryWizard = () => {
    console.log("\n create Directory ");
    rl.question(" Enter Directory Name :- ",(ans) => {
        dirname=ans;
        create_Dir();
    });
};

var create_Dir = () => {
    fs.mkdir(dirname,(err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Directory successfullyy createdd!..."+dirname);
        }
        repeat();
    });
};

// ---- remove directory ----
var removeDirectoryWizard = () => {
    console.log("\n Remove Directory ");
    rl.question(" Enter Directory Name :- ",(ans) => {
        dirname=ans;
        remove_directory();
    });
};

var remove_directory = () => {
    fs.rmdir(dirname,(err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Directory successfullyy removed!..."+dirname);
        }
        repeat();
    });
};

// ---- write file ----
var writeFile = () => {
  rl.question("Enter file name :- ",(ans) =>{
    filename=ans;
    rl.question("Enter file content :- ",(ans) => {
      content=ans;
      writedata();
    });
  });
};

var writedata = () => {
  fs.writeFile(filename + ".txt",content,(err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("File create succesfully !.....",filename);
    }
    repeat();
  });
};

// ---- read file ----
var readFile = () => {
  rl.question("Enter file name :- ",(ans) =>{
    filename=ans;
    fs.readFile(filename + ".txt","utf8",(err,res) =>{
      if(err){
        console.log(err);
      }
      else{
        console.log(res);
      }
      repeat();
    });
  }); 
};

// ---- Delete file ----
var deleteFile = () => {
    rl.question("Enter file name :- ",(ans) =>{
    fs.unlink(ans + ".txt",(err) => {
       if(err){
        console.log(err);
      }
      else{
        console.log("File deleted succesfully!....."+ans);
      }
      repeat();
    });
  });
};

// ---- Append file ----
var appendFile = () => {
  rl.question("Enter file name to append  :- ",(ans) =>{
    filename=ans;
    rl.question("Enter file content :- ",(ans) => {
      content=ans;
      fs.appendFile(filename + ".txt",content,(err) => {
        if(err){
          console.log(err);
        }
        else{
          console.log("file Append successfullyy!....." + filename);       
        }
        repeat();
      });
    });
  });
};

// ---- Replace file ---- 
var replaceFile = () => {
    rl.question("Enter File Name :- ",(ans) => {
       filename = ans;
       rl.question("Enter Content Of Replace :- ",(ans) => {
         content = ans;
         rl.question("Enter New Content To Replace :-",(ans) => {
           const string = ans;
           fs.readFile(filename + ".txt","utf8",(err,data) => {
              if(err){
                 console.log(err);
                 repeat();
              }else{
                const res = data.replace(content,string);
                fs.writeFile(filename + ".txt",res,(err) => {
                  if(err){
                      console.log(err);
                  }else{
                     console.log("File Replaced SuccessFully!...." + filename);
                  }
                  repeat();
                });
              }
           });
         });
       });
    });
};

// ---- rename file ----
var renameFile = () => {
   rl.question("Enter old file name :-",(ans) => {
     var file = ans;
     rl.question("Enter new file name :- ",(ans) => {
       fs.rename(file + ".txt",ans + ".txt",(err) => {
          if(err){
             console.log(err);
          }else{
             console.log("File Renamed SuccessFully!...." + ans + ".txt");
          }
          repeat();
       }); 
     });
   });
};

var repeat = () => {
    instruction();
    start();
};


console.log("Welcome To This Game..");
repeat();