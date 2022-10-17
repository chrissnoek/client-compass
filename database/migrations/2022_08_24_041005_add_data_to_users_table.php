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
		Schema::table('users', function (Blueprint $table) {
			$table->string('profile_picture')->default('user.png');

			// add a column with relation to id in tenants
			$table->foreignId('tenant_id')->nullable()->constrained('tenants');


			$table->string('type')->default('admin');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('users', function (Blueprint $table) {
			$table->dropForeign(['tenant_id']);
			$table->dropColumn('profile_picture');
			$table->dropColumn('type');
		});
	}
};
