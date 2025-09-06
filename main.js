console.log("Password Manager");
let showMessage = document.querySelector(".showMessage")
showPasswords()
document.querySelector(".sumbit").addEventListener("click", (e) => {
    e.preventDefault()
    console.log(website.value, username.value, password.value);
    let passwords = localStorage.getItem("passwords")
    console.log(passwords);
    console.log('clicked...');
    if (passwords === null) {
        let json = []
        json.push({
            website: website.value,
            username: username.value,
            password: password.value
        })
        localStorage.setItem('passwords', JSON.stringify(json))
        // alert("Password saved")
        showMessage.style.display = "block"
        showMessage.innerHTML = "Password Successfully Added!"
        showMessage.style.backgroundColor = "#0cb655"
        setTimeout(() => {
            showMessage.style.display = "none"
            
        }, 4000);
        showPasswords()
    } else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({
            website: website.value,
            username: username.value,
            password: password.value
        })
        localStorage.setItem('passwords', JSON.stringify(json))
        // alert("Password saved")
        showMessage.style.display = "block"
        showMessage.innerHTML = "Password Successfully Added!"
        showMessage.style.backgroundColor = "#0cb655"
        setTimeout(() => {
            showMessage.style.display = "none"
            
        }, 4000);
        showPasswords()

    }
})


//Logic to write data in table
function showPasswords() {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    let json = data ? JSON.parse(data) : []

    if (!json || json.length === 0) {
        tb.innerHTML = "Add Passwords to start"
        tb.style.fontSize = "25px"
        tb.style.border = "none"
    } else {
        tb.innerHTML = `<tr>
                    <th>Website</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Delete</th>
                </tr>`
        for (let i = 0; i < json.length; i++) {
            tb.innerHTML += `
        <tr>
        <td>${json[i].website}  <img src="copy.svg" alt="Copy" class="copy" onclick="copyText('${json[i].website}')"></td>
        <td>${json[i].username}  <img src="copy.svg" alt="Copy" class="copy" onclick="copyText('${json[i].username}')"></td>
        <td>${maskPassowrd(json[i].password)}  <img src="copy.svg" alt="Copy" class="copy" onclick="copyText('${json[i].password}')"></td>
        <td><button class="btnt" onclick="deletePassword('${json[i].website}')">Delete</button></td>
        </tr>
        `
        }
    }
    website.value = ''
    username.value = ''
    password.value = ''

}

function deletePassword(website) {
    let data = localStorage.getItem("passwords")
    let arrr = JSON.parse(data)
    let arrUpdated = arrr.filter((item) => {
        return item.website != website
    })
    localStorage.setItem('passwords', JSON.stringify(arrUpdated))
    if (arrUpdated.length == 0) {
        let tb = document.querySelector("table")
        tb.innerHTML = "No passwords found"
        tb.style.fontSize = "25px"
        tb.style.border = "none"
    } else {
        showPasswords()
    }
    // alert(`Password deleted of website ${website}`)
    showMessage.style.display = "block"
    showMessage.innerHTML = "Password Successfully Deleted!"
    showMessage.style.backgroundColor = "red"
    setTimeout(() => {
        showMessage.style.display = "none"
        
    }, 4000);

}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(() => {
        showMessage.style.display = "block"
        showMessage.innerHTML = "Copied to Clickboard!"
        showMessage.style.backgroundColor = "orange"
        setTimeout(() => {
            showMessage.style.display = "none"
            
        }, 4000);
    }).catch((err) => {
        showMessage.style.display = "block"
        showMessage.innerHTML = "Error copying to clipboard!"
        showMessage.style.backgroundColor = "red"
        setTimeout(() => {
            showMessage.style.display = "none"
            
        }, 5000);
    })
}

function maskPassowrd(passwordtomask) {
    let str = ''
    for (let i = 0; i < passwordtomask.length; i++) {
        str += '*'
    }
    return str
}

function showPage(pageId) {
    console.log('showPage called with:', pageId); // Debug log

    // Step 1: Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        console.log('Removed active from:', page.id); // Debug log
    });

    // Step 2: Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        console.log('Added active to:', pageId); // Debug log
    } else {
        console.error('Page not found:', pageId); // Debug log
    }
}

// Ensure main page is active on load
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, showing main page'); // Debug log
    showPage('main');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');

    if (hamburger.classList.contains("active")) {
        hamburger.innerHTML = '<img src="cross.svg" alt="">'
    } else {
        hamburger.innerHTML = '&#9776;'

    }
});