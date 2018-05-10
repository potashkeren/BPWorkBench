bp.registerBThread("orders", function(){
	bp.log.info("EVENT_DETECTED: shabat");
    bsync({waitFor:bp.Event("shabat"),request:bp.Event("chapel")});
    bsync({request:bp.Event("shalom")});
});

bp.registerBThread("coffee supply", function(){
	bp.log.info("EVENT_DETECTED: shalom");
		bsync({waitFor:bp.Event("shalom")});
      bp.log.info("EVENT_DETECTED: mevorach");
		bsync({waitFor:bp.Event("mevorach")});
});
