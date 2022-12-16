const $SIDEBAR_COOKIE = 'scpSidebar';

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Modal
     * */
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });


    /**
     * Burger
     * */
    const $CLASS_ACTIVE = 'is-active';
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger,.navbar-apps'), 0);
    $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle($CLASS_ACTIVE);
            $target.classList.toggle($CLASS_ACTIVE);

        });
    });

    /**
     * Sidebar toggle
     * */
    const $sidebarToggle = Array.prototype.slice.call(document.querySelectorAll('.sidebar-toggle'), 0);
    $sidebarToggle.forEach( el => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.addEventListener('click', () => {
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active')
            let hasSidebar=$target.classList.contains('is-active');
            setCookie($SIDEBAR_COOKIE,hasSidebar,90);
        });
    });

    //sidebar hover
    const $sidebarMenus = (document.querySelectorAll('aside, aside .menu-list') || []);
    $sidebarMenus.forEach( el => {
        el.addEventListener('mouseover', () => {
            if (!el.classList.contains("is-hovered")) {
                el.classList.add("is-hovered");
            }
        });

        el.addEventListener('mouseout', () => {
            if (el.classList.contains("is-hovered")) {
                el.classList.remove("is-hovered");
            }
        });
    });


    /**
     * Tab
     * */

    let tabsWithContent = function () {
        let tabs = document.querySelectorAll('.tabs li');
        let tabsContent = document.querySelectorAll('.tab-content');

        let deactvateAllTabs = function () {
            tabs.forEach(function (tab) {
                tab.classList.remove('is-active');
            });
        };

        let hideTabsContent = function () {
            tabsContent.forEach(function (tabContent) {
                tabContent.classList.remove('is-active');
            });
        };

        let activateTabsContent = function (tab) {
            tabsContent[getIndex(tab)].classList.add('is-active');
        };

        let getIndex = function (el) {
            return [...el.parentElement.children].indexOf(el);
        };

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                deactvateAllTabs();
                hideTabsContent();
                tab.classList.add('is-active');
                activateTabsContent(tab);
            });
        })

        if(tabs[0] !== undefined){
            tabs[0].click();
        }
    };

    tabsWithContent();


    /**
     * Notifications
     * */
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        const $notification = $delete.parentNode;

        $delete.addEventListener('click', () => {
            $notification.parentNode.removeChild($notification);
        });
    });

    initJSDefaults();
});

/**
 * Sidebar
 * */
function openSidebarTab(id){
    var sidebarToggle = Array.prototype.slice.call(document.querySelectorAll('aside .menu-list'), 0);
    sidebarToggle.forEach( em => {
        em.classList.remove('is-open');
    } );
    document.getElementById(id).classList.add("is-open");
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

/* ---------- Collapsible fields ---------- */
function collapseFieldset(){
    var parent = $(".toggleField");
    parent.each(function( index ) {
        $(this).find("fieldset > div").wrapAll('<div class="is-collapsed" style="display:none;"/>');
    });


    $(".toggleField legend, .toggleField .legend").click(function(){
        $(this).children("i").toggleClass(" fa-arrow-right").toggleClass(" fa-arrow-down");
        $(this).nextAll("div.is-collapsed").slideToggle(300);
    });
}

function initJSDefaults(){
    collapseFieldset();
    $('table.dataTable').dataTable();
    return false;
}