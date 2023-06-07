<?php

namespace Modules\ContactUs\Observers;

use Modules\ContactUs\Entities\ContactUs;
use Modules\ContactUs\Emails\ContactUsMail;
use Mail;

class ContactUsObserver {
    /**
     * Handle the ContactUs "created" event.
     *
     * @param \App\Models\ContactUs $contactUs
     *
     * @return void
     */
    public function created(ContactUs $contactUs) {
        $adminEmail = config('contactus.adminEmail');
        Mail::to($adminEmail)->queue(new ContactUsMail($contactUs));
    }

    /**
     * Handle the ContactUs "updated" event.
     *
     * @param \App\Models\ContactUs $contactUs
     *
     * @return void
     */
    public function updated(ContactUs $contactUs) {
    }

    /**
     * Handle the ContactUs "deleted" event.
     *
     * @param \App\Models\ContactUs $contactUs
     *
     * @return void
     */
    public function deleted(ContactUs $contactUs) {
    }

    /**
     * Handle the ContactUs "restored" event.
     *
     * @param \App\Models\ContactUs $contactUs
     *
     * @return void
     */
    public function restored(ContactUs $contactUs) {
    }

    /**
     * Handle the ContactUs "force deleted" event.
     *
     * @param \App\Models\ContactUs $contactUs
     *
     * @return void
     */
    public function forceDeleted(ContactUs $contactUs) {
    }
}
