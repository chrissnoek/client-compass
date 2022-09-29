<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tasks', function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table->string('title');
			// add a column with relation to id in tenants
			$table->foreignId('workflow_id')->nullable()->constrained('workflows');
			// add a column with relation to id in tenants
			$table->foreignId('tenant_id')->nullable()->constrained('tenants');


			$table->index('workflow_id');
			$table->index('tenant_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('tasks');
	}
};
