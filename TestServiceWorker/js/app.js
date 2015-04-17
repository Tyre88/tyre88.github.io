if('serviceWorker' in navigator)
{
	navigator.serviceWorker.register("/TestServiceWorker/js/sw.js", {
		scope: "/"
	}).then(function(reg)
	{
		console.log("yey!", reg);
	}).catch(function(err)
	{
		console.log("Boo!", err);
	})
}