export function animations() {
  const pTag = document.querySelectorAll('.numberPercent');

  let count1 = 0;
  let count2 = 0;
  let count3 = 0;

  const interval1 = setInterval(function () {
    pTag[0].textContent = count1;
    count1++;

    if (count1 > 10) {
      clearInterval(interval1);
    }
  }, 200);
  const interval2 = setInterval(function () {
    pTag[1].textContent = count2;
    count2++;

    if (count2 > 70) {
      clearInterval(interval2);
    }
  }, 50);
  const interval3 = setInterval(function () {
    pTag[2].textContent = count3;
    count3++;

    if (count3 > 20) {
      clearInterval(interval3);
    }
  }, 100);
}
