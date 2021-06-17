const getLadderName = () => {
    const url = window.location.href
    const regex = RegExp('\/battle-(\\w*)-', 'gm')
    return regex.exec(url)[1]
}

const getLadderRank = async () => {
    const username = document.cookie
    .split('; ')
    .find(row => row.startsWith('showdown_username='))
    .split('=')[1];

    chrome.runtime.sendMessage( //goes to bg_page.js
        `https://pokemonshowdown.com/users/${username}`,
        html => {
            const regex = RegExp(`<td>${getLadderName()}<\\/td><td style=\"text-align:center\"><strong>(\\d*)<\\/strong>`, "gm")
            const elo = regex.exec(html)[1]
            alert(`Ladder : ${getLadderName()}\nElo : ${elo}`)
        }
    );
}

let battle = false
setInterval(() => {

    if (window.location.href !== "https://play.pokemonshowdown.com/" && battle == false) {
        battle = true
        getLadderRank()
    }
    else if (window.location.href === "https://play.pokemonshowdown.com/" && battle == true) {
        battle = false
    }
}, 3000)


