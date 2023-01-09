const currentDayEl = $("#currentDay");
const tableEl = $(".table");
const timeTable = [
    $("#9amInput"),
    $("#10amInput"),
    $("#11amInput"),
    $("#12pmInput"),
    $("#1pmInput"),
    $("#2pmInput"),
    $("#3pmInput"),
    $("#4pmInput"),
    $("#5pmInput")
];

const clearBtnEl = $("#clearBtn");

let entries = [];
let currentTime = moment();

function init() {
    displayTime();
    updateSchedule();
    pullOldEntries();
    displayOldEntries();
}

init();

function displayTime() {
    const today = moment().format("dddd, MMM DD, YYYY");
    currentDayEl.text(today);
}

function updateSchedule() {
    timeTable.forEach((timeBlock, i) => {
        const time = moment((i + 9 + ":00"), "H:mm");
        if (currentTime.isBefore(time)) {
            timeBlock.addClass("bg-success text-white");
        } else if (currentTime.isAfter(time)) {
            timeBlock.addClass("bg-secondary text-white");
        } else {
            timeBlock.addClass("bg-danger text-white");
        }
    });
}

function pullOldEntries() {
    const oldEntries = JSON.parse(localStorage.getItem("oldEntries"));
    if (oldEntries) {
        entries = oldEntries;
    }
}

function displayOldEntries() {
    entries.forEach((entry, i) => {
        if (entry) {
            timeTable[i].val(entry);
        }
    });
}

tableEl.on("click", function(event) {
    timeTable.forEach((timeBlock, i) => {
        if ($(event.target).attr("id") === `${i + 9}Btn`) {
            entries[i] = timeBlock.val();
            localStorage.setItem("oldEntries", JSON.stringify(entries));
        }
    });
});

clearBtnEl.on("click", function() {
    timeTable.forEach((timeBlock, i) => {
        timeBlock.val("");
        entries[i] = "";
    });
    localStorage.setItem("oldEntries", JSON.stringify(entries));
});