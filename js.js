var delayValue;
let runBtn = document.getElementById("button");
runBtn.addEventListener("click", async function (e) {

    runBtn.style.visibility = "hidden";//hide the run button

    let inp = document.getElementById("inp");
    delayValue = document.getElementById("delayInput").value * 1000;
    inp.style.visibility = "hidden";

    //Add the main function to the call stack
    let stack = document.querySelectorAll("#stack td");
    stack[0].innerHTML = `<div>
    <span class="function">main</span>
    <span class="brackets">(</span>
    <span class="brackets">)</span>
</div>`;
    await glow(stack[0]);

    //Display the arrow and heighlight the first line
    let prevLine = moveArrow(11, "non");
    let arrow = document.getElementById("arrow");
    arrow.classList.add("display");

    await glow(arrow);

    //Add x to memory
    let ramCells = document.querySelectorAll("#ram tr");
    let addressValue = ramCells[1].querySelectorAll("td");
    addressValue[1].textContent = "10";
    await glow(ramCells[1]);

    //Add x to symbols table
    let symbolCells = document.querySelectorAll("#symbolTable tr");
    let value = symbolCells[1].querySelectorAll("td");
    value[0].textContent = "x";
    value[1].textContent = "0x00";
    await glow(symbolCells[1]);

    prevLine = moveArrow(12, prevLine);
    await new Promise(r => setTimeout(r, delayValue));

    //Add the byvalue function to the call stack
    stack[1].innerHTML = `<div>
        <span class="function">by_value</span>
        <span class="brackets">(</span>
        <span class="variable">x</span>
        <span class="brackets">)</span>
    </div>`;
    await glow(stack[1]);

    prevLine = moveArrow(1, prevLine);
    await new Promise(r => setTimeout(r, delayValue));

    //Add byvalue a to memory
    addressValue = ramCells[2].querySelectorAll("td");
    addressValue[1].textContent = "10";
    await glow(ramCells[2]);

    //Add byvalue a to symbols table
    value = symbolCells[2].querySelectorAll("td");
    value[0].textContent = "a";
    value[1].textContent = "0x01";
    await glow(symbolCells[2]);

    prevLine = moveArrow(3, prevLine);
    await new Promise(r => setTimeout(r, delayValue));

    //Modify byvalue a memory value
    addressValue = ramCells[2].querySelectorAll("td");
    addressValue[1].textContent = "15";
    await glow(ramCells[2]);

    prevLine = moveArrow(12, prevLine);
    await new Promise(r => setTimeout(r, delayValue));

    //remove the byvalue function from the call stack
    stack[1].innerHTML = ``;
    await glow(stack[1]);

    //Remove byvalue a from memory
    addressValue = ramCells[2].querySelectorAll("td");
    addressValue[1].textContent = "GARBAGE";
    await glow(ramCells[2]);

    //remove byvalue a from symbols table
    value = symbolCells[2].querySelectorAll("td");
    value[0].textContent = "";
    value[1].textContent = "";
    await glow(symbolCells[2]);

    prevLine = moveArrow(13, prevLine);
    await new Promise(r => setTimeout(r, delayValue));

    //print out cout
    let div = document.createElement("div");
    let text = document.createTextNode("Value of X: 10");
    div.appendChild(text);
    let print = document.getElementById("print");
    let output = document.getElementById("output");
    output.insertBefore(div, print);
    await glow(output);

    await new Promise(r => setTimeout(r, delayValue));

    prevLine = moveArrow(14, prevLine);
    await new Promise(r => setTimeout(r, delayValue));

    //Add the byReference function to the call stack
    stack[1].innerHTML = `<div>
        <span class="function">by_reference</span>
        <span class="brackets">(</span>
        <span class="variable">x</span>
        <span class="brackets">)</span>
    </div>`;
    await glow(stack[1]);

    prevLine = moveArrow(5, prevLine);
    await new Promise(r => setTimeout(r, delayValue));

    //Add byreference a to symbols table
    value = symbolCells[2].querySelectorAll("td");
    value[0].textContent = "a";
    value[1].textContent = "0x00";
    await glow(symbolCells[2]);

    prevLine = moveArrow(7, prevLine);
    await new Promise(r => setTimeout(r, delayValue));

    //Modify byreference a memory value
    addressValue = ramCells[1].querySelectorAll("td");
    addressValue[1].textContent = "20";
    await glow(ramCells[1]);

    prevLine = moveArrow(14, prevLine);
    await new Promise(r => setTimeout(r, delayValue));

    //Remove the byreference function from the call stack
    stack[1].innerHTML = ``;
    await glow(stack[1]);

    //Remove byreference a from symbols table
    value = symbolCells[2].querySelectorAll("td");
    value[0].textContent = "";
    value[1].textContent = "";
    await glow(symbolCells[2]);

    prevLine = moveArrow(15, prevLine);
    await new Promise(r => setTimeout(r, delayValue));

    //print out cout
    div = document.createElement("div");
    text = document.createTextNode("Value of X: 20");
    div.appendChild(text);
    output.insertBefore(div, print)
    await glow(output);
});

function moveArrow(lineNum, prevLine) {
    let line = document.querySelector(`.line:nth-child(${lineNum})`);
    if (prevLine != "non")
        prevLine.classList.remove("heighlight");
    line.classList.add("heighlight");
    let arrow = document.getElementById("arrow");
    let arect = arrow.getBoundingClientRect();

    let rect = line.getBoundingClientRect();
    arrow.style.top = `${(rect.top + (rect.height / 2)) - (arect.height / 2)}px`;

    return line;
}

async function glow(element) {
    element.classList.add("glow");
    await new Promise(r => setTimeout(r, delayValue));
    element.classList.remove("glow");
}
