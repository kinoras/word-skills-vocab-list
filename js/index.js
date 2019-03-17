

$(document).ready(function () {
  readFile(file);
});

var file = "https://cdn.filepicker.io/api/file/C3fweeE9RcSU4JnIWzII";
var sny = 0;

function readFile(file) {
  /*Blob from a previous pick, etc.*/
  $.get(file, function (data) {
    // console.log(data);
    // start the table
    var html = "<table id='tables'>";

    // split into lines
    var rows = data.split("\n");

    // parse lines



    rows.forEach(function getvalues(ourrow) {
      // start a table row
      html += "<tr>";

      // split line into columns
      var columns = ourrow.split(",");

      html += "<td class='word'>" + columns[0] + "</td>";
      html += "<td class='def'>" + columns[1] + "</td>";
      html += "<td class='hidden' id='num-" + sny + "'>" + Math.random() + "</td>";

      // close row
      html += "</tr>";

      sny++;


    });

    // console.log(sny);
    // close table
    html += "</table>";

    html = html.replace(/\"/g, "");

    // hide upload
    $("#fp-btn").hide();

    // insert into div
    $("#table-container").append(html);
    // $('#table-container').append('<button id="restart-btn" onClick="restart()">Start Over</button>');
  });
}

$('#sort-btn').on('click', function () {
  sortTable();
});
$('#print-btn').on('click', function () {
  javascript: window.print();
});
$('#pdf-btn').on('click', function () {
  alert("Sort function is not working in PDF now.");
  window.open('Word Skills Vocab List.pdf');
});

var sortTable = function sortTable() {
  var table = void 0,rows = void 0,switching = void 0,i = void 0,x = void 0,y = void 0,shouldSwitch = void 0;

  for (i = 0; i < sny; i++) {
    $('#num-' + i).html(Math.random());
    // console.log( i );
  }

  table = $('#tables');
  switching = true;
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = $('#tables tr');
    /*Loop through all table rows (except the first, which contains table headers):*/
    for (i = 0; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
                            one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
                       and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
};
