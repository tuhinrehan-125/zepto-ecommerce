<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request) {
        // $products = Product::all();

        if( $request->has("keyword")){
            $terms = $request->input('keyword');
            $products = Product::where('name', 'like', '%' . $terms . '%')->get();
            // return $products;
            return ProductCollection::collection($products);

        }
        else {
            $products = Product::all();
            return ProductCollection::collection($products);
        }
    }

    public function show($id) {
        $product = Product::find($id);

        return $product;
    }
}