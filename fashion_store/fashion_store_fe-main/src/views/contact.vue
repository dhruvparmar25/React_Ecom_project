<template>
  <section class="contact">
    <div class="main">
      <div class="filed">
        <div class="title">contact</div>
        <div class="desc">
          Questions or comments? Get in touch and we'll be happy to help.
        </div>
        <div class="form">
          <div class="firstfiled">
            <input type="text" placeholder="Name" class="name" />
            <input type="text" placeholder="Email" class="email" />
          </div>
          <input type="text" placeholder="Phone number" class="ph" />
          <input type="text" placeholder="Comment" class="comment" />

          <button type="button" class="send">Send</button>
        </div>
      </div>
      <div class="details">
        <div class="desc">Contact Information</div>
        <div class="address">
          <strong>Address: </strong> 98, Jay Hanuman Industrial Estate-2, Anjana
          Farm, Nr. HTC Market, Surat-395001
        </div>
        <div class="mobile"><strong>Mobile No: </strong> +91 8140137412</div>
        <div class="emaildetail">
          <strong>Email: </strong> info@fashionstore.com
        </div>
      </div>
    </div>
  </section>
</template>
<!-- javaScript -->
<script setup></script>
<!-- Style -->
<style scoped>
.contact {
  padding: 3rem;
}
.main {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.filed {
  width: 40%;
}
.title {
  font-size: 3rem;
  font-weight: 300;
  text-transform: capitalize;
}
.desc {
  font-size: 1.5rem;
  text-transform: capitalize;
  color: #ffd232;
  margin-bottom: 1rem;
}
.firstfiled {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.name,
.email {
  width: 45%;
  height: 2rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
}
.ph,
.comment {
  width: 100%;
  height: 2rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
}
.comment {
  height: 5rem;
}
.send {
  background-color: #ffd232;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 20px;
  padding: 1rem;
  width: fit-content;
  border: none;
  border-radius: 10px;
  color: rgb(41, 45, 53);
  margin-top: 1rem;
}
.details {
  width: 40%;
}
.details > div {
  margin-bottom: 2rem;
}
</style>
