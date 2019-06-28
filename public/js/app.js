const weatherForm = document.querySelector("form");
const busca = document.querySelector("input");
const m1 = document.querySelector("#m1");
const m2 = document.querySelector("#m2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  m1.textContent = "loading ...";
  m2.textContent = "";

  fetch("/weather/?endereco=" + busca.value).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
        m1.textContent = data.error;
      } else {
        console.log(data.local);
        console.log(data.Skydata);
        m1.textContent = data.local;
        m2.textContent = data.Skydata;

        //   m2.textContent = "";
        //   for (var inf in data.Skydata) {
        //     m2.textContent = m2.textContent + " " + data.Skydata[inf] + "  ";
        //   }
      }
    });
  });
});
