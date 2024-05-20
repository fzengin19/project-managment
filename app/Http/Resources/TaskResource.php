<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'priority' => $this->priority,
            'image_path' => $this->image_path,
            'due_date' => Carbon::parse($this->due_date)->format('Y-m-d'),
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d'),
            'project' => new ProjectResource($this->project),
            'assignedUser' => $this->assignedUser ?  new UserResource($this->assignedUser) : null,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy'=> new UserResource($this->updatedBy)
        ];
    }
}
