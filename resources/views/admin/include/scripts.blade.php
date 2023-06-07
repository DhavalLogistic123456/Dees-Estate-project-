<script type="module">
    window.paceOptions = {
        ajax: {
            trackMethods: ['GET', 'POST', 'PUT', 'DELETE', 'REMOVE']
        }
    };
</script>
@vite('resources/assets/admin/js/app.js')
@vite("resources/assets/admin/vendor/pace/pace.min.js") 
{{-- @vite("resources/assets/admin/vendor/metisMenu/jquery.metisMenu.js")
@vite("resources/assets/admin/vendor/pace/pace.min.js") --}}
 {{-- @vite("resources/assets/admin/vendor/iCheck/js/icheck.min.js") --}}
@vite("resources/assets/admin/vendor/validation/jquery.form-validator.min.js")
{{-- @vite("resources/assets/admin/vendor/jeditable/jquery.jeditable.min.js")
@vite("resources/assets/admin/vendor/ionRangeSlider/ion.rangeSlider.min.js")
@vite("resources/assets/admin/vendor/select2/select2.full.min.js") --}}
@vite("resources/assets/admin/js/common.js")  

<script type="module">
    console.log("Enter in script blade file");
    $(document).ready(function() {

        // Common script
        // ---------------------------------------------------------------------

        @if (session()->has('success'))
            toastr.success("{{ session()->get('success') }}");
        @endif
        @if (session()->has('error'))
            toastr.error("{{ session()->get('error') }}");
        @endif
        @if (session()->has('warning'))
            toastr.warning("{{ session()->get('warning') }}");
        @endif

         $('.select2').select2({
            placeholder: "Select",
            width: '100%'
         });

        $.validate({
            errorElementClass: 'is-invalid'
        });

        /* $(".input-mask").inputmask({
        	mask:"(999) 999-9999"
        }); */

       
    });

    $(document).on("change", ".change-list", function() {
        var url = $(this).data('url');
        var change = $(this).data('change');
        reset_dropdown(change);
        if ($(this).val()) {
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    id: $(this).val()
                },
                success: function(response) {
                    if (response.status) {
                        if (typeof response.data !== "undefined") {
                            $.each(response.data, function(id, value) {
                                $('.' + change).append('<option value="' + id + '">' +
                                    value + '</option>');
                            });
                        }
                    }
                },
                error: function(error) {
                    toastr.error(error.message);
                }
            });
        }
    });

  

    $(document).on('change', ".custom-file-input", function() {
        if (this.files && this.files[0]) {
            let fileName = $(this).val().split('\\').pop();
            $(this).next('.custom-file-label').addClass("selected").html(fileName);
        }
    });
</script>
<script>
 var deleteRecordByAjax = (url, moduleName, dTable) => {
            swal({
                title: "Are you sure?",
                text: `You will not be able to recover this ${moduleName}!`,
                icon: "warning",
                buttons: [true, "Yes, delete it!"],
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    axios.delete(url).then((response) => {
                        if (response.data.status) {
                            dTable.draw();
                            if (response.data.type === 'warning') {
                                toastr.warning(response.data.message);
                            } else {
                                toastr.success(response.data.message);
                            }
                        } else {
                            toastr.error(response.data.message);
                        }
                    }).catch((error) => {
                        let data = error.response.data
                        toastr.error(data.message);
                    });
                }
            })
        }
        function reset_dropdown($class_name) {
        if ($class_name) {
            if ($("select." + $class_name).length) {
                $('select.' + $class_name).find("optgroup").remove();
                $('select.' + $class_name).find("option[value!='']").remove();
                // $("select." + $class_name).select2("val", "");
                $("select." + $class_name).val("");
                var change = $('select.' + $class_name).data('change');
                if (typeof change != "undefined") {
                    reset_dropdown(change);
                } else {
                    return true;
                }
            }
        }
    }
</script>