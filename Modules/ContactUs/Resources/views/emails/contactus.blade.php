@extends(config('contactus.mail_view'))
@section('content')
    <div style="padding:30px;juystify-content:center;">
        <h3>Hello Admin,</h3>
        <br>
        <strong>User details </strong>
        <hr /><br>
        <strong>Name: &nbsp;&nbsp;</strong>{{ $data->name }} <br>
        <strong>Email: &nbsp;&nbsp;</strong>{{ $data->email }} <br>
        <strong>Phone: &nbsp;&nbsp;</strong>{{ $data->phone }} <br>
        <strong>Message: &nbsp;&nbsp;</strong>{{ $data->message }} <br><br>

        Thank you
    </div>
@endsection
