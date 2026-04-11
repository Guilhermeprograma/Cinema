# Cineplus ML Prediction Module
# Uses configuration from config.py

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import ML_CONFIG
import numpy as np

# Load configuration
MODEL_PATH = ML_CONFIG['model_path']
DATA_PATH = ML_CONFIG['data_path']
THRESHOLD = ML_CONFIG['prediction_threshold']

# Simulador de previsão de público usando regressão linear simples
# Baseado em dia da semana e gênero do filme

# Dados simulados
# Dia da semana: 0=Segunda, 6=Domingo
# Gênero: 0=Ação, 1=Comédia, 2=Drama, 3=Terror
dados = [
    {'dia': 0, 'genero': 0, 'publico': 50},
    {'dia': 1, 'genero': 1, 'publico': 70},
    {'dia': 5, 'genero': 2, 'publico': 80},
    {'dia': 6, 'genero': 3, 'publico': 90},
    # Mais dados...
]

# Função simples de regressão linear
def prever_publico(dia, genero):
    """
    Predict audience percentage based on day of week and genre.

    Args:
        dia (int): Day of week (0=Monday, 6=Sunday)
        genero (int): Genre (0=Action, 1=Comedy, 2=Drama, 3=Horror)

    Returns:
        float: Predicted audience percentage
    """
    # Coeficientes fictícios baseados em dados
    coef_dia = 5
    coef_genero = 10
    intercepto = 40
    prediction = intercepto + coef_dia * dia + coef_genero * genero

    # Apply threshold
    if prediction > THRESHOLD * 100:
        return prediction
    else:
        return prediction * 0.9  # Reduce if below threshold

    return prediction

# Exemplo de uso
if __name__ == "__main__":
    previsao = prever_publico(6, 1)  # Domingo, Comédia
    print(f"Previsão de público: {previsao}%")

    # Relatório: Filmes com maior ocupação prevista
    filmes_previsao = [
        {'titulo': 'Aventura Espacial', 'previsao': 85},
        {'titulo': 'Comédia Romântica', 'previsao': 90},
        {'titulo': 'Terror Noturno', 'previsao': 75},
    ]

    filmes_ordenados = sorted(filmes_previsao, key=lambda x: x['previsao'], reverse=True)
    print("Filmes com maior ocupação prevista:")
    for filme in filmes_ordenados:
        print(f"{filme['titulo']}: {filme['previsao']}%")