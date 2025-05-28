import { Server } from "./presentation/server";

(() => {
  main();
})()

function main() {
  // console.log('Hello, World from main function!');

  const server = new Server();
  server.start();
}