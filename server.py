#!/usr/bin/env python3
"""
Kautilya Educational Academy - Local Development Server
Supports custom 404 page for better testing experience
"""

import http.server
import socketserver
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def do_GET(self):
        # Get the file path
        path = self.translate_path(self.path)
        
        # Check if file exists
        if os.path.exists(path) and not os.path.isdir(path):
            return super().do_GET()
        
        # Check if it's a directory with index.html
        if os.path.isdir(path):
            index_path = os.path.join(path, 'index.html')
            if os.path.exists(index_path):
                return super().do_GET()
        
        # File not found - serve custom 404 page
        self.send_error_page()
    
    def send_error_page(self):
        """Serve the custom 404.html page"""
        error_page = os.path.join(DIRECTORY, '404.html')
        
        if os.path.exists(error_page):
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            
            with open(error_page, 'rb') as f:
                self.wfile.write(f.read())
        else:
            # Fallback to default 404
            self.send_error(404, 'File not found')

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"""
╔═══════════════════════════════════════════════════════════════╗
║   🏫 Kautilya Educational Academy - Dev Server                ║
╠═══════════════════════════════════════════════════════════════╣
║   🌐 Server running at: http://localhost:{PORT}                 ║
║   📁 Serving from: {DIRECTORY[:40]}...
║   🔴 Press Ctrl+C to stop                                     ║
╚═══════════════════════════════════════════════════════════════╝
        """)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped. Goodbye!")
