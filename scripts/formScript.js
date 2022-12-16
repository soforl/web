var selectDays = document.getElementById("daysVariants");
var selectLessons = document.getElementById("lessonsVariants");
var button = document.getElementById("changeSelected");
var elem = document.getElementById("elem");

function creating() {
    createTable(elem, selectDays.value, selectLessons.value);
    localStorage.setItem(selectDays.value, selectLessons.value);
}

let count = 1;

function createTable(parent, cols, rows) {
    var table = document.createElement('table');
    table.style.background = ' #85B7BC';
    table.style.borderRadius = '20px';
    table.style.border = '1px solid grey';


    for (var i = 0; i < rows; i++) {
        var tr = document.createElement('tr');

        for (var j = 0; j < cols; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = 'lesson';
        }
        table.appendChild(tr);
    }
    parent.appendChild(table);
}


let editingTd;

elem.onclick = function (event) {

    // 3 возможных цели
    let target = event.target.closest('.edit-cancel,.edit-ok,td');

    if (!elem.contains(target)) return;

    if (target.className == 'edit-cancel') {
        finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
        finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
        if (editingTd) return; // уже редактируется

        makeTdEditable(target);
    }

};

function makeTdEditable(td) {
    editingTd = {
        elem: td,
        data: td.innerHTML
    };

    td.classList.add('edit-td'); // td в состоянии редактирования, CSS применятся к textarea внутри ячейки

    let textArea = document.createElement('textarea');
    textArea.style.width = td.clientWidth + 'px';
    textArea.style.height = td.clientHeight + 'px';
    textArea.className = 'edit-area';

    textArea.value = td.innerHTML;
    td.innerHTML = '';
    td.appendChild(textArea);
    textArea.focus();

    td.insertAdjacentHTML("beforeEnd",
        '<div class="edit-controls"><button class="edit-ok">OK</button><button class="edit-cancel">CANCEL</button></div>'
    );
}

function finishTdEdit(td, isOk) {
    if (isOk) {
        td.innerHTML = td.firstChild.value;
    } else {
        td.innerHTML = editingTd.data;
    }
    td.classList.remove('edit-td');
    editingTd = null;
}
