const daysTexts = document.querySelectorAll('span');
const spentAmounts = document.querySelectorAll('.spentAmount');
const spentAdayColumns = document.querySelectorAll('.spentAdayColumn');
const spentdiv= document.querySelector('.spentColumns');
const weekdays = ["sun","mon","tue","wed","thu","fri","sat"];
const d = new Date();
let today = weekdays[d.getDay()];
let part1 = [weekdays.slice(d.getDay()+1)];
let part2 = [weekdays.slice(0, d.getDay())]; 
const weekdays2 = (part1.concat(part2, today)).flat();

function htmlDaysOfTheWeek() {
for (let i=0;i<daysTexts.length;i++){
daysTexts[i].innerHTML = weekdays2[i];
}}
htmlDaysOfTheWeek();
console.log (weekdays2);

getData();
function getData() {
fetch('/data.json')
.then(response => response.json())
.then(data => myData(data))
.catch(error => console.log(error));
}
function myData(data) { 
const values = data.map((item) => item.amount); 
const newValues = [
    ...values.slice(-1),
    ...values.slice(0, -1)
  ];
  let todayvalue = newValues[d.getDay()];
  let part1values = [newValues.slice(d.getDay()+1)];
  let part2values = [newValues.slice(0, d.getDay())]; 
  const newValues2 = (part1values.concat(part2values, todayvalue)).flat();
console.log (newValues2);

for (let j=0;j<spentAmounts.length;j++){
  spentAmounts[j].innerHTML = `$${newValues2[j]}`;
  const max = Math.max(...newValues2);
  spentAdayColumns[j].style.height=`${newValues2[j]*150/max}px`;
  console.log(max);
  }}

for (let a=0;a<spentAdayColumns.length; a++) {
  spentAdayColumns[a].addEventListener("mouseover", function() {
  this.parentElement.firstElementChild.style.visibility = "visible";
  });}
for (let a=0;a<spentAdayColumns.length; a++) {
  spentAdayColumns[a].addEventListener("mouseout", function() {
  this.parentElement.firstElementChild.style.visibility = "hidden";
  });}