document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
  
    // Initially set the first tab as active
    if (tabs.length > 0 && tabContents.length > 0) {
      tabs[0].classList.add('border-blue-500');
      tabContents[0].hidden = false;
    }
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove the active border from all tabs
        tabs.forEach(t => t.classList.remove('border-blue-500'));
        // Hide all tab contents
        tabContents.forEach(tc => tc.hidden = true);
  
        // Add the active border to the clicked tab
        tab.classList.add('border-blue-500');
        // Show the corresponding tab content using the data-tab attribute
        const targetId = tab.dataset.tab;
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.hidden = false;
        }
      });
    });
  });

  const taskList = document.getElementById('task-list');
  const addTaskBtn = document.getElementById('add-task');
  const newTaskInput = document.getElementById('new-task');

  // Load from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function createTaskElement(task, index) {
    const li = document.createElement('li');
    li.className = 'bg-gray-100 p-3 rounded-md flex items-center justify-between draggable';
    li.setAttribute('draggable', 'true');
    li.dataset.index = index;

    const contentWrap = document.createElement('div');
    contentWrap.className = 'flex items-center space-x-2 w-full';

    const dragIcon = document.createElement('span');
    dragIcon.innerHTML = '☰';
    dragIcon.className = 'cursor-move text-gray-400';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-checkbox h-5 w-5 text-blue-600 rounded-full';
    if (task.completed) checkbox.checked = true;

    const span = document.createElement('span');
    span.className = 'ml-2 flex-1 transition-all';
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add('line-through', 'text-gray-500');
    }

    contentWrap.appendChild(dragIcon);
    contentWrap.appendChild(checkbox);
    contentWrap.appendChild(span);
    li.appendChild(contentWrap);

    checkbox.addEventListener('change', () => {
      span.classList.add('line-through', 'text-gray-500');
      checkbox.disabled = true;

      // Delay 4s, then remove
      setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }, 3000);
    });

    taskList.appendChild(li);
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, i) => createTaskElement(task, i));
  }

  // Add new task
  addTaskBtn.addEventListener('click', () => {
    const text = newTaskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      saveTasks();
      renderTasks();
      newTaskInput.value = '';
      newTaskInput.focus();
    }
  });

  // Press Enter to add
  newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTaskBtn.click();
  });

  // Drag-and-drop logic
  let draggedItemIndex = null;

  taskList.addEventListener('dragstart', (e) => {
    draggedItemIndex = +e.target.dataset.index;
    e.target.style.opacity = 0.5;
  });

  taskList.addEventListener('dragend', (e) => {
    e.target.style.opacity = '';
  });

  taskList.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingOverItem = e.target.closest('li');
    if (!draggingOverItem || draggingOverItem.dataset.index == draggedItemIndex) return;

    const overIndex = +draggingOverItem.dataset.index;
    const draggedTask = tasks.splice(draggedItemIndex, 1)[0];
    tasks.splice(overIndex, 0, draggedTask);
    saveTasks();
    renderTasks();
  });

  renderTasks(); // Initial render


//texteditor functionality
// let optionsButtons = document.querySelectorAll(".option-button");
// let advancedOptionButton = document.querySelectorAll(".adv-option-button");
// let fontName = document.getElementById("fontName");
// let fontSizeRef = document.getElementById("fontSize");
// let writingArea = document.getElementById("text-input");
// let linkButton = document.getElementById("createLink");
// let alignButtons = document.querySelectorAll(".align");
// let spacingButtons = document.querySelectorAll(".spacing");
// let formatButtons = document.querySelectorAll(".format");
// let scriptButtons = document.querySelectorAll(".script");

// //List of fontlist
// let fontList = [
//   "Arial",
//   "Verdana",
//   "Times New Roman",
//   "Garamond",
//   "Georgia",
//   "Courier New",
//   "cursive",
// ];

// //Initial Settings
// const initializer = () => {
//   //function calls for highlighting buttons
//   //No highlights for link, unlink,lists, undo,redo since they are one time operations
//   highlighter(alignButtons, true);
//   highlighter(spacingButtons, true);
//   highlighter(formatButtons, false);
//   highlighter(scriptButtons, true);

//   //create options for font names
//   fontList.map((value) => {
//     let option = document.createElement("option");
//     option.value = value;
//     option.innerHTML = value;
//     fontName.appendChild(option);
//   });

//   //fontSize allows only till 7
//   for (let i = 1; i <= 7; i++) {
//     let option = document.createElement("option");
//     option.value = i;
//     option.innerHTML = i;
//     fontSizeRef.appendChild(option);
//   }

//   //default size
//   fontSizeRef.value = 3;
// };

// //main logic
// const modifyText = (command, defaultUi, value) => {
//   //execCommand executes command on selected text
//   document.execCommand(command, defaultUi, value);
// };

// //For basic operations which don't need value parameter
// optionsButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     modifyText(button.id, false, null);
//   });
// });

// //options that require value parameter (e.g colors, fonts)
// advancedOptionButton.forEach((button) => {
//   button.addEventListener("change", () => {
//     modifyText(button.id, false, button.value);
//   });
// });

// //link
// linkButton.addEventListener("click", () => {
//   let userLink = prompt("Enter a URL");
//   //if link has http then pass directly else add https
//   if (/http/i.test(userLink)) {
//     modifyText(linkButton.id, false, userLink);
//   } else {
//     userLink = "http://" + userLink;
//     modifyText(linkButton.id, false, userLink);
//   }
// });

// //Highlight clicked button
// const highlighter = (className, needsRemoval) => {
//   className.forEach((button) => {
//     button.addEventListener("click", () => {
//       //needsRemoval = true means only one button should be highlight and other would be normal
//       if (needsRemoval) {
//         let alreadyActive = false;

//         //If currently clicked button is already active
//         if (button.classList.contains("active")) {
//           alreadyActive = true;
//         }

//         //Remove highlight from other buttons
//         highlighterRemover(className);
//         if (!alreadyActive) {
//           //highlight clicked button
//           button.classList.add("active");
//         }
//       } else {
//         //if other buttons can be highlighted
//         button.classList.toggle("active");
//       }
//     });
//   });
// };

// const highlighterRemover = (className) => {
//   className.forEach((button) => {
//     button.classList.remove("active");
//   });
// };

// window.onload = initializer();

// // IndexedDB setup using Dexie
// const db = new Dexie('NotesDB');
// db.version(1).stores({
//   notes: 'id,text'
// });

// const noteEditor = document.getElementById('noteEditor');
// const publishBtn = document.getElementById('publishBtn');
// const resetBtn = document.getElementById('resetBtn');

// // Load saved note from IndexedDB
// window.addEventListener('DOMContentLoaded', async () => {
//   const note = await db.notes.get(1);
//   if (note) {
//     noteEditor.value = note.text;
//   }
// });

// // Debounced auto-save to IndexedDB
// let debounceTimer;
// noteEditor.addEventListener('input', () => {
//   clearTimeout(debounceTimer);
//   debounceTimer = setTimeout(async () => {
//     await db.notes.put({ id: 1, text: noteEditor.value });
//   }, 300);
// });

// // Publish button: confirm save and show toast
// publishBtn.addEventListener('click', async () => {
//   await db.notes.put({ id: 1, text: noteEditor.value });
//   showToast('✅ Note saved successfully!');
// });

// // Reset button: clear notes and notify
// resetBtn.addEventListener('click', async (e) => {
//   e.preventDefault();
//   noteEditor.value = '';
//   await db.notes.delete(1);
//   showToast('🗑 Note cleared.');
// });

// // Toast Notification Function
// function showToast(message) {
//   const toast = document.createElement('div');
//   toast.textContent = message;
//   toast.className = 'fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500 opacity-0';
//   document.body.appendChild(toast);
//   setTimeout(() => (toast.style.opacity = '1'), 50);
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => toast.remove(), 500);
//   }, 3000);
// }


// //Automation systems functions
//     // IndexedDB setup
//     const dbName = 'CitationDB';
//     const storeName = 'citations';

//     function initDB() {
//         const request = indexedDB.open(dbName, 1);

//         request.onupgradeneeded = function (event) {
//             const db = event.target.result;
//             db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
//         };
//     }

//     async function addCitation(citation) {
//         const dbReq = indexedDB.open(dbName);
//         dbReq.onsuccess = () => {
//             const db = dbReq.result;
//             const tx = db.transaction(storeName, 'readwrite');
//             const store = tx.objectStore(storeName);
//             store.add({ citation });
//         };
//     }

//     async function generateHarvardCitation(url) {
//         try {
//             const response = await fetch(url);
//             const html = await response.text();
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(html, 'text/html');

//             const title = doc.querySelector('title')?.innerText || 'No title';
//             const siteName = new URL(url).hostname.replace('www.', '');
//             const today = new Date();
//             const accessedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;

//             const citation = `${title}. (${today.getFullYear()}). *${title}*. ${siteName}. Available at: ${url} (Accessed: ${accessedDate}).`;
//             return citation;
//         } catch (error) {
//             return "Error fetching or parsing the URL.";
//         }
//     }

//     document.addEventListener('DOMContentLoaded', () => {
//         initDB();

//         const button = document.querySelector('button');
//         const input = document.querySelector('input');
//         const output = document.querySelector('.bg-gray-100');

//         button.addEventListener('click', async () => {
//             const url = input.value.trim();
//             if (!url) {
//                 output.textContent = "Please enter a URL.";
//                 return;
//             }

//             output.textContent = "Generating citation...";
//             const citation = await generateHarvardCitation(url);
//             output.textContent = citation;
//             addCitation(citation);
//         });
//     });

//re-defined indexDB logic
        // Initialize IndexedDB
        let db;
        const request = indexedDB.open("NotesDB", 1);

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            if (!db.objectStoreNames.contains("notes")) {
                db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onerror = (event) => {
            console.error("Database error:", event.target.error);
            showNotification("Failed to open database.", true);
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            loadNotes();
        };

        // Show notification
        function showNotification(message, isError = false) {
            const notification = document.getElementById("notification");
            const notificationText = document.getElementById("notificationText");

            notificationText.textContent = message;
            notification.classList.remove("bg-green-500", "bg-red-500");
            notification.classList.add(isError ? "bg-red-500" : "bg-green-500");
            notification.classList.remove("opacity-0", "pointer-events-none");
            notification.classList.add("opacity-100");

            setTimeout(() => {
                notification.classList.add("opacity-0", "pointer-events-none");
                notification.classList.remove("opacity-100");
            }, 3000);
        }

        // Load notes from IndexedDB
        function loadNotes() {
            const transaction = db.transaction(["notes"], "readonly");
            const store = transaction.objectStore("notes");
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                const notes = getAllRequest.result;
                const notesList = document.getElementById("notesList");
                notesList.innerHTML = "";
                notes.forEach(note => {
                    const noteItem = document.createElement("div");
                    noteItem.classList.add("note-item", "p-4", "border", "border-gray-300", "rounded-md", "mb-2");
                    noteItem.innerHTML = `
                        <p>${note.content}</p>
                        <button class="edit-btn bg-blue-500 text-white p-2 rounded-md mt-2">Edit</button>
                        <button class="delete-btn bg-red-500 text-white p-2 rounded-md mt-2">Delete</button>
                    `;
                    noteItem.querySelector(".edit-btn").addEventListener("click", () => editNote(note.id));
                    noteItem.querySelector(".delete-btn").addEventListener("click", () => deleteNote(note.id));
                    notesList.appendChild(noteItem);
                });
            };
        }

        // Edit note
        function editNote(id) {
            const transaction = db.transaction(["notes"], "readonly");
            const store = transaction.objectStore("notes");
            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const note = getRequest.result;
                document.getElementById("noteEditor").value = note.content;
                document.getElementById("publishBtn").textContent = "Update";
                document.getElementById("publishBtn").onclick = () => updateNote(id);
            };
        }

        // Update note
        function updateNote(id) {
            const content = document.getElementById("noteEditor").value.trim();
            if (content === "") {
                showNotification("Cannot save an empty note.", true);
                return;
            }

            const transaction = db.transaction(["notes"], "readwrite");
            const store = transaction.objectStore("notes");
            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const note = getRequest.result;
                note.content = content;
                const updateRequest = store.put(note);

                updateRequest.onsuccess = () => {
                    showNotification("Note updated successfully!");
                    document.getElementById("noteEditor").value = "";
                    document.getElementById("publishBtn").textContent = "Publish";
                    document.getElementById("publishBtn").onclick = () => saveNote();
                    loadNotes();
                };

                updateRequest.onerror = () => {
                    console.error("Failed to update note:", updateRequest.error);
                    showNotification("Failed to update the note.", true);
                };
            };
        }

        // Save new note
        function saveNote() {
            const content = document.getElementById("noteEditor").value.trim();
            if (content === "") {
                showNotification("Cannot save an empty note.", true);
                return;
            }

            const transaction = db.transaction(["notes"], "readwrite");
            const store = transaction.objectStore("notes");
            const note = { content, timestamp: new Date() };
            const addRequest = store.add(note);

            addRequest.onsuccess = () => {
                showNotification("Note saved successfully!");
                document.getElementById("noteEditor").value = "";
                loadNotes();
            };

            addRequest.onerror = () => {
                console.error("Failed to save note:", addRequest.error);
                showNotification("Failed to save the note.", true);
            };
        }

        // Delete note
        function deleteNote(id) {
            const transaction = db.transaction(["notes"], "readwrite");
            const store = transaction.objectStore("notes");
            const deleteRequest = store.delete(id);

            deleteRequest.onsuccess = () => {
                showNotification("Note deleted successfully!");
                loadNotes();
            };

            deleteRequest.onerror = () => {
                console.error("Failed to delete note:", deleteRequest.error);
                showNotification("Failed to delete the note.", true);
            };
        }

        // Reset editor
        function resetEditor() {
            document.getElementById("noteEditor").value = "";
            document.getElementById("publishBtn").textContent = "Publish";
            document.getElementById("publishBtn").onclick = () => saveNote();
        }

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById("publishBtn").addEventListener("click", saveNote);
            document.getElementById("resetBtn").addEventListener("click", resetEditor);
        });

        //modal
        const modal = document.getElementById("notesModal");
        const closeModalBtn = document.getElementById("closeModalBtn");
        
        document.querySelector("button.p-3.rounded-full").addEventListener("click", () => {
            modal.classList.remove("hidden");
            loadNotesModal();
        });
        
        closeModalBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
        });

        function loadNotesModal() {
          const transaction = db.transaction(["notes"], "readonly");
          const store = transaction.objectStore("notes");
          const getAllRequest = store.getAll();
      
          getAllRequest.onsuccess = () => {
              const notes = getAllRequest.result;
              const modalList = document.getElementById("modalNotesList");
              modalList.innerHTML = "";
      
              if (notes.length === 0) {
                  modalList.innerHTML = "<p class='text-gray-500'>No notes found.</p>";
                  return;
              }
      
              notes.forEach(note => {
                  const noteBox = document.createElement("div");
                  noteBox.classList.add("border", "p-3", "rounded-md", "relative", "bg-gray-50");
      
                  const content = document.createElement("p");
                  content.textContent = note.content;
      
                  const actions = document.createElement("div");
                  actions.classList.add("flex", "gap-2", "mt-2");
      
                  const editBtn = document.createElement("button");
                  editBtn.textContent = "Edit";
                  editBtn.classList.add("border", "text-black", "px-3", "py-1", "rounded-md");
                  editBtn.addEventListener("click", () => {
                      editNote(note.id);
                      modal.classList.add("hidden");
                  });
      
                  const deleteBtn = document.createElement("button");
                  deleteBtn.textContent = "Delete";
                  deleteBtn.classList.add("bg-black", "text-white", "px-3", "py-1", "rounded-md");
                  deleteBtn.addEventListener("click", () => {
                      deleteNote(note.id);
                      loadNotesModal(); // Refresh modal list
                  });
      
                  actions.appendChild(editBtn);
                  actions.appendChild(deleteBtn);
                  noteBox.appendChild(content);
                  noteBox.appendChild(actions);
                  modalList.appendChild(noteBox);
              });
          };
      }
      
                