from copy import deepcopy
from pprint import pprint
import sys
import json

POKEMON_TEAM_SIZE = 3
POKEMON_NUM_OF_MOVES = 4

def has_fainted(pokemon):
    return pokemon['current_hp'] <= 0

def check_active_pokemon(game_state, player_type):
    active_index = game_state[player_type]['active_pokemon_index']
    active_pokemon = game_state[player_type]['pokemon_team'][active_index]
    if has_fainted(active_pokemon):
        return True
    return False

def select_new_active_pokemon(game_state, player_type):
    for i, pokemon in enumerate(game_state[player_type]['pokemon_team']):
        if not has_fainted(pokemon):
            return i  # returns the index of the first non-fainted
    return None  # no available pokemn (this should be handled as a game over condition)

def getCurrentScore(game_state: dict) -> float:
    ai_health_ratio = sum(p['current_hp'] / p['base_stats']['hp'] for p in game_state['ai']['pokemon_team'])
    player_health_ratio = sum(p['current_hp'] / p['base_stats']['hp'] for p in game_state['player']['pokemon_team'])

    # adjust the score by considering the total power of remaining moves
    ai_move_power = sum(sum(m.get('power', 0) for m in p['base_stats']['moves']) for p in game_state['ai']['pokemon_team'] if p['current_hp'] > 0)
    player_move_power = sum(sum(m.get('power', 0) for m in p['base_stats']['moves']) for p in game_state['player']['pokemon_team'] if p['current_hp'] > 0)

    # weight the health ratio by the potential move power
    score = (ai_health_ratio * ai_move_power) - (player_health_ratio * player_move_power)
    return score

def checkWinner(game_state: dict):
    """
    params:
        game state  (dict)
    returns:
        winner: 0 | 1 | None
    """
    ai_team_size = len(game_state['ai']['pokemon_team'])
    ai_fainted_count = len(game_state['ai']['fainted_pokemons'])
    ai_current_hp_sum = sum([x['current_hp'] for x in game_state['ai']['pokemon_team']])

    player_team_size = len(game_state['player']['pokemon_team'])
    player_fainted_count = len(game_state['player']['fainted_pokemons'])
    player_current_hp_sum = sum([x['current_hp'] for x in game_state['player']['pokemon_team']])

    if ai_fainted_count == ai_team_size or ai_current_hp_sum <= 0:
        return 'player'

    if player_fainted_count == player_team_size or player_current_hp_sum <= 0:
        return 'ai'

    return None
    
def attack(game_state, move_index):
    turn_order = game_state['turn_order']
    opponent = 'ai' if turn_order == 'player' else 'player'
    attacking_pokemon = game_state[turn_order]['pokemon_team'][game_state[turn_order]['active_pokemon_index']]
    attack_move = attacking_pokemon['base_stats']['moves'][move_index]
    opponent_pokemon_index = game_state[opponent]['active_pokemon_index']
    
    game_state_copy = deepcopy(game_state)
    opponent_pokemon = game_state_copy[opponent]['pokemon_team'][opponent_pokemon_index]

    if opponent_pokemon['current_hp'] - attack_move['power'] <= 0:
        opponent_pokemon['current_hp'] = 0
        game_state_copy[opponent]['fainted_pokemons'].append(opponent_pokemon_index)
        
        # activate new pokemon
        new_opponent_active_index = select_new_active_pokemon(game_state_copy, opponent)
        if new_opponent_active_index is not None:
            game_state_copy[opponent]['active_pokemon_index'] = new_opponent_active_index
        else:
            pass
            # print(f"all pokemons for {opponent} have fainted.")     # should be deemed game over
    else:
        opponent_pokemon['current_hp'] -= attack_move['power']

    return game_state_copy

def getMoveset(game_state):
    # determine turn order
    turn_order = game_state['turn_order']
    
    # get active pokemon's possible moves
    active_pokemon = game_state[turn_order]['pokemon_team'][game_state[turn_order]['active_pokemon_index']]
    moves = deepcopy(active_pokemon['base_stats']['moves'])
    
    # get available switches => pokemons that have not fainted and that is not the current active pokemon
    available_pokemons = [x for x in range(len(game_state[turn_order]['pokemon_team'])) if x not in game_state[turn_order]['fainted_pokemons'] and x != game_state[turn_order]['active_pokemon_index']]
    switches = [{
        "switch": x
    } for x in available_pokemons]

    # append switch moves to moves
    moves.extend(switches)

    return moves

def bestMove(game_state):
    """
    performs the next best move given current game state

    params:
        game state  (dict)
    """
    # determine turn order and opponent
    turn_order = game_state['turn_order']
    opponent = 'ai' if turn_order == 'player' else 'player'
    
    moves = getMoveset(game_state)

    # initialize score to -INFINITY
    bestScore = -(sys.maxsize)
    bestMove = None

    # iterate through all possible moves
    for move_index in range(len(moves)):
        # get deep copy of current game state
        game_state_copy = deepcopy(game_state)
        
        # move is a switch
        if "switch" in moves[move_index]:
            # perform the switch
            game_state_copy[turn_order]['active_pokemon_index'] = moves[move_index]['switch']

        # move is an attack
        elif "power" in moves[move_index]:
            # perform the attack
            game_state_copy = attack(game_state_copy, move_index)
            
        game_state_copy['turn_order'] = opponent
            
        # get best score and best move
        score = minimax(game_state_copy, 0, False)
        print(score)
        if score > bestScore:
            bestScore = score
            bestMove = move_index

    print(f'best move: {moves[bestMove]}')

    # perform best move
    if bestMove < POKEMON_NUM_OF_MOVES:     # best move is attack
        # game_state = attack(game_state, bestMove)
        return {
            'move': bestMove
        }
    # best move is switch
    else:
        # game_state[turn_order]['active_pokemon_index'] = moves[bestMove]['switch']
        return {
            'switch': moves[bestMove]['switch']
        }

    # game_state['turn_order'] = opponent
    # return game_state

def minimax(game_state, depth, isMaximizing) -> float:
    """
    recursively determine best option for player depending on turn and return the terminal state score
    
    params:
        game state  (dict)
        depth       (int)
        turn        (bool)
    returns: 
        best score  (float)
    """
    if depth > 5:
        return getCurrentScore(game_state)
    
    # check for terminal state / winner
    result = checkWinner(game_state)
    if result:
        return getCurrentScore(game_state)
    
    # if AI's turn -> maximize
    if isMaximizing:
        moves = getMoveset(game_state)
        bestScore = -(sys.maxsize)  # initialize score to -INFINITY

        # iterate through all possible moves
        for move_index in range(len(moves)):
            # get deep copy of current game state
            game_state_copy = deepcopy(game_state)
            
            # move is a switch
            if "switch" in moves[move_index]:
                # perform the switch
                game_state_copy['ai']['active_pokemon_index'] = moves[move_index]['switch']

            # move is an attack
            elif "power" in moves[move_index]:
                # perform the attack
                game_state_copy = attack(game_state_copy, move_index)
                
            # update turn order
            game_state_copy['turn_order'] = 'player'

            # get best score and best move
            score = minimax(game_state_copy, depth + 1, False)
            bestScore = max(score, bestScore)

        return bestScore
    # if player's turn -> minimize
    else:
        moves = getMoveset(game_state)
        bestScore = sys.maxsize     # initialize score to INFINITY

        # iterate through all possible moves
        for move_index in range(len(moves)):
            # get deep copy of current game state
            game_state_copy = deepcopy(game_state)
            
            # move is a switch
            if "switch" in moves[move_index]:
                # perform the switch
                game_state_copy['player']['active_pokemon_index'] = moves[move_index]['switch']

            # move is an attack
            elif "power" in moves[move_index]:
                # perform the attack
                game_state_copy = attack(game_state_copy, move_index)
                
            # update turn order
            game_state_copy['turn_order'] = 'ai'
            
            # get best score and best move
            score = minimax(game_state_copy, depth + 1, True)
            bestScore = min(score, bestScore)

        return bestScore

# with open('./data.json', 'r') as f:
#     game_state = json.load(f)
#     # print(game_state)

# game_state = bestMove(game_state)
# pprint(game_state)

# with open('./next_state.json', 'w') as f: 
#     json.dump(game_state, f, indent=4)