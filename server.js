const express = require("express");
const cors = require("cors")
const fs = require("fs");
const path = require("path");
const app = express();

app.use(cors)
const PORT = process.env.PORT || 5555;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "index.html"));
});

app.get("/awake",(req,res) =>{
    res.status(200).json({message:"api is awake"})
})
//============CMT===============================//
app.get("/cmt", function(req, res) {
    const path = "assets/cmt.mp4";
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      };
      res.writeHead(206,head)
      file.pipe(res)
  
    }else{
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200,head)
        fs.createReadStream(path).pipe(res)
    }
  });
//============Crime Stats =========================//
app.get("/Crime", function(req, res) {
    const path = "assets/Crime.mp4";
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      };
      res.writeHead(206,head)
      file.pipe(res)
  
    }else{
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200,head)
        fs.createReadStream(path).pipe(res)
    }
  });
//==========Scribe Endpoint========================//
app.get("/Scribe", function(req, res) {
  const path = "assets/scribe.mp4";
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    };
    res.writeHead(206,head)
    file.pipe(res)

  }else{
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200,head)
      fs.createReadStream(path).pipe(res)
  }
});

app.listen(PORT, function(){
    console.log(`============App running on ${PORT}`)
})