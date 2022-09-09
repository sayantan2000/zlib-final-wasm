
var inputFile=null;
var filename=null;
async function onCompressButtonPressed() {
      inputFile = document.getElementById("c_inputFile").files[0];
      let compressionLevel = document.getElementById("compressionLevel").value;
          console.log(compressionLevel);
          console.log(inputFile);
    
      let data = new Uint8Array(await inputFile.arrayBuffer());
      console.log(data);
    
      // Store the file
      filename = inputFile.name;
      let stream = await FS.open(filename, "w+");
      await FS.write(stream, data, 0, data.length, 0);
      await FS.close(stream);
      var res = await Module.callMain([filename]);
      var file = await FS.readdir("/"); // Calling the main() method of the C code.
      if (res != -1) {
        console.log("succes" + res);
        for (var i = 0; i < file.length; i++) {
            if (file[i].endsWith(".gz")) {
                console.log("found :" + file[i]);
         }
        }
      } else console.log("failed");
        //  let inputFile = document.getElementById("c_inputFile").files[0];
        // let compressionLevel = document.getElementById("compressionLevel").value;
        // //console.log(compressionLevel);
        // //console.log(inputFile);
    
        // let fileContent;
        // const inputFileURL = URL.createObjectURL(inputFile)             // Creating a URL for fetching the file asynchronously
        // let xhr = new XMLHttpRequest();                                 // Create a new XMLHttpRequest object
        // xhr.overrideMimeType("text/plain; charset=x-user-defined");     // Overriding the mime type for binary content
        // xhr.onreadystatechange = async function () {                           // Setting an event handler for the XMLHttpRequest object
        //     if (xhr.readyState === 4) {                                 // Handling an XMLHttpRequest's response
        //         fileContent =await xhr.response;                             // Copying the response to a variable
        //        await FS.createDataFile(                                      // Creating a file in the Emscripten MEMFS File System
        //             "/", // folder 
        //             inputFile.name, // filename
        //             fileContent, // content
        //             true, // read
        //             true // write
        //         );
    
        //         await Module.callMain([ inputFile.name]);
        //         // Calling the main() method of the C code.
    
        //     }
        // }
        // xhr.open('GET', inputFileURL, true);
        // xhr.send('');
    }
    
    async function onDecompressButtonPressed() {
      inputFile = document.getElementById("d_inputFile").files[0];
      console.log(inputFile);
    
      let data = new Uint8Array(await inputFile.arrayBuffer());
    
      // Store the file
      filename = inputFile.name;
      let stream = await FS.open(filename, "w+");
      await FS.write(stream, data, 0, data.length, 0);
      await FS.close(stream);
      var res = await Module.callMain([filename, "-d"]); // Calling the main() method of the C code.
      var file = await FS.readdir("/");
    
      if (res != -1) {
        console.log("succes" + res);
        for (var i = 0; i < file.length; i++) {
            if (file[i].endsWith(filename.replace(".gz", ""))) {
                console.log("found :" + file[i]);
          }
        }
      }
        // let inputFile = document.getElementById("d_inputFile").files[0];
        // console.log(inputFile);
    
        // let fileContent;
        // const inputFileURL =  URL.createObjectURL(inputFile)
        // let xhr = new XMLHttpRequest();
        // xhr.overrideMimeType("application/x-compress; charset=x-user-defined");
        // xhr.onreadystatechange = async function () {
        //     if (xhr.readyState === 4) {
        //         fileContent =  await xhr.response;
        //     await FS.createDataFile(
        //             "/", // folder 
        //             inputFile.name, // filename
        //             fileContent, // content
        //             true, // read
        //             true // write
        //         );
        //         await Module.callMain([inputFile.name,"-d"]);
        //     }
        // }
        // xhr.open('GET', inputFileURL, true);
        // xhr.send();
    }
    