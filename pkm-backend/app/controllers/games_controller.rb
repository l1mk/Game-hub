class GamesController < ApplicationController
    def index
        games = Game.all 
        render json: games, include: [:records]
    end
    def show
        game = Game.find(params[:id])
        render json: game, include: [:records]
    end
    def create
        games = Game.all
        if games.exists?(title: params[:title])
        game = games.find_by(title: params[:title])
        render json: game
        else 
        game = Game.create(title: params[:title])
        render json: game
        end
    end
end
