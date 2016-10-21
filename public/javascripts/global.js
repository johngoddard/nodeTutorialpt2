// Userlist data for info box
let userListData = [];

$(document).ready(() => {
  populateTable();
});

function populateTable(){
  let tableContent = '';

  $.getJSON('/users/userlist', (data) => {
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>'; 
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    $('#userList table tbody').html(tableContent);
  });
}
