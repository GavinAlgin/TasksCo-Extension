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
      }, 4000);
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