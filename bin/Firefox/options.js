// Copyright 2019 Serge Benard. Use as you wish!

function createForm() {
    chrome.storage.sync.get(['removedContextMenu'], function (list) {
        let removed = list.removedContextMenu || [];
        let form = document.getElementById('form');
        for (let key of Object.keys(kResources)) {
            let div = document.createElement('div');

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = key;
            checkbox.value = kResources[key];
            checkbox.id = kResources[key];
            checkbox.classList.add('switch');
            checkbox.checked = true;
            if (removed.includes(key)) {
                checkbox.checked = false;
            }

            let label = document.createElement('label');
            label.htmlFor = kResources[key];
            label.textContent = kResources[key];

            div.appendChild(checkbox);
            div.appendChild(label);
            form.appendChild(div);
        }
    });
}

createForm();

document.getElementById('optionsSubmit').onclick = function () {
    let checkboxes = document.getElementsByTagName('input');
    let removed = [];
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == false) {
            removed.push(checkboxes[i].name);
        }
    }
    if (removed.length < checkboxes.length) {
        chrome.storage.sync.set({ removedContextMenu: removed });
        window.close();
    }
    else {
        alert('There needs to be at least one option selected for the search.');
    }
}

document.getElementById('optionsAll').onclick = function () {
    let checkboxes = document.getElementsByTagName('input');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
    }
}

document.getElementById('optionsNone').onclick = function () {
    let checkboxes = document.getElementsByTagName('input');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}