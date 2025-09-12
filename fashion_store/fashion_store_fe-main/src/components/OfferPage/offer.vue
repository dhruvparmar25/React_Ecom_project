<template>
  <section class="offer">
    <div class="container">
      <div class="text">
        <h1>10% OFF Discount Coupons</h1>
        <p>Subscribe us to get 10% OFF on all the purchases</p>
      </div>
      <div class="off"><button>EMAIL ME</button></div>
    </div>
    <div class="offtext">10% OFF</div>
  </section>
</template>
<script setup></script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap");
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;
  position: relative;
  z-index: 11;
}
.text {
  width: 40%;
}
.offer {
  /* width: 30%; */
  margin: auto;
  position: relative;
  z-index: 5;
  background-color: #f1f1f1;
}
.text h1 {
  font-size: 45px;
  font-weight: 700;
  color: #212529;
}
.offtext {
  position: absolute;
  top: 80px;
  bottom: 0px;
  right: 0%;
  z-index: 10;
  font-size: 141px;
  font-weight: 700;
  color: rgb(225, 225, 225);
  font-family: "Playfair Display", sans-serif;
}
.text p {
  font-size: 16px;
  font-weight: 300;
  line-height: 26px;
  /* color:#F1F1F1 ; */
}
button {
  background-color: black;
  color: white;
  font-size: 16px;
  border: 1px solid black;
  padding: 0.8em 2.5em;
  font-size: 1.1em;
  letter-spacing: 2px;
}
@media (max-width: 480px) {
  .offtext {
    display: none;
  }
  .text h1 {
    font-size: 14px;
    font-weight: 700;
    color: #212529;
  }
  button {
    background-color: black;
    color: white;

    border: 1px solid black;
    padding: 0.5rem 1rem;
  }
}
</style>
