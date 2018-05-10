var input = document.querySelector('#project_file');
input.addEventListener('change', load_project);


function save_project() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);
	saveTextAs(xml_text, "xml.xml");
};

function input_click(){
	
	var elem = document.getElementById('project_file');
	if(elem && document.createEvent) {
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      elem.dispatchEvent(evt);
   }
}

function load_project(event){
	var files = input.files;
	if(files.length === 0)
		return;
	current_file = files[0];
	
	 var reader = new FileReader();
     reader.onload = function(){
		var xml_text = reader.result;
		workspace.clear();
		var xml = Blockly.Xml.textToDom(xml_text);
		Blockly.Xml.domToWorkspace(xml, workspace);
        };
     reader.readAsText(current_file);
}


function export_code() {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    //saveTextAs(code, "program.js");

    alert('running');
//	$.post('/run', function() {
//		alert('error');
//	});
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', "/run", true);
	xhr.send(code);

  }
