<div class="row border-bottom">
	<nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
		<div class="navbar-header">
			<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="javascript:;"><i
					class="fa fa-bars"></i> </a>
		</div>
		<ul class="nav navbar-top-links navbar-right">
			<li>
				<a href="{{ route('admin::logout') }}" onclick="event.preventDefault();$('#logout-form').submit();">
					<i class="fa fa-sign-out"></i> {{ __('Logout') }}
				</a>
			</li>
		</ul>
	</nav>
</div>