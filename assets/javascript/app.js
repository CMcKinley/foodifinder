<!DOCTYPE html>
<html>
	<head>
		<title>FiF</title>

	</head>
<body>

	<script src='http://code.jquery.com/jquery-2.1.3.min.js'></script>
	<script type="text/javascript">

 var searchItem='';
 var api = ''


 var request = {
   url: api,
   method: 'GET'
  };

  $.ajax(request).done(function(response) {
   console.log(response);
   
  });

  </script>

</body>
</html>