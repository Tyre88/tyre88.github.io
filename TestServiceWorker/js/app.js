if('serviceWorker' in navigator)
{
	navigator.serviceWorker.register("/js/sw.js", {
		scope: "/js/"
	}).then(function(reg)
	{
		console.log("yey!", reg);
	}).catch(function(err)
	{
		console.log("Boo!", err);
	})
}