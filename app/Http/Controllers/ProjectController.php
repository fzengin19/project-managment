<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        if (request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        if (request('sort_field') && request('sort_direction')) {
            $query->orderBy(request('sort_field'), request('sort_direction'));
        }

        $projects = $query->paginate(10)->onEachSide(1);

        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('project/'.Str::random(), 'public');
        }
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $project = Project::create($data);

        return to_route('project.index')->with('success', 'Project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);
        if (request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->paginate(10)->onEachSide(1);

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {

        if ($project) {
            $project->fill($request->validated());

            if ($request->hasFile('image')) {
                $project->image_path = $request->file('image')->store('project/'.Str::random(), 'public');
            }

            $project->updated_by = Auth::id();

            $project->save();
        }

        return to_route('project.index')->with('success', 'Project was updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        $project->delete();

        return to_route('project.index')->with('success', "Project '{$name}' was deleted.");
    }
}
