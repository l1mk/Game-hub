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
        players = Player.all
        if players.find_by(name: params[:name]) == true
        player = players.find_by(name: params[:name])
        render json: player
        else 
        player = Player.create(name: params[:name])
        render json: player
        end
    end
    def destroy
        player = Player.find(params[:id])
        player.destroy
        render json: player
    end
end
