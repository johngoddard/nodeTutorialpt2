// Userlist data for info box
let userListData = [];

$(document).ready(() => {
  populateTable();
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
  // Add user btn click listener
  $('#btnAddUser').on('click', addUser);
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

function addUser(event){
  event.preventDefault();

  // Basic validation
  let errorCount = 0; 
  $('#addUser input').each(function(idx, val){
    if($(this).val() === ''){errorCount++;}
  });

  // Check if no errs
  if(errorCount === 0){
    const newUser = {
     'username': $('#addUser fieldset input#inputUserName').val(),
     'email': $('#addUser fieldset input#inputUserEmail').val(),
     'fullname': $('#addUser fieldset input#inputUserFullname').val(),
     'age': $('#addUser fieldset input#inputUserAge').val(),
     'location': $('#addUser fieldset input#inputUserLocation').val(),
     'gender': $('#addUser fieldset input#inputUserGender').val()
    };

    // Make ajax to POST new object
    $.ajax({
      type: 'POST', 
      data: newUser, 
      url: '/users/addUser',
      dataType: 'JSON'
    }).done((res) => {
      // if successful (blank res)
      if(res.msg === ''){
        //Clear fields
        $('#addUser fieldset input').val('');
        // upadate table
        populateTable();
        
      } else {
        alert(`Error: ${res.msg}`);
      }
    });
  } else {
    alert("Please fill in all fields");
    return false;
  }
}
