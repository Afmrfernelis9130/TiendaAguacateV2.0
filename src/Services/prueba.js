const fs=require("fs/promises");



const path=require("path");




const pathJSON= path.join(__dirname, APIL);


import fs from "fs/promises";

const readJSON = async () => {

    const data = await fs.readFile(pathJSON, "utf-8");
    return JSON.parse(data);
}

const writeJSON = (data) => {
    fs.writeFileSync(pathJSON,data);
};
