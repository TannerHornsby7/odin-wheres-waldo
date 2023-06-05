function header(start, stop, leaders){
    // make a header with buttons that fire each parameter function
    let header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.width = "100%";
    header.style.height = "100px";
    header.style.backgroundColor = "white";
    header.style.textAlign = "center";
    header.style.lineHeight = "100px";
    header.style.fontSize = "50px";

    let start_button = document.createElement("button");
    start_button.textContent = "Start";
    start_button.style.width = "200px";
    start_button.style.height = "100px";
    start_button.style.backgroundColor = "white";
    start_button.style.textAlign = "center";
    start_button.style.lineHeight = "100px";
    start_button.style.fontSize = "50px";
    start_button.style.fontFamily = "monospace";

    start_button.onclick = start;

}