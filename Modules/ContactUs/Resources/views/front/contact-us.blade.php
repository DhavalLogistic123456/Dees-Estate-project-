@extends(config('contactus.front_defaultLayout'))
@section('content')
    <section style="padding-top: 60px;">
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="card">
                        <div class="card-header">
                            Contact Us
                        </div>
                        <div class="card-body">
                            @if (Session::has('message_sent'))
                                <div class="alert alert-success" role="alert">
                                    {{ Session::get('message_sent') }}
                                </div>
                            @endif
                            <form class='form-horizontal' method="POST"
                                action="{{ route(config('contactus.frontRoute') . '.store') }}"
                                enctype="multipart/form-data">
                                @csrf
                                <div class="mb-3">
                                    <label for="name">Name</label>
                                    <input type="text" name="name" class="form-control form-control-lg"
                                        placeholder="Name" value="{{ old('name') ? old('name') : '' }}">
                                    @error('name')
                                        <div class="text-danger"><small>{{ $message }}</small></div>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="email">Email</label>
                                    <input type="email" name="email" class="form-control form-control-lg"
                                        placeholder="Email address" value="{{ old('email') ? old('email') : '' }}">
                                    @error('email')
                                        <div class="text-danger"><small>{{ $message }}</small></div>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="phone">Phone</label>
                                    <input type="text" name="phone" class="form-control form-control-lg"
                                        placeholder="Contact number" maxlength="10"
                                        value="{{ old('phone') ? old('phone') : '' }}">
                                    @error('phone')
                                        <div class="text-danger"><small>{{ $message }}</small></div>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="message">Message</label>
                                    <textarea class="form-control form-control-lg" name="message" placeholder="Message" rows="4" cols="50">{{ old('message') ? old('message') : '' }}</textarea>
                                    @error('message')
                                        <div class="text-danger"><small>{{ $message }}</small></div>
                                    @enderror
                                </div>
                                <div class="from-group roe mb-0">
                                    <div class="">
                                        @if (config('services.recaptcha.key'))
                                            <div class="g-recaptcha" data-sitekey="{{ config('services.recaptcha.key') }}">
                                            </div>
                                        @endif
                                    </div>
                                    @error('g-recaptcha-response')
                                        <div class="text-danger"><small>{{ $message }}</small></div>
                                    @enderror
                                    <button type="submit" class="btn btn-primary float-end">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
@push('scripts')
    <script src='https://www.google.com/recaptcha/api.js'></script>
@endpush
