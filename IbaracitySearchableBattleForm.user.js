// ==UserScript==
// @name         IbaracitySearchableBattleForm
// @namespace    https://twitter.com/lv0_murabito
// @version      0.8.2
// @description  騒乱イバラシティ(http://lisge.com/ib/)の戦闘画面にある入力フォームに絞り込み機能を追加する機能です。
// @author       lv0_murabito
// @match        http://lisge.com/ib/act_battle.php
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  const $ = window.jQuery;
  const skillList = [];
  let filterdSkillList = [];
  const inputCount = 12;
  let elemetIndex;

  function updateList(e, formId, ul){
    $(`#${formId} option`).attr("selected", false);
    $(`#${formId}`).val(String(e.target.dataset.value));
    $(`#${formId}`).trigger('change');
    const InputId = formId.replace(/dt_skill/,'inputform_');
    $(`#${InputId}`).val('').attr('placeholder',e.target.textContent);
    ul.empty();
  }

  function displayForm(id){
    const ul = $('#'+id).next();
    const formId = id.replace(/inputform_/,'dt_skill');
    ul.empty();
    filterdSkillList.map(item => {
      let chcecked = $('#'+formId).val() === item.value ? true : false;
      if(chcecked && item.label !== '－'){
        ul.append(`<li><a class="searchable_li searchable_li--select">✓${item.label}</a></li>`);
      } else {
        ul.append(`<li><a class="searchable_li" data-value="${item.value}">${item.label}</a></li>`);
      }
    });
    $('.searchable_li').on('click', event => {updateList(event, formId, ul)}).hover(function(){
      $(this).css({ 'color': '#220','background':'#aaa'});
    }, function() {
      $(this).css({ 'color': '#220','background':'#c6c6c3'});
    });
    $('.searchable_li--select').css({'font-weight':'bold'});
    $(document).on('click', event => {
  　　if(
        !$(event.target).closest('.searchable_ul').length &&
        !$(event.target).closest('.searchable_input').length
      ) {
    　　ul.empty();
  　  }
　　});
  }

  function filter(value) {
    if(value.length){
      filterdSkillList = skillList.filter(skill => skill.label.match(value));
    } else {
      filterdSkillList = skillList;
    }
  }

  function updateValue(e) {
    filter(e.target.value);
    displayForm(e.target.id);
  }

  function addInput(formIndex, inputIndex) {
    const placeholder = skillList.filter(item => item.value === $(`#dt_skill${elemetIndex}`).val())[0].label;
    $(`#dt_skill${elemetIndex}`).after(
      `<input type="text" class="searchable_input" id="inputform_${elemetIndex}" placeholder="${placeholder}"></input>`+
      `<ul id="ul_${elemetIndex}" class="searchable_ul"></ul>`
    );
     $(`#inputform_${elemetIndex}`).on('input focusin',event => { updateValue(event)});
  }

  function changeTab(e) {
    const formIndex = Number(e.target.textContent.replace(/設定/,''));
    for(let i = 1; i <= inputCount; i++) {
      elemetIndex = `${formIndex}-${i}`;
      addInput(formIndex,i);
      $(`#dt_skill${elemetIndex}`).css({'display':'none'});
    }
  }

  function init() {
    const select = $("#dt_skill1-1");
    select.children('option').map((i, option) => {
      skillList.push({
        id:i,
        value:option.value,
        label:option.text,
        checked: false,
      });
    });
    const formIndex =$('.BUTT0')[0].textContent.replace(/設定/,'');
    for(let i = 1; i <= inputCount; i++) {
      elemetIndex =`${formIndex}-${i}`;
      addInput(formIndex,i);
      $(`#dt_skill${elemetIndex}`).css({'display':'none'});
    }
    $('body').append(
        '<style>'+
        '.searchable_input {position: absolute;top: 2px;left: 20px;width: 65%;height: 18px;background: #C6C6C3;z-index: 1;font-weight: bold;color: #220;font-size: 16px;}'+
        '.searchable_input::placeholder {font-weight: bold; color: #220;font-size: 16px;opacity: 1;}'+
        '.searchable_ul {overflow-y: auto;max-height: 300px;position: absolute;top: 26px;left: 22px;width: 66%;color: #000;background: #C6C6C3;font-size: 14px;list-style-type: none;padding: 0;border: 0;margin: 0;z-index: 10}'+
        '.searchable_li {display: block;z-index: 100;cursor: pointer}'+
        '.searchable_li--select {font-weight :bold}'+
        '</style>'
    );
    $(".LITEM").css({'position':'relative'});
    $('.BUTT2').on('click',function _handleClick(e){ changeTab(e); $(this).off("click", _handleClick)});
  };
  init();
})();
