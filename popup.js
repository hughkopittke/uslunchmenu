document.addEventListener('DOMContentLoaded', function() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var lunchMenu = extractLunchMenu(xhr.responseText);
        var menuElement = document.getElementById('menu');
        menuElement.innerHTML = lunchMenu;
      } else {
        console.error('Failed to fetch lunch menu');
      }
    }
  };
  xhr.open('GET', 'https://raw.githubusercontent.com/hughkopittke/uslunchmenu/main/lunch-menu.txt', true);
  xhr.send();
});

function extractLunchMenu(responseText) {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();

  var lunchMenu = '';
  var lines = responseText.split('\n');
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(day)) {
      var j = i + 1;
      while (j < lines.length && isNaN(parseInt(lines[j]))) {
        lunchMenu += '- ' + lines[j] + '<br>';
        j++;
      }
      break;
    }
  }

  if (lunchMenu === '') {
    lunchMenu = 'No lunch menu available for today.';
  } else {
    lunchMenu = '<strong>Lunch Menu for ' + month + '/' + day + '/' + year + ':</strong><br><br>' + lunchMenu;
  }

  return lunchMenu;
}
