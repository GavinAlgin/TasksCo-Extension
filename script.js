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
let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

//Initial Settings
const initializer = () => {
  //function calls for highlighting buttons
  //No highlights for link, unlink,lists, undo,redo since they are one time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //create options for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  //fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  //default size
  fontSizeRef.value = 3;
};

//main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

//options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

//link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  //if link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        //If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer();

//saving text & toast notifications
const noteEditor = document.getElementById('noteEditor');
const publishBtn = document.getElementById('publishBtn');
const resetBtn = document.getElementById('resetBtn');

// Load saved note on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedNote = localStorage.getItem('noteText');
  if (savedNote) {
    noteEditor.value = savedNote;
  }
});

// Debounced auto-save
let debounceTimer;
noteEditor.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    localStorage.setItem('noteText', noteEditor.value);
  }, 300); // 300ms debounce
});

// Publish button click: confirm save and show toast
publishBtn.addEventListener('click', () => {
  localStorage.setItem('noteText', noteEditor.value);
  Window.alert('Note saved to local storage!');
});

// Reset button click: clear storage and textarea
resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  noteEditor.value = '';
  localStorage.removeItem('noteText');
  Window.alert('Note cleared.');
});

// Toast function
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = 'fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow-lg animate-fade-in-out';
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}