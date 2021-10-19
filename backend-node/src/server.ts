import { serverHttp } from "./app";

const port = 3000;

serverHttp.listen(port, () => console.log(`Listening on port: ${port}`));
