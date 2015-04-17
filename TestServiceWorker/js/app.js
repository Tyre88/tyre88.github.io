if('serviceWorker' in navigator)
{
	navigator.serviceWorker.register("/TestServiceWorker/js/sw.js", {
		scope: "/TestServiceWorker/js/"
	}).then(function(reg)
	{
		console.log("yey!", reg);
	}).catch(function(err)
	{
		console.log("Boo!", err);
	})
}