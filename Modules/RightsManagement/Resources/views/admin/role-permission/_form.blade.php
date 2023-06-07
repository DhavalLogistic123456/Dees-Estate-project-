<div class="form-group mb-3 d-flex justify-content-between">
    <label class="pt-2">Role Name</label>
    <div class="flex-grow-1 ml-1"><span class="form-control">{{ $result->display_name }}</span></div>
    <div class="">
        <button type="button" class="btn btn-warning pull-right ml-1" id="btn-unSelectAll">Unselect All</button>
        <button type="button" class="btn btn-primary pull-right ml-1" id="btn-selectAll">Select All</button>
    </div>
</div>

@foreach ($permissions as $key => $role)
<div class="form-group mb-3">
    <div class="alert alert-info" style="margin-top:20px" role="alert">
        <input type="checkbox" class="i-checks select_module chk-header parent-{{$key}}" data-chk="{{ $key }}" name="">
        <h4 class="ml-2" style="display:inline-block">{{ strtoupper($key) }}</h4>
    </div>

    <div class="d-flex justify-content-around flex-wrap">
        @foreach ($role as $permission)
        <div class="mt-4 w-25 text-center">
            <input type="checkbox" class="i-checks chk-activePermissions {{ $key }}-permission data-{{ $key }}"
                name="permission[]" data-role="{{ $key }}"" value=" {{ $permission->id }}"
                {{ ($result['permissions']->contains('id', $permission->id)) ? "checked" : "" }}>
            <label class="ml-2">{{ $permission->display_name}} </label>
            <div class="help-block">({{ $permission->description}})</div>
        </div>
        @endforeach
    </div>
</div>
@endforeach

<hr>

@push("scripts")
<script type="module">
    $(document).ready(() => {
            //SELECT All
            $(document).on("click", "#btn-selectAll", function(event) {
                $(".chk-activePermissions").iCheck("check");
                $(".select_module").iCheck("check");
            });

            //Unselect All
            $(document).on("click", "#btn-unSelectAll", function(event) {
                $(".chk-activePermissions").iCheck("uncheck");
                $(".select_module").iCheck("uncheck");
            });

            //toogle checkbox for module
            $(".select_module").on("ifToggled", function(event) {
                var role = $(this).data("chk");

                if ($(this).is(":checked")) {
                    $(`.${role}-permission`).iCheck("check");
                } else {
                    $(`.${role}-permission`).iCheck("uncheck");
                }
            });

            $(".select_module").each(function(index) {
                selectCheckboxes($(this).data("chk"));
            });

            function selectCheckboxes(role) {
                let allckedbox = $(`.data-${role}`).length;
                let checkedbox = $(`.data-${role}:checked`).length;

                if (allckedbox == checkedbox) $(".parent-" + role).iCheck("check");
            }
        });
</script>
@endpush
