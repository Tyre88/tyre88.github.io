if('serviceWorker' in navigator)
{
	navigator.serviceWorker.register("/TestServiceWorker/js/sw.js", {
		scope: "/service-worker/"
	}).then(function(reg)
	{
		console.log("yey!", reg);
	}).catch(function(err)
	{
		console.log("Boo!", err);
	})
}