// ==UserScript==
// @name         IbaracitySearchableBattleForm
// @namespace    https://twitter.com/lv0_murabito
// @version      0.8.7
// @description  騒乱イバラシティ(http://lisge.com/ib/)の戦闘画面にある入力フォームに絞り込み機能を追加する機能です。
// @author       lv0_murabito
// @match        http://lisge.com/ib/act_battle.php*
// @grant        none
// ==/UserScript==
(($) => {
  'use strict';
  const SearchableBattleForm = function () {
    this.skillList = [];
    this.filterdSkillList = [];
    this.inputCount = 12;
    this.elemetIndex;
    this.skillListId　 = function () {
      return `dt_skill${this.elemetIndex}`;
    };
    this.filterdUl　 = function () {
      return `ul_${this.elemetIndex}`;
    };
    this.filterdInput = function () {
      return `inputform_${this.elemetIndex}`;
    };
  };
  SearchableBattleForm.prototype.updateList = function (e) {
    $(`#${this.skillListId()} option`).attr("selected", false);
    $(`#${this.skillListId()}`).val(e.target.dataset.value).trigger('change');
    $(`#${this.filterdInput()}`).val(e.target.textContent).attr('placeholder', e.target.textContent);
    $(`.searchable_ul`).empty();
  }
  SearchableBattleForm.prototype.displayForm = function (id) {
    const ul = $('#' + id).next();
    const formId = id.replace(/inputform_/, 'dt_skill');
    ul.empty();
    this.filterdSkillList.map(item => {
      let chcecked = $('#' + formId).val() === item.value ? true : false;
      if (chcecked && item.label !== '－') {
        ul.append(`<li><a class="searchable_li searchable_li--select">${item.label}</a></li>`);
      } else {
        ul.append(`<li><a class="searchable_li" data-value="${item.value}">${item.label}</a></li>`);
      }
    });
    $('.searchable_li').on('click', event => {
      this.elemetIndex = formId.replace(/dt_skill/, '');
      this.updateList(event)
    }).hover(function () {
      $(this).css({
        'color': '#220',
        'background': '#aaa'
      });
    }, function () {
      $(this).css({
        'color': '#220',
        'background': '#c6c6c3'
      });
    });
    $('.searchable_li--select').css({
      'font-weight': 'bold'
    });
    $(document).on('click', event => {
      if (!$(event.target).closest('.searchable_ul').length && !$(event.target).closest('.searchable_input').length) {
        $(`.searchable_ul`).empty();
      }
    });
  }
  SearchableBattleForm.prototype.filter = function (value) {
    if (value.length) {
      this.filterdSkillList = this.skillList.filter(skill => skill.label.match(value));
    } else {
      this.filterdSkillList = this.skillList;
    }
  }
  SearchableBattleForm.prototype.updateValue = function (e) {
    this.filter(e.target.value);
    this.displayForm(e.target.id);
  }
  SearchableBattleForm.prototype.addInput = function () {
    let placeholder;
    this.skillList.some(item => {
      if (item.value === $(`#${this.skillListId()}`).val()) {
        placeholder = item.label;
        return true;
      }
    });
    $(`#${this.skillListId()}`).after(`<input type="text" class="searchable_input" id="${this.filterdInput()}" placeholder="${placeholder}"></input>` +
      `<ul id="${this.filterdUl()}" class="searchable_ul"></ul>`);
    $(`#${this.filterdInput()}`).val(placeholder).on('focusin', event => {
      event.target.value = "";
    }).on('focusout', event => {
      event.target.value = event.target.placeholder;
      $(event.target).trigger('change');
    }).on('input focusin', event => {
      this.updateValue(event)
    });
  }
  SearchableBattleForm.prototype.setTab = function () {
    const formIndex = $('.BUTT0').eq(0).attr('SET');
    for (let i = 1; i <= this.inputCount; i++) {
      this.elemetIndex = `${formIndex}-${i}`;
      this.addInput();
    }
  }
  SearchableBattleForm.prototype.init = function () {
    const select = $("#dt_skill1-1");
    select.children('option').map((index, option) => {
      this.skillList.push({
        id: index,
        value: option.value,
        label: option.text,
        checked: false,
      });
    });
    this.setTab();
  }
  if (location.search === '') {
    const searchableBattleForm = new SearchableBattleForm();
    searchableBattleForm.init();
    $('body').append('<style>' +
      '.searchable_input {position: absolute;top: 2px;left: 20px;width: 65%;height: 18px;background: #C6C6C3;z-index: 1;font-weight: bold;color: #220;font-size: 16px;}' +
      '.searchable_input::placeholder {font-weight: bold; color: #220;font-size: 16px;opacity: 1;}' +
      '.searchable_ul {overflow-y: auto;max-height: 300px;position: absolute;top: 26px;left: 22px;width: 66%;color: #000;background: #C6C6C3;font-size: 14px;list-style-type: none;padding: 0;border: 0;margin: 0;z-index: 10}' +
      '.searchable_li {display: block;z-index: 100;cursor: pointer}' +
      '.searchable_li--select {font-weight :bold}' +
      '.searchable_li--select::before {content:""}' +
      '</style>');
    $(".LITEM").css({
      'position': 'relative'
    });
    $('.BUTT2').on('click', function _handleClick(e) {
      searchableBattleForm.setTab(e);
      $(this).off("click", _handleClick)
    });

    let waitingSkillTooltipSecs = 0;
    const waitSkillTooltipId = setInterval(() => {
        if (window.skillTooltip) {
            window.skillTooltip.bind("skill", ".searchable_input");
            window.skillTooltip.bind("skill", document.body, ".searchable_li");
        }
        if (++waitingSkillTooltipSecs >= 30 || window.skillTooltip) {
            clearInterval(waitSkillTooltipId);
        }
    }, 1000);
  }
})(jQuery);