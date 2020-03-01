$(document).ready(function () {
    getItems("");
    viewComments();

    $("#txtItemSearch").keyup(function () {
        console.log($(this).val());
        getItems($(this).val());
    });

    $("#btnComment").click(function(){
        if($("#txtComment").val().length==0){
            alert('add comment');
        }else if($("#txtUsername").val().length==0){
            alert('add user name');
        }else{
            saveComments($("#txtComment").val(),$("#txtUsername").val());
        }
    });
});

function viewComments() {
    $.ajax({
        type: 'GET',
        url: 'server/comment.php',
        data: { mode:"read" },
        dataType: "json",
        success: function (data) {
            
            viewCommentTableData(data);
            
        }
    });
}

function saveComments(comment, user) {
    $.ajax({
        type: 'POST',
        url: 'server/comment.php',
        data: { comment: comment, user:user, mode:"save" },
        dataType: "json",
        success: function (data) {
            viewCommentTableData(data);
            $("#txtComment").val('');
            $("#txtUsername").val('');
        }
    });
}

function viewCommentTableData(data) {
    var target = $("#comments");
    target.empty();

    $.each(data, function (index, value) {
        var tr = $('<tr>');

        var td1 = $('<td>');
        td1.html(value.comment);
        var td2 = $('<td>');
        td2.html(":-"+value.user);
        tr.append(td1);
        tr.append(td2);
        tr.appendTo(target);
    });
}
    function getItems(itemCode) {
        $.ajax({
            type: 'GET',
            url: 'server/item.php',
            data: { itemCode: itemCode },
            dataType: "json",
            success: function (data) {
                viewTableData(data);
            }
        });
    }

    function viewTableData(data) {
        var target = $("#item-data");
        target.empty();

        $.each(data, function (index, value) {
            var tr = $('<tr>');

            // var p = $('<p>').text(value.name);


            var td1 = $('<td>');
            td1.html(value.code);
            var td2 = $('<td>');
            td2.html(value.name);

            tr.append(td1);
            tr.append(td2);

            tr.appendTo(target);
        });
    }
