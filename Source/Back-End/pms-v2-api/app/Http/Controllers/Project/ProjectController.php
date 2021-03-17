<?php

namespace App\Http\Controllers\Project;

use App\Helper\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Project;
use Config;
use DB;
use Exception;
use Illuminate\Http\Request;
use Storage;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $RowsPerPage = (int)$request->input('RowsPerPage');
        $PageNumber = (int)$request->input('PageNumber') < 1 ? 1 : (int)$request->input('PageNumber');
        $Status = (string)$request->input('Status');


        try {

            $projects = Project::where('id', '!=', 0);

            if($Status !== 'All') {
                $projects = $projects->where('status', '=', $Status);
            }

            //return $projects->get();

            $TotalRows = $projects->count();
            $TotalPages = ceil((int)$TotalRows / $RowsPerPage);
            $Offset = ((int)$PageNumber - 1) * $RowsPerPage;
            $PrevPage = (int)$PageNumber > 1 ? ((int)$PageNumber - 1) : 0;
            $NextPage = (int)$PageNumber < $TotalPages ? ((int)$PageNumber + 1) : 0;
            $LastPage = (int)$PageNumber == $TotalPages ? 0 : $TotalPages;

            $projects = $projects->skip($Offset)->take($RowsPerPage)->get();

            return CommonHelper::Response(true, 'Project list fetched successfully!', null, [
                'TotalRows' => $TotalRows,
                'TotalPages' => $TotalPages,
                'PrevPage' => $PrevPage,
                'NextPage' => $NextPage,
                'LastPage' => $LastPage,
                'ListData' => $projects,
            ]);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ProjectController', 'index', 'ERR_UNKNOWN');
        }

    }

    public function getProjects() {
        try {
            $project = Project::all();
            return CommonHelper::Response(true, 'Projects fetched successfully!', null, $project);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ProjectController', 'getProjects', null);
        }
    }

    public function getProjectDetails($id) {
        try {
            $project = Project::where('id', '=', $id)->with('pd', 'po')
                ->with(['contractors' => function($query) {
                    $query->distinct('id');
                }])->first();
            return CommonHelper::Response(true, 'Projects fetched successfully!', null, $project);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ProjectController', 'getProjects', null);
        }
    }

    public function show($id)
    {
        try {
            $project = Project::where('id', '=', $id)->first();

            if($project) {
                return CommonHelper::Response(true, 'Project fetched successfully!', null, $project);
            }

            return CommonHelper::Response(false, 'Project not found!', null, null, 404);
        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ProjectController', 'show');
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            if (!$request->project_id) {
                $project = new Project();
                $msg = "Saved successfully!";
            } else {
                $project = Project::find($request->project_id);
                $msg = "Updated successfully!";
            }

            $project->name = $request->name;
            $project->description = $request->history;
            $project->executing_agency = $request->executing_agency;
            $project->location = $request->location;
            $project->type = $request->type;
            $project->length = $request->length;
            $project->main_components = $request->main_components;
            $project->start_date = $request->start_date;
            $project->end_date = $request->end_date;
            $project->estimated_cost = $request->estimated_cost;
            $project->duration = $request->duration;
            $project->rdpp = $request->rdpp;
            $project->rdpp_2 = $request->rdpp_2;
            $project->mou = $request->mou;
            $project->sponsor_ministry = $request->sponsor_ministry;
            $project->source_of_found = $request->source_of_found;
            $project->status = $request->status;
            $project->po_id = $request->po_id;
            $project->pd_id = $request->pd_id;
            $project->created_by = auth()->user()->id;

            if ($request->hasFile('attachment')) {
                $attachment = $request->file('attachment');
                $extension = (string)$attachment->extension();

                $continue = false;
                foreach (Config::get('fileextensions.ACCEPTED_FILE_EXTENSIONS') as $afe) {
                    if ($extension == $afe) {
                        $continue = true;
                    }
                }

                if (!$continue) {
                    return response()->json([
                        'success' => false,
                        'error_code' => 'UNSUPPORTED_FORMAT',
                        'message' => 'Please select a valid file!',
                    ]);
                }

                $name = time() . '.' . $attachment->getClientOriginalName();
                $filePath = Config::get('uploadconfig.PROJECT_ATTACHMENT') .'_'. $name;
                Storage::disk('s3')->put($filePath, file_get_contents($attachment));
                $project->attachment = $filePath;
            }

            if ($request->hasFile('project_area_map')) {
                $project_area_map = $request->file('project_area_map');
                $extension = (string)$project_area_map->extension();

                $continue = false;
                foreach (Config::get('fileextensions.ACCEPTED_FILE_EXTENSIONS') as $afe) {
                    if ($extension == $afe) {
                        $continue = true;
                    }
                }

                if (!$continue) {
                    return response()->json([
                        'success' => false,
                        'error_code' => 'UNSUPPORTED_FORMAT',
                        'message' => 'Please select a valid file!',
                    ]);
                }

                $name = time() . '.' . $project_area_map->getClientOriginalName();
                $filePath = Config::get('uploadconfig.PROJECT_ATTACHMENT') .'_'. $name;
                Storage::disk('s3')->put($filePath, file_get_contents($project_area_map));
                $project->project_area_map = $filePath;
            }

            $project->save();
            DB::commit();

            return CommonHelper::Response(true, $msg, null);
        } catch (Exception $e) {

            DB::rollback();
            return CommonHelper::throwError($e, 'ProjectController', 'store', 'ERR_UNKNOWN');
        }
    }

    public function destroy(Request $request)
    {
        $project_id = (int)$request->input('id');

        try {
            $Project = Project::where('id', $project_id);

            if ($Project->exists()) {
                $Project = $Project->first();
                $Project->deleted_by = auth()->user()->id;
                $Project->save();
                $Project->delete();
                return CommonHelper::Response(true, 'Project Deleted Successfully!');
            }

            return CommonHelper::Response(false, 'Project not found!', null, null, 404);

        } catch (Exception $e) {
            return CommonHelper::throwError($e, 'ProjectController', 'destroy');
        }
    }
}
