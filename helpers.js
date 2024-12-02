import fs from "node:fs"

const readFile = (file) => {
    try {
        return fs.readFileSync(file, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${file}:`, error);
        process.exit(1);
    }
};

export { 
    readFile
}