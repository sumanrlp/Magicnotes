localStorage.clear();
let addbtn = document.getElementById('addbtn');


addbtn.addEventListener('click', function () {

    let addtxt = document.getElementById('addtxt');
    let notes = localStorage.getItem('notes');
    let notestitle = localStorage.getItem('notestitle');
    let title = document.getElementById('title');
    if (notes == null && notestitle == null) {
        notesarr = [];
        notestitlearr = [];
    } else {
        notesarr = JSON.parse(notes);
        notestitlearr = JSON.parse(notestitle);
    }

    if (addtxt.value.length != 0 && title.value.length != 0) {
        notesarr.push(addtxt.value);
        notestitlearr.push(title.value);
    }
    localStorage.setItem('notes', JSON.stringify(notesarr));
    localStorage.setItem('notestitle', JSON.stringify(notestitlearr));
    if (addtxt.value.length != 0 && title.value.length != 0) {
        shownotes();
        addtxt.value = "";
        title.value = "";
    }

})

function shownotes() {

    let html = "";

    let note = document.getElementById('notes');

    notesarr.forEach(function (element, index) {

        html += `
        <div class="notecard my-4 mx-2" style="width: 15rem; display:flex">
                        <div class="card-body" style="border: 0.2px solid grey; padding: 20px; border-radius: 5px">
                            <h5 class="card-title">${notestitlearr[index]}</h5>
                            <p class="card-text" id="notetxt" style="word-wrap: break-word">${element}</p>
                            <button id="${index}" class="btn btn-primary" onclick="fbtn(this.id)">Delete note</button>
                            <button id="favbtn+${index}" class="btn btn-primary mx-2 rishi" onclick="fav(${index})" style="background-color: white; color: black">*</button>
                        </div>
                    </div>
        `

    });

    note.innerHTML = html;
}



let srch = document.getElementById('srch');
srch.addEventListener('input', function () {

    let srchtxt = document.getElementById('srch').value.toLowerCase();
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function (element) {

        let ptxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let titletxt = element.getElementsByTagName('h5')[0].innerText.toLowerCase();

        if (ptxt.includes(srchtxt) || titletxt.includes(srchtxt)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})

function fav(element) {

    let favbtn = document.getElementById(`favbtn+${element}`);
    let favnotes = document.getElementById('favnotes');

    if(favbtn.style.backgroundColor=="white") {
        favbtn.style.backgroundColor = "blue";
        favbtn.style.color = "white";

        let html = `
        <div id"pr+${element}" class="notecard my-4 mx-2" style="width: 15rem">
            <div class="card-body" style="border: 0.2px solid grey; padding: 20px; border-radius: 5px">
                <h5 class="card-title">${notestitlearr[element]}</h5>
                <p class="card-text" id="notetxt" style="word-wrap: break-word">${notesarr[element]}</p>
                <button id="${element}" class="btn btn-primary" onclick="fbtn(this.id)">Delete note</button>
                <button id="favbtn+${element}" class="btn btn-primary mx-2" onclick="fav1(${element})" style="background-color: blue; color: white">*</button>
            </div>
        </div>
        `
        let d= document.createElement('div');
        d.id = `p+${element}`;
        d.innerHTML = html;
        favnotes.appendChild(d);
        // favnotes.innerHTML+= html;
        
    } else {
        favbtn.style.backgroundColor = "white";
        favbtn.style.color = "blue";
        
        // // let e = document.getElementsByClassName("p+0");
        // [...document.getElementsByClassName("p+0")].map(n => n && n.remove());
        // // e.remove();

        let e = document.getElementById(`p+${element}`);
        e.remove();
    }

    
}
function fav1(element) {
    let favbtn = document.getElementById(`favbtn+${element}`);
    favbtn.style.backgroundColor = "white";
    favbtn.style.color = "black";

    let e = document.getElementById(`p+${element}`);
    console.log(e);
    console.log(`p+${element}`);
    e.remove();

}

function fbtn(index) {

    notesarr.splice(index, 1);
    notestitlearr.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesarr));
    localStorage.setItem('notestitle', JSON.stringify(notestitlearr));
    shownotes();

    if(document.getElementById(`p+${index}`)!=null) {
        let e = document.getElementById(`p+${index}`);
        e.remove();
    }
}

