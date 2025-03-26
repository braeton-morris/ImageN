import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import fs, { read } from 'fs';
import path from 'path';
import fetch from 'node-fetch';

dotenv.config(); // Load environment variables

const __dirname = path.dirname(new URL(import.meta.url).pathname).slice(3);
console.log(__dirname)

const app = express();
const port = 5000; // Choose any port

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "public", "images")));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Load API Key securely
});

app.post("/generate-image", async (req, res) => {
    try {
        console.log("Generating image...");
        const { prompt } = req.body;
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
        });

        console.log("Image generated, updating image...");
        //SAVING IMAGE
        const imageUrl = response.data[0].url;
        console.log(imageUrl);

        const imageResponse = await fetch(imageUrl);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.json({ imageUrl: response.data[0].url });

        // count number of files
        const imgDir = path.join(__dirname, 'public', 'images');


        const files = fs.readdirSync(imgDir);
        const nextIndex = files.length + 1;

        const fileName = `image${nextIndex}.png`;
        const filePath = path.join(imgDir, fileName);
        fs.writeFileSync(filePath, buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate image" });
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
