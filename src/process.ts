import fs from "fs";
import path from "path";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

const transformData = (pokemon: any): Pokemon => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.sprites.front_default,
  };
};

const result: object[] = [];

let index = 1; // Start from 1

const readJsonFilesRecursive = (index: number) => {
  const filePath = path.join(
    __dirname,
    `../data/api/v2/pokemon/${index}/index.json`
  );

  try {
    const jsonString = fs.readFileSync(filePath, "utf8");
    // Parse JSON and store it in the result object
    const data = JSON.parse(jsonString);
    const transformedData = transformData(data);

    result.push(transformedData);

    // Read next file
    readJsonFilesRecursive(index + 1);
  } catch (err) {
    console.log(`File ${filePath} read failed:`, err);
    console.log("All files read. Returning results...");

    const outputFilePath = path.join(__dirname, "pokemon_list.json");
    fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2)); // 2 spaces indentation
    console.log("Result has been written to: ", outputFilePath);
  }
};

readJsonFilesRecursive(index);

console.log("Finished reading files. Start writing results...");
