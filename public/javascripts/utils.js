function editReason(reason) {
    reason = decodeURIComponent(reason);
    while (reason.indexOf("+") !== -1) {
        reason = reason.replace("+", " ");
    }
    //reason = reason.replace(/(<([^>]+)>)/ig, " ");
    return reason;
}

function addToTable(title, status, reason, use_cipher_signature) {
    itemIndex++;

    if (use_cipher_signature === "True") {
        status = "forbidden";
    }

    var table = document.getElementById("myTable");
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(-1);   
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    // Add some text to the new cells:   
    cell1.innerHTML = itemIndex;
    cell2.innerHTML = title;   
    cell3.innerHTML = status;
    cell4.innerHTML = editReason(reason);
    

    if (status === "fail") {
        cell1.setAttribute("style", "color:red");
        cell2.setAttribute("style", "color:red");
        cell3.setAttribute("style", "color:red");
    }
    else if (use_cipher_signature === "True") {
        cell1.setAttribute("style", "color:orange");
        cell2.setAttribute("style", "color:orange");
        cell3.setAttribute("style", "color:orange");
    }
    else {
        cell1.setAttribute("style", "color:green");
        cell2.setAttribute("style", "color:green");
        cell3.setAttribute("style", "color:green");
    }
}

function clearPage() {
    document.getElementById("lblItemStatus").innerHTML = "";
    document.getElementById("lblItemReason").innerHTML = "";
    
    //clear table
    var Table = document.getElementById("myTable");
    Table.innerHTML = "";
    //Table.style.visibility = 'hidden'; 
}