const modeContainer = document.querySelector('#mode-container')
const ModeSwitch = document.querySelector('[data-Mode]')
const sunImg = document.querySelector('.SunImg')
const moonImg = document.querySelector('.MoonImg')
const wrapper = document.querySelector('.wrapper')
const formContainer = document.querySelector('.form-container')
const InputSection = document.querySelector('.InputSection')
const InputDelete = document.querySelector('.InputDelete')
let InformationSection = document.querySelector('.Information-container')
const searchBtn = document.querySelector('#SearchBtn')
const info_img = document.querySelector('#info-img')
const info_name = document.querySelector('#info-name')
const github_link = document.querySelector('#github-link')
const joinedDate = document.querySelector('#info-joined')
const info_desc = document.querySelector('#info-desc')
const more_info = document.querySelector('.more-info')
const repo_num = document.querySelector('#repo-num')
const followers_num = document.querySelector('#follower-num')
const following_num = document.querySelector('#following-num')
const info_location = document.querySelector('#info-location')
const blog_link = document.querySelector('#blog-link')
const blog_link_text = document.querySelector('#blog-link span')
const twitter_link = document.querySelector('#twitter-link')
const twitter_username = document.querySelector('#twitter-link span')
const company_name = document.querySelector('#info-company span')
const info_grid = document.querySelector('.grid')
let Information = document.querySelector('.Information')
let errorMsg = document.querySelector('.errorMsg')


// dark mode features
moonImg.classList.add("active")
ModeSwitch.innerText = "Dark"
modeContainer.addEventListener('click', () => {
    if(ModeSwitch.innerText == "Dark") {  // for dark mode
        ActivateDarkMode()
    }
    else if(ModeSwitch.innerText == "Light"){ // for ligth mode
        ActivateLightMode()
    }
})

function ActivateDarkMode() {
    sunImg.classList.add("active")
    moonImg.classList.remove("active")
    ModeSwitch.innerText = "Light"
    wrapper.style.background = '#141d2f' // black background
    wrapper.classList.add("dark")
    formContainer.classList.add("dark")
    InputSection.classList.add("dark")
    InformationSection.classList.add("dark")
    blog_link.classList.add("dark")
    twitter_link.classList.add("dark")
    more_info.classList.add("dark")
}

function ActivateLightMode() {
    sunImg.classList.remove("active")
    moonImg.classList.add("active")
    ModeSwitch.innerText = "Dark"
    wrapper.style.background = '#f6f8ff' // white background
    wrapper.classList.remove("dark")
    formContainer.classList.remove("dark")
    InputSection.classList.remove("dark")
    InformationSection.classList.remove("dark")
    blog_link.classList.remove("dark")
    twitter_link.classList.remove("dark")
    more_info.classList.remove("dark")
}


// input section 
InputSection.addEventListener('input', function() {
    if (InputSection.value !== '') {
        InputDelete.classList.add("active")
    } else if(InputSection.value == ""){
        InputDelete.classList.remove("active")
    }
    
});

// when clicked on X
InputDelete.addEventListener('click', function() {
    InputSection.value = '';
    InputDelete.classList.remove("active")
});

let InputName = "theyashsolanki"

// fetch github api and display info
async function fetchInfo(name) {

    if(name) {
        InputName = name
        let response = await fetch(`https://api.github.com/users/${name}`)
        if(response.ok) {
            data = await response.json()
            DisplayData(data)
        }
        else {
            errorMsg.classList.add("active")
            Information.classList.remove("active")
        }
    }
}

function DisplayData() {
    errorMsg.classList.remove("active")
    Information.classList.add("active")
    console.log(data)
    info_img.setAttribute('src', `${data.avatar_url}`)
    info_name.innerText = data.name
    github_link.setAttribute('href', `${data.html_url}`)
    github_link.innerText = `@${data.login}`
    joinedDate.innerText = `Joined ${formatDate(data.created_at)}`
    info_desc.innerText = `${data.bio}`
    more_info.classList.add("active")
    info_grid.classList.add("active")
    repo_num.innerText = data.public_repos
    followers_num.innerText = data.followers
    following_num.innerText = data.following

    if(data.location) info_location.innerText = data.location
    else info_location.innerText = "Not Available"

    if(data.blog) {
        blog_link.setAttribute('href', data.blog)
        blog_link_text.innerText = data.blog
    } else {
        blog_link_text.innerText = "Not Available"
        blog_link.removeAttribute('href')
    }
    if(data.twitter_username) {
        twitter_link.setAttribute('href', `https://twitter.com/${data.twitter_username}`)
        twitter_username.innerText = data.twitter_username
    } else {
        twitter_username.innerText = "Not Available"
        twitter_link.removeAttribute('href')
    }
    if(data.company) {
        company_name.innerText = data.company
    } else company_name.innerText = "Not Available"
}


// default
fetchInfo(InputName)

// date formatter
function formatDate(dateString) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    
    return formattedDate;
}


// search
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let name = InputSection.value
    name = name.replace(/\s+/g, ""); // remove spaces
    if(name !== InputName) {  // if not already loaded
        fetchInfo(name)
    }
})





