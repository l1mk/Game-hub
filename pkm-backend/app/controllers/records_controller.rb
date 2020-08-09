class RecordsController < ApplicationController
    def index
        records = Record.all 
        render json: records, include: [:player, :game]
    end
    def show
        record = Record.find(params[:id])
        render json: record, include: [:player, :game]
    end
    def create
        record = Record.create(score: params[:score], player_id: params[:player_id], game_id: params[:game_id])
        render json: record
    end   
    def update
        record = Record.find(params[:id])
        record.update(score: params[:score])
        render json: record
    end
end
