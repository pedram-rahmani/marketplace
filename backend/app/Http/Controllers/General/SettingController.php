<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Models\General\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    /**
     * نمایش تنظیمات
     */
    public function index()
    {
        $settings = Setting::pluck('value', 'key')->toArray();

        if (isset($settings['site_logo']) && $settings['site_logo']) {
            $settings['site_logo'] = asset('storage/' . $settings['site_logo']);
        }

        foreach (['social_links', 'contact_info', 'footer_links'] as $key) {
            if (isset($settings[$key])) {
                $decoded = json_decode($settings[$key], true);
                $settings[$key] = is_array($decoded) ? $decoded : [];
            }
        }

        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $allowedKeys = [
            'site_name',
            'site_logo',
            'footer_text',
            'social_links',
            'contact_info',
            'footer_links',
            'trust_badges'
        ];

        $request->validate([
            'site_name'    => 'nullable|string|max:255',
            'site_logo'    => 'nullable|image|max:2048',
            'footer_text'  => 'nullable|string',
            'social_links' => 'nullable',
            'contact_info' => 'nullable',
            'footer_links' => 'nullable',
            'trust_badges' => 'nullable|string',
        ]);

        foreach ($request->only($allowedKeys) as $key => $value) {

            if ($value === 'null' || $value === 'undefined') {
                $value = null;
            }

            if ($key === 'site_logo') {
                if ($request->hasFile('site_logo')) {
                    $file = $request->file('site_logo');
                    $oldLogo = Setting::where('key', 'site_logo')->value('value');
                    if ($oldLogo) {
                        Storage::disk('public')->delete($oldLogo);
                    }
                    $value = $file->store('settings', 'public');
                } else {
                    continue;
                }
            }

            $isJsonField = in_array($key, ['social_links', 'contact_info', 'footer_links']);
            if ($isJsonField) {
                if (!is_array($value)) {
                    $value = json_decode($value, true);
                }
                $value = json_encode($value ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            }

            if ($isJsonField || $value !== null) {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
        }

        return response()->json([
            'message' => 'تنظیمات سایت با موفقیت به‌روزرسانی شدند.'
        ]);
    }
}
