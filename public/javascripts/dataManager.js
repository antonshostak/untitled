var items = [];
var itemIndex = 0;

function checkItem(videoId, success, error) {
// var url = 'https://www.googleapis.com/youtube/v3/videos?id='+videoId+'&key=AIzaSyA2f8k6-2XN_Hi5thFfaf5xSMwtO1Tzhcw&part=contentDetails,status';

    var url = "youtube/"+videoId;
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'text',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Failed to get video info.\n\nXMLHttpRequest: " + JSON.stringify(XMLHttpRequest) + "\n\nStatus: " + textStatus +
                "\n\nError: " + errorThrown);
            error(errorThrown);
        },
        success: function (result) {

            var resultObj = {};
            result.replace(
                new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                function ($0, $1, $2, $3) { resultObj[$1] = $3; }
            );
            if (resultObj.status && resultObj.status === "fail") {
                success(resultObj.status, resultObj.reason, resultObj.use_cipher_signature);
            }
            else {
                success("ok", "", resultObj.use_cipher_signature);
            }
        }
        // complete: function (xhr, text) {
        // }
    });
}

function addItem(item, addItemSuccess){
    var videoId = item.snippet.resourceId.videoId;
    checkItem(videoId, function (status, reason, use_cipher_signature) {
        items.push({
            title: item.snippet.title,
            status: status,
            reason: reason,
            use_cipher_signature: use_cipher_signature
        });

        addToTable(item.snippet.title, status, reason, use_cipher_signature);
        addItemSuccess();

    }, function () { });
}

function setItemsArray(data, success) {

    document.getElementById("lblPleaseWait").innerHTML = "loading, please wait...";

    var i = 0;
    function addItemSuccess() {
        i++;
        if (i < data.length) {
            addItem(data[i], addItemSuccess);
        }
        else {
            success();
        }
    }
    addItem(data[i], addItemSuccess);
}

function getPlaylist() {
    clearPage();

    itemIndex = 0;
   
    var playlistId = document.getElementById('txtPlaylistId').value;
    //playlistId = "PLRRIH66XZsffscmrXTyfeyBjQ5ERroM0F"; //omri ozrad playlist
    //playlistId = "PLMs_ZKQW1bFXk4nhYatdNHjKUAS8oOJM2"; //my playlist
    if (!playlistId) {
        alert("please insert playlist id!");
        return;
    }

    var maxResults = document.getElementById('txtMaxResult').value;
  
    var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + playlistId + "&maxResults=" + maxResults + "&key=AIzaSyA2f8k6-2XN_Hi5thFfaf5xSMwtO1Tzhcw";
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Failed to get playlist items.\n\nXMLHttpRequest: " + JSON.stringify(XMLHttpRequest) + "\n\nStatus: " + textStatus +
                "\n\nError: " + errorThrown);
        },
        success: function (result) {
           
            setItemsArray(result.items, function () {
                document.getElementById("lblPleaseWait").innerHTML = "";
                //Table.style.visibility = 'visible';
            });
           
        },
        complete: function (xhr, text) {            
        }
    });
}

function getItemStatus() {
    clearPage();

    var videoId = document.getElementById('txtVideoId').value;
    if (!videoId) {
        alert("please insert video id!");
        return;
    }
  

    checkItem(videoId, function (status, reason, use_cipher_signature) {
        var item = {           
            status: status,
            reason: reason,
            use_cipher_signature: use_cipher_signature
        };
        if (item.use_cipher_signature === "True") {
            status = "forbidden";
        }
        document.getElementById("lblItemStatus").innerHTML = "status: " + status;
        if (item.reason) {
            document.getElementById("lblItemReason").innerHTML = editReason(item.reason);
        }

        
       
    },
    function () { });
}