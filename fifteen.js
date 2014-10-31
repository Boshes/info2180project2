//Win message upon solving the puzzle added.

var left = 0;
var up = 0;
var pieces;
var gameover = false;

window.onload = function () {
    "use strict";
    $("shufflebutton").onclick = shuffle;
    var i;
    pieces = $$("div#puzzlearea div");
    for (i = 0; i < pieces.length; i++) {
        pieces[i].addClassName("puzzlepiece");
        pieces[i].style.top = up + "px";
        pieces[i].style.left = left + "px";
        pieces[i].style.backgroundPosition = '-' + left + 'px ' + '-' + up + "px";
        left += 100;
        if (left === 400) {
            up += 100;
            left = 0;
        }
        pieces[i].onclick = function () {
            if (able(parseInt(this.innerHTML))) {
                swap(parseInt(this.innerHTML) - 1);
                if (done()) {
                    $("controls").insert("<p>You Win!</p>");
                }
            }
        };
        pieces[i].onmouseover = function () {
            if (able(parseInt(this.innerHTML))) {
                this.addClassName("movablepiece");
            } else {
                this.removeClassName("movablepiece");
            }
        };
    }
};

function shuffle() {
    "use strict";
    if ($("controls").childElementCount===2) {
        $("controls").lastChild.remove();
    }
    var i;
    for (i = 0; i < 1000; i++) {
        var rand = Math.floor(Math.random() * 15) + 1;      
        if (able(parseInt(pieces[rand - 1].innerHTML))) {
            swap(parseInt(pieces[rand - 1].innerHTML) - 1);
        }
    }
}

function rightmove(x, y, position) {
    "use strict";
    var i;
    if (x > 0) {
        for (i = 0; i < pieces.length; i++) {
            if ((parseInt(pieces[i].style.left) + 100 === x) && (parseInt(pieces[i].style.top) === y)) {
                return i === (position - 1);
            }
        }
    }
    return false;
}

function leftmove(x, y, position) {
    "use strict";
    var i;
    if (x < 300) {
        for (i = 0; i < pieces.length; i++) {
            if ((parseInt(pieces[i].style.left) - 100 === x) && (parseInt(pieces[i].style.top) === y)) {
                return i === (position - 1);
            }
        }
    }
    return false;
}

function downmove(x, y, position) {
    "use strict";
    var i;
    if (y > 0) {
        for (i = 0; i < pieces.length; i++) {
            if ((parseInt(pieces[i].style.left) === x) && (parseInt(pieces[i].style.top) + 100 === y)) {
                return i === (position - 1);
            }
        }
    }
    return false;
}

function upmove(x, y, position) {
    "use strict";
    var i;
    if (y < 300) {
        for (i = 0; i < pieces.length; i++) {
            if ((parseInt(pieces[i].style.left) === x) && (parseInt(pieces[i].style.top) - 100 === y)) {
                return i === (position - 1);
            }
        }
    }
    return false;
}


var blankup = "300px";
var blankleft = "300px";
var temp;

function swap(position) {
    "use strict";
    temp = pieces[position].style.top;
    pieces[position].style.top = blankup;
    blankup = temp;
    temp = pieces[position].style.left;
    pieces[position].style.left = blankleft;
    blankleft = temp;
}

function able(position) {
    "use strict";
    return rightmove(parseInt(blankleft), parseInt(blankup), position) || leftmove(parseInt(blankleft), parseInt(blankup), position) || downmove(parseInt(blankleft), parseInt(blankup), position) || upmove(parseInt(blankleft), parseInt(blankup), position);
}

function done() {
    "use strict";
    var i;
    for (i = 0; i < pieces.length; i++) {
        if (pieces[i].style.top !== parseInt(i / 4) * 100 + "px"  || pieces[i].style.left !== parseInt(i % 4) * 100 + "px") {
            return false;
        }
    }
    return true;
}

    
