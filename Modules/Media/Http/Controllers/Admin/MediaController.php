<?php

namespace Modules\Media\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Modules\Media\Entities\Media;
use Intervention\Image\Facades\Image;
use Storage;
use Carbon\Carbon;

class MediaController extends Controller
{
    private $media_folder_name;
    private $media_thumb_folder_name;
    private $currentDate;

    public function __construct(Media $model)
    {
        $this->middleware('permission:media_view', ['only' => ['index', 'getDatatable']]);
        $this->middleware('permission:media_add', ['only' => ['create', 'store']]);
        $this->middleware('permission:media_edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:media_delete', ['only' => ['destroy']]);

        $this->moduleName = config('media.name');
        $this->moduleRoute = url(config('media.routePrefix') . '/media');
        $this->moduleView = "media";
        $this->model = $model;

        $this->media_folder_name = config('media.media_folder_name', 'media');
        $this->media_thumb_folder_name = config('media.media_thumb_folder_name', 'thumb');
        $this->currentDate = Carbon::now();

        View::share('module_name', $this->moduleName);
        View::share('module_route', $this->moduleRoute);
        View::share('module_view', $this->moduleView);
    }

    public function index(Request $request)
    {
        $data['html'] = $this->load_more($request);
        return view("media::admin.$this->moduleView.index", $data);
    }

    public function load_more(Request $request)
    {
        $media = $this->model::select('*');
        $count = $media->count();
        $photos = $media->latest('id')->paginate(25);
        $photos->map(function ($photo) {
            $media_folder_path = $this->media_folder_name."/".$photo->created_at->year."/".$photo->created_at->month;
            $photos_thumb_path = "$media_folder_path/$this->media_thumb_folder_name";


            $photo['img_url'] = config('app.url') . "/storage/$media_folder_path/" . $photo['filename'];
            $photo['img_thumb_url'] = config('app.url') . "/storage/$photos_thumb_path/" . $photo['filename'];
            return $photo;
        });

        $html = null;
        if (!$photos->isEmpty()) {
            foreach ($photos as $photo) {
                $html .= '<div class="file-box w-25"><div class="file"><div class="image">';

                $html .= '<img alt="Image not found" class="img-fluid" src="' . $photo->img_thumb_url . '" title="' . $photo->original_name . '" onerror="this.src=\'' . url('build//admin/images/default.jpg') . '\'">';

                $html .= '</div><div class="file-name">';

                $html .= '<span class="float-left">' . \Str::limit($photo->original_name, 10) . '</span>';

                $html .= '<div class="btn-group float-right">';

                $html .= '<button class="btn btn-success btn-xs" data-url="' . $photo->img_url . '" onclick="copyImgUrl(this)" title="Copy URL"><i class="fa fa-copy"></i></button>';

                $html .= '<button class="btn btn-info btn-xs" data-url="' . $photo->img_thumb_url . '" onclick="copyImgUrl(this)" title="Copy thumb URL"><i class="fa fa-copy"></i></button>';

                if (Auth::user()->can('media_delete')) {
                    $html .= '<button class="btn btn-danger btn-xs delete-media" data-id="' . $photo->id . '" title="Delete"><i class="fa fa-trash"></i></button>';
                }

                $html .= '</div><div class="clearfix"></div>';
                $html .= '</div></div></div>';
            }
            if ($count > 25) {
                $html .= '<a href="javascript:;" id="loadMore"><div class="file-box"><div class="file"><div class="icon"><i class="fa fa-plus-square"></i></div><div class="file-name text-center">Load more</div></div></div></a>';
            }
        }

        if ($request->ajax()) {
            $response['html'] = $html;
            $response['status'] = true;
            return response()->json($response);
        } else {
            return $html;
        }
    }

    public function store(Request $request)
    {
        $media_folder_path = $this->media_folder_name."/".$this->currentDate->year."/".$this->currentDate->month;
        $photos_thumb_path = "$media_folder_path/$this->media_thumb_folder_name";
        $uploadedImgs = [];

        $photos = $request->file('file');

        if (!is_array($photos)) {
            $photos = [$photos];
        }

        if (!Storage::disk('public')->exists($media_folder_path)) {
            Storage::disk('public')->makeDirectory($media_folder_path);
        }

        if (!Storage::disk('public')->exists($photos_thumb_path)) {
            Storage::disk('public')->makeDirectory($photos_thumb_path);
        }

        for ($i = 0; $i < count($photos); $i++) {
            $photo = $photos[$i];
            $name = sha1(date('YmdHis') . str_random(30));

            $extension = $photo->getClientOriginalExtension();
            if ($extension == '') {
                $extension = $photo->guessClientExtension();
            }
            $save_name = "$name.$extension";

            $resize_photo = Image::make($photo)
                ->resize(250, null, function ($constraints) {
                    $constraints->aspectRatio();
                });

            Storage::disk('public')->putFileAs($media_folder_path, $photo, $save_name);
            Storage::disk('public')->put($photos_thumb_path . '/' . $save_name, (string) $resize_photo->encode());

            $upload = new Media();
            $upload->filename = $save_name;
            $upload->resized_name = '';
            $upload->original_name = basename($photo->getClientOriginalName());
            $upload->save();


            $upload->img_url = "/storage/$media_folder_path/" . $save_name;
            $upload->img_thumb_url = "/storage/$photos_thumb_path/" . $save_name;
            array_push($uploadedImgs, $upload);
        }

        if ($request->ajax()) {
            return response()->json([
                'data' => $uploadedImgs
            ]);
        }

        return redirect()->back()->with('success', 'Media added successfully');
    }

    public function destroy($id)
    {
        $media = $this->model::where('id', $id)->first();
        if ($media) {
            $media_folder_path = $this->media_folder_name."/".$media->created_at->year."/".$media->created_at->month;
            $photos_thumb_path = "$media_folder_path/$this->media_thumb_folder_name";

            $deleteFiles = [
                $media_folder_path . '/' . $media->filename,
                $photos_thumb_path . '/' . $media->filename,
            ];
            Storage::disk('public')->delete($deleteFiles);
            $media->delete();
            $response['status'] = true;
            $response['message'] = 'Media deleted successfully';
        } else {
            $response['status'] = false;
            $response['message'] = 'Media not found';
        }
        return response()->json($response);
    }
}
