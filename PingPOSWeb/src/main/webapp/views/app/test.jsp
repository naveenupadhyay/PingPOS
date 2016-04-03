<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en-US">
<body>

<script type="text/javascript" >
if (!!window.EventSource) {
	   console.log("Event source available");
	   var source = new EventSource('/app/systemalert');

	   source.addEventListener('message', function(e) {
	        console.log(e.data);
	        console.log("logged data printed");
	   });

	   source.addEventListener('open', function(e) {
	        console.log("Connection was opened.");
	   }, false);

	   source.addEventListener('error', function(e) {
	        if (e.readyState == EventSource.CLOSED) {
	            console.log("Connection was closed.");
	        } else {
	            console.log(e.readyState);    
	        }
	   }, false);
	} else {
	        console.log("No SSE available");
	}
	
</script>
This is a test

</body>
</html>