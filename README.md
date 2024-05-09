# Pokemon-master
The goal of this project is to create a Pokemon battle game where players can compete against an AI opponent. The game will simulate the core mechanics of the Pokemon franchise, including choosing a team of Pokemon, battling with moves and abilities, and determining a winner based on the remaining Pokemon's health.


## Layout of the code
The project is structured into two main directories: the backend and front end.


### <ins>Front end</ins>
```
  
  1. **Imports**: Necessary modules and components are imported from React, as well as custom components from the project (`PokemonBattle`), and various API-related functions.
  
  2. **Constants**: URLs for three different AI agents (`GPTURL`, `MINMAXURL`, `BETTERMINMAXURL`) are defined.
  
  3. **App Component**: The main component, `App`, is a functional component that sets up various states and initializes hooks for managing the game state, player actions, logs, and more.
  
  4. **UseQuery Hook**: Utilizes the `useQuery` hook from `@tanstack/react-query` to fetch data (Pokémon information) asynchronously.
  
  5. **Event Handlers**: Functions like `handlePlayerMove`, `handlePlayerSwitch`, `handleOpponentMove`, `handleOpponentSwitch`, `handlePlayerRemove`, and `handleOpponentRemove` are defined to handle various game actions such as switching Pokémon, attacking, and removing fainted Pokémon.
  
  6. **Effects**: `useEffect` hooks are used for various side effects. For example, one effect loads AI Pokémon when the game data is fetched, another effect checks for winners based on fainted Pokémon, and there are effects to handle disabling/enabling Pokémon selection based on team size.
  
  7. **Rendering**: The JSX markup renders several sections:
     - **Pokemon Search**: Allows the user to search and select Pokémon to build their team.
     - **AI Pokemon**: Displays AI Pokémon team information.
     - **Pokemon Battle Display**: Shows the battle interface, including the current turn, battle log, and the active Pokémon for both player and AI.
     - **Player Pokemon**: Displays the player's Pokémon team information.
     - **Logs**: Shows game logs, including actions taken and events in the battle.
  
  8. **Conditional Rendering**: Certain elements are conditionally rendered based on game state, such as displaying loading/error messages during data fetching and showing fainted Pokémon.
  
  9. **Styling**: Basic styling classes are applied for layout, alignment, and visual presentation.
```
### <ins>Back end</ins>
  - The backend directory contains the server-side code written in Python. It includes the Flask application defined in app.py, and the game logic in game.py and game2.py.
```
### app.py

This file is the main entry point for the application. It contains the Flask web application that serves as the backend for the Pokémon battle simulation. Here's an overview of what this file does:

1. **Import Dependencies**: It imports necessary modules and libraries such as Flask, dotenv, os, json, sys, and other custom modules like `game` and `game2`.

2. **Flask Setup**: Initializes the Flask application and specifies the static and template directories.

3. **CORS Configuration**: Enables Cross-Origin Resource Sharing (CORS) to allow requests from different origins.

4. **Route Definitions**:
    - `/`: Serves the static files (HTML, CSS, JavaScript) needed for the front-end application.
    - `/hello`: A simple route that returns a "Hello, World!" message.
    - `/ai`: Accepts POST requests with game state data and returns the AI's best move calculated using the `bestMove` function from `game.py`.
    - `/ai2`: Similar to `/ai`, but uses the `bestMove` function from `game2.py`.
    - `/openai`: Accepts POST requests with game state data and uses the OpenAI API to generate the AI's best move.

5. **OpenAI Integration**: Defines a route `/openai` that utilizes the OpenAI API to generate AI moves based on the provided game state.

6. **Server Initialization**: Starts the Flask server to listen for incoming requests.

### game.py

This file contains functions related to the Pokémon battle mechanics and AI decision-making. Here's a summary of its contents:

1. **Utility Functions**:
    - `has_fainted`: Checks if a Pokémon has fainted based on its current HP.
    - `check_active_pokemon`: Checks if the active Pokémon of a player has fainted.
    - `select_new_active_pokemon`: Selects a new active Pokémon for a player if the current one has fainted.
    - `getCurrentScore`: Calculates the current score of the game state based on health ratios and move powers.
    - `checkWinner`: Checks if there's a winner in the battle based on the game state.

2. **Attack Function**: 
    - `attack`: Simulates an attack between two Pokémon based on the provided move index and updates the game state accordingly.

3. **Move Generation**:
    - `getMoveset`: Generates the possible moveset for the active Pokémon in the current game state.

4. **AI Decision-making**:
    - `bestMove`: Implements a minimax algorithm to determine the AI's best move based on the current game state.

## game2.py

This file serves a similar purpose to `game.py` but provides an alternative implementation for AI decision-making. Here's an overview of its contents:

1. **AI Decision-making**:
    - `bestMove`: Contains an alternative implementation of the AI decision-making logic, possibly using a different algorithm or strategy compared to `game.py`.

2. **Similar Structure**: While the specific implementation details may differ, the overall structure and purpose of the functions in `game2.py` remain similar to those in `game.py`.

These files collectively form the backend logic for the Pokémon battle simulation, handling game state management, move generation, AI decision-making, and interaction with the OpenAI API for generating AI moves.
```
### Other
- There are also some Docker-related files at the root level (Dockerfile and .dockerignore), indicating that this application can be containerized using Docker.
- The requirements.txt file at the root level lists the Python dependencies required for the backend.
- The main.py file at the root level could be an entry point for the application or a script for testing or development purposes.
- The LICENSE and README.md files provide information about the project's licensing and usage.

## How to interact with the program
- tmp

## What does each file/folder do?
- tmp

