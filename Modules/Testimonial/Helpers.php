<?php
namespace Modules\Testimonial;

use \Session;

/**
 * Class Helpers
 * @package Modules\LiTestimonial
 */
class Helpers
{
    /**
     * What key to use for the session::flash / pull / has
     */
    const FLASH_MESSAGE_SESSION_KEY = "TESTIMONIAL_FLASH";

    /**
     * Set a new message
     *
     * @param string $message
     */
    public static function flash_message(string $message)
    {
        Session::flash(Helpers::FLASH_MESSAGE_SESSION_KEY, $message);
    }

    /**
     * Is there a flashed message?
     *
     * @return bool
     */
    public static function has_flashed_message()
    {
        return Session::has(self::FLASH_MESSAGE_SESSION_KEY);
    }

    /**
     * return the flashed message. Use with ::has_flashed_message() if you need to check if it has a value...
     * @return string
     */
    public static function pull_flashed_message()
    {
        return Session::pull(self::FLASH_MESSAGE_SESSION_KEY);
    }
}
