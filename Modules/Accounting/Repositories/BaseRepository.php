<?php

namespace Modules\Accounting\Repositories;

use Illuminate\Http\Request;

abstract class BaseRepository
{
    /**
     * The Model instance.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;
    protected $category_array = array();

    public function getModel()
    {
        return $this->model;
    }

    /**
     * Get Model by id.
     *
     * @param  int  $id
     * @return \App\Models\Model
     */
    //abstract protected function getById($id);
    public function getById($id)
    {
        return $this->model->find($id);
    }

    //abstract public function saveData(array $attributes);
    abstract public function store(array $inputs);
    abstract public function update(array $inputs, $id);

    /**
     * Destroy a model.
     *
     * @param  int $id
     * @return void
     */
    //abstract protected function delete($id);
    public function delete($id)
    {
        return $this->getById($id)->delete();
    }
}
