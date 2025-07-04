<?php

namespace App\Repositories;

use App\Utils\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

abstract class BaseRepository
{
	protected $model;

	public function __construct(Model $model)
	{
		$this->model = $model;
	}

	public function model()
	{
		return $this->model;
	}

	public function get()
	{
		return $this->model->get();
	}

	public function first()
	{
		return $this->model->first();
	}

	public function find($uuid)
	{
		return $this->model->find($uuid);
	}

	public function create(array $data)
	{
		return $this->model->create($data);
	}

	public function update($uuid, array $data)
	{
		$record = $this->model->find($uuid);
		$record->update($data);

		return $record->fresh();
	}

	public function delete($uuid)
	{
		return $this->model->destroy($uuid);
	}

	public function get_class_name()
	{
		return get_class($this->model);
	}

	public function paginate(int $perPage)
	{
		return $this->model->paginate($perPage);
	}

	public function checkIsExists(int | array $uuid): bool
	{
		$isExists = false;

		if (is_array($uuid)) {
			foreach ($uuid as $modelUuid) {
				$model = $this->model->find($modelUuid);
				if ($model) $isExists = true;
			}

			return $isExists;
		}

		return boolval($this->model->find($uuid));
	}

	protected function format(array $data): array
	{
		$saveCopy = [];

		foreach ($data as $key => $value) {
			$saveCopy[Str::snake($key)] = $value;
		}

		return $saveCopy;
	}

	public function __call($method, $arguments)
	{
		if (method_exists($this->model, $method)) {
			return $this->model->$method(...$arguments);
		}

		// atau lempar ke builder
		return $this->model->$method(...$arguments);
	}
}
