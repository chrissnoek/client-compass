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
		Schema::create('workflows', function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table->string('title');
			$table->boolean('default')->default(0);
			$table->enum('type', ['daily', 'custom'])->default('daily');
			// add a column with relation to id in tenants
			$table->foreignId('tenant_id')->nullable()->constrained('tenants');


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
		Schema::dropIfExists('workflows');
	}
};
