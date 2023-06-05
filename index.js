// TODO
// 1. create header 
// 2. create footer
// 3. fix timer
// 4. integrate firebase

// objs to find (will be imported from firestore)
let objs = {
    trumpet: [1786, 136],
    waldo: [2573, 1432],
    yeti: [2816, 232]
};

// 10 random numers 1-60 times with user names as the keys, some will be Anon with a rand num
let leaders = {
    "Anon1": 10,
    "Hal": 23,
    "Anon2": 30,
    "jo1ly": 35,
    "Anon142": 35,
    "Josie": 40,
    "Anon3": 45,
    "Bill": 50,
    "Anon4": 55,
    "Anon5": 60
}

// mount initial event listener
document.addEventListener("click", performFind);

// mount timer div
var time = document.createElement("div");
time.textContent = "60";
time.id = "time";

// place the time in the top center of the screen when
// the dom is loaded
document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(time);
    timer();
});

// callback for click event listner
function performFind(event) {
    console.log("click", event.pageX, event.pageY);
    find({ x: event.pageX, y: event.pageY });
}

// timer function
function timer() {
    var count = 60;
    var interval = setInterval(function () {
        // display current count in h1
        // console.log(count);
        // find the h2 element
        // update its textContent
        if (count <= 3) {
            time.style.color = "red";
        }
        if (count <= 0) {
            clearInterval(interval);
            alert("Game Over");
            // display leaderboard
            setTimeout(function () {
                displayLeaders(leaders)
            }, 1000);
        }
        time.innerHTML = count;
        count--;
    }, 1000);
}

// click functionality for finding the objects
function find(coords) {
    let x = coords.x - 50;
    let y = coords.y - 50;
    var box = document.createElement("div");
    box.id = 'box'
    box.style.top = y + "px";
    box.style.left = x + "px";

    document.body.appendChild(box);
    var select = document.createElement("select");
    select.style.top = y + 100 + "px";
    select.style.left = x + 10 + "px";
    select.id = 'select'
    
    var pls = document.createElement("option");
    pls.value = "select";
    pls.innerHTML = "select";
    select.appendChild(pls);

    for (obj in objs)  {
        var option = document.createElement("option");
        option.value = obj;
        option.innerHTML = obj;
        select.appendChild(option);
    }

    document.body.appendChild(select);
    // disable cursor until object selection
    document.removeEventListener("click", performFind);
    select.addEventListener("change", function (event) {
        // verify the user selected the correct option
        verify(event.target.value, [coords.x, coords.y]);
        console.log("change", event.target.value);
        document.body.removeChild(box);
        document.body.removeChild(select);
        document.addEventListener("click", performFind);
    });
}

// verify the selection by checking its proximity to the top of the page
function verify(obj, loc) {
    // get cursor location
    let x = loc[0];
    let y = loc[1];

    // get correct locations
    waldo_loc = objs['waldo'];
    trumpet_loc = objs['trumpet'];
    yeti_loc = objs['yeti'];

    if (obj === "trumpet") {
        if (dist(x, y, trumpet_loc[0], trumpet_loc[1])) {
            alert("Correct");
            // remove from objs_to_find
            delete objs["trumpet"];
        }
    }
    else if (obj === "waldo") {
        if (dist(x, y, waldo_loc[0], waldo_loc[1])) {
            alert("Correct");
            // remove from objs_to_find
            delete objs["waldo"];
        }
    }
    else if (obj === "yeti") {
        if (dist(x, y, yeti_loc[0], yeti_loc[1])) {
            alert("Correct");
            // remove from objs_to_find
            delete objs["yeti"];
        }
    }
    if (Object.keys(objs).length === 0) {
        alert("You Win!");
        // remove the timer
        document.body.removeChild(time);
        // wait 3 seconds
        setTimeout(function () {
            promptName();
        }, 1000);
        // display leaderboard
    }

}

// check the the second point is within 50 from the first point
function dist(x1, y1, x2, y2) {
    let dist = Math.abs(x1 - x2) <= 50 && Math.abs(y1 - y2) <= 50;
    if (dist) {
        console.log('distance is within range')
    }
    else {
        console.log('distance is out of range')
    }
    return dist;
}

// display leaderboard
function displayLeaders(leaders, name = 'Anon') {
    // disable click listener
    document.removeEventListener("click", performFind);

    // clear the document
    document.body.innerHTML = "";       
    // sort the leaders
    let sorted = Object.keys(leaders).sort(function (a, b) { return leaders[a] - leaders[b] });
    // display the leaders
    let leader_div = document.createElement("div");
    // make the body a flexbox and center the div
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
        leader_div.style.width = "500px";
    leader_div.style.height = "800px";
    leader_div.style.textAlign = "center";
    leader_div.style.lineHeight = "100px";
    leader_div.style.fontSize = "100px";
    leader_div.style.fontFamily = "monospace";
    leader_div.textContent = "Leader Board";
    leader_div.id = "leaders";
    // make a numbered list
    let leader_list = document.createElement("ol");
    // add top margin of 100 px
    leader_list.style.marginTop = "100px";
    leader_list.style.width = "500px";
    leader_list.style.height = "700px";
    leader_list.style.backgroundColor = "white";
    leader_list.style.textAlign = "center";
    leader_list.style.lineHeight = "100px";
    leader_list.style.fontSize = "50px";
    leader_list.style.fontFamily = "monospace";
    leader_list.id = "leader_list";
    leader_div.appendChild(leader_list);
    document.body.appendChild(leader_div);


    for (let i = 0; i < sorted.length; i++) {            
        let li = document.createElement("li");
        li.style.textDecoration = "none";
        li.textContent = sorted[i] + ": " + leaders[sorted[i]];
        if (sorted[i] === name) {
            li.style.color = "red";
        }
        leader_list.appendChild(li);
    }
}

// get users name
function promptName() {
    // disable the box click listener
    document.removeEventListener("click", performFind);
    // disable timer
    clearInterval(interval);

    let name = prompt("Please enter your name", "Anon");
    displayLeaders(leaders, name);
}