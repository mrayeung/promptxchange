// script.js (updated)
async function generateImage() {
    const positivePrompt = document.getElementById("positivePrompt").value;
    const negativePrompt = document.getElementById("negativePrompt").value;   


    const response = await fetch('/api/generate-image', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({   
 positivePrompt, negativePrompt })
    });

    if (response.ok) {
        const data = await response.json(); 
        displayImage(data.imageUrl); // Assuming ModelsLab returns imageUrl in the response
    } else {
        console.error('Error generating image:', response.statusText);
        // Handle error display to the user
    }
}



function displayImage(imageUrl) {
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
}