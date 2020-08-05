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
        record = Record.new(score: params[:score], player: params[:player], game: params[:game])
        render json: record
    end   
    def update
        record = Record.find(params[:id])
        record.update(score: params[:score])
        render json: record
    end
end
