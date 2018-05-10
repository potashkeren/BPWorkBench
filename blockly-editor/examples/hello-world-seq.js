bp.registerBThread("bt-hi", function(){
  bsync({request:bp.Event("hello")});
  bsync({waitFor:bp.Event("world")});
});

bp.registerBThread("bt-world",function(){
  bsync({waitFor:bp.Event("hello")});
  bsync({request:bp.Event("world")});
});

bp.registerBThread("bpjs addition", function(){
  bsync({waitFor:bp.Event("hello")});
  bsync({request:bp.Event("BPjs"), block:bp.Event("world")});
  bsync({waitFor:bp.Event("world")});
});
