<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkflowRequest extends FormRequest
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
			'default' => 'required|boolean',
			'type' => 'required|in:daily,custom,once',
			'tasks' => 'required|array',
			'tasks.*.title' => 'required|string',
			'tasks.*.description' => 'nullable|string',
		];
	}
}
