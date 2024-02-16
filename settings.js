const buttonSettings = document.querySelector('.gear')
const buttonSettingsClose = document.querySelector('.close')
const stylesSettings = document.querySelectorAll('.style')

//toggle off the style 2 and 3 on the beginning of game
//need a loop if more should be added
stylesSettings[1].classList.toggle('style2');
stylesSettings[2].classList.toggle('style3');

const settingsOpen = () => {
    main.style.display = 'none';
    footer.style.display = 'none'
    settingsContainer.style.display = 'block'
}

const settingClose = () =>{
    main.style.display = 'grid';
    footer.style.display = 'flex'
    settingsContainer.style.display = 'none'
}

const changeStyle1 = () =>{
    //starting with this style and removing other styles to make sure style 1 is active
    let style2;
    let style3;
    //loop over again to remove all additional styles after style1.css back to actie style1 for cards
    do{
        style2 = document.querySelector("link[href='style2.css']")
        if(style2){
        style2.remove()
        }
        style3 = document.querySelector("link[href='style3.css']")
        if(style3){
        style3.remove()
        }
    }while(style2 || style3);
    //the more styles would come themore sense it makes to make a loop
    stylesSettings[1].addEventListener('click', changeStyle2)
    stylesSettings[2].addEventListener('click', changeStyle3)
    stylesSettings[0].removeEventListener('click', changeStyle1)
    stylesSettings[0].classList.add('style1');
    stylesSettings[1].classList.remove('style2');
    stylesSettings[2].classList.remove('style3');
}

const changeStyle2 = () =>{
    //switches to style 2
    const newStyleElementSibling = document.querySelector("link[href='style.css']")
    const newStyle = document.createElement('link')
    newStyle.setAttribute('rel', 'stylesheet')
    newStyle.setAttribute('href', 'style2.css')
    //new styles comes after style 1 and is always the active because last
    //the more styles would come themore sense it makes to make a loop
    newStyleElementSibling.append(newStyle) 
    stylesSettings[1].removeEventListener('click', changeStyle2)
    stylesSettings[0].addEventListener('click', changeStyle1)
    stylesSettings[2].addEventListener('click', changeStyle3)
    stylesSettings[1].classList.add('style2');
    stylesSettings[0].classList.remove('style1');
    stylesSettings[2].classList.remove('style3');
}

const changeStyle3 = () =>{
    const newStyleElementSibling = document.querySelector("link[href='style.css']")
    const newStyle = document.createElement('link')
    newStyle.setAttribute('rel', 'stylesheet')
    newStyle.setAttribute('href', 'style3.css')
    newStyleElementSibling.append(newStyle)
    //new styles comes after style 1 and is always the active because last
    //the more styles would come themore sense it makes to make a loop
    stylesSettings[2].removeEventListener('click', changeStyle3)
    stylesSettings[0].addEventListener('click', changeStyle1)
    stylesSettings[1].addEventListener('click', changeStyle2)
    stylesSettings[2].classList.add('style3');
    stylesSettings[1].classList.remove('style2');
    stylesSettings[0].classList.remove('style1');
}

//add Listeners in Settings
buttonSettings.addEventListener('click', settingsOpen)
buttonSettingsClose.addEventListener('click', settingClose)
stylesSettings[0].addEventListener('click', changeStyle1)
stylesSettings[1].addEventListener('click', changeStyle2)
stylesSettings[2].addEventListener('click', changeStyle3)

