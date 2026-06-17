<?php

namespace App\Providers;

use App\Permissions\PermissionList;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define(PermissionList::PROMOTE_TO_COADMIN, function ($user) {
            return $user->role === 'admin'; // or more complex logic
        });

        Gate::define(PermissionList::DEMOTE_TO_USER, function ($user) {
            return $user->role === 'admin';
        });

        Gate::define(PermissionList::MANAGE_COMMENTS, function ($user) {
            return in_array($user->role, ['admin', 'coadmin']);
        });

        Gate::define(PermissionList::VOTE_ON_COMMENT, function ($user) {
            return $user->role === 'user'; // or all authenticated users
        });

    }
}
