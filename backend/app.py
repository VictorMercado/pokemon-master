from flask import Flask, render_template, send_from_directory
from dotenv import load_dotenv
import os

app = Flask(__name__, static_url_path='', static_folder="./static/dist", template_folder="./templates")

def print_files_in_directory(directory):
    """
    Print all files in the specified directory and its subdirectories.
    
    Args:
    directory (str): The path to the directory.
    """
    # Walk through the directory tree
    for root, dirs, files in os.walk(directory):
        # Print files in the current directory
        for file in files:
            file_path = os.path.join(root, file)
            print(file_path)


@app.route("/", defaults={'path': ''})
@app.route("/<path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        # If the path is not empty or the favicon, return the static file
        return send_from_directory(app.static_folder, path)
    else:
        # Otherwise, serve the index.html file
        return send_from_directory(app.static_folder, 'index.html')



@app.route("/hello")
def hello_world():
    return "<p>Hello, World!</p>"

load_dotenv()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port)