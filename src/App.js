import { useState } from 'react';
import './App.css';

function App() {
  let [input1, setInput1] = useState(false);
  let [input2, setInput2] = useState(false);
  let [input3, setInput3] = useState(false);
  let [input4, setInput4] = useState(false);
  let [input5, setInput5] = useState(false);

  let [answer1, setAnswer1] = useState(false);
  let [answer2, setAnswer2] = useState(false);
  let [answer3, setAnswer3] = useState(false);
  let [answer4, setAnswer4] = useState(false);

  let [sum, setSum] = useState(0);
  let [disabled, setDisabled] = useState(true);
  let [result, setResult] = useState(null);

  let getAnswer = () => {
    let court = "неизвестно";
    let place = "по месту неизвестно";
    let price = 0;
    
    if(input2 || (input4 && sum > 50000) || input5) {
      court = "районный суд"
    } else if (input1 || input3 || (input4 && sum <= 50000)) {
      court = "мировой суд"
    }

    if((answer1 && !input3)) {
      place = "по месту жительства второго супруга"
    } else if (answer2) {
      place = "по месту нахождения имущества второго супруга или по последнему известному месту жительства в Российской Федерации"
    } else if ((answer1 && input3) || answer3 || answer4 || input5) {
      place = "по вашему месту жительства или месту жительства вашего супруга"
    }
    
    if(input4) {
      place = "по месту нахождения недвижимого имущества"
    }

    if(input1) {
      price += 600
    }

    if(input4 && sum <= 20000) {
      price += sum * 0.04 < 400 ? 400 : sum * 0.04
    } else if(input4 && sum >= 20001 && sum <= 100000) {
      price += 800;
      price += sum * 0.03;
    } else if(input4 && sum >= 100001 && sum <= 200000) {
      price += 3200;
      price += sum * 0.02;
    } else if(input4 && sum >= 200001 && sum <= 1000000) {
      price += 5200;
      price += sum * 0.01;
    } else if(input4 && sum > 1000000) {
      price += 13200;
      price += sum * 0.005 > 60000 ? 60000 : sum * 0.005;
    }

    if(input5) {
      price += 300
    }
    
    setResult("Вам необходимо обратиться в " + court + " " + place + " и уплатить государственную пошлину в размере " + price + " рублей.");
  }

  return (
    <div className="App">
      <form action="">
        <label>Определение родовой подсудности</label>
        <span>
          <input type="checkbox" name="input1" value={input1} onClick={(e) => setInput1(!input1)}/>
          <label htmlFor="">расторжение брака при отсутствии согласия второго супруга</label>
        </span>
        <span>
          <input type="checkbox" name="input2" value={input2} onClick={(e) => setInput2(!input2)}/>
          <label htmlFor="">спор о детях</label>
        </span>
        <span>
          <input type="checkbox" name="input3" value={input3} onClick={(e) => setInput3(!input3)}/>
          <label htmlFor="">необходимость установления алиментов</label>
        </span>
        <span>
          <input type="checkbox" name="input4" value={input4} onClick={(e) => {setInput4(!input4); setDisabled(!disabled)}}/>
          <label htmlFor="">раздел совместно нажитого имущества</label>
        </span>
        <span>
          <input type="checkbox" name="ansver"/>
          <label htmlFor="" name="input5" value={input5} onClick={(e) => setInput4(!input5)}>изменить режим собственности на недвижимое имущество с совместной на долевую</label>
        </span>
        <span>
          <label htmlFor="">Сумма имущества</label>
          <input type="text" disabled={disabled} value={sum} onChange={(e) => {setSum(+e.target.value); console.log(sum, +e.target.value)}}/>
        </span>
      </form>
      <br />
      <form action="">
        <label>Определение территориальной подсудности</label>
        <span>
          <input type="radio" name="ansver" value={answer1} onClick={(e) => setAnswer1(!answer1)}/>
          <label htmlFor="">вы знаете место жительства второго супруга</label>
        </span>
        <span>
          <input type="radio" name="ansver" value={answer2} onClick={(e) => setAnswer2(!answer2)}/>
          <label htmlFor="">вы не знаете место жительства второго супруга или он проживает за пределами Российской Федерации </label>
        </span>
        <span>
          <input type="radio" name="ansver" value={answer3} onClick={(e) => setAnswer3(!answer3)}/>
          <label htmlFor="">вы знаете место жительства второго супруга, но у вас есть несовершеннолетний ребенок</label>
        </span>
        <span>
          <input type="radio" name="ansver" value={answer4} onClick={(e) => setAnswer4(!answer4)}/>
          <label htmlFor="">вы знаете место жительства второго супруга, но вам тяжело выезжать по состоянию здоровья в суд по месту жительства второго супруга</label>
        </span>
      </form>
      <br />
      <button class="btn" onClick={getAnswer}>Определить</button>
      <p>{result}</p>
    </div>
  );
}

export default App;
