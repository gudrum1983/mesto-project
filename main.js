(()=>{"use strict";var e={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__button-submit",inactiveButtonClass:"form__submit_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__error_active"},t=document.forms["profile-form"],n=document.querySelector(".card-grid"),r=document.querySelector(".popup_type_place"),o=document.forms["card-form"],a=document.forms["delete-form"],c=document.forms["avatar-form"],i=document.querySelector(".popup_type_avatar"),u=document.querySelector(".profile__avatar"),l=document.querySelector(".profile__name"),s=document.querySelector(".profile__status");function d(e,t){l.textContent=e,s.textContent=t}function f(e){u.src=e}var m=function(e){return e.ok?e.json():promise.reject("Ошибка подключения к серверу")},p=function(e){alert("Упс...что-то пошло не так! Попейте вкусного чая, а потом попробуйте снова!\nС любовью, Екатерина и команда Яндекс практикум!"),console.log("Запрос не выполнен. ".concat(e,"."))};function v(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)}function y(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function _(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?y(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}function h(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):v(t,n)}function b(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.every((function(e){return 0===e.value.length}))?(v(r,t),n.forEach((function(n){y(e,n,t)}))):(h(n,r,t),n.forEach((function(o){_(e,o,t),h(n,r,t)})))}function S(e){e.classList.remove("popup_opened"),document.removeEventListener("keyup",C),e.removeEventListener("click",q)}function q(e){var t=e.target;(t.classList.contains("popup__shadow")||t.classList.contains("popup__button-close"))&&S(e.currentTarget)}function C(e){"Escape"===e.key&&S(document.querySelector(".popup_opened"))}function L(e){e.classList.add("popup_opened"),document.addEventListener("keyup",C),e.addEventListener("click",q)}function E(e){e.textContent="Сохранить";var t=e.closest(".popup");t.querySelector(".form__admin").reset(),e.disabled=!1,S(t)}var k={baseUrl:"https://nomoreparties.co/v1/plus-cohort-25",endpointUser:"/users/me",endpointAvatar:"/users/me/avatar",endpointCards:"/cards",endpointLikes:"/cards/likes",headers:{authorization:"18a46d0a-0ce8-4b72-9f50-a83304389d2f","Content-Type":"application/json"}},g=function(e){return fetch("".concat(k.baseUrl).concat(e),{headers:k.headers}).then(m)},A=function(e,t){return fetch("".concat(k.baseUrl).concat(k.endpointLikes,"/").concat(e),{method:t?"DELETE":"PUT",headers:k.headers})},x=document.querySelector("#itemTemplate").content,U=document.querySelector(".popup_type_zoom"),T=U.querySelector(".zoom__photo"),j=U.querySelector(".zoom__caption");function O(e,t){e.forEach((function(e){!function(e,t){var r,o,a=(o=t,(r=e.likes).length>0&&r.map((function(e){return e._id})).includes(o)),c=e.owner._id===t,i=function(e,t,n,r,o,a){var c=x.cloneNode(!0),i=c.querySelector(".card__photo");i.src=t,i.alt="Визуальное отображение места - ".concat(e),i.addEventListener("click",(function(){return n=t,r=e,T.setAttribute("alt","Визуальное отображение места - ".concat(r)),T.setAttribute("src",n),j.textContent=r,void L(U);var n,r}));var u=c.querySelector(".card__like-number"),l=c.querySelector(".card__like");u.textContent=r.length,l.addEventListener("click",(function(){return function(e,t,n){var r=e.classList.contains("card__like_active");!function(e,t,n,r){A(e,r).then(m).then((function(e){n.textContent=e.likes.length,r?t.classList.remove("card__like_active"):t.classList.add("card__like_active")})).catch((function(e){p(e)}))}(n,e,t,r)}(l,u,n)})),o&&l.classList.add("card__like_active");var s=c.querySelector(".card__trash");return a?s.addEventListener("click",(function(){return function(e,t){!function(e){var t=document.querySelectorAll('[data-deleted = "true"]');t.length>=1&&t.forEach((function(e){delete e.dataset.deleted})),e.closest(".card").dataset.deleted=!0}(e);var n=document.querySelector(".popup_type_delete");n.querySelector(".form__button-submit").value=t,L(n)}(s,n)})):s.remove(),c.querySelector(".card__title").textContent=e,c}(e.name,e.link,e._id,e.likes,a,c);n.prepend(i)}(e,t)}))}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var B,D=null,P=document.querySelector(".profile__button-edit"),z=document.querySelector(".profile__button-add"),M=document.querySelector(".profile__avatar-button"),N=t.querySelector('[name="user-name"]'),I=t.querySelector('[name="user-status"]'),J=document.querySelector(".popup_type_profile"),H=o.querySelector('[name="title"]'),V=o.querySelector('[name="link-img"]'),$=c.querySelector('[name="link-avatar"]');function F(e){var t;(t=e,fetch("".concat(k.baseUrl).concat(k.endpointCards,"/").concat(t),{method:"DELETE",headers:k.headers})).then((function(e){if(!e.ok)return Promise.reject("Ошибка: ".concat(e.status));document.querySelector(".card-deleted").remove()})).catch((function(e){p(e)}))}P.addEventListener("click",(function(){N.value=l.textContent,I.value=s.textContent,b(t,e),L(J)})),z.addEventListener("click",(function(){b(o,e),L(r)})),M.addEventListener("click",(function(){b(c,e),L(i)})),t.addEventListener("submit",(function(e){e.preventDefault(),l.textContent!==N.value||s.textContent!==I.value?(e.submitter.textContent="Сохранение...",e.submitter.disabled=!0,function(e,t,n){var r,o;(r=e,o=t,fetch("".concat(k.baseUrl).concat(k.endpointUser),{method:"PATCH",headers:k.headers,body:JSON.stringify({name:r,about:o})})).then(m).then((function(e){d(e.name,e.about)})).catch((function(e){p(e)})).finally((function(){E(n)}))}(N.value,I.value,e.submitter)):S(J)})),o.addEventListener("submit",(function(e){var t,n,r,o,a;e.preventDefault(),e.submitter.textContent="Сохранение...",e.submitter.disabled=!0,t=V.value,n=H.value,r=e.submitter,(o=t,a=n,fetch("".concat(k.baseUrl).concat(k.endpointCards),{method:"POST",headers:k.headers,body:JSON.stringify({name:a,link:o})})).then(m).then((function(e){O([e],D)})).catch((function(e){p(e)})).finally((function(){E(r)}))})),a.addEventListener("submit",(function(e){e.preventDefault(),e.submitter.disabled=!1;var t=e.target.closest(".popup");F(e.submitter.value),S(t)})),c.addEventListener("submit",(function(e){var t,n,r;e.preventDefault(),e.submitter.textContent="Сохранение...",e.submitter.disabled=!0,t=$.value,n=e.submitter,(r=t,fetch("".concat(k.baseUrl).concat(k.endpointAvatar),{method:"PATCH",headers:k.headers,body:JSON.stringify({avatar:r})})).then(m).then((function(e){f(e.avatar)})).catch((function(e){p(e)})).finally((function(){E(n)}))})),B=e,Array.from(document.querySelectorAll(B.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);h(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){_(e,o,t),h(n,r,t)}))}))}(e,B)})),Promise.all([g(k.endpointUser),g(k.endpointCards)]).then((function(e){var t,n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return w(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?w(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],c=o[1];D=a._id,d((t=a).name,t.about),f(t.avatar),O(c.reverse(),D)})).catch((function(e){p(e)}))})();