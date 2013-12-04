// snippet find_regexp.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.355Z
/*jslint browser: true, devel: true, todo: true */
/*global window: false, window: false, chrome: false, console: false, document: false */
    "use strict"; //$NON-NLS-0$
var findRegExpBar = function() {
    try {
        this.matchRangesByMatch = {};
        this.matchRanges = [];
        this.matchIndex = 0;
        this.regularExpression;
        this.searchFieldMatches;
        this.goToMatch = function(event, next, obj) {
            try {
                window.getSelection().removeAllRanges();
                document.body.scrollIntoView(true);
                if (next) {
                    obj.matchIndex = (obj.matchIndex === obj.matchRanges.length ? 1 : obj.matchIndex + 1);
                } else {
                    obj.matchIndex = (obj.matchIndex === 1 ? obj.matchRanges.length : obj.matchIndex - 1);
                }
                window.getSelection().addRange(obj.matchRanges[obj.matchIndex - 1]);
                //                         var obj.bcr = obj.matchRanges[obj.matchIndex].getBoundingClientRect();
                if (window.getSelection().rangeCount === 1) {
                    obj.bcr = window.getSelection().getRangeAt(0).getBoundingClientRect();
                    window.scrollTo(obj.bcr.left - window.innerWidth / 2, obj.bcr.top - window.innerHeight / 2);
                    // console.log(obj.bcr);
                    console.log(obj.matchIndex);
                    obj.searchFieldMatches.innerText = obj.matchRanges.length > 0 ? (obj.matchIndex + " of " + obj.matchRanges.length) : 'no match'; //$NON-NLS-1$ //$NON-NLS-0$
                } else {
                    console.log('unexpected rangeCount', window.getSelection().rangeCount, obj.matchRanges[obj.matchIndex - 1]); //$NON-NLS-0$
                }
            } catch (exception) {
                console.error(exception.stack);
            }
        };
        this.catchFind = function() {
            try {
                //                if (event.keyIdentifier === "U+0006") { //$NON-NLS-0$
                //                    event.preventDefault();
                //         console.log("got it!", event);
                this.searchBox = document.createElement('div'); //$NON-NLS-0$
                this.searchField = document.createElement('input'); //$NON-NLS-0$
                this.searchFlagGlobal = document.createElement('input'); //$NON-NLS-0$
                this.searchFlagGlobal.id = "searchFlagGlobal"; //$NON-NLS-0$
                //                     this.searchFlagGlobal.name = "searchFlagGlobal";
                this.searchFlagGlobal.type = "checkbox"; //$NON-NLS-0$
                this.searchFlagGlobal.title = "match globally"; //$NON-NLS-0$
                this.searchFlagGlobalLabel = document.createElement('label'); //$NON-NLS-0$
                this.searchFlagGlobalLabel.
                for = "searchFlagGlobal"; //$NON-NLS-0$
                this.searchFlagGlobalLabel.innerText = "g"; //$NON-NLS-0$
                //                     searchFlagGlobal.addEventListener('change', function(event) {
                //                         event.target.value = !event.target.value;
                //                         if (this.regularExpression instanceof RegExp) {
                //                             this.regularExpression = new RegExp(this.regularExpression.source, (event.target.checked ? "g" : "") + (this.regularExpression.ignoreCase ? "i" : "") + (this.regularExpression.multiline ? "m" : ""));
                //                             searchField.value = this.regularExpression.toString();
                //                         }
                //                     }, false);
                this.searchFlagIgnoreCase = document.createElement('input'); //$NON-NLS-0$
                this.searchFlagIgnoreCase.id = "searchFlagIgnoreCase"; //$NON-NLS-0$
                this.searchFlagIgnoreCase.type = "checkbox"; //$NON-NLS-0$
                this.searchFlagIgnoreCase.title = "ignore letter case"; //$NON-NLS-0$
                this.searchFlagIgnoreCaseLabel = document.createElement('label'); //$NON-NLS-0$
                this.searchFlagIgnoreCaseLabel.
                for = "searchFlagIgnoreCase"; //$NON-NLS-0$
                this.searchFlagIgnoreCaseLabel.innerText = "i"; //$NON-NLS-0$
                //                     searchFlagIgnoreCase.addEventListener('change', function(event) {
                //                         goToMatch(event, !! "next");
                //                     }, false);
                this.searchFlagMultiLine = document.createElement('input'); //$NON-NLS-0$
                this.searchFlagMultiLine.id = "searchFlagMultiLine"; //$NON-NLS-0$
                this.searchFlagMultiLine.type = "checkbox"; //$NON-NLS-0$
                this.searchFlagMultiLine.title = "match multiple lines"; //$NON-NLS-0$
                this.searchFlagMultiLineLabel = document.createElement('label'); //$NON-NLS-0$
                this.searchFlagMultiLineLabel.
                for = "searchFlagMultiLine"; //$NON-NLS-0$
                this.searchFlagMultiLineLabel.innerText = "m"; //$NON-NLS-0$
                //                     searchFlagMultiLine.addEventListener('change', function(event) {
                //                         goToMatch(event, !! "next");
                //                     }, false);
                this.searchFieldMatches = document.createElement('span'); //$NON-NLS-0$
                this.searchFieldMatches.innerText = 'no match'; //$NON-NLS-0$
                this.searchNext = document.createElement('input'); //$NON-NLS-0$
                this.searchNext.type = "button"; //$NON-NLS-0$
                this.searchNext.value = "\u22C1"; //$NON-NLS-0$
                var my = this;
                this.searchNext.addEventListener('click', function(event) { //$NON-NLS-0$
                    my.goToMatch(event, !! "next", my);
                }, false);
                this.searchPrevious = document.createElement('input'); //$NON-NLS-0$
                this.searchPrevious.type = "button"; //$NON-NLS-0$
                this.searchPrevious.value = "\u22C0"; //$NON-NLS-0$
                this.searchPrevious.addEventListener('click', function(event) { //$NON-NLS-0$
                    my.goToMatch(event, !"next", my); //$NON-NLS-0$
                }, false);
                this.searchClose = document.createElement('input'); //$NON-NLS-0$
                this.searchBox.style.position = "fixed"; //$NON-NLS-0$
                //         this.searchBox.style.top = 100 + 'px';
                //         this.searchBox.style.left = 100 + 'px';
                this.searchField.type = "search"; //$NON-NLS-0$
                this.searchField.autofocus = true;
                this.searchField.autocomplete = "on"; //$NON-NLS-0$
                this.searchField.autosave = "re_match"; //$NON-NLS-0$
                this.searchClose.type = "button"; //$NON-NLS-0$
                this.searchClose.value = "\u2A2F"; //$NON-NLS-0$
                this.searchClose.addEventListener('click', function(event) { //$NON-NLS-0$
                    document.body.removeChild(event.target.parentElement);
                }, false);
                this.searchBox.addEventListener('keypress', function(event) { //$NON-NLS-0$
                    try {
                        console.log(event.keyIdentifier);
                        if (event.keyIdentifier === 'Enter' || event.keyCode === 13) {
                            //NOTE We always wat a global search
                            my.searchRegExp(my.searchField.value, true || my.searchFlagGlobal.checked, my.searchFlagIgnoreCase.checked, my.searchFlagMultiLine.checked);
                        };
                    } catch (exception) {
                        console.error(exception.stack);
                    }
                }, false);
                this.searchField.placeholder = "\\w+\\s+\\d+"; //$NON-NLS-0$
                this.searchBox.appendChild(this.searchField);
                //                this.searchBox.appendChild(this.searchFlagGlobal);
                //                this.searchBox.appendChild(this.searchFlagGlobalLabel);
                this.searchBox.appendChild(this.searchFlagIgnoreCase);
                this.searchBox.appendChild(this.searchFlagIgnoreCaseLabel);
                this.searchBox.appendChild(this.searchFlagMultiLine);
                this.searchBox.appendChild(this.searchFlagMultiLineLabel);
                this.searchBox.appendChild(this.searchFieldMatches);
                this.searchBox.style.backgroundColor = window.getComputedStyle(document.body).backgroundColor;
                this.searchFieldMatches.style.margin = "0 6px"; //$NON-NLS-0$
                this.searchFieldMatches.style.width = "5em"; //$NON-NLS-0$
                this.searchFieldMatches.style.display = "inline-block"; //$NON-NLS-0$
                this.searchBox.style.opacity = 0.9;
                this.searchBox.appendChild(this.searchPrevious);
                this.searchBox.appendChild(this.searchNext);
                this.searchBox.appendChild(this.searchClose);
                console.log(this.searchBox);
                document.body.insertBefore(this.searchBox, document.body.firstChild);

                function isInFront(div) {
                    var whoComputedStyle;
                    var leftTop = document.elementFromPoint(div.getBoundingClientRect().left, div.getBoundingClientRect().top);
                    var rightBottom = document.elementFromPoint(div.getBoundingClientRect().right, div.getBoundingClientRect().bottom);
                    if (leftTop !== div && !div.contains(leftTop)) {
                        whoComputedStyle = window.getComputedStyle(leftTop);
                        console.info('trying to get in front of ', leftTop, whoComputedStyle.zIndex); //$NON-NLS-0$
                        return false;
                    }
                    if (rightBottom !== div && !div.contains(rightBottom)) {
                        whoComputedStyle = window.getComputedStyle(rightBottom);
                        console.info('trying to get in front of ', rightBottom, whoComputedStyle.zIndex); //$NON-NLS-0$
                        return false;
                    }
                    console.info('we in front at leftTop and rightBottom!'); //$NON-NLS-0$
                    return true;
                }
                for (var zIndex = 1; zIndex <= 10000; zIndex *= 10) {
                    if (isInFront(this.searchBox)) {
                        break;
                    }
                    this.searchBox.style.zIndex = zIndex;
                }
                //                }
            } catch (exception) {
                console.error(exception.stack);
            }
        };
        this.iterateOverMatches = function(match) {
            console.log(match);
            //                         document.body.focus();
            // TODO Please note it is pretty nasty to get out of look for !!"aWrapAround"
            window.find(match, !this.regularExpression.ignoreCase, !"aBackwards", !"aWrapAround", !"aWholeWord", !"aSearchInFrames", !"aShowDialog"); //$NON-NLS-4$ //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
            if (window.getSelection().rangeCount === 1) {
                this.matchRanges.push(window.getSelection().getRangeAt(0));
                if (this.matchRangesByMatch[match]) {
                    this.matchRangesByMatch[match].push(window.getSelection().getRangeAt(0));
                } else {
                    this.matchRangesByMatch[match] = [];
                    this.matchRangesByMatch[match].push(window.getSelection().getRangeAt(0));
                }
                this.matchIndex++;
            } else {
                console.log('unexpected rangeCount', window.getSelection().rangeCount, this.matchRanges[this.matchIndex]); //$NON-NLS-0$
            }
        };
        this.searchRegExp = function(text, global, ignoreCase, multiline) { //$NON-NLS-0$
            //                                 var exp = event.target.value.match(/^(\s*\/)?(.+?)(?:\/([gim]*))?\s*$/);
            this.regularExpression = new RegExp(text, (global ? "g" : "") + (ignoreCase ? "i" : "") + (multiline ? "m" : "")); //$NON-NLS-4$ //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
            //             window.alert(JSON.stringify(document.body.textContent.match(new RegExp(event.target.value, "g")), null, 2));
            //NOTE We don't want to match searchField contents!
            this.searchField.value = "";
            this.matches = document.body.textContent.match(this.regularExpression);
            if (false && this.matches.length > 100 && !window.confirm('Do you want to see ' + this.matches.length + ' matches for "' + text + '"?')) {
                return;
            }
            console.log(JSON.stringify(this.matches, null, 2));
            window.getSelection().removeAllRanges();
            this.matchIndex = 0;
            this.matchRanges = [];
            this.matchRangesByMatch = {};
            //Now I know what thisArg is for!
            this.matches && this.matches.forEach(this.iterateOverMatches, this);
            this.searchField.value = text;
            // window.getSelection().removeAllRanges();
            // document.body.scrollIntoView(true);
            console.log(this.matchRangesByMatch);
            console.log(this.matchRanges);
            this.searchFieldMatches.innerText = this.matchRanges.length > 0 ? (this.matchIndex + " of " + this.matchRanges.length) : 'no match'; //$NON-NLS-1$ //$NON-NLS-0$
        };
        //        window.addEventListener('keypress', this.catchFind, false); //$NON-NLS-0$
    } catch (exception) {
        console.error(exception.stack);
    }
};