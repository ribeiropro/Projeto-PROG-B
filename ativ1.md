# Atividade 1

## 1. Quais tabelas você definiu inicialmente?

Foram definidas inicialmente seis tabelas:

- users: armazena os dados dos usuários.
- workouts: armazena os treinos criados pelos usuários.
- workout_days: armazena os dias de cada treino.
- exercises: armazena os exercícios disponíveis.
- workout_exercises: relaciona os exercícios aos dias de treino e armazena informações como séries, repetições, carga e descanso.
- workout_sessions: registra cada execução de um dia de treino (quando o usuário realmente treinou aquele dia).
- session_sets: registra as séries de fato executadas em cada sessão, com repetições e carga usadas naquele momento.
- hydration: registra o consumo de água dos usuários.

## 2. Você utilizou migrations? Se sim, quantas migrations? Descreva em uma frase o que cada uma faz.

Sim. Foram utilizadas seis migrations:

1. 001_create_users → cria a tabela de usuários.
2. 002_create_workouts → cria a tabela de treinos relacionados aos usuários.
3. 003_create_workout_days → cria os dias pertencentes a cada treino.
4. 004_create_exercises → cria a tabela de exercícios.
5. 005_create_workout_exercises → relaciona exercícios aos dias de treino e armazena suas configurações.
6. 006_create_hydration → cria a tabela para registrar o consumo de água dos usuários.
7. 007_create_workout_sessions → cria a tabela que registra cada execução de um dia de treino.
8. 008_create_session_sets → cria a tabela que registra as séries realmente executadas em cada sessão.

## 3. Qual o caminho do arquivo que gera a seed do seu banco?

O caminho do arquivo que gera a seed está em:

/workspaces/codespaces-blank/orbe/backend/seed.sql

## 4. Quais os endpoints que você irá implementar inicialmente? Cada endpoint deve ser um método e um path. Explique em um parágrafo por que você resolveu priorizar a implementação desses endpoints.

Os endpoints que serão implementados inicialmente são:

- POST /users
- GET /users/me
- PUT /users/me
- POST /workouts
- GET /workouts
- GET /workouts/:id
- PUT /workouts/:id
- DELETE /workouts/:id
- POST /workouts/:id/days
- GET /workouts/:id/days
- POST /workout-days/:id/exercises
- PUT /workout-days/:id/exercises/:exerciseId
- DELETE /workout-days/:id/exercises/:exerciseId
- POST /hydration
- GET /hydration

Esses endpoints foram priorizados porque representam as principais funcionalidades da aplicação. Inicialmente, o sistema precisa permitir que o usuário crie e gerencie sua própria conta, crie e organize seus treinos, adicione e altere os exercícios de cada dia e registre seu consumo de água. Os dados serão associados ao usuário autenticado, de forma que cada usuário tenha acesso somente aos seus próprios treinos e informações.

## 5. Você está usando algum framework para escrever os endpoints da sua API?

Sim. Será utilizado o framework Express.js para desenvolver os endpoints da API.
