function header(start, time, reset, leaders){
    // make a header with buttons that fire each parameter function
    let header = document.createElement("div");
    header.className = "header";
    let start_button = document.createElement("button");
    start_button.className = "button";
    start_button.innerHTML = "START";
    start_button.id = "start"
    start_button.onclick = start;

    let reset_button = document.createElement("button");
    reset_button.className = "button";
    reset_button.innerHTML = "RESET";
    reset_button.id = "reset";
    reset_button.onclick = reset;

    let leader_button = document.createElement("button");
    leader_button.className = "button";
    leader_button.innerHTML = "LEADER BOARD";
    leader_button.id = "leader";
    leader_button.onclick = leaders;

    header.appendChild(start_button);
    header.appendChild(time);
    header.appendChild(reset_button);
    header.appendChild(leader_button);

    document.body.appendChild(header);
}