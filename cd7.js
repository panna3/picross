/*
* Picross 5 x 5 - 7. E
* Author: Tamaki Komatsuzaki
* Date: April 8 2009
*/
var gameend = false;
var whichtdstart;

/*
* multiROW
* abc: alphabet.
* start: number 1, 2, 3, 4, 5, 6 , 7, 8, 9, 10
* end: alphabet a, b, c, d, e, f, g, h, i, j
* e: event
* tid: td's id
*/
function multiROW(abc, e, start, end, tid) {
    //Shift + click to mark as empty.
    if (e.shiftKey == 1) {
            makeitsolidROW(abc, start, end, 1);
        }
        else {
            //When user click on the empty one, change it to solid border.
            if ((document.getElementById(tid).style.borderStyle == "dashed dashed dashed dashed") || (document.getElementById(tid).style.borderStyle == "dashed")) {
                makeitsolidROW(abc, start, end, 2);
            }
            else {
                //If the background is black when it's clicked, change it to white.
                if ((document.getElementById(tid).style.backgroundColor == "rgb(0, 0, 0)") || (document.getElementById(tid).style.backgroundColor == "rgb(0,0,0)")) {
                    makeitsolidROW(abc, start, end, 3);
                }
                //If the background is white when it's clicked, change it to black.
                else {
                    makeitsolidROW(abc, start, end, 4);
                }
            }
        }
    
}// end of multiROW function.

/*
* multiCOL
* abc: alphabet.
* start: number 1, 2, 3, 4, 5, 6 , 7, 8, 9, 10
* end: alphabet a, b, c, d, e, f, g, h, i, j
* e: event
* tid: td's id
*/
function multiCOL(abc, e, start, end, tid) {
    //Shift + click to mark as empty.
    if (e.shiftKey == 1) {
        makeitsolidCOL(abc, start, end, 1);
    }
    else {
        //When user click on the empty one, change it to solid border.
        if ((document.getElementById(tid).style.borderStyle == "dashed dashed dashed dashed") || (document.getElementById(tid).style.borderStyle == "dashed")) {
            makeitsolidCOL(abc, start, end, 2);
        }
        else {
            //If the background is black when it's clicked, change it to white.
            if ((document.getElementById(tid).style.backgroundColor == "rgb(0, 0, 0)") || (document.getElementById(tid).style.backgroundColor == "rgb(0,0,0)")) {
                makeitsolidCOL(abc, start, end, 3);
            }
            //If the background is white when it's clicked, change it to black.
            else {
                makeitsolidCOL(abc, start, end, 4);
            }
        }
    }
} // end of multiCOL

/*
* ROWCOLmup
* e: event
* al: alphabet
* stCOL: start of column
* endCOL: end of column
* endROW: end of row
* id: id
*/
function ROWCOLmup(al, e, stCOL, endCOL, endROW, id) {
    //--------- ROW ---------//
    if (endROW == al) {
        multiROW(al, e, stCOL, endCOL, id);
    }
    //--------- COLUMN --------//
    else if (stCOL == endCOL) {
        multiCOL(al, e, endROW, endCOL, id);
    }
    else { }
} // end of ROWCOLmup function

/*
* whichElement
* e: event
*/
function whichElement(e) {

    if (gameend == true) {
        exit;
        return;
    }
    else {
        var targ;

        if (!e) {
            var e = window.event;
        }
        if (e.target) {
            targ = e.target;
        }
        else if (e.srcElement) {
            targ = e.srcElement;
        }
        if (targ.nodeType == 3) {
            targ = targ.parentNode;
        }

        var tname = targ.tagName;
        var tid = targ.id;

        //When TD is clicked. (squares)
        if (tname == "TD") {
                if (e.type == "mouseup") {
                var sStartRow = whichtdstart.substring(0, 1); //taking alphabet a, b, c, d, e, f, g, h, i, j
                var sStartCol = whichtdstart.substring(1);//taking number 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
                var sEndRow = String(tid).substring(0, 1); //taking alphabet a, b, c, d, e, f, g, h, i, j
                var sEndCol = String(tid).substring(1); //taking number 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

                ROWCOLmup(sStartRow, e, sStartCol, sEndCol, sEndRow, tid);

                //check if the game is ended.
                if (checkendgame() == true) {
                    endmsg(); //Show the name of picture.
                    gameend == true;
                    exit;
                    return;
                }
            }
            if (e.type == "mousedown") {
                whichtdstart = tid;
              }
            }
        }
} // end of whichElement function

/*
* makeitblack
* Make squares as black.
*/
function makeitblack(id) {
    document.getElementById(id).style.backgroundColor = "rgb(0, 0, 0)";
} //end of makeitblack function

/*
* makedash
* Make squares as empty - border is dashed.
*/
function makedash(id) {
    document.getElementById(id).style.borderStyle = "dashed";
    document.getElementById(id).style.borderColor = "#FF0000";
} // end of makedash function.

/*
* makeitwhite
* Make squares as white.
*/
function makeitwhite(id) {
    document.getElementById(id).style.backgroundColor = "rgb(255, 255, 255)";
} // end of makeitwhite function.

/*
* makeitsolid
* Make squares as solid.
*/
function makeitsolid(id) {
    document.getElementById(id).style.borderStyle = "solid";
    document.getElementById(id).style.borderColor = "#000099";
} // end of makeitsolid function.
/*
* passingfunc --- ROW
* Pass the function and repeat.
* fName: Distinguish the function name.
* abc: alphabet - part of ID.
* stnumb: starting number.
* endnumb: ending number.
* fb: True: Forward. False: Backward.
*/
function passingfunc(fName, abc, stnumb, endnumb, fb) {

    //Swap stnumb and endnumb.
    if (fb == false) {
        var tmp = stnumb;
        stnumb = "";
        stnumb = endnumb;
        endnumb = "";
        endnumb = tmp;
    }
    for (var i = parseInt(stnumb); i <= parseInt(endnumb); i++) {
         switch (fName) {
             case "makedash":
                 makedash(abc + i);
                 break;
             case "makeitsolid":
                 makeitsolid(abc + i);
                 break;
             case "makeitwhite":
                 makeitwhite(abc + i);
                 break;
             case "makeitblack":
                 makeitblack(abc + i);
                 break;
             default:
                 break;
         }
    }
} // end of passingfunc function.

/*
* passingfuncB ---- ROW
* Pass the function and repeat.
*/
function passingfuncB(fName, abc, stnumb, endnumb) {
    for (var i = parseInt(endnumb); i <= stnumb; i++) {
        switch (fName) {
            case "makedash":
                makedash(abc + i);
                break;
            case "makeitsolid":
                makeitsolid(abc + i);
                break;
            case "makeitwhite":
                makeitwhite(abc + i);
                break;
            case "makeitblack": 
                makeitblack(abc + i);
                break;
            default:
                break;
        }
    }
} // end of passingfuncB function.

/*
* whichROWTDs  ------ ROW
* TDs are selected. Make it dash, solid, white or black.
* wc: distinguish the function name.
* al: alphabet
* stn: start number.
* endn: end number.
* fb: True = forward. False = backward.
*/
function whichROWTDs(wc, al, stn, endn, fb) {
    //Go forward.
    if (fb == true) {
        //When shift key is pressed, make squares as empty.
        if (wc == 1) {
            passingfunc("makedash", al, stn, endn, true);
        }
        //When the sqares are empty, change them to white and solid border.
        else if (wc == 2) {
            passingfunc("makeitsolid", al, stn, endn, true);
        }
        //When the squares are black, change them to white.
        else if (wc == 3) {
            passingfunc("makeitwhite", al, stn, endn, true);
        }
        //Make squares black.
        else {
            passingfunc("makeitblack", al, stn, endn, true);
        }
    }
    //Go backward.
    else {
            //When shift key is pressed, make squares as empty.
            if (wc == 1) {
                passingfunc("makedash", al, stn, endn, false);
            }
            //When the sqares are empty, change them to white and solid border.
            else if (wc == 2) {
                passingfunc("makeitsolid", al, stn, endn, false);
            }
            //When the squares are black, change them to white.
            else if (wc == 3) {
                passingfunc("makeitwhite", al, stn, endn, false);
            }
            //Make squares black.
            else {
                passingfunc("makeitblack", al, stn, endn, false);
            }
    }
} // end of whichROWTDs function

/*
* whichCOLTDs  ------ COL
* TDs are selected. Make it dash, solid, white or black.
* wc: distinguish the function name.
* al: alphabet
* stn: start number.
* endn: end number.
* fb: True = forward. False = backward.
*/
function whichCOLTDs(wc, al, stn, endn, fb) {
    //Go forward.
    if (fb == true) {
        //When shift key is pressed, make squares as empty.
        if (wc == 1) {
            passingfuncCOL("makedash", al, stn, endn, true);
        }
        //When the sqares are empty, change them to white and solid border.
        else if (wc == 2) {
            passingfuncCOL("makeitsolid", al, stn, endn, true);
        }
        //When the squares are black, change them to white.
        else if (wc == 3) {
            passingfuncCOL("makeitwhite", al, stn, endn, true);
        }
        //Make squares black.
        else {
            passingfuncCOL("makeitblack", al, stn, endn, true);
        }
    }
    //Go backward.
    else {
        //When shift key is pressed, make squares as empty.
        if (wc == 1) {
            passingfuncCOL("makedash", al, stn, endn, false);
        }
        //When the sqares are empty, change them to white and solid border.
        else if (wc == 2) {
            passingfuncCOL("makeitsolid", al, stn, endn, false);
        }
        //When the squares are black, change them to white.
        else if (wc == 3) {
            passingfuncCOL("makeitwhite", al, stn, endn, false);
        }
        //Make squares black.
        else {
            passingfuncCOL("makeitblack", al, stn, endn, false);
        }
    }
} // end of whichCOLTDs function

/*
* passingfuncCOL --- COL
* Pass the function and repeat.
* fName: Distinguish function name.
* stal: Starting alphabet.
* endal: Ending alphabet.
* colnumb: column.
* fb: Forward: true. Backward: false.
*/
function passingfuncCOL(fName, stal, endal, colnumb, fb) {

    var al = new Array("", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o");

    for (var i = 1; i < al.length; i++) {
        if (stal == al[i]) {
            var stALP = i;
        }
        if (endal == al[i]) {
            var endALP = i;          
        }
    }
    //Swap stALP and endALP.
    if (fb == false) {
        var tmp = stALP;
        stALP = "";
        stALP = endALP;
        endALP = "";
        endALP = tmp;
    }
    for (var i = stALP; i <= endALP; i++) {
        switch (fName) {
            case "makedash":
                makedash(al[i] + colnumb);
                break;
            case "makeitsolid":
                makeitsolid(al[i] + colnumb);
                break;
            case "makeitwhite":
                makeitwhite(al[i] + colnumb);
                break;
            case "makeitblack":
                makeitblack(al[i] + colnumb);
                break;
            default:
                break;
        }
    }
} // end of passingfuncCOL function.

/*
* makeitsolidROW
* Make squares as solid when the mouse click is hold ---- ROW
* abc: start of alphabet.
* stn: start number.
* endn: ending number. 
* wc:
*   1: When the shift key is pressed. - make squares empty
*   2: When the squares are empty, change it to solid border.
*   3: When the squares are black, change them to white.
*   4: When the squares are white, change them to black.
*/
function makeitsolidROW(abc, stn, endn, wc) {

    //Go forward.
    if (parseInt(stn) <= parseInt(endn)) {
        whichROWTDs(wc, abc, stn, endn, true);
    }
    //Go backward.
    else {
        whichROWTDs(wc, abc, stn, endn, false);
    }

} // end of makeitsolidROW function

/*
* Make squares as solid when the mouse click is hold ---- COLUMN
* abcde: start of alphabet.
* end: end of alphabet.
* numb: column number. 
* wcase:
*   1: When the shift key is pressed. - make squares empty
*   2: When the squares are empty, change it to solid border.
*   3: When the squares are black, change them to white.
*   4: When the squares are white, change them to black.
*/
function makeitsolidCOL(abcde, end, numb, wcase) {

    var al = new Array("", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o");
 
    for (var i = 1; i < al.length; i++) {
        if(abcde == al[i]){
            var stn = i;
        }
        if(end == al[i]){
            var endn = i; 
        }
    }
    if (parseInt(stn) <= parseInt(endn)) {
        whichCOLTDs(wcase, abcde, end, numb, true);
    }
    else {
        whichCOLTDs(wcase, abcde, end, numb, false);
    }
   
} // end of makeitsolidCOL function 

//Check if the user completed the picture.
function checkendgame() {

    //Original all tds in squares.
    var oID = new Array("a1", "a2", "a3", "a4", "a5",
    "b1", "b2", "b3", "b4", "b5",
    "c1", "c2", "c3", "c4", "c5",
    "d1", "d2", "d3", "d4", "d5",
    "e1", "e2", "e3", "e4", "e5");

    //White part of array.
    var owID = new Array("a1", "", "", "", "a5",
    "b1", "", "b3", "b4", "b5",
    "c1", "", "", "", "c5",
    "d1", "", "d3", "d4", "d5",
    "e1", "", "", "", "e5");

    var wID = new Array();
    var bID = new Array();

    for (var i = 0; i < oID.length; i++) {
        //Put the white part in a new array.
        if (oID[i] == owID[i]) {
            wID[i] = oID[i];
        }
        //Put the black part in a new away.
        else {
            bID[i] = oID[i];
        }
    }
    var wPart = false;
    var bPart = false;
    //White part.
        for (var i = 0; i < wID.length; i++) {
            if (wID[i] != undefined) {
                if ((document.getElementById(wID[i]).style.backgroundColor == "rgb(255, 255, 255)") || (document.getElementById(wID[i]).style.backgroundColor == "rgb(255,255,255)")) {
                    wPart = true;
                }
                else {
                    wPart = false;
                    gameend = false; //The game continues.
                    return false;
                }
            }
        }
        //Black part.
        if (wPart == true) {
            for (var i = 0; i < bID.length; i++) {
                if (bID[i] != undefined) {
                    if ((document.getElementById(bID[i]).style.backgroundColor == "rgb(0, 0, 0)") || (document.getElementById(bID[i]).style.backgroundColor == "rgb(0,0,0)")) {
                        bPart = true;
                    }
                    else {
                        bPart = false;
                        gameend = false;
                        return false;
                    }
                }
            }
        }
        else {
            bPart = false;
            gameend = false;
            return false;
        }
        if (bPart == true) {
            endmsg(); //Show the name of picture.
            gameend = true; // The game is ended.
            exit;
            return true;
        }
} // end of checkendgame function

//Show the name of picture.
function endmsg() {
    document.getElementById("endmsg").style.visibility = "visible";
} // end of endmsg function

function window_onload() {
    //Make squares all white.
    var tds = document.getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++) {
        var tdObj = tds[i];
        tdObj.style.backgroundColor = "rgb(255,255,255)";
    }

    //Make the text hidden.
    for (var i = 1; i < tds.length; i++) {
        if (document.getElementById("tx" + String(i).toString())) {
            document.getElementById("tx" + String(i).toString()).style.visibility = "hidden";
        }
    }

    //Set the tds (in left side) border-color to be white.
    for (var i = 1; i < tds.length; i++) {
        if (document.getElementById("td" + String(i).toString())) {
            document.getElementById("td" + String(i).toString()).style.borderColor = "#FFFFFF";
        }
    }

    //Hide the name of picture.
    document.getElementById("endmsg").style.visibility = "hidden";
    
} // end of window_onload function

//Get the mouseup event.
function trackmouse(e) {
        whichElement(e);
} // end of trackmouse function
