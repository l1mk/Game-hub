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
        game = Game.new(params[:title])
        render json: game
    end
end
