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

  document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.className = 'bg-gray-100 p-3 rounded-md flex items-center justify-between space-x-2 draggable';
        li.setAttribute('draggable', 'true');

        const dragIcon = document.createElement('span');
        dragIcon.innerHTML = '☰'; // draggable icon
        dragIcon.className = 'cursor-move text-gray-400 pr-2';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-checkbox h-5 w-5 text-blue-600 rounded-full';

        const span = document.createElement('span');
        span.className = 'ml-2 flex-1';
        span.textContent = taskText;

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.remove();
            }
        });

        const contentWrap = document.createElement('div');
        contentWrap.className = 'flex items-center w-full';
        contentWrap.appendChild(dragIcon);
        contentWrap.appendChild(checkbox);
        contentWrap.appendChild(span);

        li.appendChild(contentWrap);
        taskList.appendChild(li);
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            createTaskElement(taskText);
            newTaskInput.value = '';
            newTaskInput.focus();
        }
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Drag and drop logic
    let dragged;

    taskList.addEventListener('dragstart', (e) => {
        dragged = e.target;
        e.target.style.opacity = 0.5;
    });

    taskList.addEventListener('dragend', (e) => {
        e.target.style.opacity = '';
    });

    taskList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(taskList, e.clientY);
        if (afterElement == null) {
            taskList.appendChild(dragged);
        } else {
            taskList.insertBefore(dragged, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            return offset < 0 && offset > closest.offset
                ? { offset: offset, element: child }
                : closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});