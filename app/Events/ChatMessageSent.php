<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ChatMessageSent implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    public $message;
    public $username;

    public function __construct($username, $message)
    {
        $this->username = $username;
        $this->message = $message;

        Log::info('📢 Message envoyé via WebSocket', [
            'username' => $this->username,
            'message' => $this->message
        ]);
    }

    public function broadcastOn()
    {
        Log::info('📡 Diffusion WebSocket sur le canal "chat"', [
            'username' => $this->username,
            'message' => $this->message
        ]);

        return new Channel('chat');
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}
