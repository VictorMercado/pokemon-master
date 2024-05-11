# Pokemon-master
The goal of this project is to create a Pokemon battle game where players can compete against an AI opponent. The game will simulate the core mechanics of the Pokemon franchise, including choosing a team of Pokemon, battling with moves and abilities, and determining a winner based on the remaining Pokemon's health.

## Datasets uses
[https://pokeapi.co/](https://pokeapi.co/) - Pokémon data accessible through a modern free open-source RESTful API

## Layout of the code
The project is structured into two main directories: the backend and front end.


### <ins>Front end</ins>
```
  
  1. Imports: Necessary modules and components are imported from React, as well as custom components from the project (`PokemonBattle`), and various API-related functions.
  
  2. Constants: URLs for three different AI agents (`GPTURL`, `MINMAXURL`, `BETTERMINMAXURL`) are defined.
  
  3. App Component: The main component, `App`, is a functional component that sets up various states and initializes hooks for managing the game state, player actions, logs, and more.
  
  4. UseQuery Hook: Utilizes the `useQuery` hook from `@tanstack/react-query` to fetch data (Pokémon information) asynchronously.
  
  5. Event Handlers: Functions like `handlePlayerMove`, `handlePlayerSwitch`, `handleOpponentMove`, `handleOpponentSwitch`, `handlePlayerRemove`, and `handleOpponentRemove` are defined to handle various game actions such as switching Pokémon, attacking, and removing fainted Pokémon.
  
  6. Effects: `useEffect` hooks are used for various side effects. For example, one effect loads AI Pokémon when the game data is fetched, another effect checks for winners based on fainted Pokémon, and there are effects to handle disabling/enabling Pokémon selection based on team size.
  
  7. Rendering: The JSX markup renders several sections:
     - Pokemon Search: Allows the user to search and select Pokémon to build their team.
     - AI Pokemon: Displays AI Pokémon team information.
     - Pokemon Battle Display: Shows the battle interface, including the current turn, battle log, and the active Pokémon for both player and AI.
     - Player Pokemon: Displays the player's Pokémon team information.
     - Logs: Shows game logs, including actions taken and events in the battle.
  
  8. Conditional Rendering: Certain elements are conditionally rendered based on game state, such as displaying loading/error messages during data fetching and showing fainted Pokémon.
  
  9. Styling: Basic styling classes are applied for layout, alignment, and visual presentation.
```
### <ins>Back end</ins>
  - The backend directory contains the server-side code written in Python. It includes the Flask application defined in app.py, and the game logic in game.py and game2.py.

#### app.py
```
This file is the main entry point for the application. It contains the Flask web application that serves as the backend for the Pokémon battle simulation. Here's an overview of what this file does:

1. Import Dependencies: It imports necessary modules and libraries such as Flask, dotenv, os, json, sys, and other custom modules like `game` and `game2`.

2. Flask Setup: Initializes the Flask application and specifies the static and template directories.

3. CORS Configuration: Enables Cross-Origin Resource Sharing (CORS) to allow requests from different origins.

4. Route Definitions:
    - `/`: Serves the static files (HTML, CSS, JavaScript) needed for the front-end application.
    - `/hello`: A simple route that returns a "Hello, World!" message.
    - `/ai`: Accepts POST requests with game state data and returns the AI's best move calculated using the `bestMove` function from `game.py`.
    - `/ai2`: Similar to `/ai`, but uses the `bestMove` function from `game2.py`.
    - `/openai`: Accepts POST requests with game state data and uses the OpenAI API to generate the AI's best move.

5. OpenAI Integration: Defines a route `/openai` that utilizes the OpenAI API to generate AI moves based on the provided game state.

6. Server Initialization: Starts the Flask server to listen for incoming requests.
```
#### game.py
```
This file contains functions related to the Pokémon battle mechanics and AI decision-making. Here's a summary of its contents:

1. Utility Functions:
    - `has_fainted`: Checks if a Pokémon has fainted based on its current HP.
    - `check_active_pokemon`: Checks if the active Pokémon of a player has fainted.
    - `select_new_active_pokemon`: Selects a new active Pokémon for a player if the current one has fainted.
    - `getCurrentScore`: Calculates the current score of the game state based on health ratios and move powers.
    - `checkWinner`: Checks if there's a winner in the battle based on the game state.

2. Attack Function: 
    - `attack`: Simulates an attack between two Pokémon based on the provided move index and updates the game state accordingly.

3. Move Generation:
    - `getMoveset`: Generates the possible moveset for the active Pokémon in the current game state.

4. AI Decision-making:
    - `bestMove`: Implements a minimax algorithm to determine the AI's best move based on the current game state.
```
#### game2.py
```
This file serves a similar purpose to `game.py` but provides an alternative implementation for AI decision-making. Here's an overview of its contents:

1. AI Decision-making:
    - `bestMove`: Contains an alternative implementation of the AI decision-making logic, possibly using a different algorithm or strategy compared to `game.py`.

2. This version of the AI incorporates Alpha Beta Pruning, making this version of the AI nearly 50 times more efficient to the one without pruning.

3. The bestMove has been updated to take into account the type multipliers for the moves, exactly how the original Pokemon game was intended.
- Example: Water is super effective (2x damage) to fire

4. Similar Structure: While the specific implementation details may differ, the overall structure and purpose of the functions in `game2.py` remain similar to those in `game.py`.

These files collectively form the backend logic for the Pokémon battle simulation, handling game state management, move generation, AI decision-making, and interaction with the OpenAI API for generating AI moves.
```
#### Main Differences Between `game.py` and `game2.py`
```
1. **Type Effectiveness Chart:** In `game2.py`, the `TYPE_CHART` dictionary has been updated to include the effectiveness of moves against different Pokémon types. Each type is matched with a dictionary containing effectiveness values against other types. For example:

   TYPE_CHART = {
       'normal': {'normal': 1.0, 'fire': 1.0, ...},
       'fire': {'normal': 1.0, 'fire': 0.5, ...},
       ...
   }

2. **Score Calculation:** The `getCurrentScore` function in `game2.py` calculates the score based on the health and move power of the remaining Pokémon. It adjusts the score by considering the total power of remaining moves for each player.

3. **Minimax Algorithm:** The `minimax` function in `game2.py` implements a minimax algorithm to determine the best move for the AI opponent. It recursively evaluates potential future game states and selects the move with the highest expected score.

These changes add significant gameplay enhancements, including type effectiveness in battles and an AI opponent capable of making strategic decisions using the minimax algorithm.
```

### Other
- There are also some Docker-related files at the root level (Dockerfile and .dockerignore), indicating that this application can be containerized using Docker.
- The requirements.txt file at the root level lists the Python dependencies required for the backend.
- The main.py file at the root level could be an entry point for the application or a script for testing or development purposes.
- The LICENSE and README.md files provide information about the project's licensing and usage.

## How to interact with the program
Head over to [https://pokemon-master-production.up.railway.app](https://pokemon-master-production.up.railway.app) and check out the live version! 
Once on the webpage, you will need to: 
1. Select your 3 pokemon from the search drop down menu on the top of the page.
2. Once you have selected your 3 pokemon, you will be able to select which AI you want versus your pokemon.
3. Your selections are: `GPT-4`, `MinMax`, `BetterMinMax` <br>
`GPT-4` GPT-4 Sends the current game state to the GPT API, returning the best move possible which GPT thinks <br>
`MinMax` is our orinigal algorithm, which does take a long time to compute the best move (2-3 min for each move) <br>
`BetterMinMax` is the best rendition of the AI, incorporated type multipliers and pruning, allowing for a much quicker response time from the server (1-2 min)
4. Once you have selected the AI's, the web app will work as intended. There will be an indicator, (red ai) (green player), specifying which users turn it is.
5. Enjoy!

## What does each file/folder do?
But if you want to run the project locally, you can follow these steps:
-   First, clone the repository to your local machine.
-   Then, navigate to the frontend project directory and install the necessary dependencies using npm or bun:
-   (This directory is responsible for the user interface of the application, built using React.)
-   (It handles user interactions, displays game state information, and communicates with the backend server.)
-   (App.tsx is the main component that sets up the game state and handles user actions)
-   (PokemonBattle.tsx renders the game interface.))
-   Build the project using npm run build or yarn build or bun build.
-   This will create a dist folder containing the static files for the frontend.
-   You will need to serve these static files using a web server. This is where the backend comes in.
-   Place the dist folder in the backend/static directory.
-   Then create a virtual environment and install the Python dependencies using pip install -r requirements.txt.
-   The Flask application in app.py serves the static files and provides the backend logic for the Pokémon battle simulation, this is also where we host an API route to use ChatGPT.
-   game.py and game2.py contain the different MinMax algorithms, including functions for parsing game state, calculating moves.
-   To fight GPT AI you will need an OpenAI API key, which you can get by signing up for an account on the OpenAI website.
-   You will need to add an .env file in the backend directory with the following content:
-   OPENAI_API_KEY=your_api_key_here
-   Also ensure you have PORT=5000 in the .env file.
-   Run the Flask application using the flask command and ensure you are in the root directory:  flask --app backend/app run
-   This will start the Flask server, and you can access the application at http://localhost:5000.

