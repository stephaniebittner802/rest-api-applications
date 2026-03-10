const promptBox = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");
const deleteBtn = document.getElementById("deleteBtn");
const output = document.getElementById("output");

let lastResponseId = null; // store the last response ID

// POST request (send prompt)
sendBtn.addEventListener("click", async () => {
    const message = promptBox.value.trim();

    if (!message) {
        output.textContent = "Please type something first.";
        return;
    }

    output.textContent = "Loading...";

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        lastResponseId = data.id; // save response ID
        output.textContent = data.reply;

    } catch (error) {
        output.textContent = "Something went wrong.";
        console.error(error);
    }
});

// DELETE request (delete last response)
deleteBtn.addEventListener("click", async () => {

    if (!lastResponseId) {
        output.textContent = "No response to delete.";
        return;
    }

    try {
        const response = await fetch(`/response/${lastResponseId}`, {
            method: "DELETE"
        });

        const data = await response.json();

        output.textContent = "Response deleted.";
        lastResponseId = null;

    } catch (error) {
        output.textContent = "Delete failed.";
        console.error(error);
    }
});