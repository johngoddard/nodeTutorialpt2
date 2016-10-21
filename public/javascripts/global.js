// Userlist data for info box
let userListData = [];

$(document).ready(() => {
  populateTable();
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
});

function populateTable(){
  let tableContent = '';

  $.getJSON('/users/userlist', (data) => {

    // Add user data array into global userlist
    userListData = data;

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

function showUserInfo(event){
  event.preventDefault();

  let userName = $(this).attr('rel');
  let arrayPosition = userListData.map(arrayItem => { 
    return arrayItem.username;
  })
    .indexOf(userName);

  let userObject = userListData[arrayPosition];

  $('#userInfoName').text(userObject.fullname);
  $('#userInfoAge').text(userObject.age);
  $('#userInfoGender').text(userObject.gender);
  $('#userInfoLocation').text(userObject.location);
}
