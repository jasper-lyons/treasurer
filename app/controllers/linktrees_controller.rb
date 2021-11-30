class LinktreesController < ActionController::Base
  before_action :set_linktree, only: [:show, :edit, :update, :destroy]

  # GET /linktrees
  def index
    @linktrees = Linktree.all
  end

  # GET /linktrees/1
  def show
  end

  # GET /linktrees/new
  def new
    @linktree = Linktree.new
  end

  # GET /linktrees/1/edit
  def edit
  end

  # POST /linktrees
  def create
    @linktree = Linktree.new(linktree_params)

    if @linktree.save
      redirect_to @linktree, notice: 'Linktree was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /linktrees/1
  def update
    if @linktree.update(linktree_params)
      redirect_to @linktree, notice: 'Linktree was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /linktrees/1
  def destroy
    @linktree.destroy
    redirect_to linktrees_url, notice: 'Linktree was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_linktree
      @linktree = Linktree.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def linktree_params
      params.fetch(:linktree, {})
    end
end
