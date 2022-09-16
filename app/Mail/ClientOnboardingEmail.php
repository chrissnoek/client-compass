<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ClientOnboardingEmail extends Mailable
{
	use Queueable, SerializesModels;

	protected $token;
	protected $user;

	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct($token, $user)
	{
		$this->token = $token;
		$this->user = $user;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->view('mails.adminwelcomeemail')->with([
			'token' => $this->token,
			'user' => $this->user,
		]);;
	}
}
