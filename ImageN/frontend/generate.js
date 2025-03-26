document.getElementById("generate").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt-box").value;

    if (!prompt) return alert("Please enter a prompt!");

    try {
        const response = await fetch("http://localhost:5000/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        if (data.imageUrl) {
            document.getElementById("image").src = data.imageUrl;
            document.getElementById("prompt-box").innerHTML = "";
        } else {
            alert("Image generation failed!");
        }
    } catch (error) {
        console.error(error);
        alert("Error generating image");
    }
});

function randomImageHelper() {
    const numImages = 7; // UPDATE LATER TO MAKE DYNAMIC
    const generalPath = "/images/image";
    let randomIndex = Math.floor(Math.random() * numImages) + 1; // Find starting image
    return `/images/image${randomIndex}.png`; // Return random image
}

function randomImage() {
    document.getElementById('image').src = randomImageHelper();
}

document.addEventListener('DOMContentLoaded', () => {
    randomImage();
});