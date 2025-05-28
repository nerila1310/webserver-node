import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  // console.log('Hello, World from main function!');

  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH
  });
  server.start();
}
