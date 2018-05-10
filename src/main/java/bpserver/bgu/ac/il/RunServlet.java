/**
 * Copyright (c) 2011-2012, JGraph Ltd
 */
package bpserver.bgu.ac.il;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.StringBProgram;
import il.ac.bgu.cs.bp.bpjs.bprogram.runtimeengine.listeners.PrintBProgramRunnerListener;
import org.apache.commons.io.IOUtils;

/**
 * Servlet implementation class OpenServlet.
 * 
 * open.html implements the user interface. This file is displayed within an
 * IFRAME in order to better handle the response. The form is then processed
 * either locally if the browser implements the HTML5 FileReader API or via the
 * OpenServlet. Note that the mechanism to open files uses OpenFile in
 * Editor.js, as well as Editor.openFile when the client starts. This is
 * required to abstract away the asynchronous loading of the new editor and
 * handling of the response, which in turn calls the setData method on the
 * OpenFile instance of the parent window of the frame where open.html was
 * displayed (see below).
 */
public class RunServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1598336877581962216L;

	/**
	 * Handles save request and prints XML.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// String id = request.getParameter("id");
		// String xml = request.getParameter("xml");

		// System.out.println("Received id=" + id + " xml=" + xml);
		System.out.println("Running...");

		BufferedReader br = request.getReader();


		String code = IOUtils.toString(br);

		final StringBProgram bprog = new StringBProgram(code);

		br = new BufferedReader(new FileReader("packman\\bt-server.js"));
		String code2 = IOUtils.toString(br);
		bprog.appendSource(code2);

		BProgramRunner rnr = new BProgramRunner(bprog);

		// Print program events to the console
		rnr.addListener(new PrintBProgramRunnerListener());

		// go!
		try {
			rnr.start();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		response.setStatus(HttpServletResponse.SC_OK);
	}

	static String readFile(String path, Charset encoding) throws IOException {
		byte[] encoded = Files.readAllBytes(Paths.get(path));
		return new String(encoded, encoding);
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/xml;charset=UTF-8");
		response.setHeader("Pragma", "no-cache"); // HTTP 1.0
		response.setHeader("Cache-control", "private, no-cache, no-store");
		response.setHeader("Expires", "0");

		response.setStatus(HttpServletResponse.SC_OK);
	}

}
