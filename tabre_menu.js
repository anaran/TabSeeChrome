/*jslint browser: true, devel: true */
/*global chrome: false, console: false, navigator: false, document: false */
    'use strict';
(function() {
    var loading = "loading started at " + new Error().stack.split(/\s+/)[2] + "\n(" + (chrome.app.getDetails() && chrome.app.getDetails().name || "no chrome.app.getDetails()") + ") takes";
    console.time(loading);
    //TODO Place following code where timed section should end.
    //console.timeEnd(loading);
    //console.log("Reload it with Ctrl+R or as follows:\nlocation.reload(true)");
    //console.log("injection into " + document.URL + " in\n" + JSON.stringify(navigator.userAgent) + "\nends at\n" + JSON.stringify(Date()));
        function setMenuItemTitle(name, parameters, padding) {
            return chrome.i18n.getMessage(name, parameters) + padding + (autosaveCommmandMap[name] || '');
        }
        var autosaveCommmandMap = {};
//        chrome.commands.getAll(function(commands) {
//            commands.forEach(function(value, index, object) {
//                autosaveCommmandMap[value.name] = value.shortcut;
//            });
//        });
    var reviewAllAutosavesId = "reviewAllAutosaves";
    chrome.contextMenus.update(reviewAllAutosavesId, {
        title: setMenuItemTitle('review_autosaves', [' '], '        ')
    }, function() {
        if (chrome.extension.lastError) {
            console.warn("lastError:" + chrome.extension.lastError.message);
            chrome.contextMenus.create({
                id: reviewAllAutosavesId,
                type: "normal",
                title: setMenuItemTitle('review_autosaves', [' '], '        '),
                contexts: ["selection"]
            }, function() {
                if (chrome.extension.lastError) {
                    console.warn("lastError:" + chrome.extension.lastError.message);
                }
            });
        }
    });
        chrome.contextMenus.onClicked.addListener(function(info, tab) {
//            chrome.storage.sync.getBytesInUse(null, function(bytesUsed) {
//                console.log('bytesUsed', bytesUsed);
//            });
            autosaveCommmandMap = {};
//            chrome.commands.getAll(function(commands) {
//                commands.forEach(function(value, index, object) {
//                    autosaveCommmandMap[value.name] = value.shortcut;
//                });
//            });
            switch (info.menuItemId) {
                case reviewAllAutosavesId:
                    {
//                        chrome.storage.sync.get(null, function(items) {
//                            if (chrome.runtime.lastError) {
//                                console.warn(chrome.runtime.lastError.message, items);
//                            } else {
                                // console.log(items);
                                // TODO this includes other autosave settings like timeout, possible future disable on shrink parameter.
//                                var count = Object.getOwnPropertyNames(items).filter(function(key) {
//                                    return key.match(/^autosave,text,/);
//                                }).length;
//                                chrome.contextMenus.update(reviewAllAutosavesId, {
//                                    title: setMenuItemTitle('review_autosaves', [' ' + count], '        ')
//                                });
                                //                                toast("Review all " + count + " Autosaves");
            chrome.tabs.query({
                active: true,
                currentWindow: true,
                status: "complete"
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    text: info.selectionText
                }, function(response) {
                    console.log(response);
//                    if (response) {
//                        suggest(response);
//                    }
                    //    suggest([{
                    //        content: "c",
                    //        description: 'description c'
                    //    }, {
                    //        content: "d",
                    //        description: 'description d'
                    //    }]);
                });
            });

//                            }
//                        });
                        break;
                    }
                    }
                    });
    console.timeEnd(loading);
    console.log("Reload it with Ctrl+R or as follows:\nlocation.reload(true)");
    console.log("injection into " + document.URL + " in\n" + JSON.stringify(navigator.userAgent) + "\nends at\n" + JSON.stringify(Date()));
})();