

// A simple echo service.
var existingFileNames = [];
var filesSorted = [];
var dirsSorted = [];

app.ws('/', (ws) => {
  for(var i = 0; i < filesSorted.length; i++){
    var dat = filesSorted[i];
    console.log('time: '+ (dat["creation"]));
  }

  var initialFilenamesMessage = {
    type: "initialFilenames",
    msg: existingFileNames.length+" files",
    existingFileNames: existingFileNames
  };
  ws.send(JSON.stringify(initialFilenamesMessage));

  ws.on('message', (msg) =>{
    
  });
  });




    var webSocketHost = location.protocol === 'https:' ? 'wss://' : 'ws://';
    var externalIp = '<%= externalIp %>';
    var webSocketUri =  webSocketHost + externalIp + ':65080';

    console.log(webSocketUri);

    /* Establish the WebSocket connection and register event handlers. */
    var websocket = new WebSocket(webSocketUri);

  function downloadFile(filename){
      var msg = {
        msgType: "download",
        filename: filename
      }
      console.log(JSON.stringify(msg))
      websocket.send(JSON.stringify(msg));
      url = '/download'+filename;
      window.location.href = url;
      //window.open(url);
    }

    function sendNote(filname, note){
      console.log('note: '+note);
    }

    var d0 = [];
    var d1 = []; 
    var d2 = [];
    var d3 = [];
    var data = [d0, d1, d2, d3]; // dataPoints

    var chart = new CanvasJS.Chart("chartContainer",{
      //backgroundColor: "gray",
      axisY:{
        minimum: -2,
        maximum: 2
      },
      title :{
        text: "Live Data"
      },      
      data: [{
        type: "line",
        dataPoints: d0 
      },{
        type: "line",
        dataPoints: data[1] 
      },{
        type: "line",
        dataPoints: data[2] 
      },{
        type: "line",
        dataPoints: data[3] 
      }]
    });
    chart.render();
    var xVal = 0;
    var yVal = 100; 
    var dataLength = 50; // number of dataPoints visible at any point

    var updateChart = function (newData) {
      for (var j = 0; j < 4; j++) { 
        data[j].push({
          x: xVal,
          y: parseFloat(newData[j].toFixed(4))
        });
      };
      xVal++;

      if (data[0].length > dataLength){
        data.map(function (i){
          return i.shift()
        });       
      }
      
      chart.render();   
    };

    

function getFilenames(){
  app.get('/testnames', (req, res) => {
    db.any("select title from tests", [true])
    .then(data => {
        console.log("data: "+JSON.stringify(data));
        res.send("data: "+JSON.stringify(data));
    })
    .catch(error => {console.log("ERROR:", error.message || error);});
  });
}

   
    websocket.onmessage = function(event) {
      console.log("front end msg received");

      var data = JSON.parse(event.data);
      console.log(data.msg);

      if(data.type == "filenameError"){
        console.log('filenameError');
      }
      else if(data.type == "fileWritten"){
        console.log('file written');
        $('#file_name')[0].reset();
        var filenames = data.existingFileNames;
        addFileHTML(data.newFilename.toString());
      }
      
      else if(data.type == "initialFilenames"){
        var filenames = data.existingFileNames;
        for(var i = 0; i < filenames.length; i++){
          addFileHTML(filenames[i]);
        }
      }
      else{
        console.log('unknown websocket message type');
      }    
    };
    
    function download(array){
      var s = "";
      for (i = 0; i < 4; i++){
        s = s + "<th>" + array[i].toFixed(4) + "</th>"
      }
      return s;
    }

    function save(){
      var file_name = "" + $('#file_name2').val();
      console.log(file_name);
      var msg = {
        msgType: "save",
        filename: file_name.toString()
      }
      websocket.send(JSON.stringify(msg));
    }

    function reset(){
      console.log('Reset');
      var msg = {
        msgType: "reset"
      }
      websocket.send(JSON.stringify(msg));
      d1 = [];
      d2 = [];
      d3 = [];
      d4 = [];
    }


    /*
  <button type="button" class="btn btn-warning" onclick="save()">Save</button>
  <button type="button" class="btn btn-info" onclick="reset()">Reset</button>
  <form id="file_name">
    File name:<br>
    <input type="text" name="file_name" id='file_name2'><br>
  </form>
  <div id="chartContainer" style="height: 300px; width:100%;"></div>
  <table align = "center" id = data></table>

  */