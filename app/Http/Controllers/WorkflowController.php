<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorkflowRequest;
use App\Http\Requests\UpdateWorkflowRequest;
use App\Http\Resources\WorkflowResource;
use App\Models\Task;
use App\Models\Workflow;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WorkflowController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \App\Http\Requests\StoreWorkflowRequest  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(StoreWorkflowRequest $request)
	{
		$validated = $request->safe();

		$user = Auth::user();

		$workflow = new Workflow;
		$workflow->title = $validated['title'];
		$workflow->default = $validated['default'];
		$workflow->type = $validated['type'];
		$workflow->tenant_id = $user->tenant_id;

		foreach ($validated['items'] as $key => $value) {
			$task = new Task;

			DB::transaction(function () use ($workflow, $task, $value, $user) {
				$workflow->save();
				$task->title = $value['title'];
				$task->description = $value['description'];
				$task->workflow_id = $workflow->id;
				$task->tenant_id = $user->tenant_id;

				$task->save();
			});
		}

		return new WorkflowResource($workflow);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Workflow  $workflow
	 * @return \Illuminate\Http\Response
	 */
	public function show(Workflow $workflow)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \App\Http\Requests\UpdateWorkflowRequest  $request
	 * @param  \App\Models\Workflow  $workflow
	 * @return \Illuminate\Http\Response
	 */
	public function update(UpdateWorkflowRequest $request, Workflow $workflow)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Workflow  $workflow
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Workflow $workflow)
	{
		//
	}
}
