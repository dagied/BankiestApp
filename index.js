// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movementDates:
              [
              '2019-11-18T21:31:17.178Z',
              '2019-12-23T07:42:02.383Z',
              '2020-01-28T09:15:04.904Z',
              '2020-04-01T10:17:24.185Z',
              '2020-05-08T14:11:59.604Z',
              '2020-05-27T17:01:17.194Z',
              '2020-07-11T23:36:17.929Z',
              '2020-07-12T10:51:36.790Z'
              ],
  interestRate: 1.2, // %
  pin: 1111,
  local : 'en-GB',  
  curency : 'USD',
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementDates:
              [
              '2019-11-18T21:31:17.178Z',
              '2019-12-23T07:42:02.383Z',
              '2020-01-28T09:15:04.904Z',
              '2020-04-01T10:17:24.185Z',
              '2020-05-08T14:11:59.604Z',
              '2020-05-26T17:01:17.194Z',
              '2020-07-28T23:36:17.929Z',
              '2020-07-01T10:51:36.790Z'
              ],
  interestRate: 1.5,
  pin: 2222,
  local : 'en-US',  
  curency : 'EUR',
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementDates:
              [
              '2019-11-18T21:31:17.178Z',
              '2019-12-23T07:42:02.383Z',
              '2020-01-28T09:15:04.904Z',
              '2020-04-01T10:17:24.185Z',
              '2020-05-08T14:11:59.604Z',
              '2020-05-27T17:01:17.194Z',
              '2020-07-11T23:36:17.929Z',
              '2020-07-12T10:51:36.790Z'
              ],
  interestRate: 0.7,
  pin: 3333,
  local : 'en-US',  
  curency : 'USD',
  type: 'premium',
};

const account4 = {
  owner: 'Dagm Endale',
  movements: [430, 1000, 700, 50, 90],
  movementDates:
              [
              '2019-12-23T07:42:02.383Z',
              '2020-01-28T09:15:04.904Z',
              '2020-04-01T10:17:24.185Z',
              '2020-07-11T23:36:17.929Z',
              '2020-07-12T10:51:36.790Z'
              ],
  interestRate: 1,
  pin: 1212,
  local : 'pt-PT',  
  curency : 'EUR',
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatMovmetDate = function (date,local){
  const calculateDays = (day1,day2) => Math.round(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24));
  const dayPassed = calculateDays(new Date() , date);
  console.log(dayPassed);
  if(dayPassed === 0) return `Today`;
  if(dayPassed === 1) return `YesterDay`;
  if(dayPassed <= 7) return `${dayPassed} days ago`;
  else{
    // const year = date.getFullYear();
    // const day = `${date.getDay()}`.padStart(2,0);
    // const month = `${date.getMonth() + 1}`.padStart(2,0);
    return new Intl.DateTimeFormat(local).format(date);
  }
  
}

const formatNum = function(value,local,curency){
  const options = {
    style : "currency",
    currency : curency,
  }
  return new Intl.NumberFormat(local,options).format(value);
}

const displayMovements = function(acc , sort = false){
  containerMovements.innerHTML = '';
  const movs = sort ? acc.movements.slice().sort((a,b) => a-b) : acc.movements;
  movs.forEach(function(mov , i){
  const type = mov > 0 ? 'deposit' : 'withdrawal';
  const date = new Date(acc.movementDates[i]);
  const displayDate = formatMovmetDate(date,acc.local);
          // <div class="movements__value">${mov.toFixed(2)}€</div>

  const formatedNumber = formatNum(mov,acc.local,acc.curency);
  const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatedNumber}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin' , html);
  });  
};


// currentAccount = account1; 

const createUserName = function(accs){
  accs.forEach(function(acc){
    acc.userName = acc.owner.toLowerCase().split(' ').map(function(name){return name[0]}).join('');
  });
}
createUserName(accounts);

const calctotalBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,mov) => acc + mov ,0);
  const formatedNumber = formatNum(acc.balance,acc.local,acc.curency);
  labelBalance.textContent = `${formatedNumber}` ;
}

// calctotalBalance(account1.movements);

const calcDisplaySummery = function(acc){
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc,cur) => acc + cur,0);
  const out = acc.movements.filter(mov => mov < 0).reduce((acc,cur) => acc + cur,0);
  const interest = acc.movements.filter(mov => mov > 0).map(deposite => deposite * acc.interestRate / 100).filter((int,i,arr) => {
    return int>=1;
  }).reduce((acc,cur) => acc + cur ,0 );
 
  labelSumIn.textContent = formatNum(incomes,acc.local,acc.curency);
  labelSumOut.textContent = formatNum(Math.abs(out),acc.local,acc.curency);
  labelSumInterest.textContent = formatNum(interest,acc.local,acc.curency);
};

// calcDisplaySummery(account1.movements);
const displayUI = function(acc){
  //display balance
    calctotalBalance(acc);
    //display movments
    displayMovements(acc);
    //display sumery
    calcDisplaySummery(acc);
}

const startLogouttimer = function(){
  let time = 60;
  const tick = function(){
      const min = String(Math.trunc(time / 60)).padStart(2,0);
      const sec = String(time % 60).padStart(2,0);
      labelTimer.textContent = `${min}:${sec}`;
      
      if(time === 0){
        clearInterval(timer);
        labelWelcome.textContent = `Log in to get started,${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 0;
      }
      time--;
    }
  tick();
  const timer = setInterval(tick,1000);

    return timer;

}

let currentAccount,timer;

btnLogin.addEventListener('click' , function(e){
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    
    //display the message
    labelWelcome.textContent = `Welcome back,${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //display the date on lable balance
    const now = new Date();
    // const year = now.getFullYear();
    // const day = `${now.getDay()}`.padStart(2,0);
    // const month = `${now.getMonth() + 1}`.padStart(2,0);
    // const hour = `${now.getHours()}`.padStart(2,0);
    // const min = `${now.getMinutes()}`.padStart(2,0);
    // labelDate.textContent = ` ${day}/${month}/${year}, ${hour}:${min}`;
    const options = {
      hour:'numeric',
      minute:'numeric',
      day:'numeric',
      month:'numeric',
      year:'numeric',
      
    }
    // const navigate = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.local , options).format(now);
    if(timer) clearInterval(timer);
    timer = startLogouttimer();
    displayUI(currentAccount);

  }else{
    labelWelcome.textContent = 'Wrong input 💀';
    labelWelcome.style.color = 'red';
    labelWelcome.style.fontSize ='60px';
    containerApp.style.opacity = 0;

  }
  
});

btnTransfer.addEventListener('click' , function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAccount = accounts.find(acc => acc.userName === inputTransferTo.value);
  console.log(amount , reciverAccount);
  if (amount > 0 && reciverAccount && currentAccount.balance >= amount && reciverAccount?.userName !== currentAccount.userName){
    console.log('transferd');
    currentAccount.movements.push(-amount);
    reciverAccount.movements.push(amount);
    currentAccount.movementDates.push(new Date().toISOString());
    reciverAccount.movementDates.push(new Date().toISOString());
    inputTransferAmount.value = inputTransferTo.value = '';
    displayUI(currentAccount);
    clearInterval(timer);
    timer = startLogouttimer();
  }else{
    alert('The amount is greater than your balance!');
  }

});

btnClose.addEventListener('click' , function(e){
  e.preventDefault();
  const userNameCheck = inputCloseUsername.value;
  const userpinChecker = Number(inputClosePin.value);
  console.log(userNameCheck , userpinChecker);
  if(userNameCheck === currentAccount.userName && userpinChecker === currentAccount.pin){
    const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);
    accounts.splice(index,1);
    labelWelcome.textContent = `Good Bye ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 0;
  }
  userNameCheck = userpinChecker = '';
});

btnLoan.addEventListener('click' , function(e){

  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
   setTimeout(function() {
    currentAccount.movements.push(amount);
    currentAccount.movementDates.push(new Date().toISOString());
    displayUI(currentAccount);
    clearInterval(timer);
    timer = startLogouttimer();
  },2500)
  }
  inputLoanAmount.value = '';
});
let sorted = false;
btnSort.addEventListener('click' , function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements , !sorted);
  sorted = !sorted;
});

// const calculateHumanAge = function (ages){
//   const humanAge = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
//   console.log(humanAge);
//   const adult = humanAge.filter(age => age >= 18);
//   console.log(adult);
//   const average = adult.reduce((acc,age) => acc + age ,0) / adult.length;
//   return average;
// }
// const arr = [1,2,3,7,58,5];
// const dogAge = calculateHumanAge([1,2,3,7,58,5]);
// console.log(dogAge);

// const calculateHumanAge = ages =>
//   ages.map(age => age <= 2 ? 2 * age : 16 + age * 4).filter(age => age >= 18 ).reduce((acc,age,i,arr) => acc + age  / arr.length , 0);
// const dogAge = calculateHumanAge([1,2,3,7,58,5]);
// console.log(dogAge);

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const mergedArray = accountMovements.flat();
// console.log(mergedArray);

// const overall = mergedArray.reduce((acc , cur) => acc + cur ,0);

const overAll = accounts.map(mov => mov.movements).flat().reduce((acc,cur) => acc + cur ,0);
console.log(overAll);

const overAll2 = accounts.flatMap(mov => mov.movements).reduce((acc,cur) => acc + cur ,0);
console.log(overAll2);

const depositeWithdrawal = accounts.flatMap(acc => acc.movements).reduce((sum,cur) =>{
  cur>0 ? sum.deposite += cur : sum.withdrawal += cur;
  return sum;
},{deposite : 0,withdrawal : 0});
console.log(depositeWithdrawal);

//title converter demonstration

const titleConverter = function(title){
  const exceptions = ['a','an','but','with','the','or','on','in'];
  const converted = title.toLowerCase().split(' ').map(word  => exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)).join(' ');
  return converted;
}
console.log(titleConverter('this is a nice title'));
console.log(titleConverter('this is a LONG title but not too long'));
console.log(titleConverter('and here is another title with an EXAMPLE'));

console.log([...document.querySelectorAll('.movements__row')]);