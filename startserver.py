import os
import subprocess
import webbrowser

def start_server():
    # Get the current working directory where the HTML file is located
    directory = os.getcwd()

    # Open the default web browser
    webbrowser.open("http://localhost:8000")

    # Run the command to start the HTTP server
    subprocess.run(["python", "-m", "http.server", "8000"], cwd=directory)


start_server()
