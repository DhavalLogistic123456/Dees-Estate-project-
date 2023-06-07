$(document).ready(() => {
	toastr.options = {
		closeButton: true,
		progressBar: true,
		showMethod: 'slideDown',
		timeOut: 4000,
		extendedTimeOut: 4000,
		preventDuplicates: true
	};

	$('.i-checks').iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
	});
})