from flask import Flask, render_template, send_from_directory, request, jsonify
from dotenv import load_dotenv
import os
from game import bestMove
from game2 import bestMove as bestMove2
from flask_cors import CORS, cross_origin
import json
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# organization=os.getenv("OPENAI_ORG_ID"),
# project=os.getenv("OPENAI_PROJECT_ID"),


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
@cross_origin(origin='*')
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

@app.route("/ai2", methods=['POST'])
@cross_origin(origin='*')
def runAI2():
    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        data = request.get_json()
        print("printing data from request")
        if data is None:
            print("data is none")
            return jsonify({"error": "Request must be JSON"}), 400
        print(data)
        theMove = bestMove2(data)
        
        # try :
            
        # except Exception as e:
        #     print(e)
        #     theMove = {"error": "An error occurred"}
        return jsonify(theMove)
        # return jsonify({"move": 3})

def remove_json_block(json_string):
    # Find the index of the first '{' and the last '}'
    start_index = json_string.find('{')
    end_index = json_string.rfind('}')

    # Extract the content between the curly braces
    content = json_string[start_index:end_index + 1]

    return content

@app.route("/openai", methods=['POST'])
@cross_origin(origin='*')
def openAI():
    systemPrompt1 = "You are a pokemon master that will choose the best move, here is gameState for a pokemon battle you will figure out the best move to take against the other player, you are ai and you will only return {“move”: 0-3} or {“switch”: 0-2}, the move property will be from the moveset of the active pokemon and switch property will be which pokemon to switch to, remember to choose the highest numbered move DO NOT CHOOSE MOVE WITH 0 POWER:"
    systemPrompt2 = "You are a pokemon master that will choose the best move from the AI player with given gamestate of a pokemon battle you will return a json object containing only which pokemon move you would choose from the active pokemon memebers from the team, or you will choose to switch to a different pokemon indicating which index from the pokemon team array. you will return move: 0-3 or switch: 0-2"
    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        data = request.get_json()
        # print("printing data from request")
        if data is None:
            print("data is none")
            return jsonify({"error": "Request must be JSON"}), 400
        # print(data)
        theMove = client.chat.completions.create(model="gpt-3.5-turbo-0125", 
            messages=[{"role": "system", "content": systemPrompt1},
                    {"role": "user", "content": json.dumps(data)},
                ])
        # theMove = theMove.model_dump_json() 
        
        # try :
            
        # except Exception as e:
        #     print(e)
        #     theMove = {"error": "An error occurred"}
        # print(theMove.choices[0].message.content)
        # return theMove.choices[0].message.content
        # return jsonify({"move": 3})
        print(remove_json_block(theMove.choices[0].message.content))
        return json.dumps(remove_json_block(theMove.choices[0].message.content))


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5003))
    app.run(host='0.0.0.0', port=port)


# with open('./next_state.json', 'w') as f: 
#     json.dump(data, f, indent=4)