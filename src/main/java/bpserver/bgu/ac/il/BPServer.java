package bpserver.bgu.ac.il;

import javax.websocket.server.ServerEndpointConfig;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.websocket.jsr356.server.ServerContainer;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;

/**
 * The save servlet is used to echo XML to the client, eg. for SVG export and
 * saving (see Dialogs.js:SaveDialog and ExportDialog). The export servlet is
 * used to implement image and PDF export (see Dialogs.js:ExportDialog). Note
 * that the CSS support is limited to the following for all HTML markup:
 * http://docs.oracle.com/javase/6/docs/api/index.html?javax/swing/text/html/CSS
 * .html The open servlet is used to open files. It does this by calling some
 * JavaScript hook in the client-side page (see open.html).
 */
public class BPServer {
	
	 
	
	public static int PORT = 8080;

	/**
	 * Uncomment this for better font size rendering in px units within labels.
	 */
	static {
		// mxGraphicsCanvas2D.HTML_SCALE = 0.75;
		// mxGraphicsCanvas2D.HTML_UNIT = "px";
	}

	/**
	 * Point your browser to
	 * http://localhost:8080/javascript/examples/floweditor/www/index.html
	 */
	public static void main(String[] args) throws Exception {
		Server server = new Server(PORT);

		// Servlets

		ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
		context.setContextPath("/");
		server.setHandler(context);

		//context.addServlet(new ServletHolder(new EchoServlet()), "/save");
		//context.addServlet(new ServletHolder(new ExportServlet()), "/export");
		//context.addServlet(new ServletHolder(new FlowOpenServlet()), "/open");
		context.addServlet(new ServletHolder(new RunServlet()), "/run");

		ResourceHandler fileHandler = new ResourceHandler();
		fileHandler.setResourceBase(".");

		// Add javax.websocket support
        ServerContainer container = WebSocketServerContainerInitializer.configureContext(context);

        // Add debug endpoint to server container
        ServerEndpointConfig echoConfig = ServerEndpointConfig.Builder.create(DebugEndPoint.class,"/debug").build();
        container.addEndpoint(echoConfig);
		
		HandlerList handlers = new HandlerList();
		handlers.setHandlers(new Handler[] { fileHandler, context});
		server.setHandler(handlers);

		System.out.println(">> Go to http://localhost:" + PORT + "/blockly-editor/blockly-files/index.html");

		server.start();
		server.join();
	}
}
