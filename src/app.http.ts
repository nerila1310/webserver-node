import fs from "fs";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
    return;
  }

  let respContent;

  if (req.url && req.url.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "application/javascript" });
    respContent = fs.readFileSync(`./public${req.url}`, "utf-8");
  } else if (req.url && req.url.endsWith(".css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
    respContent = fs.readFileSync(`./public${req.url}`, "utf-8");
  }

  res.end(respContent);
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
