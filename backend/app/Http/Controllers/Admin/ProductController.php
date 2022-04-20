<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Product;
use App\Jobs\UploadImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $this->authorize('create', Product::class);
        
        // validate the request
        $this->validate($request, [
            'name' => 'required',
            'image' => 'required', 'mimes:jpeg,gif,bmp,png', 'max:2048',
            'price' => 'required'
        ]);

        if($request->has("image")){
            $filename = $request->file('image')->store('upload');
        }
        // create the database record for the product
        $product = Product::create([
            'name' => $request->name,
            'image' => $filename,
            'description' => $request->description,
            'brand' => $request->brand,
            'category' => $request->category,
            'price' => $request->price,
            'countInStock' => $request->countInStock,
            'rating' => $request->rating,
            'numReviews' => $request->numReviews,
            // 'disk' => config('site.upload_disk'),
            'created_by' => auth()->id(),
        ]);

        // dispatch a job to handle the image manipulation
        // $this->dispatch(new UploadImage($product));
        
        // return response()->json($product, 200);
        return new ProductResource($product);

    }

    public function show($id) {
        $product = Product::find($id);

        return $product;
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $this->authorize('update', $product);
        
        $this->validate($request, [
            'name' => 'required',
            'image' => 'required', 'mimes:jpeg,gif,bmp,png', 'max:2048',
            'price' => 'required'
        ]);

        // get the image
        $image = $request->file('image');
        $image_path = $image->getPathName();

        // get the original file name and replace any spaces with _
        // Business phone.png = /images/business_phone.png
        $filename = "/images"."/". preg_replace('/\s+/', '_', strtolower($image->getClientOriginalName()));
        
        // move the image to the temporary location (tmp)
        $tmp = $image->storeAs('uploads/original', $filename, 'tmp');

        $design = $product->update([
            'name' => $request->name,
            'image' => $filename,
            'description' => $request->description,
            'brand' => $request->brand,
            'category' => $request->category,
            'price' => $request->price,
            'countInStock' => $request->countInStock,
            'rating' => $request->rating,
            'numReviews' => $request->numReviews,
        ]);

        // dispatch a job to handle the image manipulation
        $this->dispatch(new UploadImage($product));

        return response()->json([
            "Message" => "Product has been updated!"
        ], 200); 
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // $this->authorize('delete', $product);

        // delete the files associated to the record
        foreach(['thumbnail', 'large', 'original'] as $size){
            // check if the file exists in the database
            if(Storage::disk($product->disk)->exists("uploads/products/{$size}/".$product->image)){
                Storage::disk($product->disk)->delete("uploads/products/{$size}/".$product->image);
            }
        }
        
        $product->delete();
        
        return response()->json(['message' => 'Record deleted'], 200);
    }
}