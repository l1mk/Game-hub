class GamesController < ApplicationController
    def index
        games = Game.all 
        render json: games, include: [:record]
    end
    def show
        game = Game.find(params[:id])
        render json: game, include: [:record]
    end
    def create
        game = Game.new(params[:title])
        render json: game
    end
end
