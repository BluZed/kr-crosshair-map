let crossSetts;
try{
    crossSetts = JSON.parse(decodeURIComponent((location.href.slice(location.href.indexOf("?q=")+ 3))));
} catch {
    crossSetts = false;
    console.log(error);
    showError("Crosshair settings are not valid json. Check console for details.");
}

const uploadbtn = document.getElementById("uploadsetts");
const uploadFileinput = document.getElementById("uploadfileinput");
const uploadFileCancelBtn = document.getElementById("canceluploadfile");
const submitbtn = document.getElementById("submitsetts");
const settsinput = document.getElementById("settings_input");

uploadbtn.onclick = () => {
    document.getElementById("file-input").style.display = "flex";
}
uploadFileCancelBtn.onclick = () => {
    document.getElementById("file-input").style.display = "none";
}
uploadFileinput.onchange = function () {
    const file = this.files[0];
    const reader = new FileReader();
    if (file) {
        reader.onload = (event) => {
            const result = event.target.result;
            settsinput.value = result;
            uploadFileCancelBtn.click();
        }
        reader.readAsText(file);
    }
}

submitbtn.onclick = () => {
    let setts = null;
    try {
        setts = JSON.parse(settsinput.value);
    } catch (error) {
        setts = null;
        console.log(error, settsinput.value);
        showError("Error while parsing input settings json. Check console for details.");
    }
    if (setts) {
        Object.assign(setts, crossSetts);
        downloadSettings("settings_new.txt", JSON.stringify(setts));
    }
}

function hideAllTabs() {
    document.querySelectorAll(".display-tab").forEach(e => {
        e.style.display = "none";
    })
}

function showError(msg) {
    hideAllTabs();
    document.getElementById("errormsg").innerHTML = msg ? msg : document.getElementById("errormsg").innerHTML;
    document.getElementById("error").style.display = "block";
}

function downloadSettings(name, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
}