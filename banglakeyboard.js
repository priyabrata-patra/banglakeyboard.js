/*-----------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------

	      **** ENGLISH TO BANGLA CONVERT KEYBOARD JAVASCRIPT PROGRAM ****

  [USE PROCESS] -> Just include this file within the <head> section of your HTML code 
                   and add 'bengalikeyboard' as a attribute to any <input> or <textarea> 
                   field where you want to type in English and get Bengali output.
                   example - <input type="text" id="fname" bengalikeyboard>
                             <textarea id="id_name" name="test" bengalikeyboard></textarea> 
	 
-------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------*/

window.onload = function() {
		const avroValues = {k: 'ক', kh: 'খ', g: 'গ', gh: 'ঘ', Ng: 'ঙ', c: 'চ', ch: 'ছ', j: 'জ', jh: 'ঝ', NG: 'ঞ', T: 'ট', Th: 'ঠ', D: 'ড', Dh: 'ঢ', N: 'ণ', t: 'ত', th: 'থ', d: 'দ', dh: 'ধ', n: 'ন', p: 'প', ph: 'ফ', f: 'ফ', b: 'ব', bh: 'ভ', v: 'ভ', m: 'ম', z: 'য', r: 'র', rr: 'র', l: 'ল', sh: 'শ', S: 'শ', Sh: 'ষ', s: 'স', h: 'হ', R: 'ড়', Rh: 'ঢ়', y: 'য়', Y: 'য়', 't\`\`': 'ৎ', ng: 'ং', '\:': 'ঃ', '\^': 'ঁ', J: 'জ', o: ['অ', '‌'], a: ['আ', 'া'], A: ['আ', 'া'], i: ['ই', 'ি'], I: ['ঈ', 'ী'], u: ['উ', 'ু'], U: ['ঊ', 'ূ'], rri: ['ঋ', 'ৃ'], e: ['এ', 'ে'], E: ['এ', 'ে'], OI: ['ঐ', 'ৈ'], O:['ও', 'ো'], OU: ['ঔ', 'ৌ'], W: 'ব', Z: 'য', '\,': '\,', '\,\,': '্', '\.': '।', '$': '৳', '\:\`': ':', '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', x: 'এক্স', X: 'এক্স', q: 'ক', w: 'ব', ';': ';', '\'': '\'', '\"': '\"', '/': '/', '?': '?', '\\': '\\', '|': '|', '[': '[','{': '{', ']': ']','}': '}','-': '-','=': '=','_': '_','+': '+', '\`': '~','~': '~','!': '!', '@': '@', '#': '#','%': '%','&': 'ও', '*': '*', '(': '(', ')': ')', '': '', '\.\.\.': '\.', '\/\/': '\:', B: 'ব', K: 'ক', KH: 'খ', G: 'গ', GH: 'ঘ', C: 'চ', CH: 'ছ', P: 'প', PH: 'ফ', F: 'ফ', BH: 'ভ', V: 'ভ', M: 'ম', L: 'ল', H: 'হ'};
		const engKeybordWord = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		const inputTag = document.querySelectorAll('input,textarea');
		const key = 'hello';
		let activeTag = 0;
		let inputField = inputTag[activeTag];
		let keyData = '';
		let subKeyData = '';
		let banSubKeyData = '';
		let banglaWord = [];
		let firstOn;
		let banglaWordActive;
		let bengaliKeyboardOn = 1;
		let juktakkor = 0;
		let shiftKeyPressNumber = 0;
		let ctrlKeyPressNumber = 0;
		let engValuesEnd = 0;
		let oneRun = 0;
		let clearFirstOn;
		let oneTime = 1;

        //Get All input Tag
		for (let i = 0; i < inputTag.length; i++) {
			banglaWord.push('nullTag');
			inputTag[i].setAttribute('index', i);
			//chake bankey attributes
			for (let j = 0; j < inputTag[i].attributes.length; j++) {
				if (inputTag[i].attributes[j].nodeName === 'bengalikeyboard') {
					//Set Data in Array [Input Tage Name, Main Data, Tage Location]
					banglaWord.splice(i, 1, [[inputTag[i].tagName], [], [i]]);
					//autocomplete off
					inputTag[i].setAttribute('autocomplete', 'off');
					//value none
					inputTag[i].value = '';
					//set frist activeTag
					if (oneTime) {
						oneTime = 0;
						activeTag = i;
						inputField = inputTag[activeTag];
					}
				}
			}
		}

		if (banglaWord.length>1) banglaWordActive = banglaWord[activeTag][1];

		//Set active tag value
		document.addEventListener('click', setActiveValue);
		document.addEventListener('keyup', setActiveValue);
		function setActiveValue(e) {
			const activeTagClick = document.activeElement;
			const tagIndex = Number(activeTagClick.getAttribute('index'));
			const userPressKey = e.which;

			for (let i = 0; i < banglaWord.length; i++) {
				if (Number.isFinite(banglaWord[i][2][0]) && banglaWord[i][2][0] === tagIndex) {
					activeTag = tagIndex;
					banglaWordActive = banglaWord[activeTag][1];
					inputField = inputTag[activeTag];
					if (userPressKey === 9 || userPressKey === 1) {
						fullAllNew();
						//print massage first time
						if (!localStorage.getItem('keyboardMassageSee')) {
							massageShow('press two time Shift key to change keyboard');
							localStorage.setItem('keyboardMassageSee', 'ok');
						}

					}
					break;
				}else{
					activeTag = 'notClick';
				}
			}

		}

		//copy to run function
		for (let i = 0; i < inputTag.length; i++) {
			for (let j = 0; j < inputTag[i].attributes.length; j++) {
				if (inputTag[i].attributes[j].nodeName === 'bengalikeyboard') {
					inputTag[i].addEventListener('copy', function() {
						banglaWordActive[0][1] = 0;
						banglaWordActive[inputField.selectionEnd - (1+numberOfHosonta(inputField.value, inputField.selectionEnd))][1] = 1;
						banglaWord[activeTag][1] = banglaWordActive;
						firstOn = 0;
					});
				}
			}
		}

		for (let i = 0; i < inputTag.length; i++) {
			for (let j = 0; j < inputTag[i].attributes.length; j++) {
				if (inputTag[i].attributes[j].nodeName === 'bengalikeyboard') {
					inputTag[i].addEventListener('cut', function() {
						banglaWordActive[0][1] = 0;
						banglaWordActive[inputField.selectionEnd - (1+numberOfHosonta(inputField.value, inputField.selectionEnd))][1] = 1;
						banglaWord[activeTag][1] = banglaWordActive;
						firstOn = 0;
						alert('Cut Not available');
						showData();
					});
				}
			}
		}

		for (let i = 0; i < inputTag.length; i++) {
			for (let j = 0; j < inputTag[i].attributes.length; j++) {
				if (inputTag[i].attributes[j].nodeName === 'bengalikeyboard') {
					inputTag[i].addEventListener('paste', function(event) {
						alert('Paste Not available');
						event.preventDefault();
					});
				}
			}
		}


		//English To Bangla Function CALL Function
		document.addEventListener('keyup', putEngValues);
		function putEngValues(e) {
			let userDAta = inputField.value;
			const useKey = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 220, 221, 219, 80, 79, 73, 85, 89, 84, 82, 69, 87, 81, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 191, 190, 188, 77, 78, 66, 86, 67, 88, 90, 32];
			const userPressKey = e.which;

			//Check shift key press
			if (userPressKey === 16 && activeTag !== 'notClick') {
				shiftKeyPressNumber++;
			}else{
				shiftKeyPressNumber = 0;
			}

			//Keyboard change english to bangla and bangla to english
			if (shiftKeyPressNumber > 1) {
				shiftKeyPressNumber = 0;
				fullAllNew();

				if (bengaliKeyboardOn) {
					bengaliKeyboardOn = 0;
					massageShow('Your Keyboard change BENGALI to ENGLISH');
				}else{
					bengaliKeyboardOn = 1;
					engValuesEnd = inputField.selectionStart;
					massageShow('Your Keyboard change ENGLISH to BENGALI');
				}
			}

			//massage remove
			if (userPressKey === 17 && document.getElementById('massageDiv')) {
				massageOff();
				ctrlKeyPressNumber = -1;
			}

			//show helpbox
			if (userPressKey === 17 && activeTag !== 'notClick') {
				ctrlKeyPressNumber++;
			}else{
				ctrlKeyPressNumber = 0;
			}

			//show helpbox
			if (ctrlKeyPressNumber > 1) {
				helpBox();
				ctrlKeyPressNumber = 0;
			}
			
			//contol extra key
			if (isMobile()) {
				clearFirstOn = 0;
				callFunction(userDAta);
				showData();
			}else{
				for (let i = 0; i < useKey.length; i++) {
					if (useKey[i] === userPressKey) {
						clearFirstOn = 0;
						callFunction(userDAta);
						showData();
						break;
					}
				}
			}

		}

		function isMobile() {
			const userAgent = navigator.userAgent || navigator.vendor || window.opera;
			const mobileOs = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(userAgent);

			if (mobileOs) {
				return true;
			}else{
				return false;
			}

		}

		//funtion call and set new line
		document.addEventListener("keydown", call);
		function call(e) {
			const userPressKey = e.which;

			//clear funtion run
			if (userPressKey === 8) {
				clear(inputField.selectionStart);
			}

			//SET NEW LINE
			//Off New line in Input tag
			if (Number.isFinite(activeTag) && banglaWord[activeTag][0][0] !== 'INPUT') {
				//Set New line in textarea tag
				if (userPressKey === 13) {
					if (firstOn !== 1 && banglaWordActive.length>0) {
						banglaWordActive.splice(cursorPositionChake()[0] + 1, 0, ['\r\n', 1]);
						banglaWordActive[cursorPositionChake()[0]][1] = 0;

					}else{
						banglaWordActive.splice(cursorPositionChake()[0], 0, ['\r\n', 1]);
						firstOn = 0;
					}
					fullAllNew();
				}
			}

		}

		//clear function for all
		function clear(cursor) {
			const cur = inputField.selectionStart - 2;
			let valueData = dataLocation(inputField.value[cur + 1]) ?? '1';

			if (cur < -1) {
				return;
				
			}

			if (numberOfHosonta(inputField.value, cursor)) {

				if (valueData.length > 1) {

					if (inputField.value[cur] === '্') {
						addData(avroValues['\,\,'] + avroValues[dataLocation(inputField.value[cur + 1])[0]]);
					}else{
						addData(avroValues[dataLocation(inputField.value[cur + 1])[0]]);
					}

					banglaWordActive.splice(cursor - (numberOfHosonta(inputField.value, cursor) +1), 1);

				}else{
					banglaWordActive.splice(cursor - (numberOfHosonta(inputField.value, cursor) +1), 1);
				}
			}else{
				if (valueData.length > 1) {
					if (inputField.value[cur] === '্') {
						addData(avroValues['\,\,'] + avroValues[dataLocation(inputField.value[cur + 1])[0]]);
					}else{
						addData(avroValues[dataLocation(inputField.value[cur + 1])[0]]);
					}
					banglaWordActive.splice(cursor - 1, 1);
				}else{
					banglaWordActive.splice(cursor - 1, 1);
				}
			}

			if (cur > -1) {
				firstOn = 0;
				if (valueData.length === 1) banglaWordActive[cur - numberOfHosonta(inputField.value, cursor)][1] = 1;
				if (chakDa(inputField.value[cur + 1])) {
					keyData = dataLocation(inputField.value[cur]);
					subKeyData = '';
					banSubKeyData = '';
				}else{
					fullAllNew();
				}

			}else{

				firstOn = 1;
				fullAllNew();
				if (!curcosOne()) clearFirstOn = 1;

			}

			//frist data set one
			if (banglaWordActive.length === 1) {
				banglaWordActive[0][1] = 1;
			}

			banglaWord[activeTag][1] = banglaWordActive;

		}

		//massage show
		function massageShow(data) {
			if (document.getElementById('massageDiv')) {
				massageOff();
				setTimeout(function() {
					massageCreate(data);
			    }, 143);
			}else{
				massageCreate(data);
			}
		}

		//help data
		function helpBox() {
			const core = [[[['ক - k']], ['ট - T'], [['প - p']], ['স - s'], ['(অ, ) - o'], ['(ঔ, ৌ) - OU'], ['০ - 0']], [[['খ - kh']], ['ঠ - Th'], [['ফ - ph, f']], [['হ - h']], [['(আ, া) - a']], [['ব-ফলা - b, w']], ['১ - 1']], [[['গ - g']], ['ড - D'], [['ব - b, w']], ['ড় - R'], ['(ই, ি) - i'], [['য-ফলা - z, Z']], ['২ - 2']], [[['ঘ - gh']], ['ঢ - Dh'], [['ভ - bh, v']], ['ঢ় - Rh'], ['(ঈ, ী) - I'], ['র-ফলা - r, rr'], ['৩ - 3']], [['ঙ - Ng'], ['ণ - N'], [['ম - m']], [['য় - y']], ['(উ, ু) - u'], ['রেফ - r, rr'], ['৪ - 4']], [[['চ - c']], ['ত - t'], [['য - z']], ['ৎ - t``'], ['(ঊ, ূ) - U'], ['হসন্ত - ,,'], ['৫ - 5']], [[['ছ - ch']], ['থ - th'], ['র - r, rr'], ['ং - ng'], ['(ঋ, ৃ) - rri'], ['দাড়ি(।) - .'], ['৬ - 6']], [[['জ - j']], ['দ - d'], [['ল - l']], [['ঃ - :']], ['(এ, ে) - e'], ['৳-টাকা - $'], ['৭ - 7']], [['ঝ - jh'], ['ধ - dh'], ['শ - sh, S'], [['ঁ - ^']], ['(ঐ, ৈ) - OI'], ['. (ডট) - ...'], ['৮ - 8']], [['ঞ - NG'], ['ন - n'], ['ষ - Sh'], ['জ - j, J'], ['(ও, ো) - O'], [':(কোলন) - // or :`'], ['৯ - 9']], [decode('1830988431156499642266520104725598000810087280432379423123307949880619861132309770001477781981287280432379427247655628145269727354027825185597518103839331911772389596556281452697240249579503564172114012010472559800088406661098413898590958393319117723483530794988061986079940278251855975168092010472559800073610794988061986113230977000147778190730794988061986490525562814526972402495795035641720825707949880619861132309770001477782221720104725598000736107949880619864905255628145269820198087667684390942812010472559800088406661098413898563216144362207887642120460263941767277033043944971821956490794988061986113230977000147778222172010472559800073610794988061986749453219745685448553673829353849014816738293538490148167382935384903886002072286034715670769457082592045164459415358985478081079498806198609288666109841389856691511088979586639361321974568544095229761515649964221103560681177832920124594153589855748090541952723688490909184')]];
			const div = document.createElement('div');
			const div2 = document.createElement('div');
			const parentElement = inputField.parentNode;
			const computedStyle = getComputedStyle(inputField);
			const tableDiv = document.createElement('div');
			const box = document.createElement('div');
			const text = document.createElement('div');

			//div main
			div.setAttribute('id', 'massageDiv');
			div.style.border           = computedStyle.border;
			div.style.padding          = '6px';
			div.style.marginLeft       = computedStyle.marginLeft;
			div.style.transition       = 'width 0.1s ease-in-out';
			div.style.backgroundColor  = '#FFFF0040';
			div.style.width            = computedStyle.width;

			//div text
			text.innerText             = 'Keymap (green letters Not case sensitive)';
			box.appendChild(text);

			//div 2
			div2.innerText             = 'X';
			div2.style.border          = computedStyle.border;
			div2.style.paddingLeft     = '3.5px';
			div2.style.paddingRight    = '3.5px';
			div2.style.marginLeft      = 'auto';
			div2.style.fontFamily      = 'sans-serif';
			div2.style.cursor          = 'pointer';
			div2.style.height          = '17px';
			div2.style.backgroundColor = '#E41B17';
			div2.setAttribute('onclick', `let div = document.getElementById('massageDiv');div.innerHTML = '';div.style.width = '0px';setTimeout(function() {div.remove();}, 140);`);

			box.style.display          = 'flex';
			box.style.width            = '100%';

			box.appendChild(div2);
			div.appendChild(box);

			//tableDiv
			tableDiv.style.padding     = '4px';
			div.appendChild(tableDiv);

			//t d ....
			const table = document.createElement('table');
			for (let i = 0; i< core.length; i++) {
				const row = document.createElement('tr');

				for (let j = 0; j< core[i].length; j++) {
					const td = document.createElement('td');

					//d t
					if (core[i].length === 1) {
						td.setAttribute('colspan', '7');
						td.setAttribute('style', 'color : #800000; text-align : center');
					}
					if (Array.isArray(core[i][j][0])) {
						td.innerText = core[i][j][0];
						td.setAttribute('style', 'color : green;');
						td.style.border = '1px solid black';
						td.style.padding = '3.5px';
					}else{
						td.innerText = core[i][j];
						td.style.border = '1px solid black';
						td.style.padding = '3.5px';
					}
					row.appendChild(td);
				}

				table.appendChild(row);

			}

			//table css add
			table.style.backgroundColor = '#E1EBEE';
			table.style.width           = '100%';
			table.style.borderCollapse  = 'collapse';
			table.style.border          = '1px solid black';
			tableDiv.appendChild(table);

			//add div before the input element
			parentElement.insertBefore(div, inputField);

		}

		//massage create
		function massageCreate(data) {
			const div = document.createElement('div');
			const div2 = document.createElement('div');
			const parentElement = inputField.parentNode;
			const computedStyle = getComputedStyle(inputField);
			const mass = document.createElement('div');
			const box = document.createElement('div');
			const text = document.createElement('div');

			//div animation
			div.style.width = '0px';

			//text div
			text.style.display          = 'flex';

			setTimeout(function() {
				div.style.width = computedStyle.width;
				text.innerText = data;
				box.appendChild(text);
			}, 140);

			//set data in div
			div.setAttribute('id', 'massageDiv');
			//add css in div
			div.style.border           = computedStyle.border;
			div.style.padding          = '6px';
			div.style.marginLeft       = computedStyle.marginLeft;
			div.style.display          = 'flex';
			div.style.transition       = 'width 0.1s ease-in-out';
			div.style.backgroundColor  = '#FFFF0040';

			//massage div
			mass.style.color           = 'red';
			mass.style.float           = 'right';
			mass.style.fontSize        = '80%';
			mass.style.marginRight     = '24px';

			//box div
			box.style.width = '100%';

			setTimeout(function() {
				box.appendChild(mass);
		    }, 141);

			//div 2
			div2.innerText             = 'X';
			div2.style.border          = computedStyle.border;
			div2.style.paddingLeft     = '3.5px';
			div2.style.paddingRight    = '3.5px';
			div2.style.marginLeft      = 'auto';
			div2.style.fontFamily      = 'sans-serif';
			div2.style.cursor          = 'pointer';
			div2.style.height          = '17px';
			div2.style.backgroundColor = '#E41B17';
			div2.setAttribute('onclick', `let div = document.getElementById('massageDiv');div.innerHTML = '';div.style.width = '0px';setTimeout(function() {div.remove();}, 140);`);
			
			setTimeout(function() {
				//mass.innerText = 'press ctrl key for remove this message';
				div.appendChild(box);
				text.appendChild(div2);
		    }, 142);
		    setTimeout(function() {
				mass.innerText = 'press ctrl key for remove this message';
		    }, 290);

			//add div before the input element
			parentElement.insertBefore(div, inputField);

		}

		//massage show off
		function massageOff() {
			let div = document.getElementById('massageDiv');
			div.innerHTML = '';
			div.style.width = '0px';
			setTimeout(function() {div.remove();}, 140);
		}

		//chake cursor 1
		function curcosOne() {
			let data = 0;
			for (let i = 0; i < banglaWordActive.length; i++) {
				if (banglaWordActive[i][1]) {
					data = 1;
				}
			}
			return data;
		}

		//chake key data
		function chakDa(data) {
			if (data === '‌' || data === 'া' || data === 'ি' || data === 'ী' || data === 'ু' || data === 'ূ' || data === 'ৃ' || data === 'ে' || data === 'ৈ' || data === 'ো' || data === 'ৌ') {
				return 1;
			} else {
				return 0;
			}
		}

		//function return data value
		function dataLocation(data) {
			for(let value in avroValues){
				if (avroValues[value] === data) {
					return value;
				}
			}
		}

		//control two number in word and call fun engtoben
		function callFunction(data) {
			let last = inputField.selectionStart;

			if (engWordArray(data, engValuesEnd, last).length>1 && bengaliKeyboardOn) {
				oneRun = 1;
				
				for (let i = 0; i < engWordArray(data, engValuesEnd, last).length; i++) {

					data += engWordArray(data, engValuesEnd, last)[i];
					callEngToBan(data, engWordArray(data, engValuesEnd, last).length - (i+1));

				}

			}else{
				//one eng data
				if (!oneRun) {
					callEngToBan(data, 0);
				}else{
					oneRun = 0;
				}

			}

		}

		//chake eng data
		function engWordArray(data, frist, lest) {
			let wordAdd = [];
			const word = data.split('').slice(frist, lest).reverse();
			
			for (let i = 0; i < word.length; i++) {
				if (engWord(word[i])) {
					wordAdd.push(word[i]);
				}else{
					break;
				}
			}
			wordAdd = wordAdd.reverse()
			return wordAdd;
		}

		//chake eng word values
		function engWord(data) {
			for(let value in engKeybordWord){
				if (engKeybordWord[value] === data) {
					return true;
				}
			}
		}

		//chake hosonta in word of cursor ponenter
		function numberOfHosonta(data, cursor) {
			let number = 0;
			for(let value in data){
				if (cursor > value) {
					if (data[value] === '্') {
						number++;
					}
				}
			}
			return number;
		}

		//Set Custom Curser (1)
		document.addEventListener('keyup', setMoveCursorKeyup);
		function setMoveCursorKeyup(e) {
			const userPressKey = e.which;
			const start = inputField.selectionStart - (1 + numberOfHosonta(inputField.value, inputField.selectionStart));

			if (!Number.isFinite(activeTag)) {
				return;
			}

			//clear funtion run show data
			if (userPressKey === 8) {
				showData();
			}

			//set custom curser
			if (userPressKey === 37 || userPressKey === 38 || userPressKey === 39 || userPressKey === 40) {
				for (let i = 0; i < banglaWordActive.length; i++) {
					banglaWordActive[i][1] = 0;
				}

				if (start !== -1) {
					banglaWordActive[start][1] = 1;
					firstOn = 0;
				}else{
					firstOn = 1;
					banglaWordActive[0][1] = 1;
				}
				fullAllNew();

			}

		}

		//Set Custom Curser (2)
		document.addEventListener('click', setMoveCursorCilck);
		function setMoveCursorCilck(e) {
			const start = inputField.selectionStart - (1 + numberOfHosonta(inputField.value, inputField.selectionStart));

			if (!Number.isFinite(activeTag)) {
				return;
			}

			//set custom curser
			if (banglaWordActive.length>1) {
				for (let i = 0; i < banglaWordActive.length; i++) {
					banglaWordActive[i][1] = 0;
				}

				if (start !== -1) {
					banglaWordActive[start][1] = 1;
					firstOn = 0;
				}else{
					firstOn = 1;
					banglaWordActive[0][1] = 1;
				}
				fullAllNew();

			}
			
		}

		//soroborno chak and some data
		function soroborno(data) {
			if (data === 'o' || data === 'a' || data === 'A' || data === 'i' || data === 'I' || data === 'u' || data === 'U' || data === 'rri' || data === 'e' || data === 'E' || data === 'OI'  || data === 'O' || data === 'OU' || data === 'ng' || data === '\:\`') {
				return 1;
			} else {
				return 0;
			}

		}

		function decode(text){
			let data = '';
			text = String(BigInt(text) / BigInt(keySet(key)));
			decodeText = text.split('33124');

			for(let i = 0; i<decodeText.length-1; i++){
				data += String.fromCharCode(decodeText[i]/keySet(key));
			}

			return data;

		}

		function keySet(key) {
			let data = 1;

			for(let value in key){
				data *= key.charCodeAt(value);
			}
			return data;	
		}

		//contole not hasanta
		function notHasanta(data) {
			const hArray = ['y', 'Y', '<', '\,', '>', '\.', '?', '/', ':', '\;', '\"', '\'', '|', '\\', '}', ']', '[', '{', '=', '\+', '-', '_', '~', '\`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ')', '(', '*', '&', '^', '%', '$', '@', '!', '#'];
			for (let i = 0; i < hArray.length; i++) {
				if (hArray[i] === data) {
					return true;
					break;
				}

			}
		}

		//full on start new function
		function fullAllNew() {
			juktakkor = 0;
			keyData = '';
			subKeyData = '1';
			banSubKeyData = '';
		}


		//English To Bangla Convert Function (MAIN)
		function callEngToBan(values, manyDataCursor) {
			const cursorPosition = inputField.selectionStart - manyDataCursor;
			const data = values[cursorPosition -1];

			//undefined values contole
			if (typeof data === 'undefined') {
				return;
			}

			//ActiveTag not number / ActiveTag not set
			if (!Number.isFinite(activeTag)) {
				return;
			}

			//chake bengali Keyboard off or on
			if (bengaliKeyboardOn) {
				//CONVERT ENGLISH TO BENGLA//
				//last data set to keyData
				if (chakeArrayValue(data)) {
					keyData += data;

				}

				//CHAKE FIRST SOME DATA
				//cake on second (ঐ)
				if (subKeyData === 'O' && keyData === 'I') {
					addData(avroValues['OI'][1]);
					banglaWordActive.splice(cursorPositionChake()[0] -1, 1);
					banglaWord[activeTag][1] = banglaWordActive;
					keyData = '';
					return;

				} else if (subKeyData === 'O' && keyData === 'U') {
				    //cake on second (ঔ)
					addData(avroValues['OU'][1]);
					banglaWordActive.splice(cursorPositionChake()[0] -1, 1);
					banglaWord[activeTag][1] = banglaWordActive;
					keyData = '';
					return;

				} else if (banSubKeyData && keyData === 'rri') {
				    //cake on second (কৃ)
					addData(avroValues['rri'][1]);
					banglaWordActive.splice(cursorPositionChake()[0] -1, 1);
					banglaWord[activeTag][1] = banglaWordActive;
					banSubKeyData = '';
					keyData = '';
					return;

				} else if ((banSubKeyData === '\`' || banSubKeyData === 't\`') && keyData === '\`\`') {
				    //cake on second (ৎ)
					addData(avroValues['t\`\`']);
					banglaWordActive.splice(cursorPositionChake()[0] -2, 2);
					banglaWord[activeTag][1] = banglaWordActive;
					fullAllNew();
					return;

				} else if (keyData === '\,\,') {
					//cake on second (হসন্ত)
					addData(avroValues['\,\,'] + '‌');
					banglaWordActive.splice(cursorPositionChake()[0] -1, 1);
					banglaWord[activeTag][1] = banglaWordActive;
					fullAllNew();
					return;
				} else if (values.slice(cursorPosition - 3, cursorPosition) === '\।\।\.') {
					//... = . 
					addData(avroValues['\.\.\.']);
					banglaWordActive.splice(cursorPositionChake()[0] -2, 2);
					banglaWord[activeTag][1] = banglaWordActive;
					fullAllNew();
					return;
				} else if ((banSubKeyData === '\/' || !banSubKeyData) && keyData === '\/\/') {
					//'' =:
					addData(avroValues['\/\/']);
					banglaWordActive.splice(cursorPositionChake()[0] -1, 1);
					banglaWord[activeTag][1] = banglaWordActive;
					fullAllNew();
					return;
				}

				//contorl every word
				if (data !== ' ') {
					//contorl friest latter
					if (chakeArrayValue(keyData)) {
						//chake soroborno first letters
						if (soroborno(keyData)) {
							//chake letters slice or not slice
							if ((banglaWordActive.length && banglaWordActive[cursorPositionChake()[0]][0] !== ' ' && !subKeyData) || (keyData === 'OI' || keyData === 'OU')) {
								addData(avroValues[keyData][0]);
								banglaWordActive.splice(cursorPositionChake()[0] -1, 1);
								banglaWord[activeTag][1] = banglaWordActive;

							}else{
								addData(avroValues[keyData][0]);
								subKeyData = '';
							}
							juktakkor = 1;

						}else{
							//chake banjonborno friest letters
							if (banglaWordActive.length && banglaWordActive[cursorPositionChake()[0]][0] !== ' ' && !subKeyData) {
								//contole juktakkor letter
								if (juktakkor) {
									addData(avroValues['\,\,'] + avroValues[keyData]);
								}else{
									addData(avroValues[keyData]);
								}

								banglaWordActive.splice(cursorPositionChake()[0] -1, 1);
								banglaWord[activeTag][1] = banglaWordActive;

							}else{
								addData(avroValues[keyData]);
								if (notHasanta(keyData)) {
									juktakkor = 1;
								}
								subKeyData = '';
								
							}

						}

					}else{
						//CONTOEL WORD SECOND LETTERS
						//Contorl soroborno second letters
						if (soroborno(keyData[(keyData.length)-1])) {
							addData(avroValues[keyData[(keyData.length)-1]][1]);
							subKeyData += keyData[(keyData.length)-1];
							keyData = '';

						}else{
							banSubKeyData += keyData[(keyData.length)-1];

							//Contorl banjonborno second letters
							//juktakor contol
							if (juktakkor && !notHasanta(keyData[(keyData.length)-1])) {
								addData(avroValues[keyData[(keyData.length)-1]]);
							    keyData = keyData[(keyData.length)-1];
							    juktakkor = 0;

							}else{
								//hasantaOff contol
							 	if (notHasanta(keyData[(keyData.length)-1])) {
							 		addData(avroValues[keyData[(keyData.length)-1]]);
							        keyData = keyData[(keyData.length)-1];

							 	} else {
							 		addData(avroValues['\,\,'] + avroValues[keyData[(keyData.length)-1]]);
							        keyData = keyData[(keyData.length)-1];

							 	}
							 	juktakkor = 1;

							}
						}
					}

				}else{
					addData(' ');
					keyData = '';
					juktakkor = 0;
					banSubKeyData = '';

				}


			}else{
				addData(data);

			}

		}

		//chake array values
		function chakeArrayValue(data) {
			for(let value in avroValues){
				if (value === data) {
					return true;
				}
			}
		}


		//Data Show Function
		function showData() {
			//show data
			inputField.value = dataRemoveToArray();

			//set cursor with position
			let positionCur = (cursorPositionChake()[0] + 1) + cursorPositionChake()[1];
			if (clearFirstOn) {
				inputField.setSelectionRange(0 , 0);
			}else{
				inputField.setSelectionRange(positionCur , positionCur);
			}

		}

		//remove data in banglaWord [activeTag] array
		function dataRemoveToArray() {
			let data = '';
			for (let i = 0; i < banglaWordActive.length; i++) {
				data += banglaWordActive[i][0];

			}
			return data;
		}

		//chake cursor position
		function cursorPositionChake() {
			let position = 0;
			let hosontaWord = 0;
			
			for (let i = 0; i < banglaWordActive.length; i++) {
				if (banglaWordActive[i][0].slice(0, 1) === '্') {
					hosontaWord++;
				}
				if (banglaWordActive[i][1] === 1){
					position = i;
					break;
				}
			}
			return [position, hosontaWord];
		}

		//Add Data in cursor position
		function addData(data) {
			//ActiveTag not number and undefined number
			if (!Number.isFinite(activeTag) || typeof data === 'undefined') {
				return;
			}

			//set data in cursor position
			if(firstOn === 1){
				banglaWordActive.unshift([data, 1]);

			}else if (banglaWordActive.length<1 || banglaWordActive[banglaWordActive.length - 1][1] === 1){
				banglaWordActive.push([data, 1]);

			}else{
				banglaWordActive.splice(cursorPositionChake()[0] + 1, 0, [data, 1]);

			}

			//Previous cursor position set 0
			if (banglaWordActive.length>1 && firstOn === 0) {
				banglaWordActive[cursorPositionChake()[0]][1] = 0;
				
			}else{
				firstOn = 0;
				for (let i = 1; i < banglaWordActive.length; i++) {
					banglaWordActive[i][1] = 0;
				}
				
			}

		}

};