const createDiv = (elo) => {
	let div = document.createElement("div")
	div.style = "font-size:12px;padding:5px;"
	div.setAttribute("id", "showdownLadderInfos");
	let strong1 = document.createElement("strong")
	let strong2 = document.createElement("strong")
	strong1.innerText = getLadderName().replace("battle", "")
	strong2.innerText = elo
	div.append(strong1)
	div.append(document.createElement("br"))
	div.append(strong2)
	return div
}

const getUserName = () => {
	return document.cookie
	.split('; ')
	.find(row => row.startsWith('showdown_username='))
	.split('=')[1];
}

const getLadderName = () => {
	const url = window.location.href
	const regex = RegExp('\/battle-(\\w*)-', 'gm')
	const res = regex.exec(url)
	return !res ? "unknown" : res[1]
}

const getLadderRank = () => {
	const username = getUserName()
	console.log(username)
	if (username) {
		chrome.runtime.sendMessage( //goes to bg_page.js
			`https://pokemonshowdown.com/users/${username}`,
			html => {
				const regex = RegExp(`<td>${getLadderName()}<\\/td><td style=\"text-align:center\"><strong>(\\d*)<\\/strong>`, "gm")
				const res = regex.exec(html)
				const elo = !res ? 0 : res[1]

				const div = createDiv(elo)
				const leftbar = document.getElementsByClassName("leftbar")[0]
				leftbar.appendChild(div);
			}
		);
	}
}

setInterval(() => {
	const customElem = document.getElementById("showdownLadderInfos")
	if (customElem === null && window.location.href !== "https://play.pokemonshowdown.com/") {
		console.log("I'm in a battle")
		getLadderRank()
	}
}, 1500)
