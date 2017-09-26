var model = {
  init: function(){

  }
}

var filesView = {
  init: function(){

  }
}

var controller = {
  init: function(){

  }
}

controller.init()

$.ajax({
    url: window.location.origin+'/testnames',
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
        for(var i = 0; i < res.length; i++){
          var test = res[i];

          addFileHTML(test["title"], test["tid"].toString());
        }
    }
  });

function addFileHTML(filename, id){
console.log("filename: " + typeof filename + filename)
console.log("id: " + typeof id + id)
    var form ='<div class="row">\
        <div class="col-lg-6">\
          <div class="input-group">\
            <span class="input-group-btn">\
              <button class="btn btn-secondary" type="button">Add note</button>\
            </span>\
            <input type="text" class="form-control" placeholder="Note..." >\
          </div>\
        </div>\
      </div>';

    var button = "<h1>"+filename +"</h1>"+form+"\n" +"<div class=\'btn-container-right\'>" +"<button type=\"button\" class=\"btn btn-info\" id=\""+id+"\">Download</button>" + "</div>"+ "<hr/>";

    $('#files').after(
        button
      );

    var button = document.getElementById(id);
         
    button.addEventListener("click", function() {
        downloadFile(filename, id)
    }, false);
  }

function downloadFile(filename, tid){
  console.log(tid+ filename+" downloading");

  $.ajax({
    url: window.location.origin+'/download',
    type: 'GET',
    headers: {"id":tid},
    dataType: 'json', // added data type
    success: function(res) {
      var csv = JSON2CSV(res);
      console.log(csv);
      url = '/download'+filename;
      window.location.href = url;
    }
  });

}

//http://stackoverflow.com/questions/17564103/using-javascript-to-download-file-as-a-csv-file
function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var line = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';
            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}