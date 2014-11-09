function onload()
{
    if(window.innerWidth < 1400)
    {
        sidebarToggle(document.getElementById('sidebar__button'));
    }
    manageBannerLinks();
}

function manageContentLeft()
{
    if(window.innerWidth > 1100 && window.innerWidth < 1400 &&
       !document.getElementById('sidebar').classList.contains('sidebar--hidden'))
    {
        document.getElementById('content').style.left = (300 - (1400 - window.innerWidth)) + 'px';
    }
    else
    {
        document.getElementById('content').style.left = "";
    }
}
function manageBannerLinks()
{
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    var banner = 400;

    if((window.innerWidth < 450 && window.innerHeight < 750) || (window.innerWidth < 750 && window.innerHeight < 450))
    {
        banner = 200;
    }

    var title = document.getElementById('article__title__background');
    var home = document.getElementById('home-button');
    var closed = document.getElementById('sidebar__closed-title__text');

    if(title && top < banner - 28)
    {
        if(!home.classList.contains('home-button--on-banner'))
        {
            home.classList.add('home-button--on-banner');
        }

        if(!closed.classList.contains('sidebar__closed-title__text--on-banner'))
        {
            closed.classList.add('sidebar__closed-title__text--on-banner');
        }
    }
    else
    {
        home.classList.remove('home-button--on-banner');
        closed.classList.remove('sidebar__closed-title__text--on-banner');
    }
}

function sidebarToggle(toggle)
{
    document.getElementById('sidebar').classList.toggle('sidebar--hidden');
    document.getElementById('home-button').classList.toggle('home-button__sidebar-hidden');
    document.getElementById('content-wrapper').classList.toggle('content-wrapper--sidebar-visible');

    var title = document.getElementById('article__title__background');
    if(title)
    {
        title.classList.toggle('article__title__background--sidebar-visible');
    }

    toggle.parentNode.classList.toggle('sidebar__toggle--sidebar-hidden');
    manageContentLeft();
}

var contentLeftTimer;
window.onresize = function (event)
{
    if(contentLeftTimer)
    {
        clearTimeout(contentLeftTimer);
    }

    contentLeftTimer = setTimeout(manageContentLeft, 150);
};

window.onscroll = manageBannerLinks;

// Onload management for all browsers following http://dustindiaz.com/smallest-domready-ever
//function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
//r(onload);

document.addEventListener("DOMContentLoaded", onload);
