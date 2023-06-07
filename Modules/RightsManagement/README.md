## Rights management

1. Copy `RightsManagement` folder and paste in `Modules` folder.
2. Check the module enabled or not using `php artisan module:list` command.
3. Enable the module using `php artisan module:enable RightsManagement` command.
4. Migration using `php artisan module:migrate RightsManagement` command.
5. Seed using `php artisan module:seed RightsManagement` command.
6. For frontend `http:/localhost:8000/rightsmanagement/roles`.
7. For backend `http:/localhost:8000/admins/rightsmanagement/roles`.

# In Your Admin Model

please add `use HasRoles;` to your model

```
use Spatie\Permission\Traits\HasRoles;
class Admin extends Authenticatable
{
    use HasRoles;
```

# To seed DB with super_admin user

`php artisan db:seed --class="Modules\RightsManagement\Database\Seeders\RightsManagementDatabaseSeeder"`

# Add Following code to your layout file

Please copy paste this to your layout file so view can load properly, (jQuery is also required)

```
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.20/datatables.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/iCheck/1.0.2/skins/all.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" />
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.20/datatables.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/iCheck/1.0.2/icheck.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>


    @push('scripts')
    @show
    @push('styles')
    @show

	<script>
		$(document).ready(() => {
			toastr.options = {
				closeButton: true,
				progressBar: true,
				showMethod: 'slideDown',
				timeOut: 4000
			};

			// setTimeout(function() {
			// 	toastr.success('Responsive Admin Theme', 'Welcome to INSPINIA');
			// }, 1300);

			$('.i-checks').iCheck({
				checkboxClass: 'icheckbox_square-green',
				radioClass: 'iradio_square-green',
			});
		});

		deleteRecordByAjax = (url, moduleName, dTable) => {
			swal({
				title: "Are you sure?",
				text: `You will not be able to recover this ${moduleName}!`,
				icon: "warning",
				buttons: [true, "Yes, delete it!"],
				dangerMode: true,
			}).then((willDelete) => {
					if (willDelete) {
						axios.delete(url).then((response) => {
							dTable.draw();
							let data = response.data
							toastr.success(data.message);
						}).catch((error) => {
							let data = error.response.data
							toastr.error(data.message);
						});
					}
			})
		}
	</script>
```

## Auth user variable and ViewServiceProvider

1. Create a composer with `GlobalComposer` name and put the line `\$view->with('authUser', \Auth::user());`.
2. Create a provide with `ViewServiceProvider` name and put the line `view()->composer('\*', 'App\Http\ViewComposers\GlobalComposer');` in boot().
3. Add `Illuminate\View\ViewServiceProvider::class` and `App\Providers\ViewServiceProvider::class,` of service providers in app.php
