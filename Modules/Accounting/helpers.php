<?php

if (!function_exists('invert_amount')) {
    /**
     * Invert amount
     *
     * @param number $amount
     */
    function invert_amount($amount)
    {
        return ($amount * -1);
    }
}
