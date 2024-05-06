from copy import deepcopy
import json
import sys

# Type effectiveness chart
TYPE_CHART = {
    'normal': {'normal': 1.0, 'fire': 1.0, 'water': 1.0, 'electric': 1.0, 'grass': 1.0, 'ice': 1.0, 'fighting': 1.0, 'poison': 1.0, 'ground': 1.0, 'flying': 1.0, 'psychic': 1.0, 'bug': 1.0, 'rock': 0.5, 'ghost': 0.0, 'dragon': 1.0, 'dark': 1.0, 'steel': 0.5, 'fairy': 1.0},
    'fire': {'normal': 1.0, 'fire': 0.5, 'water': 0.5, 'electric': 1.0, 'grass': 2.0, 'ice': 2.0, 'fighting': 1.0, 'poison': 1.0, 'ground': 1.0, 'flying': 1.0, 'psychic': 1.0, 'bug': 2.0, 'rock': 0.5, 'ghost': 1.0, 'dragon': 1.0, 'dark': 1.0, 'steel': 2.0, 'fairy': 1.0},
    'water': {'normal': 1.0, 'fire': 2.0, 'water': 0.5, 'electric': 1.0, 'grass': 0.5, 'ice': 1.0, 'fighting': 1.0, 'poison': 1.0, 'ground': 2.0, 'flying': 1.0, 'psychic': 1.0, 'bug': 1.0, 'rock': 2.0, 'ghost': 1.0, 'dragon': 1.0, 'dark': 1.0, 'steel': 1.0, 'fairy': 1.0},
    'electric': {'normal': 1.0, 'fire': 1.0, 'water': 2.0, 'electric': 0.5, 'grass': 0.5, 'ice': 1.0, 'fighting': 1.0, 'poison': 1.0, 'ground': 0.0, 'flying': 2.0, 'psychic': 1.0, 'bug': 1.0, 'rock': 1.0, 'ghost': 1.0, 'dragon': 1.0, 'dark': 1.0, 'steel': 1.0, 'fairy': 1.0},
    'grass': {'normal': 1.0, 'fire': 0.5, 'water': 2.0, 'electric': 1.0, 'grass': 0.5, 'ice': 1.0, 'fighting': 1.0, 'poison': 0.5, 'ground': 2.0, 'flying': 0.5, 'psychic': 1.0, 'bug': 0.5, 'rock': 2.0, 'ghost': 1.0, 'dragon': 1.0, 'dark': 1.0, 'steel': 0.5, 'fairy': 1.0},
    'ice': {'normal': 1.0, 'fire': 0.5, 'water': 0.5, 'electric': 1.0, 'grass': 2.0, 'ice': 0.5, 'fighting': 1.0, 'poison': 1.0, 'ground': 2.0, 'flying': 2.0, 'psychic': 1.0, 'bug': 1.0, 'rock': 1.0, 'ghost': 1.0, 'dragon': 2.0, 'dark': 1.0, 'steel': 0.5, 'fairy': 1.0},
    'fighting': {'normal': 2.0, 'fire': 1.0, 'water': 1.0, 'electric': 1.0, 'grass': 1.0, 'ice': 2.0, 'fighting': 1.0, 'poison': 0.5, 'ground': 1.0, 'flying': 0.5, 'psychic': 0.5, 'bug': 0.5, 'rock': 2.0, 'ghost': 0.0, 'dragon': 1.0, 'dark': 2.0, 'steel': 1.0, 'fairy': 0.5},
    'poison': {'normal': 1.0, 'fire': 1.0, 'water': 1.0, 'electric': 1.0, 'grass': 2.0, 'ice': 1.0, 'fighting': 1.0, 'poison': 0.5, 'ground': 0.5, 'flying': 1.0, 'psychic': 1.0, 'bug': 1.0, 'rock': 0.5, 'ghost': 0.5, 'dragon': 1.0, 'dark': 1.0, 'steel': 1.0, 'fairy': 2.0},
    'ground': {'normal': 1.0, 'fire': 2.0, 'water': 1.0, 'electric': 2.0, 'grass': 0.5, 'ice': 1.0, 'fighting': 1.0, 'poison': 2.0, 'ground': 1.0, 'flying': 0.0, 'psychic': 1.0, 'bug': 0.5, 'rock': 2.0, 'ghost': 1.0, 'dragon': 1.0, 'dark': 1.0, 'steel': 2.0, 'fairy': 1.0},
    'flying': {'normal': 1.0, 'fire': 1.0, 'water': 1.0, 'electric': 0.5, 'grass': 2.0, 'ice': 1.0,'fighting': 2.0, 'poison': 1.0, 'ground': 1.0, 'flying': 1.0, 'psychic': 1.0, 'bug': 2.0, 'rock': 0.5, 'ghost': 1.0, 'dragon': 1.0, 'dark': 1.0, 'steel': 0.5, 'fairy': 1.0},
    'psychic': {'normal': 1.0, 'fire': 1.0, 'water': 1.0, 'electric': 1.0, 'grass': 1.0, 'ice': 1.0, 'fighting': 2.0, 'poison': 2.0, 'ground': 1.0, 'flying': 1.0, 'psychic': 0.5, 'bug': 1.0, 'rock': 1.0, 'ghost': 1.0, 'dragon': 1.0, 'dark': 0.0, 'steel': 0.5, 'fairy': 1.0},
    'bug': {'normal': 1.0, 'fire': 0.5, 'water': 1.0, 'electric': 1.0, 'grass': 2.0, 'ice': 1.0, 'fighting': 0.5, 'poison': 1.0, 'ground': 0.5, 'flying': 0.5, 'psychic': 2.0, 'bug': 1.0, 'rock': 1.0, 'ghost': 0.5, 'dragon': 1.0, 'dark': 2.0, 'steel': 0.5, 'fairy': 0.5},
    'rock': {'normal': 1.0, 'fire': 2.0, 'water': 1.0, 'electric': 1.0, 'grass': 1.0, 'ice': 2.0, 'fighting': 0.5, 'poison': 1.0, 'ground': 0.5, 'flying': 2.0, 'psychic': 1.0, 'bug': 2.0, 'rock': 1.0, 'ghost': 1.0, 'dragon': 1.0, 'dark': 1.0, 'steel': 2.0, 'fairy': 1.0},
    'ghost': {'normal': 0.0, 'fire': 1.0, 'water': 1.0, 'electric': 1.0, 'grass': 1.0, 'ice': 1.0, 'fighting': 1.0, 'poison': 1.0, 'ground': 1.0, 'flying': 1.0, 'psychic': 1.0, 'bug': 1.0, 'rock': 1.0, 'ghost': 2.0, 'dragon': 1.0, 'dark': 0.5, 'steel': 1.0, 'fairy': 1.0},
    'dragon': {'normal': 1.0, 'fire': 1.0, 'water': 1.0, 'electric': 1.0, 'grass': 1.0, 'ice': 1.0, 'fighting': 1.0, 'poison': 1.0, 'ground': 1.0, 'flying': 1.0, 'psychic': 1.0, 'bug': 1.0, 'rock': 1.0, 'ghost': 1.0, 'dragon': 2.0, 'dark': 1.0, 'steel': 0.5, 'fairy': 0.0},
    'dark': {'normal': 1.0, 'fire': 1.0, 'water': 1.0, 'electric': 1.0, 'grass': 1.0, 'ice': 1.0, 'fighting': 0.5, 'poison': 1.0, 'ground': 1.0, 'flying': 1.0, 'psychic': 2.0, 'bug': 1.0, 'rock': 1.0, 'ghost': 2.0, 'dragon': 1.0, 'dark': 0.5, 'steel': 1.0, 'fairy': 0.5},
    'steel': {'normal': 1.0, 'fire': 0.5, 'water': 0.5, 'electric': 0.5, 'grass': 1.0, 'ice': 2.0, 'fighting': 1.0, 'poison': 1.0, 'ground': 1.0, 'flying': 1.0, 'psychic': 1.0, 'bug': 1.0, 'rock': 2.0, 'ghost': 1.0, 'dragon': 1.0, 'dark': 1.0, 'steel': 0.5, 'fairy': 2.0},
    'fairy': {'normal': 1.0, 'fire': 0.5, 'water': 1.0, 'electric': 1.0, 'grass': 1.0, 'ice': 1.0, 'fighting': 2.0, 'poison': 0.5, 'ground': 1.0, 'flying': 1.0, 'psychic': 1.0, 'bug': 1.0, 'rock': 1.0, 'ghost': 1.0, 'dragon': 2.0, 'dark': 2.0, 'steel': 0.5, 'fairy': 1.0}
}

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

    # calculate damage based on type effectiveness
    effectiveness = get_type_effectiveness(attack_move['type'], opponent_pokemon['type'])
    damage = attack_move['power'] * effectiveness

    if opponent_pokemon['current_hp'] - damage <= 0:
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
        opponent_pokemon['current_hp'] -= damage

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

def bestMove(game_state, top_n=5):
    """
    Finds and prints the top n best moves for the given game state.

    Parameters:
        game_state (dict): The current state of the game.
        top_n (int): Number of top moves to print.

    Returns:
        None
    """
    # determine turn order and opponent
    turn_order = game_state['turn_order']
    opponent = 'ai' if turn_order == 'player' else 'player'
    
    moves = getMoveset(game_state)

    # Initialize a list to store move scores
    move_scores = []

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
            
        # get score for the current move
        score = minimax(game_state_copy, 0, float('-inf'), float('inf'),  False)

        # Append move index and its score to the list
        move_scores.append((move_index, score))

    # Sort moves based on their scores in descending order
    move_scores.sort(key=lambda x: x[1], reverse=True)

    # print top n moves for debugging
    # print("Top", top_n, "Best Moves:")
    # for i in range(min(top_n, len(move_scores))):
    #     move_index, score = move_scores[i]
    #     print("Move:", moves[move_index], "Score:", score)

    # get best move index
    best_move_index, _ = move_scores[0]
    best_move = moves[best_move_index]

    # move is a switch
    if "switch" in best_move:
        return best_move
    # move is a move
    else:
        return {"move": best_move_index}

def minimax(game_state, depth, alpha, beta, isMaximizing) -> float:
    """
    recursively determine best option for player depending on turn and return the terminal state score
    
    params:
        game state  (dict)
        depth       (int)
        alpha       (alpha)
        beta        (beta)
        turn        (bool)
    returns: 
        best score  (float)
    """
    if depth > 6:
        return getCurrentScore(game_state)
    
    # check for terminal state / winner
    result = checkWinner(game_state)
    if result:
        return getCurrentScore(game_state)
    
    # if AI's turn -> maximize
    if isMaximizing:
        moves = getMoveset(game_state)
        bestScore =  float('-inf')  # initialize score to -INFINITY

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
            score = minimax(game_state_copy, depth + 1, alpha, beta, False)
            bestScore = max(score, bestScore)
            alpha = max(alpha, score)
            if beta <= alpha:
                break   # prune

        return bestScore
    # if player's turn -> minimize
    else:
        moves = getMoveset(game_state)
        bestScore = float('inf')     # initialize score to INFINITY

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
            score = minimax(game_state_copy, depth + 1, alpha, beta, True)
            bestScore = min(score, bestScore)

            beta = min(beta, score)
            if beta <= alpha:
                break  # prune

        return bestScore

def get_type_effectiveness(attack_type, defender_type):
    """Return the type effectiveness multiplier."""
    effectiveness = TYPE_CHART[attack_type][defender_type]
    return effectiveness