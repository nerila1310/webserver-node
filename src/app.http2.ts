import fs from "fs";
import http2 from "http2";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt")
  },
  (req, res) => {
    console.log(req.url);

    if (req.url === "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlFile);
      return;
    }

    if (req.url && req.url.endsWith(".js")) {
      res.writeHead(200, { "Content-Type": "application/javascript" });
    } else if (req.url && req.url.endsWith(".css")) {
      res.writeHead(200, { "Content-Type": "text/css" });
    }

    try {
      const respContent = fs.readFileSync(`./public${req.url}`, "utf-8");
      res.end(respContent);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end();
    }
  }
);

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
