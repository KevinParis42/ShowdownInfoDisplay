const createDiv = (elo) => {
	let div = document.createElement("div")
	div.setAttribute("id", "showdownLadderInfos");
	let strong1 = document.createElement("strong")
	let strong2 = document.createElement("strong")
	strong1.innerText = getLadderName()
	strong2.innerText = elo
	div.append(strong1)
	div.append(document.createElement("br"))
	div.append(strong2)
	return div
}

const getLadderName = () => {
	const url = window.location.href
	const regex = RegExp('\/battle-(\\w*)-', 'gm')
	return regex.exec(url)[1]
}

const getLadderRank = () => {
	console.log("still inside")
	const username = document.cookie
	.split('; ')
	.find(row => row.startsWith('showdown_username='))
	.split('=')[1];

	chrome.runtime.sendMessage( //goes to bg_page.js
		`https://pokemonshowdown.com/users/${username}`,
		html => {
			const regex = RegExp(`<td>${getLadderName()}<\\/td><td style=\"text-align:center\"><strong>(\\d*)<\\/strong>`, "gm")
			const elo = regex.exec(html)[1]

			const div = createDiv(elo)
			const leftbar = document.getElementsByClassName("leftbar")[0]
			leftbar.appendChild(div);
			//alert(`Ladder : ${getLadderName()}\nElo : ${elo}`)
		}
	);
}

setInterval(() => {
	const customElem = document.getElementById("showdownLadderInfos")
	if (customElem === null && window.location.href !== "https://play.pokemonshowdown.com/") {
		getLadderRank()
	}
}, 1000)
