Blockly.defineBlocksWithJsonArray([  
 {
    "type": "bp_event",
    "message0": "BP Event %1",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME",
        "check": "String"
      }
    ],
	"inputsInline": true,
    "output" : "BP_EVENT",
	"colour": 0,
    "tooltip": "A BP Event"
  },
  
  {
  "type": "bp_event_of_list",
  "message0": "BP Event %1",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": "BP_EVENT",
  "output": "BP_EVENT",
  "colour": 0,
  "tooltip": "Use this block if you are using the list of BP Events block",
  "helpUrl": ""
},
 
  
  {
  "type": "bp_event_list",
  "message0": "List of BP Events %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "LIST",
      "check": "BP_EVENT"
    }
  ],
  "output": ["BP_EVENT_LIST","Array","BP_EVENT_SET"],
  "colour": 15,
  "tooltip": "A list of BP Events",
  "helpUrl": ""
},

  {
  "type": "bp_bsync",
  "message0": "Wait %1 Request %2 Block %3",
  "args0": [
    {
      "type": "input_value",
      "name": "WAIT",
      "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
    },
    {
      "type": "input_value",
      "name": "REQUEST",
      "check": "BP_EVENT"
    },
    {
      "type": "input_value",
      "name": "BLOCK",
      "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 27,
  "tooltip": "A single bsync statement",
  "helpUrl": ""
},
{
  "type": "bp_bsync_with_output",
  "message0": "Wait %1 Request %2 Block %3",
  "args0": [
    {
      "type": "input_value",
      "name": "WAIT",
      "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
    },
    {
      "type": "input_value",
      "name": "REQUEST",
      "check": "BP_EVENT"
    },
    {
      "type": "input_value",
      "name": "BLOCK",
      "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
    }
  ],
  "output":"BP_EVENT",
  "colour": 27,
  "tooltip": "Use this block if you would like to utilize the value returned by the bsync",
  "helpUrl": ""
},

{
  "type": "bp_register_bthread",
  "message0": "BThread %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME"
    },
    {
      "type": "input_statement",
      "name": "CONTENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "colour": 55,
  "tooltip": "A single BThread",
  "helpUrl": ""
},

{
  "type": "bp_event_name",
  "message0": "The event's name",
  "output": "String",
  "colour": 0,
  "tooltip": "The name of the event considered for selection",
  "helpUrl": ""
},

{
  "type": "bp_eventset",
  "message0": "All events so that: %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "COND",
      "check": "Boolean"
    }
  ],
  "inputsInline": false,
  "output": "BP_EVENT_SET",
  "colour": 355,
  "tooltip": "Define a predicate over the events' name",
  "helpUrl": ""
},

{
  "type": "text_startswith",
  "message0": "%1 Starts with %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "String"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": 180,
  "tooltip": "Check whether or not a string begins with another string",
  "helpUrl": ""
},

{
  "type": "text_concatenate",
  "message0": "%1 + %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "String"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "output": "String",
  "colour": 165,
  "tooltip": "String concatenation",
  "helpUrl": ""
},

{
  "type": "text_parseint",
  "message0": "Integer %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TEXT",
      "check": "String"
    }
  ],
  "output": "Number",
  "colour": 230,
  "tooltip": "Turn a string to an integer",
  "helpUrl": ""
}

  ])
  
  
  Blockly.JavaScript['bp_event'] = function(block) {
  var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  if(event_name == '\'\'')
	  event_name = '\'Anonymous event\''
  var code = 'bp.Event('+event_name+')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC]};
  
  Blockly.JavaScript['bp_event_of_list'] =  Blockly.JavaScript['bp_event']
  
  
  
  Blockly.JavaScript['bp_event_list'] = function(block) {
  var events_string = Blockly.JavaScript.valueToCode(block, 'LIST');
  events = breakEventsString(events_string);
  var code = '';
  events.forEach(function(entry){
	code+=entry+',\n';
  });
  code=code.substring(0,code.length-2);
  code = '['+code+']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC]};
  
  var breakEventsString = function(events_string){
	result = [];
	split = events_string.split('bp.Event');
	split.forEach(function(entry){
		if(entry.startsWith('(')){
			new_entry = entry;
			while(true)
				if(new_entry.endsWith(',0')){
					new_entry = new_entry.substring(0,new_entry.length-2);
				}
				else
					break;
			result.push('bp.Event'+new_entry);
	}}); 
	
	return result
  };
  

  function getEventName(dirty){
	return dirty.substring(9,dirty.length-1);//erase the bp.Event(" and the ")
  }	  
  
  
 Blockly.JavaScript['bp_bsync'] = function(block) {
  var value_wait = Blockly.JavaScript.valueToCode(block, 'WAIT', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_request = Blockly.JavaScript.valueToCode(block, 'REQUEST', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_block = Blockly.JavaScript.valueToCode(block, 'BLOCK', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
	
  code = '';
  
  //make the code prettier by not showing null values
  if (value_wait == 'null' && value_request != 'null' && value_block != 'null')
	  code = 'bsync({request: '+value_request+',\nblock: '+value_block+'})';
  
  if (value_wait != 'null' && value_request == 'null' && value_block != 'null')
	  code = 'bsync({waitFor: '+value_wait+',\nblock: '+value_block+'})';

  if (value_wait != 'null' && value_request != 'null' && value_block == 'null')
	  code = 'bsync({waitFor: '+value_wait+',\nrequest: '+value_request+'})';
  
  if (value_wait == 'null' && value_request == 'null' && value_block != 'null')
	  code = 'bsync({block: '+value_block+'})';
  
  if (value_wait == 'null' && value_request != 'null' && value_block == 'null')
	  code = 'bsync({request: '+value_request+'})';
  
  if (value_wait != 'null' && value_request == 'null' && value_block == 'null')
	  code = 'bsync({waitFor: '+value_wait+'})';
  
  if (value_wait == 'null' && value_request == 'null' && value_block == 'null')
	  code = 'bsync({})';
  
  if (value_wait != 'null' && value_request != 'null' && value_block != 'null')
      code = 'bsync({waitFor: '+value_wait+',\nrequest: '+value_request+',\nblock: '+value_block+'})';
  
  if(value_wait == 'null' || value_wait.includes('bp.EventSet'))
	  return code+';\n';
  
  
  generated_line_format = '//Auto-generated code for dynamic event detection:\nbp.log.info(\"EVENT_DETECTED: \"+'
  
 
  
  
  //if waitFor is a list of events, generate a bp.log.info line for each of them, for the downstream application
  if (value_wait.startsWith('[')){
	value_wait = value_wait.substring(1,value_wait.length-1);//remove brackets
	split = value_wait.split(',');
	split.forEach(function(entry){
		code=generated_line_format+getEventName(entry.trim())+');\n'+code;
	});
  }
  else
	code=generated_line_format+getEventName(value_wait.trim())+');\n'+code;
  
  return code+';\n';
};

Blockly.JavaScript['bp_bsync_with_output'] = function(block) {
  var value_wait = Blockly.JavaScript.valueToCode(block, 'WAIT', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_request = Blockly.JavaScript.valueToCode(block, 'REQUEST', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_block = Blockly.JavaScript.valueToCode(block, 'BLOCK', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  
  code = '';
  
  //make the code prettier by not showing null values
  if (value_wait == 'null' && value_request != 'null' && value_block != 'null')
	  code = 'bsync({request: '+value_request+',\nblock: '+value_block+'})';
  
  if (value_wait != 'null' && value_request == 'null' && value_block != 'null')
	  code = 'bsync({waitFor: '+value_wait+',\nblock: '+value_block+'})';

  if (value_wait != 'null' && value_request != 'null' && value_block == 'null')
	  code = 'bsync({waitFor: '+value_wait+',\nrequest: '+value_request+'})';
  
  if (value_wait == 'null' && value_request == 'null' && value_block != 'null')
	  code = 'bsync({block: '+value_block+'})';
  
  if (value_wait == 'null' && value_request != 'null' && value_block == 'null')
	  code = 'bsync({request: '+value_request+'})';
  
  if (value_wait != 'null' && value_request == 'null' && value_block == 'null')
	  code = 'bsync({waitFor: '+value_wait+'})';
  
  if (value_wait == 'null' && value_request == 'null' && value_block == 'null')
	  code = 'bsync({})';
  
  if (value_wait != 'null' && value_request != 'null' && value_block != 'null')
      code = 'bsync({waitFor: '+value_wait+',\nrequest: '+value_request+',\nblock: '+value_block+'})';
  
  if(value_wait == 'null' || value_wait.includes('bp.EventSet'))
	  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  
  generated_line_format = '//Auto-generated code for dynamic event detection:\nbp.log.info(\"EVENT_DETECTED: \"+'
  //if waitFor is a list of events, generate a bp.log.info line for each of them, for the downstream application
  if (value_wait.startsWith('[')){
	value_wait = value_wait.substring(1,value_wait.length-1);
	split = value_wait.split(',');
	split.forEach(function(entry){
		code=generated_line_format+getEventName(entry.trim())+');\n'+code;
	});
  }
  else
	code=generated_line_format+getEventName(value_wait.trim())+');\n'+code;
 
 //return code;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bp_register_bthread'] = function(block) {
  var name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var statements = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var code = 'bp.registerBThread('+name+', function(){\n'+statements+'\n});\n';
  return code;
};


Blockly.JavaScript['bp_event_name'] = function(block) {
  var code = 'e.getName()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['text_startswith'] = function(block) {
  var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';
  var code = a+'.startsWith('+b+')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};


//just to make the EventSet names unique
var eventset_counter = 0;


Blockly.JavaScript['bp_eventset'] = function(block) {
  var cond = Blockly.JavaScript.valueToCode(block, 'COND', Blockly.JavaScript.ORDER_ATOMIC);
  eventset_counter++;
  
  var code = 'bp.EventSet(\"es'+eventset_counter+'\", function(e) {\n  return '+cond+';\n})';

  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['text_concatenate'] = function(block) {
  var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  var code = a+'+'+b;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['text_parseint'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'parseInt('+text+')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
