import express from "express";
import { resolve } from "node:path";

const app = express();
const PORT = 3000;

app.use(express.static("./dist"));

app.get("/*", (_, res) => res.sendFile(resolve("dist", "index.html")));

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
