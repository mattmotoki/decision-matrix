const dimensions = [
  { name: 'difficulty', label: 'Difficulty', weight: -1 },
  { name: 'urgency', label: 'Urgency', weight: 3 },
  { name: 'monetaryBenefit', label: 'Monetary Benefit', weight: 2 },
  { name: 'personalDevelopment', label: 'Personal Development', weight: 1 }
];

const slidersDiv = document.getElementById('sliders');
dimensions.forEach(dim => {
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'slider-container';

  const label = document.createElement('label');
  label.htmlFor = dim.name;
  label.innerText = `${dim.label} (${dim.weight > 0 ? '+' : ''}${dim.weight}):`;

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '10';
  slider.value = '0';
  slider.id = dim.name;
  slider.dataset.dimension = dim.name;

  const valueDisplay = document.createElement('span');
  valueDisplay.innerText = '0';
  slider.addEventListener('input', function() {
    valueDisplay.innerText = slider.value;
  });

  sliderContainer.appendChild(label);
  sliderContainer.appendChild(slider);
  sliderContainer.appendChild(valueDisplay);
  slidersDiv.appendChild(sliderContainer);
});

let tasks = [];

function calculateImportance(task) {
  let importance = 0;
  dimensions.forEach(dim => {
    importance += (task[dim.name] * dim.weight);
  });
  return importance;
}

function renderTasks() {
  tasks.sort((a, b) => calculateImportance(b) - calculateImportance(a));

  const taskTableBody = document.querySelector('#taskTable tbody');
  taskTableBody.innerHTML = '';

  tasks.forEach((task, index) => {
    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.innerText = task.name;
    tr.appendChild(nameTd);

    dimensions.forEach(dim => {
      const td = document.createElement('td');
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '0';
      slider.max = '10';
      slider.value = task[dim.name];
      slider.style.width = '80%';

      slider.addEventListener('input', function() {
        task[dim.name] = parseInt(slider.value);
        importanceTd.innerText = calculateImportance(task).toFixed(2);
        span.innerText = slider.value;
        renderTasks();
      });
      td.appendChild(slider);

      const span = document.createElement('span');
      span.innerText = task[dim.name];
      td.appendChild(span);

      tr.appendChild(td);
    });

    const importanceTd = document.createElement('td');
    importanceTd.innerText = calculateImportance(task).toFixed(2);
    tr.appendChild(importanceTd);

    const actionsTd = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
      tasks.splice(index, 1);
      renderTasks();
    });
    actionsTd.appendChild(deleteButton);
    tr.appendChild(actionsTd);

    taskTableBody.appendChild(tr);
  });
}

document.getElementById('addTaskButton').addEventListener('click', function() {
  const taskNameInput = document.getElementById('taskName');
  const taskName = taskNameInput.value.trim();
  if (taskName === '') {
    alert('Please enter a task name.');
    return;
  }

  const newTask = { name: taskName };
  dimensions.forEach(dim => {
    const slider = document.getElementById(dim.name);
    newTask[dim.name] = parseInt(slider.value);
  });

  tasks.push(newTask);
  taskNameInput.value = '';
  
  dimensions.forEach(dim => {
    const slider = document.getElementById(dim.name);
    slider.value = '0';
    slider.dispatchEvent(new Event('input'));
  });
  renderTasks();
});