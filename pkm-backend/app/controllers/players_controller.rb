class PlayersController < ApplicationController
    def index
        players = Player.all 
        render json: players, include: [:records]
    end
    def show
        player = Player.find(params[:id])
        render json: player, include: [:records]
    end
    def create
        player = Player.new(name: params[:name], password: params[:password])
        render json: player
    end
    def destroy
        player = Player.find(params[:id])
        player.destroy
        render json: player
    end
end
