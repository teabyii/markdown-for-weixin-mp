function send(message) {
	return new Promise(function (resolve) {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, message, function (res) {
				resolve(res)
			})
		})
	})
}

chrome.browserAction.onClicked.addListener(function (tab) {
	send({ requestText: true })
})

chrome.runtime.onMessage.addListener(function (req, sender, res) {
	if (req.text !== undefined) {
		try {
			var target = render(req.text)
			send({
				success: true,
				markdown: target
			})
		} catch(e) {
			send({
				success: false,
				error: e.toString()
			})
		}
	}
})
