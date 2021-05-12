function checkTermin() {
    let arr = document.querySelectorAll(".card__content")
    function isEmpty(str) {
        return !str || str.length === 0
    }
    let bestLink = null
    let bestTime = new Date("12 31 3000")
    arr.forEach((el) => {
        let getTermin = el.children[0].href
        if (isEmpty(getTermin)) {
            return
        }
        let details = el.children[2].children[0].innerText
        details = details.replace("event ", "").replace("Termine, ", "").replace("Termin, ", "").replace(" - ", " ").split(" ").slice(1, 2)[0].split(".")
        let day = details[0]
        let month = details[1]
        let year = details[2]
        let date = new Date(`${month} ${day} ${year}`)
        if (date < bestTime) {
            bestTime = date
            bestLink = getTermin
        }
    })
    console.log(bestLink, bestTime, (bestTime - Date.now()) / 1000)
    if ((bestTime - Date.now()) / 1000 < 1209600 * 2) {
        window.open(bestLink)
    } else {
        console.log("nicht im zeitfenster")
        setTimeout(() => {
            location.reload()
        }, 2500)
    }
}

console.log("loaded script.js")

function start() {
    if (window.location == "https://termin.impfung.at/no/start/termine") {
        console.log("looking for termin...")
        function check() {
            return document.querySelectorAll(".card__content").length > 0
        }
        let finishLoading = setInterval(() => {
            if (check()) {
                console.log("finished loading!")
                checkTermin()
                clearInterval(finishLoading)
            }
        }, 100)
    } else {
        if (document.readyState == "complete") {
            console.log("reservieren...")
            function check() {
                return document.querySelectorAll(".customer-count").length > 0
            }
            let finishLoading = setInterval(() => {
                if (check()) {
                    console.log("finished loading!")
                    document.querySelector(".customer-count").click()
                    clearInterval(finishLoading)
                }
            }, 100)
        }
    }
}

document.onreadystatechange = () => {
    console.log(window.location)
    console.log(document.readyState)
    if (document.readyState == "complete") {
        start()
    }
}

if (document.readyState == "complete") {
    start()
}
