let db;

// Open or upgrade the IndexedDB database
const request = window.indexedDB.open("TaskDB", 3);

// Create object store if necessary
request.onupgradeneeded = (event) => {
    db = event.target.result;

    if (!db.objectStoreNames.contains("notes")) {
        db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
    }
};

// Handle errors
request.onerror = (event) => {
    console.error(`Database error: ${event.target.error?.message}`);
    alert("Failed to open database.");
};

// When successfully connected to DB
request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Database opened successfully");

    // Attach listener to the Publish button
    const publishBtn = document.getElementById("publishBtn");
    publishBtn.addEventListener("click", () => {
        const noteContent = document.getElementById("noteEditor").value.trim();

        if (noteContent === "") {
            alert("Cannot save an empty note.");
            return;
        }

        const transaction = db.transaction(["notes"], "readwrite");
        const store = transaction.objectStore("notes");

        const note = {
            content: noteContent,
            timestamp: new Date()
        };

        const addRequest = store.add(note);

        addRequest.onsuccess = () => {
            alert("Note saved successfully!");
            document.getElementById("noteEditor").value = ""; // Clear textarea after saving
        };

        addRequest.onerror = () => {
            console.error("Failed to save note:", addRequest.error);
            alert("Failed to save the note.");
        };
    });
};



