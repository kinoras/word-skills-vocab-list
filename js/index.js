$(document).ready(function () {
  readFile(file);
});

var file = "https://cdn.filepicker.io/api/file/B6Jp2qBaQKK8H53oIfFO";
var coverage = "Unit 70, 71, 72A, 74";
var sny = 0;
$("#file-picker").append("<p>Coverage: "+ coverage + "</p>");
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

      html += "<td class='word' id='word-" + sny + "'><span id='first-letter-"+ sny +"'>" + columns[0].charAt(0) + "</span><span class='remain-letter hidden' id='remain-letter-" +  sny + "'>" + columns[0].slice(1) + "</span></td>";
      html += "<td class='def' id='def-" + sny + "'>" + columns[1] + "</td>";
      html += "<td class='btn-box'><button class='btn' id='btn-" + sny + "'>S</button></td>";
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
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];
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
});
$('#print-btn').on('click', function () {
   javascript: window.print();
});
$('body').on('click', function(e) {
   var className = $(e.target).attr('class');
   var idName = $(e.target).attr('id');
   if ( className == "btn" ) {
      var rowCode = idName.replace('btn-','');
      $('#remain-letter-' + rowCode).toggleClass('hidden');
      if ( $('#'+idName).html() == "S" ) {
         $('#'+idName).html("H");
      } else {
         $('#'+idName).html("S");
      }
   }
   
   if ( idName == "show-hide-ans-btn" ) {
      if ( $("#show-hide-ans-btn").html() == "SHOW ALL ANSWERS" ) {
         $(".remain-letter").removeClass("hidden");
         $(".btn").html("H");
         $("#show-hide-ans-btn").html("HIDE ALL ANSWERS");
      } else {
         $(".remain-letter").addClass("hidden");
         $(".btn").html("S");
         $("#show-hide-ans-btn").html("SHOW ALL ANSWERS");
      }
   }
   
});
