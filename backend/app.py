from flask import Flask, render_template, send_from_directory, request, jsonify
from dotenv import load_dotenv
import os
from game import bestMove
from flask_cors import CORS
import json

app = Flask(__name__, static_url_path='', static_folder="static/dist", template_folder="./templates")
CORS(app)

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


# @app.route('/', defaults={'path': ''})
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, 'index.html')
    if path != "/" and os.path.exists(app.static_folder + '/' + path):
        # If the path is not empty or the favicon, return the static file
        return send_from_directory(app.static_folder, path)
    else:
        # Otherwise, serve the index.html file
        return send_from_directory(app.static_folder, 'index.html')



@app.route("/hello")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/ai", methods=['POST'])
def runAI():
    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        data = request.get_json()
        print("printing data from request")
        if data is None:
            print("data is none")
            return jsonify({"error": "Request must be JSON"}), 400
        print(data)
        theMove = bestMove(data)
        
        # try :
            
        # except Exception as e:
        #     print(e)
        #     theMove = {"error": "An error occurred"}
        return jsonify(theMove)
        # return jsonify({"move": 3})

load_dotenv()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5003))
    app.run(host='0.0.0.0', port=port)


# with open('./next_state.json', 'w') as f: 
#     json.dump(data, f, indent=4)