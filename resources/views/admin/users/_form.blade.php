<div class="row">
	<div class="col-md-6">
		<div class="form-group mb-3">
			<label>Name</label>
			<input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name"
				data-validation="required" value="{{ isset($result) ? $result['name'] : old('name') }}">
			@error('name')
			<span class="invalid-feedback" role="alert">
				<strong>{{ $message }}</strong>
			</span>
			@enderror
		</div>
	</div>
	<div class="col-md-6">
		<div class="form-group mb-3">
			<label>Email</label>
			<input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
				data-validation="required email" value="{{ isset($result) ? $result['email'] : old('email') }}">
			@error('email')
			<span class="invalid-feedback" role="alert">
				<strong>{{ $message }}</strong>
			</span>
			@enderror
		</div>
	</div>
	@if(!isset($result))
	<div class="col-md-6">
		<div class="form-group mb-3">
			<label>Password</label>
			<input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
				name="password" data-validation="required">
			@error('password')
			<span class="invalid-feedback" role="alert">
				<strong>{{ $message }}</strong>
			</span>
			@enderror
		</div>
	</div>
	<div class="col-md-6">
		<div class="form-group mb-3">
			<label>Confirm password</label>
			<input id="password-confirm" type="password" class="form-control" name="password_confirmation"
				data-validation="required">
		</div>
	</div>
	@endif
</div>