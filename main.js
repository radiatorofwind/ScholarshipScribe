// play transition
// mostly just prepare things tho
// DEFAULT VALUE FOR LEFT: 19.7%
default_left = "19.7%";
// play mainapp transition on load
window.onload = function() {
    // define variables for specific elements
    var html = document.getElementById("html");
    var bigbuttons = document.getElementsByClassName("bigbuttons");
    var apps = document.getElementsByClassName("apps");
    var mainapp = document.getElementById("mainapp");
    var step1 = document.getElementById("step1");
    var emailsubmit = document.getElementById("emailsubmit");
    var emailform = document.getElementById("emailform");
    var emailinput = document.getElementById("emailinput");
    var start = document.getElementById("startIt");
    var step1Button = document.getElementById("step1Next");
    var step2 = document.getElementById("step2");
    var step3 = document.getElementById("step3");
    var fileselect = document.getElementById("resumesubmit");
    var step2Submit = document.getElementById("step2Submit");
    var careersDropdown = document.getElementById("careers");
    var step3Next = document.getElementById("step3Next");
    var step4 = document.getElementById("step4");
    var step4Number = document.getElementById("numberofcolleges");
    var step4Done = document.getElementById("step4Done");
    var step5 = document.getElementById("step5");
    var step5Send = document.getElementById("step5Send");
    var step5Console = document.getElementById("sendterminal");
    // set important variables
    var email;
    var file;
    var scholarshiptype;
    var numofcolleges;
    // set main app top to 7.5px to initiate transition
    mainapp.style.top = "7.5px";
    // transition 1st step in
    start.addEventListener("click",function()
    {
        mainapp.style.left = "-100%";
        step1.style.left = default_left;
    });
    // add loading bar transition for every app transition
    for(var i = 0; i < apps.length; i++)
    {
        apps[i].addEventListener("transitionstart",function()
        {
            html.style = "cursor:progress;"
        })
        apps[i].addEventListener("transitionend",function()
        {
            html.style = "cursor:normal;"
        })
    };
    // enable step 1 nexts button
    emailform.addEventListener("submit",function()
    {
        email = emailinput.value;
        console.log(email);
        emailinput.value = "Proceed to the next step!"
        step1Button.disabled = false;
        step1Button.style.cursor = "pointer";
    });
    // transition step 2 in
    step1Button.addEventListener("click",function()
    {
        step1.style.left = "-100%";
        step2.style.left = default_left;
    });
    // detect file selection changes
    fileselect.addEventListener("change",function()
    {
        var f = fileselect.files[0];
        var fileext = f.name.substring(f.name.length-4);
        if(fileext != ".pdf")
        {
            console.log("Unfortunately, the user didn't choose a .pdf file. Wiped the file.");
            fileselect.value = "";
            return;
        }
        file = f;
        console.log(file);
        step2Submit.style.cursor = "pointer";
        step2Submit.disabled = false;
    });
    // transition step 3 in
    step2Submit.addEventListener("click",function()
    {
        step2.style.left = "-100%";
        step3.style.left = default_left;
    });
    // if dropdown selection changes, lock the submit IF the selected entry 
    careersDropdown.addEventListener("change",function()
    {
        var currentoption = careersDropdown.options[careersDropdown.selectedIndex].value;
        if(currentoption == "selectsomething")
        {
            step3Next.disabled = true;
            step3Next.style.cursor = "not-allowed";
        } else {
            step3Next.disabled = false;
            step3Next.style.cursor = "pointer";
            scholarshiptype = currentoption;
            console.log(scholarshiptype);
        }
    });
    step3Next.addEventListener("click",function()
    {
        step3.style.left = "-100%";
        step4.style.left = default_left;
    })
    step4Done.addEventListener("click",function()
    {
        numofcolleges = step4Number.value;
        step4.style.left = "-100%"
        step5.style.left = default_left;
    })
    function sendLine(msg)
    {
        var newTerminalOutput = document.createElement("p");
        newTerminalOutput.innerHTML = msg.toString();
        newTerminalOutput.classList.add("consolep");
        step5Console.appendChild(newTerminalOutput);
    }
    step5.addEventListener("transitionend",function()
    {
        sendLine("Awaiting a SEND command...");
    })
    step5Send.addEventListener("click",function()
    {
        step5Send.disabled = true;
        step5Send.style.cursor = "not-allowed";
        step5Send.innerHTML = "Sending...";
        for(var i = 0; i < numofcolleges; i++)
        {
            sendLine(i)
            setTimeout(function(){console.log(i)},500);
        }
    })
}