// ==UserScript==
// @name        Github-Obhstestvo.bg Translation & Mod
// @namespace   www.obshtestvo.bg
// @description Превод и визуално опростен Github, така че да бъде по-достъпен за работа по проектите на Obshtestvo.bg
// @include     https://github.com/*
// @updateURL   http://status.obshtestvo.bg/gh-mod/obshtestvo.user.js
// @version     0.1
// @grant       none
// ==/UserScript==

(function ($) {
    $.fn.replaceTextAll = function (map) {
        var container = this[0];
        var walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        var node;
        var textNodes = [];

        while(node = walker.nextNode()) {
            textNodes.push(node);
        }
        for (var pattern in map) {
            var regex = new RegExp('\\b'+pattern+'\\b', "g");
            textNodes.forEach(function(node) {
                var val = node.nodeValue;
                var newVal = val.replace(regex, map[pattern]);
                if (val!=newVal) node.nodeValue = newVal;
            })
        }
    };
})(jQuery);


if (document.URL.indexOf(".com/obshtestvo") == -1) {
    var $topNav = $('.top-nav');
    $topNav.append($('<li>').append($('<a href="/obshtestvo">').append("Общество")));
    $topNav.width(270)
    return;
}
/**
 * Modifications regarding Obshtestvo repositories
 */
var obshtestvofy = function () {

    // Remove bits that can't be hidden with css or must be removed only once
    (function ($) {
        $('.site-footer').parent().remove()
        $('a[href$="/fork"]').parent().remove()
        $('a[href$="/pulls"]').parent().remove()
        $('.numbers-summary a[href$="/branches"]').parent().remove()
        $('.top-nav li').remove()
        $('.vcard-stats a:contains("private repos")').remove()
    })(jQuery);


    // Translate and transform
    (function ($) {

        // Some phrases used in more than 1 place
        var dict = {
            obshtestvo: {
                main: "Главни",
                meta: "Вътрешни",
                idei: "Чакащи инерция",
            },
            code: "Файлове",
            issues: "Задачи & Дискусии",
            average: "Предимно",
            members: "Участници",
            contributors: "участника",
            projects: "Проекти",
            tostar: "Добави проект към любимите",
            manageLabels: "Редакция",
        }

        // Translation mapping
        var map = {
            "html": {
                "You only receive notifications for conversations in which you participate or are @mentioned": 'Ще получавате известия само по теми, в които участвате или сте @споменат',
                "You receive notifications for all conversations in this repository": 'Ще получавате известия по всички теми',
                "You can clone with": 'Можете да направите синхронизирано копие и чрез',
                "Switch branches/tags": 'Превключи клон или стабилна версия',
                "Completeness": "Прогрес",
                "Browse Issues": dict.issues,
                "Everyone’s Issues": "Всички задачи и дискусии",
                "Keyboard shortcuts available": "Виж клавишните комбинации",
                "Open Milestones": "Текущи етапи",
                "Closed Milestones": "Приключили етапи",
                "No milestones to show": "Не са дефинирани етапи",
                "Create a new milestone": "Създай нов",
                "Create milestone": "Създай етапа",
                "Issues with no milestone": 'Задачи или дискусии без зададен етап',
                "Due Date": "Крайна дата",
                "Reopen": "Върни към текущи",
                "Issues": dict.issues,
                "Stars": "Любими",
                "Milestones": "Етапи",
                "Milestone": "Етап",
                "with issues": "съдържащи задачи",
                "without issues": "без задачи",
                "branches": "клона",
                "contributor": "участник",
                "contributors": dict.contributors,
                "Contributors": "Участници",
                "Code": dict.code,
                "Closed": "Приключени",
                "Open": "Текущи",
                "Add Labels": "Означи с етикети",
                "Edit Labels": "Етикети",
                "Label": "Етикет",
                "Labels": "Етикети",
                "New label": "Нов етикет",
                "Apply labels to this issue": "Означи избраното с етикет",
                "comments": "коментара",
                "forked from": "базиран на",
                "Opened by": "Създадена от",
                "opened this issue": "създаде тази задача",
                "No milestone selected": "От всички етапи",
                "Filter issues by milestone": "Оганичи показаното до даден етап",
                "Clear milestone and label filters": "Покажи отново всичко без да имат значение етапа или етикетите",
                "This repository": "Този проект",
                "Repositories": dict.projects,
                "Members": dict.members,
                "members": dict.contributors,
                "public repos": "проекта",
                "Last updated": "Последно променено",
                "New repository": "Нов проект",
                "Edit profile": "Редактирай",
                "you contribute to": "в които участващ",
                "Assigned to you": "Твоите задачи",
                "Created by you": "Създадени от теб",
                "Mentioning you": "Споменаващи те",
                "Back to issue list": "Обратно към списъка със задачите",
                "New Issue": "Създай нова",
                "Issue": "Задача",
                "No milestone": "Не е свързано с даден етап",
                "branch": "клон",
                "Unwatch": "Известия",
                "Star": "Любимо",
                "Sort": "Подреждане",
                "Newest": "Най-нови",
                "Oldest": "Най-старите",
                "Recently updated": "Последно обновени",
                "Least recently updated": "Най-отдавна обновени",
                "Most commented": "Най-коментирани",
                "Least commented": "Най-малко коментирани",
                "authored": "направи промяна",
                "([0-9]+) months ago": 'преди $1 месеца',
                "([0-9]+) days ago": 'преди $1 дни',
                "([0-9]+) hours ago": 'преди $1 часа',
                "([0-9]+) years ago": 'преди $1 години',
                "an hour ago": 'преди час',
                "a month ago": 'преди месец',
                "Edit": 'Редактирай',
                "participant": 'участник',
                "participants": 'участника',
                "No one is assigned": 'Никой не е поел задачата',
                "is assigned": 'се очаква да го свърши',
                "Create": 'Създай',
                "Close": 'Сложи край',
                "releases": 'стабилни версии',
                "commits": 'значими промени',
                "Conceal membership": 'Прикрий участието',
                "Attach images by dragging & dropping": 'Прикачи изображения като ги привлачиш',
                "selecting them": ' избереш ги',
                "or pasting": 'или ги paste-неш',
                "from the clipboard": '',
                "Write": 'Въвеждане',
                "Preview": 'Преглед',
                "Comments are parsed with": 'Текстовото оформление е според',
                "GitHub Flavored Markdown": 'GitHub варианта на Markdown',
                "Submit new issue": 'Създай',
                "Assign someone to this issue": 'Назначи някой участник',
                "Set milestone": 'Задай етап',
                "Nothing to show": 'Няма',
                "latest commit": 'последна значима промяна',
                "Branches": 'Клонове',
                "Tags": 'Стабилни версии',
                "Browse code": 'Виж файловете по времето на тази промяна',
                "Show Diff Stats": 'Покажи статистика на промененото',
                "Hide Diff Stats": 'Скрий статистиката на промененото',
                "Raw": 'Директен линк',
                "History": 'Хронология',
                "Delete": 'Изтрий',
                "Commit summary": 'Описание на промяната',
                "or": 'или',
                "Apply": 'Приложи',
                "commented": 'коментира',
                "Update Comment": 'Обнови коментара',
                "Older": 'По-стари',
                "Newer": 'По-нови',
                "Commits": 'Значими промени',
                "Notification status": 'Режим на известия',
                "Not watching": 'Следите проекта',
                "Watching": 'Не следите проекта',
                "Ignoring": 'Игнорирате проекта',
                "Download ZIP": 'ZIP архив',
                "Clone in Desktop": 'синхронизирано копие',
                "from": 'от',
                "Title": 'Име',
                "Description": 'Описание',
                "clone URL": 'линк за синх. копие',
                "optional": 'незадължително',
                "clear": 'изчисти',
                "Save": 'Запази',
                "cancel": 'отмени',
                "Assignee": 'Кой',
                "Clear assignee": 'Отмени назначението',
                "Download this repository as a zip file": 'Свали проекта като zip',
                "You do not receive any notifications for conversations in this repository": 'Няма да получавате известия, по която и да е тема',
            },
            ".file-navigation i:contains('tree:')": "повреме на промяна:",
            ".edit-preview-tabs .code": "Редакция",
            ".edit-preview-tabs .preview": "Виж промените",
            ".edit-file .abort a": "отмени редакцията",
            ".comment-content .comment-cancel-button": "Отмени редакцията",
            ".new-file .abort a": "отмени създването",
            ".state-indicator.open": "Текуща",
            ".state-indicator.closed": "Приключена",
            "form[action$='labels/modify_assignment'] a:contains('Remove')": "Премахни сегашните",
            ".js-manage-labels": dict.manageLabels,
            ".command-bar input[name=q]": ['placeholder', [ 'Въведи критерии за търсене']],
            ".repo-search input": ['placeholder', [ 'Филтрирай списъка с проекти...']],
            ".clone-options .help": ['tooltip', [ 'Разберете кое URL ви е от най-голяма полза']],
            ".edit-file .zeroclipboard-button": ['attr', ['title', 'копйрай пътя до файла']],
            "#issues-list-sidebar-milestones-filter": ['placeholder', [ 'Филтрирай списъка с етапи...']],
            "#issue_title": ['placeholder', [ 'Заглавие']],
            "#issue_body": ['placeholder', [ 'Опиши какво мислиш']],
            "#context-commitish-filter-field": ['placeholder', [ 'Намери или създай нов клон']],
            "#assignee-filter-field": [ 'placeholder', ['Филтрирай списъка с участници']],
            "#label-filter-field": [ 'placeholder', ['Филтрирай списъка с етикети']],
            "#context-milestone-filter-field": ['placeholder', ['Филтрирай списъка с етапи']],
            "#new_label_form .name-input": ['placeholder', ['Име за новия етикет']],
            ".repository-sidebar li[original-title='Issues']": ['tooltip', [dict.issues]],
            ".repository-sidebar li[original-title='Code']": ['tooltip', [dict.code]],
            "[title='Copy SHA']": ['attr', ['title', 'Копирай SHA']],
            "[title='copy to clipboard']": ['attr', ['title', 'копирай']],
            ".enable-fullscreen": ['tooltip', ["Редактирай на цял екран"]],
            ".new-file .filename": ['placeholder', ["Дайте име на файла..."]],
            ".star-button.unstarred": ['attr', ['title', dict.tostar]],
            ".breadcrumb form": ['tooltip', ["Създай нов файл"]],
            ".notification-indicator[original-title='You have no unread notifications']": ['tooltip', ["Нямате непрочетени известия"]],
        }

        // Translation methods
        var methods = {
            swapText: function ($el, text) {
                $el.text(text)
            },
            searchReplace: function ($el, map) {
                $el.replaceTextAll(map);
            },
            attr: function ($el, attr, text) {
                $el.attr(attr, text)
            },
            tooltip: function ($el, text) {
                $el.attr('original-title', text)
            },
            placeholder: function ($el, text) {
                $el.attr('placeholder', text)
            },
        }

        // Tweaks
        $('<a href="/new" class="button minibutton primary bigger" data-hotkey="n">New repository</a>').appendTo('.page-profile .tabnav-right .tabnav-widget')
        $(' <a href="/organizations/' + $('.vcard-username').text() + '/settings" class="minibutton"><span class="octicon octicon-pencil"></span>Edit profile</a>').appendTo('.vcard-names')
        $('.repolist .repo-stats .language').prepend(dict.average + " ")
        var $topNav = $('.top-nav');
        $topNav.append($('<li>').append($('<span>').append(dict.projects+":")))
        $topNav.append($('<li>').append($('<a href="/obshtestvo">').append(dict.obshtestvo.main)))
        $topNav.append($('<li>').append($('<a href="/obshtestvo-meta">').append(dict.obshtestvo.meta)))
        $topNav.append($('<li>').append($('<a href="/obshtestvo-idei">').append(dict.obshtestvo.idei)))
        $('.vcard-avatar').attr('href', '/' + $('.vcard-username').text())
        $('.vcard-avatar').parent().tipsy('disable');
        $('.js-editable-labels-container').prepend($('.js-manage-labels'))

        if ($('.fork-flag.project').length==0) {
            $('.commit-group-item .commit-links').each(function() {
                var $this = $(this)
                $this.prepend($('<span class="sha">').append($this.find('.gobutton').text()))
            })
            var $forkText = $('<span class="text">')
            $forkText.append('вземи ');
            var $cloneToDesktopButton = $('a[href^="github-"]');
            if ($cloneToDesktopButton.length > 0) {
                $forkText.append($('a[href^="github-"]'))
            } else {
                $forkText.append("git линк: ")
                var $clone = $('.clone-url-box input[value^="git@"]').parent().clone();
                $clone.contents().filter(function() { return (this.nodeType == 3 && !/\S/.test(this.nodeValue)); }).remove();
                $forkText.append($clone)
            }
            $forkText.append(' или ')
            $forkText.append($('a[href$=".zip"]'))
            var $fork = $('<span class="fork-flag project">').append($forkText)
            $fork.appendTo('.entry-title')
            $fork.appendTo('.entry-title')
        }



        // Translate
        $.each(map, function (selector, value) {
            var $el = $(selector)
            if ($.type(value) == 'string') {
                methods.swapText($el, value)
            } else if ($.type(value) == 'object') {
                methods.searchReplace($el, value)
            } else {
                value[1].unshift($el)
                methods[value[0]].apply(methods, value[1])
            }
        })

    })(jQuery);

}

// Restyle
var css = ' \
  asd,\
  asd,\
  .repolist .repo-stats .stargazers,\
  .repolist .repo-stats .forks,\
  .commit-group-item .gobutton,\
  label[for="commit-description-textarea"],\
  #commit-description-textarea,\
   #files .file .meta .info span.diffstat[original-title^="Binary"],\
  .vcard-detail .octicon-clock,\
  .vcard-detail .join-date,\
  .vcard-detail .join-label,\
  .repo_filterer,\
  .repo-search .button,\
  .tabnav-widget a[href$="/settings"],\
  #user-links>li>a#new_repo,\
  .octofication,\
  .repo-label,\
  .js-editable-labels-container .rule,\
  .list-group-item  .octicon,\
  .repository-lang-stats, .repository-lang-stats-graph {\
    display: none;\
  }\
  .filter-bar, .overall-summary {\
    border: none;\
    box-shadow: none;\
  }\
  .issue-list-item .list-group-item-meta,\
  .issue-list-item .list-group-item-number {\
    visibility: hidden;\
  }\
  .issue-list-item:hover .list-group-item-meta,\
  .issue-list-item:hover .list-group-item-number {\
    visibility: visible;\
  }\
  .js-manage-labels {\
    position: absolute;\
    right: -5px;\
    top: -3px;\
  }\
  .overall-summary .numbers-summary li  {\
    text-align: left;\
  }\
  .js-editable-labels-container {\
    position: relative;\
  }\
  #readme .markdown-body {\
    border: 0;\
    padding-top: 20px;\
  }\
  #readme span.name {\
    display: none;\
  }\
  #readme {\
    padding: 0;\
  }\
  .list-group-item.selectable {\
    padding-left: 40px;\
  }\
  body.page-profile .profilecols .filter-bar {\
    border-bottom: 0;\
  }\
  .header-logged-in .command-bar .top-nav {\
    width: 324px;\
  }\
  .top-nav>li>span  {\
    display: block;\
    color: #B4B4B4;\
    padding: 6px 0px 5px 1px;\
  }\
  .sunken-menu-group:not(:first-child)  {\
    opacity: 0.2;\
    transition:all 0.1s ease-in;\
    -webkit-transition:all 0.1s ease-in 0;\
  }\
  .sunken-menu-group:not(:first-child):hover  {\
    opacity: 1;\
  }\
  .repository-sidebar .only-with-full-nav  {\
    transition:all 0.1s ease-in;\
    -webkit-transition:all 0.1s ease-in 0;\
    opacity: 0.2;\
  }\
  .repository-sidebar .only-with-full-nav:hover  {\
    opacity: 1;\
  }\
  .repository-with-sidebar.with-full-navigation .repository-sidebar  {\
    width:190px\
  }\
  .repository-with-sidebar.with-full-navigation .repository-content {\
    width:770px\
  }\
  .commit-group-item .zeroclipboard-button {\
    float:right;\
  }\
  .commit-group-item .sha {\
    float:right;\
    line-height:26px;\
    visibility: hidden;\
  }\
  .commit-group-item .browse-button {\
    clear:right;\
    visibility: hidden;\
  }\
  .commit-group-item.navigation-focus .browse-button, \
  .commit-group-item.navigation-focus .sha,\
  .commit-group-item:hover .browse-button, \
  .commit-group-item:hover .sha {\
    visibility: visible;\
  }\
  .full-commit .commit-meta {\
    border:1px solid white;\
    border-top:1px solid #d8e6ec;\
    margin-left:-9px;\
    margin-right:-9px;\
    margin-bottom:-1px;\
    padding-top:10px;\
  }\
  .commit.file-history-tease .participation {\
    border:1px solid white;\
    border-top:1px solid #d8e6ec;\
    margin-left:-9px;\
    margin-right:-9px;\
    margin-bottom:-1px;\
    padding-top:1px;\
  }\
  .fork-flag .minibutton .octicon {\
    font-size:12px;\
  }\
  .fork-flag.project {\
    padding-top:5px;\
  }\
  .fork-flag.project .clone-url-box{\
    display: inline-block;\
    -moz-box-sizing: border-box;\
    box-sizing: border-box;\
    border-collapse: separate;\
  }\
  .fork-flag.project .clone-url-box input.clone {\
    display: inline-block;\
    -moz-box-sizing: border-box;\
    box-sizing: border-box;\
    white-space: nowrap;\
    min-height: 18px;\
    height: 20px;\
    line-height:18px;\
    font-size:11px;\
    padding: 4px 5px;\
    border-top-right-radius: 0; \
    border-bottom-right-radius: 0;\
  }\
  .fork-flag.project .clone-url-box .url-box-clippy {\
    display: inline-block;\
    -moz-box-sizing: border-box;\
    box-sizing: border-box;\
    font-size:12px;\
    height: 20px;\
    line-height:18px;\
  }\
  .fork-flag a.minibutton.sidebar-button {\
    font-size:11px;\
    color:#333;\
    padding:0 5px;\
    line-height:18px;\
  }\
  h1.entry-title {\
    min-height:53px;\
  }\
  .fork h1.entry-title {\
    min-height:63px;\
  }\
'
$('<style type="text/css">').append(css).appendTo('head')


// Listen for page changes and re-apply changes

$('#site-container').bind('pjax:end', function () {
    clearTimeout(pjaxTimeout)
    pjaxTimeout = setTimeout(obshtestvofy, 50);
})

var pjaxTimeout;

$('#js-repo-pjax-container').bind('pjax:end', function () {
    clearTimeout(pjaxTimeout)
    pjaxTimeout = setTimeout(obshtestvofy, 50);
})

$.observe(".js-relative-date", {
    add: function (el) {
        clearTimeout(pjaxTimeout)
        pjaxTimeout = setTimeout(obshtestvofy, 50);
    }
})
if ($(".js-relative-date").length == 0) {
    pjaxTimeout = setTimeout(obshtestvofy, 0);
}
