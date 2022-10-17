<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWorkflowRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, mixed>
	 */
	public function rules()
	{
		return [
			'title' => 'required|string',
			'id' => 'required|int',
			'default' => 'required|boolean',
			'type' => 'required|in:daily,custom,once',
			'tasks' => 'nullable|array',
			'tasks.*.title' => 'required|string',
			'tasks.*.description' => 'nullable|string',
			'tasks.*.id' => 'nullable|int',
		];
	}
}
