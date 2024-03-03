<template>
    <div class="message-container">
      <p>{{ msg }}</p>
    </div>
  </template>
  
  <script>
    export default {
      name: "Message",
      props: {
        msg: String
      }
    }
  </script>
  
  <style scoped>
    .message-container {
      color: #ffffff;
      background-color: #ff0000;
      border: 2px solid #df0000;
      border-radius: 5px;
      padding: 10px;
      max-width: 400px;
      margin: 30px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      justify-items: center;
    }

    p{
        margin: 0;
    }

  </style>